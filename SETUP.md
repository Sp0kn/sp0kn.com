# Setup Guide — sp0kn.com

## Prerequisites
- Node.js 20+
- Python 3.11+
- A GitHub account (for Pages deployment)
- Accounts on: Render, Supabase, Resend (all free tiers)

---

## 1. Install frontend dependencies

```bash
npm install
npm run dev   # starts at http://localhost:5173
```

---

## 2. Configure frontend environment

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env`:
- `VITE_TWITCH_PARENT` → `localhost` for local dev, `sp0kn.com` in production
- `VITE_API_URL` → your Render backend URL (step 5)
- `VITE_GOOGLE_API_KEY` → your Google API key (step 4)

---

## 3. Create a Twitch Developer App

1. Go to https://dev.twitch.tv/console/apps
2. Click **Register Your Application**
3. Name: `sp0kn-website`, OAuth Redirect: `http://localhost`, Category: `Website Integration`
4. Copy **Client ID** and generate a **Client Secret**
5. Add both to `backend/.env`

---

## 4. Get a Google Calendar API Key

1. Go to https://console.cloud.google.com
2. Create a new project (or use existing)
3. Enable the **Google Calendar API**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. (Optional but recommended) Restrict the key to Calendar API + your domain
6. Add the key to both `.env` (frontend) and set `VITE_GOOGLE_API_KEY`

---

## 5. Set up the Python backend (Render)

### Local development
```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt
cp .env.example .env       # fill in your values
uvicorn app.main:app --reload --port 8000
```

### Deploy to Render
1. Go to https://render.com → **New Web Service**
2. Connect your GitHub repo
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add all environment variables from `backend/.env.example`
5. Copy the service URL → add to GitHub Secrets as `VITE_API_URL`

---

## 6. Create a Discord Bot

1. Go to https://discord.com/developers/applications → **New Application**
2. Go to **Bot** → **Add Bot**
3. Copy the **Bot Token** → add to `backend/.env` as `DISCORD_BOT_TOKEN`
4. Go to **OAuth2** → **URL Generator**:
   - Scopes: `bot`
   - Permissions: `Read Messages/View Channels`
5. Open the generated URL and invite the bot to your Discord server
6. Find the `@lesaliens` role ID:
   - In Discord: Settings → Advanced → Enable Developer Mode
   - Right-click the role → **Copy Role ID**
   - Add to `backend/.env` as `DISCORD_MENTION_ROLE_ID`

---

## 7. Set up Supabase

1. Go to https://supabase.com → create a free project
2. Go to **SQL Editor** → paste the contents of `backend/supabase_setup.sql` → Run
3. Go to **Project Settings** → **API**:
   - Copy **Project URL** → `SUPABASE_URL`
   - Copy **anon public key** → `SUPABASE_KEY`
4. Add both to `backend/.env`

---

## 8. Set up Resend (email for suggestion box)

1. Go to https://resend.com → create a free account
2. Go to **API Keys** → create one → add to `backend/.env` as `RESEND_API_KEY`
3. Go to **Domains** → add `sp0kn.com` and verify DNS records
4. Set `SUGGESTION_FROM_EMAIL=noreply@sp0kn.com`
5. Set `SUGGESTION_TO_EMAIL=your_real_email@example.com`

---

## 9. Connect your leaderboard script

In your Python script, add this at the end to push data to the API:

```python
import httpx

LEADERBOARD_API = "https://your-app.onrender.com/api/leaderboard"
SECRET_TOKEN    = "your_LEADERBOARD_UPDATE_TOKEN"

entries = [
    {"rank": 1, "username": "Alice", "points": 1500, "trend": "up"},
    {"rank": 2, "username": "Bob",   "points": 1200, "trend": "stable"},
    # ...
]

httpx.post(LEADERBOARD_API, json={"token": SECRET_TOKEN, "entries": entries})
```

---

## 10. Deploy to GitHub Pages

1. Push your code to the `main` branch
2. Go to repo **Settings** → **Pages** → Source: **GitHub Actions**
3. Add these GitHub Secrets (Settings → Secrets → Actions):
   - `VITE_API_URL` → your Render URL
   - `VITE_GOOGLE_API_KEY` → your Google API key
4. The workflow in `.github/workflows/deploy.yml` will auto-deploy on every push to `main`
5. Point your domain `sp0kn.com` DNS to GitHub Pages:
   - Add 4 A records pointing to GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Add a CNAME record: `www` → `yourusername.github.io`

---

## Quick reference — what each .env variable does

| Variable | Where | What |
|---|---|---|
| `VITE_TWITCH_PARENT` | Frontend | Domain for Twitch embed (use `localhost` locally) |
| `VITE_API_URL` | Frontend | Your Render backend URL |
| `VITE_GOOGLE_API_KEY` | Frontend | Google Calendar API key |
| `TWITCH_CLIENT_ID` | Backend | Twitch app client ID |
| `TWITCH_CLIENT_SECRET` | Backend | Twitch app secret |
| `DISCORD_BOT_TOKEN` | Backend | Discord bot token |
| `DISCORD_MENTION_ROLE_ID` | Backend | ID of the @lesaliens role |
| `RESEND_API_KEY` | Backend | Resend email API key |
| `SUGGESTION_TO_EMAIL` | Backend | Where suggestions land (your real email) |
| `SUPABASE_URL` | Backend | Supabase project URL |
| `SUPABASE_KEY` | Backend | Supabase anon key |
| `LEADERBOARD_UPDATE_TOKEN` | Backend | Secret your script uses to push scores |
