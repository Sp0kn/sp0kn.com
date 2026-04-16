import { HiClock, HiEye, HiExternalLink } from 'react-icons/hi'
import SectionTitle from '../components/common/SectionTitle'
import { useTwitchVODs } from '../hooks/useTwitchData'
import type { TwitchVOD } from '../types'

function VODCard({ vod }: { vod: TwitchVOD }) {
  const thumb = vod.thumbnailUrl
    .replace('%{width}', '640')
    .replace('%{height}', '360')

  return (
    <a
      href={vod.url}
      target="_blank"
      rel="noopener noreferrer"
      className="clip-card bg-space-800 border border-space-600 rounded-xl overflow-hidden group block"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumb}
          alt={vod.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-14 h-14 bg-accent-orange rounded-full flex items-center justify-center shadow-glow-orange">
            <svg className="w-6 h-6 text-space-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
          {vod.duration}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-text-primary font-medium text-sm line-clamp-2 leading-snug mb-2">{vod.title}</h3>
        <div className="flex items-center gap-3 text-text-muted text-xs">
          <span className="flex items-center gap-1">
            <HiEye className="w-3.5 h-3.5" />
            {vod.viewCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <HiClock className="w-3.5 h-3.5" />
            {new Date(vod.createdAt).toLocaleDateString('fr-FR')}
          </span>
          <HiExternalLink className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </a>
  )
}

export default function VODs() {
  const { data: vods, isLoading, isError } = useTwitchVODs(20)

  return (
    <div className="page-hero">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle title="VODs" subtitle="Les VODs récents du stream" />

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <div className="aspect-video bg-space-700 animate-pulse" />
                <div className="p-4 bg-space-800 space-y-2">
                  <div className="h-3 bg-space-700 rounded animate-pulse" />
                  <div className="h-3 bg-space-700 rounded w-2/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="card text-center py-16 text-text-muted">
            Impossible de charger les VODs pour le moment. Réessaie plus tard.
          </div>
        )}

        {!isLoading && !isError && (!vods || vods.length === 0) && (
          <div className="card text-center py-16">
            <p className="text-4xl mb-4">📼</p>
            <p className="text-text-muted">Aucun replay disponible pour le moment.</p>
          </div>
        )}

        {!isLoading && !isError && vods && vods.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {vods.map((vod) => <VODCard key={vod.id} vod={vod} />)}
          </div>
        )}
      </div>
    </div>
  )
}
