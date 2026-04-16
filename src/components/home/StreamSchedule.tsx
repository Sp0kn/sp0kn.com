import { useMemo } from 'react'
import { HiCalendar, HiClock, HiStar } from 'react-icons/hi'
import SectionTitle from '../common/SectionTitle'
import type { CalendarEvent } from '../../types'

interface Props {
  events: CalendarEvent[]
  isLoading: boolean
  error: boolean
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr)
  // All-day events have no time component
  if (dateStr.length === 10) return null
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

function isUpcoming(dateStr: string) {
  return new Date(dateStr) >= new Date()
}

export default function StreamSchedule({ events, isLoading, error }: Props) {
  const upcoming = useMemo(
    () => events.filter((e) => isUpcoming(e.start)).slice(0, 8),
    [events],
  )

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionTitle
        title="Horaire"
        subtitle="Prochains streams | Heures approximatives (Québec)"
      />

      {isLoading && (
        <div className="card flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-accent-orange/40 border-t-accent-orange rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="card text-center py-10 text-text-muted">
          Impossible de charger le planning pour l'instant.
        </div>
      )}

      {!isLoading && !error && upcoming.length === 0 && (
        <div className="card text-center py-10">
          <HiCalendar className="w-10 h-10 text-text-faint mx-auto mb-3" />
          <p className="text-text-muted">Aucun stream planifié pour le moment.</p>
          <p className="text-text-faint text-xs mt-1">Reviens bientôt !</p>
        </div>
      )}

      {!isLoading && !error && upcoming.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcoming.map((event) => {
            const time = formatTime(event.start)
            return (
              <div
                key={event.id}
                className={`card-hover ${event.isSpecial ? 'border-accent-orange/40' : ''}`}
              >
                {event.isSpecial && (
                  <div className="flex items-center gap-1 text-accent-orange text-xs font-semibold mb-2">
                    <HiStar className="w-3.5 h-3.5" />
                    Événement spécial
                  </div>
                )}
                <p className="text-text-muted text-xs mb-1.5 flex items-center gap-1.5">
                  <HiCalendar className="w-3.5 h-3.5" />
                  {formatDate(event.start)}
                </p>
                {time && (
                  <p className="text-text-muted text-xs mb-2 flex items-center gap-1.5">
                    <HiClock className="w-3.5 h-3.5" />
                    {time}
                  </p>
                )}
                <p className={`font-semibold text-sm leading-snug ${event.isSpecial ? 'text-accent-orange' : 'text-text-primary'}`}>
                  {event.title}
                </p>
                {event.description && (
                  <p className="text-text-muted text-xs mt-2 line-clamp-2">{event.description}</p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
