from typing import Optional, Literal
from pydantic import BaseModel, Field


# ── Leaderboard ───────────────────────────────────────────────────────────────

class LeaderboardEntry(BaseModel):
    rank: int
    username: str
    points: int
    watch_time_minutes: Optional[int] = None
    trend: Optional[Literal["up", "down", "stable"]] = None
    avatar_url: Optional[str] = None


class LeaderboardUpdateRequest(BaseModel):
    entries: list[LeaderboardEntry]
    token: str = Field(..., description="Auth token matching LEADERBOARD_UPDATE_TOKEN env var")


# ── Suggestion ────────────────────────────────────────────────────────────────

class SuggestionRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    pseudonyme: Optional[str] = Field(None, max_length=32)


# ── Discord ───────────────────────────────────────────────────────────────────

class DiscordAttachment(BaseModel):
    url: str
    filename: str


class DiscordMessage(BaseModel):
    id: str
    content: str
    author_name: str
    author_avatar_url: str
    timestamp: str
    attachments: list[DiscordAttachment] = []


# ── Twitch ────────────────────────────────────────────────────────────────────

class TwitchStreamStatus(BaseModel):
    is_live: bool
    title: Optional[str] = None
    game_name: Optional[str] = None
    viewer_count: Optional[int] = None
    started_at: Optional[str] = None
    thumbnail_url: Optional[str] = None


class TwitchClip(BaseModel):
    id: str
    title: str
    thumbnail_url: str
    url: str
    view_count: int
    created_at: str
    duration: float
    creator_name: str


class TwitchVOD(BaseModel):
    id: str
    title: str
    thumbnail_url: str
    url: str
    view_count: int
    created_at: str
    duration: str
    description: str
