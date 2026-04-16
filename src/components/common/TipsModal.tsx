import { HiX, HiHeart, HiExternalLink } from 'react-icons/hi'
import { FaPatreon } from 'react-icons/fa'
import { SiKofi } from 'react-icons/si'
import { TIPS_PLATFORMS } from '../../config/constants'

interface Props {
  onClose: () => void
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FaPatreon: FaPatreon,
  SiKofi: SiKofi,
}

export default function TipsModal({ onClose }: Props) {
  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-space-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent-orange/10 border border-accent-orange/30 rounded-lg flex items-center justify-center">
              <HiHeart className="w-5 h-5 text-accent-orange" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-text-primary tracking-wide">Soutenir Sp0kn</h2>
              <p className="text-text-muted text-xs">Chaque soutien compte énormément ❤️</p>
            </div>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* Platforms */}
        <div className="p-6 space-y-3">
          {TIPS_PLATFORMS.map((platform) => {
            const IconComponent = ICON_MAP[platform.iconName]
            const isAvailable = !!platform.url

            return (
              <div
                key={platform.name}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                  isAvailable
                    ? 'bg-space-700 border-space-600 hover:border-accent-orange/40 hover:bg-space-700/80 cursor-pointer'
                    : 'bg-space-700/40 border-space-600/40 opacity-50 cursor-not-allowed'
                }`}
                onClick={() => isAvailable && window.open(platform.url, '_blank', 'noopener,noreferrer')}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${platform.color}20`, border: `1px solid ${platform.color}40` }}
                >
                  {IconComponent ? (
                    <IconComponent className="w-5 h-5" style={{ color: platform.color } as React.CSSProperties} />
                  ) : (
                    <span className="text-xs font-bold" style={{ color: platform.color }}>
                      {platform.name[0]}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary font-semibold text-sm">{platform.name}</p>
                  <p className="text-text-muted text-xs mt-0.5">{platform.description}</p>
                  {!isAvailable && (
                    <p className="text-text-faint text-xs mt-0.5 italic">Bientôt disponible</p>
                  )}
                </div>

                {isAvailable && <HiExternalLink className="w-4 h-4 text-text-muted shrink-0" />}
              </div>
            )
          })}
        </div>

        <div className="px-6 pb-6 text-center">
          <p className="text-text-faint text-xs">
            Merci de soutenir le stream ! Ça aide vraiment à continuer à créer du contenu. 🙏
          </p>
        </div>
      </div>
    </div>
  )
}
