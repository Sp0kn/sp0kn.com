import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { SITE_CONFIG } from '../config/constants'
import type { DiscordMessage } from '../types'

export function useDiscordFeed(limit = 10, filter: 'important' | 'all' = 'important') {
  const query = useQuery<DiscordMessage[]>({
    queryKey: ['discord', 'feed', limit, filter],
    queryFn: async () => {
      const { data } = await axios.get<any[]>(
        `${SITE_CONFIG.apiBaseUrl}/api/discord/feed`,
        { params: { limit, filter } },
      )
      return data.map((m) => ({
        id: m.id,
        content: m.content,
        authorName: m.author_name,
        authorAvatarUrl: m.author_avatar_url,
        timestamp: m.timestamp,
        attachments: (m.attachments ?? []).map((a: any) => ({
          url: a.url,
          filename: a.filename,
        })),
      }))
    },
    refetchInterval: 60_000,
    staleTime: 30_000,
  })

  return {
    messages: query.data ?? [],
    isLoading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
    lastUpdated: query.dataUpdatedAt ? new Date(query.dataUpdatedAt) : undefined,
  }
}
