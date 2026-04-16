import { FaDiscord } from 'react-icons/fa'
import SectionTitle from '../common/SectionTitle'
import { SOCIAL_LINKS } from '../../config/constants'
import type { DiscordMessage } from '../../types'

interface Props {
  messages: DiscordMessage[]
  isLoading: boolean
  error: boolean
  filter: 'important' | 'all'
  onFilterChange: (filter: 'important' | 'all') => void
}

function timeAgo(timestamp: string) {
  const diff = (Date.now() - new Date(timestamp).getTime()) / 1000
  if (diff < 60)    return 'à l\'instant'
  if (diff < 3600)  return `il y a ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`
  return `il y a ${Math.floor(diff / 86400)} j`
}

export default function DiscordFeed({ messages, isLoading, error, filter, onFilterChange }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-8">
        <SectionTitle
          title="Actu @lesaliens"
          subtitle="Messages depuis le Discord de la communauté"
        />
        <div className="flex items-center gap-3 mb-8">
          <div className="flex bg-space-800 border border-space-600 rounded-lg p-0.5">
            {([
              { value: 'important', label: 'Messages importants' },
              { value: 'all',       label: 'Tous les messages' },
            ] as const).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onFilterChange(value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                  filter === value
                    ? 'bg-accent-orange text-space-900'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading && messages.length === 0 && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card flex gap-3 animate-pulse">
              <div className="w-10 h-10 bg-space-700 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-space-700 rounded w-24" />
                <div className="h-3 bg-space-700 rounded w-full" />
                <div className="h-3 bg-space-700 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="card text-center py-10 text-text-muted">
          Impossible de charger le fil Discord pour l'instant.
        </div>
      )}

      {!isLoading && !error && messages.length === 0 && (
        <div className="card text-center py-10">
          <FaDiscord className="w-10 h-10 text-indigo-400/40 mx-auto mb-3" />
          <p className="text-text-muted">Aucune actualité pour le moment.</p>
        </div>
      )}

      {messages.length > 0 && (
        <div className="max-h-[600px] overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-space-600 scrollbar-track-transparent">
          {messages.map((msg) => (
            <div key={msg.id} className="card-hover flex gap-3">
              {/* Avatar */}
              <img
                src={msg.authorAvatarUrl}
                alt={msg.authorName}
                className="w-10 h-10 rounded-full bg-space-700 shrink-0 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.authorName)}&background=21262D&color=F5A623&bold=true`
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-text-primary text-sm font-semibold">{msg.authorName}</span>
                  <span className="text-text-faint text-xs shrink-0">{timeAgo(msg.timestamp)}</span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {msg.content}
                </p>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2 flex flex-col gap-2">
                    {msg.attachments.map((att) => {
                      const isImage = /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(att.url)
                      return isImage ? (
                        <a key={att.url} href={att.url} target="_blank" rel="noopener noreferrer">
                          <img
                            src={att.url}
                            alt={att.filename}
                            className="max-h-64 max-w-full rounded-lg object-cover border border-space-600 hover:opacity-90 transition-opacity"
                          />
                        </a>
                      ) : (
                        <a
                          key={att.url}
                          href={att.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-blue text-xs underline hover:text-accent-blue-light"
                        >
                          {att.filename}
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Link to Discord */}
      <div className="mt-6 text-center">
        <a
          href={SOCIAL_LINKS.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
        >
          <FaDiscord className="w-4 h-4" />
          Rejoindre le serveur Discord
        </a>
      </div>
    </section>
  )
}
