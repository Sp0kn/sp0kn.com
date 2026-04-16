from fastapi import APIRouter, Query
from typing import Literal
from ..models.schemas import TwitchStreamStatus, TwitchClip, TwitchVOD
from ..services import twitch_service

router = APIRouter()


@router.get("/status", response_model=TwitchStreamStatus)
async def get_stream_status():
    """Return current live status of the Twitch channel."""
    return await twitch_service.get_stream_status()


@router.get("/clips", response_model=list[TwitchClip])
async def get_clips(
    limit: int = Query(default=10, ge=1, le=20),
    sort: Literal["featured", "popular", "recent"] = Query(default="featured"),
):
    """Return Twitch clips sorted by popularity or recency."""
    return await twitch_service.get_clips(limit=limit, sort=sort)


@router.get("/vods", response_model=list[TwitchVOD])
async def get_vods(limit: int = Query(default=12, ge=1, le=20)):
    """Return recent VODs / replays."""
    return await twitch_service.get_vods(limit=limit)


@router.get("/users")
async def get_users(logins: str = Query(..., description="Comma-separated Twitch usernames")):
    """Return profile_image_url for a list of Twitch usernames."""
    login_list = [l.strip() for l in logins.split(",") if l.strip()]
    return await twitch_service.get_users(login_list)
