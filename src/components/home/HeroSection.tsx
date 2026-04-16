import { FaTwitch } from 'react-icons/fa'
import { HiChevronDown } from 'react-icons/hi'
import { SOCIAL_LINKS } from '../../config/constants'
import type { TwitchStreamStatus } from '../../types'

interface Props {
  status: TwitchStreamStatus | undefined
  isLoading: boolean
}

export default function HeroSection({ status, isLoading }: Props) {
  const isLive = status?.isLive ?? false

  return (
    <section className="starfield-bg relative overflow-hidden">
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,166,35,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 pt-6 md:pt-8 pb-2 flex flex-col items-center text-center">
        {/* Live / Offline badge */}
        {!isLoading && (
          <div className="mb-3 animate-fade-in">
            {isLive ? (
              <span className="live-badge">
                <span className="live-dot" />
                En direct
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-space-700 border border-space-600 text-text-muted text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Hors ligne
              </span>
            )}
          </div>
        )}

        {/* Avatar + Title */}
        <div className="flex items-center gap-5 mb-2">
          <img
            src="/LogoFaceCircle.png"
            alt="Sp0kn"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
          />
          <h1 className="text-4xl md:text-6xl font-black text-accent-orange" style={{ fontFamily: "'Reddit Mono', monospace", fontFeatureSettings: '"zero" 1', letterSpacing: '0.3em' }}>
            SP0KN
          </h1>
        </div>

        <p className="text-text-muted text-base md:text-lg font-light tracking-wider mb-2">
          Streamer Twitch Québécois
        </p>

        {/* Live stream info */}
        {isLive && status && (
          <div className="mt-4 mb-6 max-w-md animate-fade-in">
            <p className="text-text-secondary text-sm font-medium truncate">{status.title}</p>
            {status.gameName && (
              <p className="text-accent-orange/80 text-xs mt-1">{status.gameName}</p>
            )}
            {status.viewerCount !== undefined && (
              <p className="text-text-muted text-xs mt-1">{status.viewerCount.toLocaleString()} spectateurs</p>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
          <a
            href={SOCIAL_LINKS.twitch}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FaTwitch className="w-4 h-4" />
            {isLive ? 'Rejoindre le stream' : 'Suivre sur Twitch'}
          </a>
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Rejoindre le Discord
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-5 text-text-faint animate-bounce">
          <HiChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  )
}
