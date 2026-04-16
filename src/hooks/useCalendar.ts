import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { SITE_CONFIG } from '../config/constants'
import type { CalendarEvent } from '../types'

interface GoogleCalendarEvent {
  id: string
  summary?: string
  description?: string
  start: { dateTime?: string; date?: string }
  end:   { dateTime?: string; date?: string }
  colorId?: string
}

interface GoogleCalendarResponse {
  items: GoogleCalendarEvent[]
}

// Google Calendar color IDs that we treat as "special event"
const SPECIAL_COLOR_IDS = new Set(['11', '6', '4']) // tomato, tangerine, flamingo

function toCalendarEvent(e: GoogleCalendarEvent): CalendarEvent {
  const start = e.start.dateTime ?? e.start.date ?? ''
  const end   = e.end.dateTime   ?? e.end.date   ?? ''
  return {
    id: e.id,
    title: e.summary ?? '(Sans titre)',
    start,
    end,
    description: e.description,
    isSpecial: e.colorId ? SPECIAL_COLOR_IDS.has(e.colorId) : false,
  }
}

export function useCalendar(maxResults = 20) {
  return useQuery<CalendarEvent[]>({
    queryKey: ['calendar', maxResults],
    queryFn: async () => {
      if (!SITE_CONFIG.googleApiKey) return []
      const timeMin = new Date().toISOString()
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(SITE_CONFIG.calendarId)}/events`
      const { data } = await axios.get<GoogleCalendarResponse>(url, {
        params: {
          key: SITE_CONFIG.googleApiKey,
          timeMin,
          maxResults,
          singleEvents: true,
          orderBy: 'startTime',
        },
      })
      return data.items.map(toCalendarEvent)
    },
    staleTime: 10 * 60_000,
    enabled: !!SITE_CONFIG.googleApiKey,
  })
}
