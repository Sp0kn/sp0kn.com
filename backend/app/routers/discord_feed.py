from fastapi import APIRouter, Query
from typing import Literal
from ..models.schemas import DiscordMessage
from ..services import discord_service

router = APIRouter()


@router.get("/feed", response_model=list[DiscordMessage])
async def get_discord_feed(
    limit: int = Query(default=10, ge=1, le=50),
    filter: Literal["important", "all"] = Query(default="important"),
):
    """Return recent Discord messages, optionally filtered to @lesaliens mentions."""
    return await discord_service.get_feed(limit=limit, filter=filter)
