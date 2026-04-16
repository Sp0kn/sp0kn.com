// ─── Leaderboard ──────────────────────────────────────────────────────────────
export interface LeaderboardEntry {
  rank: number
  username: string
  points: number
  watchTimeMinutes?: number
  trend?: 'up' | 'down' | 'stable'
  avatarUrl?: string
}

// ─── Twitch ───────────────────────────────────────────────────────────────────
export interface TwitchClip {
  id: string
  title: string
  thumbnailUrl: string
  url: string
  viewCount: number
  createdAt: string
  duration: number
  creatorName: string
}

export interface TwitchVOD {
  id: string
  title: string
  thumbnailUrl: string
  url: string
  viewCount: number
  createdAt: string
  duration: string
  description: string
}

export interface TwitchStreamStatus {
  isLive: boolean
  title?: string
  gameName?: string
  viewerCount?: number
  startedAt?: string
  thumbnailUrl?: string
}

// ─── Calendar ─────────────────────────────────────────────────────────────────
export interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  description?: string
  isSpecial?: boolean
  color?: string
}

// ─── Discord ──────────────────────────────────────────────────────────────────
export interface DiscordMessage {
  id: string
  content: string
  authorName: string
  authorAvatarUrl: string
  timestamp: string
  attachments?: { url: string; filename: string }[]
}

// ─── Suggestion ───────────────────────────────────────────────────────────────
export interface SuggestionPayload {
  message: string
  pseudonyme?: string
}

export interface ApiResponse<T> {
  data: T
  error?: string
}
