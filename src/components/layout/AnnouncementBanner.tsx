import { useState, useEffect } from 'react'
import { HiX, HiSpeakerphone } from 'react-icons/hi'
import { ANNOUNCEMENT_BANNER } from '../../config/constants'

const STORAGE_KEY = 'sp0kn_banner_dismissed'

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ANNOUNCEMENT_BANNER.enabled) return
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  if (!visible) return null

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem(STORAGE_KEY, '1')
  }

  return (
    <div className="relative z-50 bg-accent-orange text-space-900 px-4 py-2.5 animate-slide-down">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 pr-8">
        <HiSpeakerphone className="w-4 h-4 shrink-0" />
        <p className="text-sm font-medium text-center">
          {ANNOUNCEMENT_BANNER.message}
          {ANNOUNCEMENT_BANNER.linkUrl && (
            <a
              href={ANNOUNCEMENT_BANNER.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 underline font-bold hover:no-underline"
            >
              {ANNOUNCEMENT_BANNER.linkText || 'En savoir plus →'}
            </a>
          )}
        </p>
      </div>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-md transition-colors"
        aria-label="Fermer"
      >
        <HiX className="w-4 h-4" />
      </button>
    </div>
  )
}
