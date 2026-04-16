import { useRef, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { HiChevronLeft, HiChevronRight, HiEye, HiExternalLink } from 'react-icons/hi'
import SectionTitle from '../common/SectionTitle'
import type { TwitchClip } from '../../types'

interface Props {
  clips: TwitchClip[]
  isLoading: boolean
  error: boolean
  sort: 'featured' | 'recent' | 'popular'
  onSortChange: (sort: 'featured' | 'recent' | 'popular') => void
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function formatViews(count: number) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return count.toString()
}

export default function ClipsCarousel({ clips, isLoading, error, sort, onSortChange }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', slidesToScroll: 1 })
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-8">
        <SectionTitle title="Clips" subtitle="Les meilleurs moments du stream" />
        <div className="flex items-center gap-3 mb-8">
          <div className="flex bg-space-800 border border-space-600 rounded-lg p-0.5">
            {([
              { value: 'featured', label: 'En vedette' },
              { value: 'recent',   label: 'Récents' },
              { value: 'popular',  label: 'Populaires' },
            ] as const).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onSortChange(value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                  sort === value
                    ? 'bg-accent-orange text-space-900'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="w-9 h-9 flex items-center justify-center bg-space-700 border border-space-600
                       rounded-lg text-text-muted hover:text-accent-orange hover:border-accent-orange/40
                       transition-all duration-200"
            aria-label="Précédent"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="w-9 h-9 flex items-center justify-center bg-space-700 border border-space-600
                       rounded-lg text-text-muted hover:text-accent-orange hover:border-accent-orange/40
                       transition-all duration-200"
            aria-label="Suivant"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="shrink-0 w-64 h-40 bg-space-700 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="card text-center py-10 text-text-muted">Impossible de charger les clips.</div>
      )}

      {!isLoading && !error && clips.length === 0 && (
        <div className="card text-center py-10 text-text-muted">Aucun clip disponible pour le moment.</div>
      )}

      {!isLoading && !error && clips.length > 0 && (
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {clips.map((clip) => (
              <a
                key={clip.id}
                href={clip.url}
                target="_blank"
                rel="noopener noreferrer"
                className="clip-card shrink-0 w-72 bg-space-800 border border-space-600 rounded-xl overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <img
                    src={clip.thumbnailUrl}
                    alt={clip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Duration badge */}
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                    {formatDuration(clip.duration)}
                  </span>
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center shadow-glow-orange">
                      <svg className="w-5 h-5 text-space-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-text-primary text-sm font-medium line-clamp-2 leading-snug">{clip.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-text-muted text-xs flex items-center gap-1">
                      <HiEye className="w-3.5 h-3.5" />
                      {formatViews(clip.viewCount)}
                    </span>
                    <HiExternalLink className="w-3.5 h-3.5 text-text-faint opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
