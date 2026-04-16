import os
import time
import httpx
from cachetools import TTLCache

from ..models.schemas import TwitchStreamStatus, TwitchClip, TwitchVOD

CLIENT_ID     = os.getenv("TWITCH_CLIENT_ID", "")
CLIENT_SECRET = os.getenv("TWITCH_CLIENT_SECRET", "")
CHANNEL_NAME  = os.getenv("TWITCH_CHANNEL_NAME", "Sp0kn")

# In-memory caches
_token_cache:  dict = {}
_status_cache: TTLCache = TTLCache(maxsize=1, ttl=60)
_clips_cache:  TTLCache = TTLCache(maxsize=1, ttl=300)
_vods_cache:   TTLCache = TTLCache(maxsize=1, ttl=300)
_users_cache:  TTLCache = TTLCache(maxsize=20, ttl=3600)


async def _get_token() -> str:
    now = time.time()
    if _token_cache.get("token") and _token_cache.get("expires", 0) > now + 60:
        return _token_cache["token"]

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            "https://id.twitch.tv/oauth2/token",
            params={
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "grant_type": "client_credentials",
            },
        )
        resp.raise_for_status()
        data = resp.json()
        _token_cache["token"]   = data["access_token"]
        _token_cache["expires"] = now + data["expires_in"]
        return _token_cache["token"]


async def _headers() -> dict:
    token = await _get_token()
    return {"Authorization": f"Bearer {token}", "Client-Id": CLIENT_ID}


async def _get_user_id() -> str:
    headers = await _headers()
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            "https://api.twitch.tv/helix/users",
            headers=headers,
            params={"login": CHANNEL_NAME.lower()},
        )
        resp.raise_for_status()
        data = resp.json()
        return data["data"][0]["id"]


async def get_stream_status() -> TwitchStreamStatus:
    if "status" in _status_cache:
        return _status_cache["status"]

    headers = await _headers()
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            "https://api.twitch.tv/helix/streams",
            headers=headers,
            params={"user_login": CHANNEL_NAME.lower()},
        )
        resp.raise_for_status()
        data = resp.json()

    if not data["data"]:
        result = TwitchStreamStatus(is_live=False)
    else:
        stream = data["data"][0]
        result = TwitchStreamStatus(
            is_live=True,
            title=stream.get("title"),
            game_name=stream.get("game_name"),
            viewer_count=stream.get("viewer_count"),
            started_at=stream.get("started_at"),
            thumbnail_url=stream.get("thumbnail_url", "").replace("{width}", "640").replace("{height}", "360"),
        )

    _status_cache["status"] = result
    return result


async def get_clips(limit: int = 10, sort: str = "recent") -> list[TwitchClip]:
    cache_key = f"clips_{limit}_{sort}"
    if cache_key in _clips_cache:
        return _clips_cache[cache_key]

    headers  = await _headers()
    user_id  = await _get_user_id()

    # For featured: use is_featured filter
    # For popular: API returns by view count by default — 1 page of 100 is enough
    # For recent: paginate many pages (API sorts by views, new low-view clips appear late)
    params: dict = {"broadcaster_id": user_id, "first": 100}
    if sort == "featured":
        params["is_featured"] = "true"

    all_clips: list = []
    cursor = None

    async with httpx.AsyncClient() as client:
        pages = {"recent": 11, "featured": 5, "popular": 1}
        for _ in range(pages.get(sort, 1)):
            if cursor:
                params["after"] = cursor
            resp = await client.get(
                "https://api.twitch.tv/helix/clips",
                headers=headers,
                params=params,
            )
            resp.raise_for_status()
            data = resp.json()
            all_clips.extend(data.get("data", []))
            cursor = data.get("pagination", {}).get("cursor")
            if not cursor or not data.get("data"):
                break

    clips = [
        TwitchClip(
            id=c["id"],
            title=c["title"],
            thumbnail_url=c.get("thumbnail_url", ""),
            url=c["url"],
            view_count=c.get("view_count", 0),
            created_at=c.get("created_at", ""),
            duration=c.get("duration", 0),
            creator_name=c.get("creator_name", ""),
        )
        for c in all_clips
    ]

    if sort == "recent" or sort == "featured":
        clips = sorted(clips, key=lambda c: c.created_at, reverse=True)[:limit]
    else:
        clips = sorted(clips, key=lambda c: c.view_count, reverse=True)[:limit]

    _clips_cache[cache_key] = clips
    return clips


async def get_users(logins: list[str]) -> dict[str, str]:
    """Return {login: profile_image_url} for the given usernames. Cached 1h."""
    if not logins:
        return {}

    cache_key = ",".join(sorted(l.lower() for l in logins))
    if cache_key in _users_cache:
        return _users_cache[cache_key]

    headers = await _headers()
    params = [("login", l.lower()) for l in logins]

    async with httpx.AsyncClient() as client:
        resp = await client.get(
            "https://api.twitch.tv/helix/users",
            headers=headers,
            params=params,
        )
        resp.raise_for_status()
        data = resp.json()

    result = {u["login"]: u["profile_image_url"] for u in data.get("data", [])}
    _users_cache[cache_key] = result
    return result


async def get_vods(limit: int = 12) -> list[TwitchVOD]:
    cache_key = f"vods_{limit}"
    if cache_key in _vods_cache:
        return _vods_cache[cache_key]

    headers = await _headers()
    user_id = await _get_user_id()

    async with httpx.AsyncClient() as client:
        resp = await client.get(
            "https://api.twitch.tv/helix/videos",
            headers=headers,
            params={"user_id": user_id, "first": min(limit, 20), "type": "archive"},
        )
        resp.raise_for_status()
        data = resp.json()

    vods = [
        TwitchVOD(
            id=v["id"],
            title=v["title"],
            thumbnail_url=v.get("thumbnail_url", ""),
            url=v["url"],
            view_count=v.get("view_count", 0),
            created_at=v.get("created_at", ""),
            duration=v.get("duration", "0s"),
            description=v.get("description", ""),
        )
        for v in data.get("data", [])
    ]

    _vods_cache[cache_key] = vods
    return vods
