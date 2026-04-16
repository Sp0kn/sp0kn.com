import SectionTitle from '../common/SectionTitle'
import { WATCHER_RANKS } from '../../config/constants'
import type { LeaderboardEntry } from '../../types'

interface Props {
  entries: LeaderboardEntry[]
  isLoading: boolean
  error: boolean
}

const MEDAL = ['🥇', '🥈', '🥉']

function getRankLabel(rank: number): string {
  return WATCHER_RANKS.find(r => rank <= r.maxRank)?.label ?? ''
}

export default function Leaderboard({ entries, isLoading, error }: Props) {
  const top3 = entries.slice(0, 3)
  const rest  = entries.slice(3)

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-1">
        <SectionTitle
          title="Watchers League"
          subtitle="Les viewers les plus assidus du stream"
        />
        <span className="text-xs text-text-faint flex items-center gap-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-slow inline-block" />
          Mis à jour en direct
        </span>
      </div>

      {isLoading && (
        <div className="card flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-accent-orange/40 border-t-accent-orange rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="card text-center py-10 text-text-muted">
          Impossible de charger le classement pour l'instant.
        </div>
      )}

      {!isLoading && !error && entries.length === 0 && (
        <div className="card text-center py-10 text-text-muted">
          Le classement est vide pour le moment.
        </div>
      )}

      {!isLoading && !error && entries.length > 0 && (
        <div className="space-y-4">
          {/* Top 3 podium */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            {top3.map((entry) => (
              <div
                key={entry.username}
                className={`card-hover flex flex-col items-center text-center py-6 rank-${entry.rank}`}
                style={{ marginTop: entry.rank === 1 ? '0px' : entry.rank === 2 ? '8px' : '16px' }}
              >
                <span className="text-3xl mb-2">{MEDAL[entry.rank - 1]}</span>
                <div className="w-14 h-14 rounded-full bg-space-700 border-2 border-accent-orange/30 overflow-hidden flex items-center justify-center mb-3">
                  {entry.avatarUrl
                    ? <img src={entry.avatarUrl} alt={entry.username} className="w-full h-full object-cover" />
                    : <span className="font-display text-xl text-accent-orange/70">{entry.username[0].toUpperCase()}</span>
                  }
                </div>
                <p className="font-semibold text-text-primary text-sm">{entry.username}</p>
                <p className="text-accent-blue text-xs mt-0.5">{getRankLabel(entry.rank)}</p>
                <p className="font-display text-2xl font-bold text-accent-orange mt-2">{entry.points.toLocaleString()}</p>
                <p className="text-text-faint text-xs">pts</p>
              </div>
            ))}
          </div>

          {/* Rest of the list */}
          {rest.length > 0 && (
            <div className="card p-0 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-space-600">
                    <th className="text-left px-5 py-3 text-text-muted font-medium text-xs uppercase tracking-wider w-12">#</th>
                    <th className="text-left px-5 py-3 text-text-muted font-medium text-xs uppercase tracking-wider">Joueur</th>
                    <th className="text-left px-5 py-3 text-text-muted font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Rang</th>
                    <th className="text-right px-5 py-3 text-text-muted font-medium text-xs uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {rest.map((entry, i) => (
                    <tr key={entry.username}
                        className={`border-b border-space-700 last:border-0 hover:bg-space-700/40 transition-colors ${
                          i % 2 === 0 ? '' : 'bg-space-800/40'
                        }`}>
                      <td className="px-5 py-3 text-text-muted font-mono">{entry.rank}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-space-700 overflow-hidden flex items-center justify-center shrink-0">
                            {entry.avatarUrl
                              ? <img src={entry.avatarUrl} alt={entry.username} className="w-full h-full object-cover" />
                              : <span className="text-xs text-text-muted">{entry.username[0].toUpperCase()}</span>
                            }
                          </div>
                          <span className="text-text-primary">{entry.username}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-text-muted text-xs hidden sm:table-cell">
                        {getRankLabel(entry.rank)}
                      </td>
                      <td className="px-5 py-3 text-right font-semibold text-accent-orange">
                        {entry.points.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
