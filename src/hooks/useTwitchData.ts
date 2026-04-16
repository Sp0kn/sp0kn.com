import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { SITE_CONFIG } from '../config/constants'
import type { TwitchStreamStatus, TwitchClip, TwitchVOD } from '../types'

const api = axios.create({ baseURL: SITE_CONFIG.apiBaseUrl })

export function useTwitchStatus() {
  return useQuery<TwitchStreamStatus>({
    queryKey: ['twitch', 'status'],
    queryFn: async () => {
      const { data } = await api.get<any>('/api/twitch/status')
      return {
        isLive: data.is_live,
        title: data.title,
        gameName: data.game_name,
        viewerCount: data.viewer_count,
        startedAt: data.started_at,
        thumbnailUrl: data.thumbnail_url,
      }
    },
    refetchInterval: 60_000,
    staleTime: 30_000,
  })
}

export function useTwitchClips(limit = 10, sort: 'featured' | 'recent' | 'popular' = 'featured') {
  return useQuery<TwitchClip[]>({
    queryKey: ['twitch', 'clips', limit, sort],
    queryFn: async () => {
      const { data } = await api.get<any[]>('/api/twitch/clips', { params: { limit, sort } })
      return data.map((c) => ({
        id: c.id,
        title: c.title,
        thumbnailUrl: c.thumbnail_url,
        url: c.url,
        viewCount: c.view_count,
        createdAt: c.created_at,
        duration: c.duration,
        creatorName: c.creator_name,
      }))
    },
    staleTime: 5 * 60_000,
  })
}

export function useTwitchVODs(limit = 12) {
  return useQuery<TwitchVOD[]>({
    queryKey: ['twitch', 'vods', limit],
    queryFn: async () => {
      const { data } = await api.get<any[]>('/api/twitch/vods', { params: { limit } })
      return data.map((v) => ({
        id: v.id,
        title: v.title,
        thumbnailUrl: v.thumbnail_url,
        url: v.url,
        viewCount: v.view_count,
        createdAt: v.created_at,
        duration: v.duration,
        description: v.description,
      }))
    },
    staleTime: 5 * 60_000,
  })
}
