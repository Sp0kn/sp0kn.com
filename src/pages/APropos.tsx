import { FaTwitch, FaDiscord, FaInstagram, FaTiktok, FaYoutube, FaPatreon } from 'react-icons/fa'
import { SOCIAL_LINKS } from '../config/constants'
import SectionTitle from '../components/common/SectionTitle'

const SOCIALS = [
  { href: SOCIAL_LINKS.twitch,    Icon: FaTwitch,    label: 'Twitch',    color: 'text-purple-400', hoverBorder: 'hover:border-purple-400/40' },
  { href: SOCIAL_LINKS.discord,   Icon: FaDiscord,   label: 'Discord',   color: 'text-indigo-400', hoverBorder: 'hover:border-indigo-400/40' },
  { href: SOCIAL_LINKS.instagram, Icon: FaInstagram, label: 'Instagram', color: 'text-pink-400',   hoverBorder: 'hover:border-pink-400/40' },
  { href: SOCIAL_LINKS.tiktok,    Icon: FaTiktok,    label: 'TikTok',    color: 'text-text-primary', hoverBorder: 'hover:border-text-primary/40' },
  { href: SOCIAL_LINKS.youtube,   Icon: FaYoutube,   label: 'YouTube',   color: 'text-red-500',    hoverBorder: 'hover:border-red-500/40' },
  { href: SOCIAL_LINKS.patreon,   Icon: FaPatreon,   label: 'Patreon',   color: 'text-accent-orange', hoverBorder: 'hover:border-accent-orange/40' },
]

// TODO: Replace with real stats once you connect the Twitch API
const STATS = [
  { label: 'Followers', value: '—' },
  { label: 'Streams', value: '—' },
  { label: 'Heures streamées', value: '—' },
  { label: 'Clips créés', value: '—' },
]

export default function APropos() {
  return (
    <div className="page-hero">
      <div className="max-w-5xl mx-auto px-4 py-16">

        {/* Hero block */}
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-16">
          {/* Avatar placeholder — TODO: replace with your actual avatar */}
          <div className="shrink-0">
            <img
              src="/LogoFaceCircle.png"
              alt="Sp0kn"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>

          {/* Bio */}
          <div className="flex-1">
            <h1 className="font-display text-4xl font-bold text-accent-orange tracking-widest mb-1">Sp0kn</h1>
            <p className="text-text-muted text-sm mb-4">Streamer Twitch Québécois</p>
            <div className="text-text-secondary leading-relaxed space-y-3">
              {/* TODO: Replace with your real bio */}
              <p>
                Bienvenue sur ma page ! Je suis Sp0kn, streamer francophone passionné de jeux vidéo et de création de contenu.
              </p>
              <p>
                Je stream régulièrement sur Twitch et je suis à la tête de L'Auberge des Streamers et de la Fondation des Gardiens Virtuels.
              </p>
              <p>
                {/* TODO: Add more personal info, your streaming history, what you play, etc. */}
                N'hésite pas à me rejoindre sur Discord pour faire partie de la communauté des Aliens !
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {STATS.map(({ label, value }) => (
            <div key={label} className="card text-center">
              <p className="font-display text-3xl font-bold text-accent-orange">{value}</p>
              <p className="text-text-muted text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Socials */}
        <SectionTitle title="Me retrouver" subtitle="Sur tous les réseaux" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SOCIALS.map(({ href, Icon, label, color, hoverBorder }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-hover flex items-center gap-3 ${hoverBorder}`}
            >
              <Icon className={`w-6 h-6 ${color} shrink-0`} />
              <span className="text-text-primary font-medium">{label}</span>
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}
