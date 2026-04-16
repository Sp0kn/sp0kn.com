import os
from fastapi import APIRouter, HTTPException, status
from supabase import create_client, Client

from ..models.schemas import LeaderboardEntry, LeaderboardUpdateRequest

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")
UPDATE_TOKEN = os.getenv("LEADERBOARD_UPDATE_TOKEN", "")

TABLE = "leaderboard_entries"


def _get_client() -> Client:
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise HTTPException(status_code=503, detail="Leaderboard database not configured")
    return create_client(SUPABASE_URL, SUPABASE_KEY)


@router.get("", response_model=list[LeaderboardEntry])
async def get_leaderboard():
    """Return all leaderboard entries sorted by rank."""
    db = _get_client()
    result = db.table(TABLE).select("*").order("rank").execute()
    return result.data


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
async def update_leaderboard(payload: LeaderboardUpdateRequest):
    """
    Replace all leaderboard entries.
    Protected by a secret token — call this from your Python leaderboard script.

    Example usage from your script:
        import httpx, json
        httpx.post(
            "https://your-app.onrender.com/api/leaderboard",
            json={"token": "your_secret", "entries": [ ... ]},
        )
    """
    if payload.token != UPDATE_TOKEN:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    db = _get_client()
    # Delete all existing entries, then insert new batch
    db.table(TABLE).delete().neq("rank", -1).execute()

    rows = [
        {
            "rank": e.rank,
            "username": e.username,
            "points": e.points,
            "watch_time_minutes": e.watch_time_minutes,
            "trend": e.trend,
            "avatar_url": e.avatar_url,
        }
        for e in payload.entries
    ]
    if rows:
        db.table(TABLE).insert(rows).execute()
