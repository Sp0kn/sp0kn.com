import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { LEADERBOARD_GIST_URL, SITE_CONFIG } from '../config/constants'
import type { LeaderboardEntry } from '../types'

export function useLeaderboard() {
  return useQuery<LeaderboardEntry[]>({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      // Fetch leaderboard data from Gist (cache-busted)
      const { data } = await axios.get<Record<string, number>>(
        `${LEADERBOARD_GIST_URL}?t=${Date.now()}`,
      )

      const entries: LeaderboardEntry[] = Object.entries(data).map(([username, points], i) => ({
        rank: i + 1,
        username,
        points,
      }))

      // Batch-fetch Twitch profile pictures for all usernames
      try {
        const logins = entries.map(e => e.username.toLowerCase()).join(',')
        const { data: avatars } = await axios.get<Record<string, string>>(
          `${SITE_CONFIG.apiBaseUrl}/api/twitch/users`,
          { params: { logins } },
        )
        return entries.map(e => ({
          ...e,
          avatarUrl: avatars[e.username.toLowerCase()],
        }))
      } catch {
        // If avatar fetch fails, return entries without avatars
        return entries
      }
    },
    staleTime: 60_000,
    refetchInterval: 60_000,
  })
}
