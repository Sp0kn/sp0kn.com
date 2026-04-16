import os
import re
import httpx
from cachetools import TTLCache

from ..models.schemas import DiscordMessage, DiscordAttachment

BOT_TOKEN   = os.getenv("DISCORD_BOT_TOKEN", "")
CHANNEL_ID  = os.getenv("DISCORD_CHANNEL_ID", "1251909861789270069")
MENTION_ROLE_ID = os.getenv("DISCORD_MENTION_ROLE_ID", "")

_cache: TTLCache = TTLCache(maxsize=2, ttl=60)  # one entry per filter mode

DEFAULT_AVATAR = "https://cdn.discordapp.com/embed/avatars/0.png"


def _avatar_url(user: dict) -> str:
    uid    = user.get("id", "")
    avatar = user.get("avatar")
    if avatar:
        ext = "gif" if avatar.startswith("a_") else "png"
        return f"https://cdn.discordapp.com/avatars/{uid}/{avatar}.{ext}?size=64"
    discriminator = int(user.get("discriminator", "0") or "0")
    return f"https://cdn.discordapp.com/embed/avatars/{discriminator % 5}.png"


def _clean_content(content: str) -> str:
    """Strip Discord mention syntax (<@&ID>, <@ID>, <#ID>) from message content."""
    content = re.sub(r'<@&\d+>', '', content)   # role mentions
    content = re.sub(r'<@!?\d+>', '', content)  # user mentions
    content = re.sub(r'<#\d+>', '', content)    # channel mentions
    content = re.sub(r'<:[^:]+:\d+>', '', content)  # custom emojis
    return content.strip()


def _mentions_lesaliens(message: dict) -> bool:
    """Return True if the message mentions the @lesaliens role or contains the tag."""
    content: str = message.get("content", "")

    # Check role mentions
    if MENTION_ROLE_ID:
        for mention in message.get("mention_roles", []):
            if str(mention) == str(MENTION_ROLE_ID):
                return True

    # Fallback: text mention
    return "@lesaliens" in content.lower()


async def get_feed(limit: int = 10, filter: str = "important") -> list[DiscordMessage]:
    cache_key = f"messages_{filter}"
    if cache_key in _cache:
        return _cache[cache_key][:limit]

    if not BOT_TOKEN:
        return []

    headers = {
        "Authorization": f"Bot {BOT_TOKEN}",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"https://discord.com/api/v10/channels/{CHANNEL_ID}/messages",
            headers=headers,
            params={"limit": 100},
        )
        resp.raise_for_status()
        raw = resp.json()

    if filter == "important":
        raw = [m for m in raw if _mentions_lesaliens(m)]

    messages = [
        DiscordMessage(
            id=m["id"],
            content=_clean_content(m.get("content", "")),
            author_name=m["author"].get("global_name") or m["author"].get("username", "Inconnu"),
            author_avatar_url=_avatar_url(m["author"]),
            timestamp=m.get("timestamp", ""),
            attachments=[
                DiscordAttachment(url=a["url"], filename=a["filename"])
                for a in m.get("attachments", [])
            ],
        )
        for m in raw
    ]

    _cache[cache_key] = messages
    return messages[:limit]
