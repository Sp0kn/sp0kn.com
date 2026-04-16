import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaTwitch, FaDiscord, FaInstagram, FaTiktok, FaYoutube, FaPatreon,
} from 'react-icons/fa'
import { HiMenu, HiX, HiMail, HiHeart } from 'react-icons/hi'
import { NAV_LINKS, SOCIAL_LINKS } from '../../config/constants'
import SuggestionBox from '../common/SuggestionBox'
import TipsModal from '../common/TipsModal'

const SOCIALS = [
  { href: SOCIAL_LINKS.twitch,    Icon: FaTwitch,    label: 'Twitch',    hoverClass: 'hover:text-purple-400' },
  { href: SOCIAL_LINKS.discord,   Icon: FaDiscord,   label: 'Discord',   hoverClass: 'hover:text-indigo-400' },
  { href: SOCIAL_LINKS.instagram, Icon: FaInstagram, label: 'Instagram', hoverClass: 'hover:text-pink-400' },
  { href: SOCIAL_LINKS.tiktok,    Icon: FaTiktok,    label: 'TikTok',    hoverClass: 'hover:text-text-primary' },
  { href: SOCIAL_LINKS.youtube,   Icon: FaYoutube,   label: 'YouTube',   hoverClass: 'hover:text-red-500' },
  { href: SOCIAL_LINKS.patreon,   Icon: FaPatreon,   label: 'Patreon',   hoverClass: 'hover:text-accent-orange' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const { pathname } = useLocation()

  return (
    <>
      <header className="sticky top-0 z-40 bg-space-900/95 backdrop-blur-sm border-b border-space-600">

        {/* ── Top bar: socials + action buttons ── */}
        <div className="border-b border-space-700 px-4 py-1.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ href, Icon, label, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className={`text-text-muted ${hoverClass} transition-colors duration-200`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSuggestion(true)}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-orange transition-colors duration-200 px-2 py-1 rounded hover:bg-accent-orange/5"
              >
                <HiMail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Suggérer</span>
              </button>
              <span className="text-space-600">|</span>
              <button
                onClick={() => setShowTips(true)}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-orange transition-colors duration-200 px-2 py-1 rounded hover:bg-accent-orange/5"
              >
                <HiHeart className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Soutenir</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Main nav ── */}
        <div className="px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/LogoSimpleWhite.png"
                alt="Sp0kn"
                className="h-9 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    pathname === path
                      ? 'text-accent-orange bg-accent-orange/10'
                      : 'text-text-muted hover:text-text-primary hover:bg-space-700'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-text-muted hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-space-600 px-4 py-3 animate-slide-down">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    pathname === path
                      ? 'text-accent-orange bg-accent-orange/10'
                      : 'text-text-muted hover:text-text-primary hover:bg-space-700'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {showSuggestion && <SuggestionBox onClose={() => setShowSuggestion(false)} />}
      {showTips && <TipsModal onClose={() => setShowTips(false)} />}
    </>
  )
}
