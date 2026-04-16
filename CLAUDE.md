# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**sp0kn.com** is a fan/community site for a French Twitch streamer. It consists of:
- **Frontend**: React + Vite + TypeScript + Tailwind CSS → deployed to GitHub Pages
- **Backend**: FastAPI (Python) → deployed on Render

## Commands

### Frontend (root directory)

```bash
npm run dev        # Dev server at http://localhost:5173
npm run build      # Production build → dist/
npm run lint       # ESLint check
npm run preview    # Preview production build locally
```

### Backend (`backend/` directory)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload    # Dev server at http://localhost:8000
```

## Architecture

### Frontend

- **Routing**: `HashRouter` (GitHub Pages compatibility) with 6 routes defined in `src/App.tsx`
- **Data fetching**: All API calls go through React Query hooks in `src/hooks/`. Each hook wraps an axios call to the backend or (for Google Calendar) directly to Google APIs.
- **Config**: All site-wide constants (API URL, social links, Twitch channel, tip platforms, nav links, announcement banner) live in `src/config/constants.ts`. This is the primary file to edit for content changes.
- **Types**: Shared TypeScript types in `src/types/index.ts`
- **Styling**: Tailwind with a custom design system in `tailwind.config.js`. Reusable classes (`.card`, `.btn-primary`, etc.) are defined in `src/index.css`.

### Backend

- **Entry point**: `backend/app/main.py` — mounts 4 routers under `/api/`
- **Routers**: `twitch`, `leaderboard`, `discord`, `suggestions` in `backend/app/routers/`
- **Services**: Business logic + external API calls in `backend/app/services/`. Twitch and Discord services use `cachetools.TTLCache` to avoid hitting rate limits.
- **Database**: Supabase (Postgres). Only the leaderboard uses it. Schema in `backend/supabase_setup.sql`.
- **Email**: Resend API for forwarding anonymous suggestions to the streamer.

### Key Integrations

| Integration | Where | Notes |
|---|---|---|
| Twitch API | Backend service | Client credentials OAuth, TTL-cached 60s/300s |
| Google Calendar | Frontend hook | Direct public API call, no OAuth needed |
| Discord Bot | Backend service | Filters messages mentioning @lesaliens role, TTL-cached 60s |
| Supabase | Backend router | Leaderboard read/write; external script pushes data via `LEADERBOARD_UPDATE_TOKEN` |
| Resend (email) | Backend router | Suggestion form emails |

### Environment Variables

Frontend (`.env`):
- `VITE_TWITCH_PARENT` — domain for Twitch embed iframe (`localhost` for dev, `sp0kn.com` for prod)
- `VITE_API_URL` — backend base URL
- `VITE_GOOGLE_API_KEY` — public Google Calendar API key

Backend (`backend/.env`) — see `backend/.env.example` for all required keys (Twitch, Discord, Resend, Supabase, CORS).

### Deployment

- **Frontend**: GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`. Secrets must be set in GitHub repo settings.
- **Backend**: Render. Root dir: `backend`, start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.

## Content TODOs (unfilled placeholders)

- `src/pages/Concepts.tsx` — `CONCEPTS` array is empty
- `src/pages/Auberge.tsx` — `TEAM_MEMBERS` array is empty
- `src/pages/APropos.tsx` — stats show `"—"` placeholders (no API endpoint yet)
- `src/config/constants.ts` — Ko-fi and Tipeee URLs in `TIPS_PLATFORMS` are empty strings
