import { Link } from 'react-router-dom'
import {
  FaTwitch, FaDiscord, FaInstagram, FaTiktok, FaYoutube, FaPatreon,
} from 'react-icons/fa'
import { NAV_LINKS, SOCIAL_LINKS, SITE_CONFIG } from '../../config/constants'

const SOCIALS = [
  { href: SOCIAL_LINKS.twitch,    Icon: FaTwitch,    label: 'Twitch' },
  { href: SOCIAL_LINKS.discord,   Icon: FaDiscord,   label: 'Discord' },
  { href: SOCIAL_LINKS.instagram, Icon: FaInstagram, label: 'Instagram' },
  { href: SOCIAL_LINKS.tiktok,    Icon: FaTiktok,    label: 'TikTok' },
  { href: SOCIAL_LINKS.youtube,   Icon: FaYoutube,   label: 'YouTube' },
  { href: SOCIAL_LINKS.patreon,   Icon: FaPatreon,   label: 'Patreon' },
]

export default function Footer() {
  return (
    <footer className="bg-space-950 border-t border-space-600 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <img src="/LogoBanner.png" alt="Sp0kn" className="h-10 w-auto" />
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-text-secondary text-xs font-semibold uppercase tracking-widest mb-4">Navigation</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-text-muted hover:text-accent-orange text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-text-secondary text-xs font-semibold uppercase tracking-widest mb-4">Réseaux</h3>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="w-9 h-9 flex items-center justify-center bg-space-700 border border-space-600
                             rounded-lg text-text-muted hover:text-accent-orange hover:border-accent-orange/40
                             hover:bg-accent-orange/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="gradient-divider" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-text-faint text-xs">
          <p>© {new Date().getFullYear()} Sp0kn. Tous droits réservés.</p>
          <p>Fait avec ❤️ par Sp0kn</p>
        </div>
      </div>
    </footer>
  )
}
