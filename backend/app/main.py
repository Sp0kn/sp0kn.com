import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import leaderboard, discord_feed, suggestions, twitch

app = FastAPI(
    title="Sp0kn API",
    description="Backend API for sp0kn.com",
    version="1.0.0",
)

# ── CORS ─────────────────────────────────────────────────────────────────────
raw_origins = os.getenv("ALLOWED_ORIGINS", "https://sp0kn.com,http://localhost:5173")
origins = [o.strip() for o in raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(leaderboard.router,  prefix="/api/leaderboard",  tags=["leaderboard"])
app.include_router(discord_feed.router, prefix="/api/discord",       tags=["discord"])
app.include_router(suggestions.router,  prefix="/api/suggestions",   tags=["suggestions"])
app.include_router(twitch.router,       prefix="/api/twitch",        tags=["twitch"])


@app.get("/")
async def root():
    return {"status": "ok", "service": "sp0kn-api"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
