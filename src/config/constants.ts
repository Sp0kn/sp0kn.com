// ─── Site configuration ───────────────────────────────────────────────────────
export const SITE_CONFIG = {
  name: 'Sp0kn',
  tagline: 'Streamer Twitch Québécois',
  twitchChannel: 'Sp0kn',
  twitchParent: (import.meta.env.VITE_TWITCH_PARENT as string) || 'sp0kn.com',
  calendarId: '82f3a1f430420f1ecc5fdeeadea4130cc3bf70028a04ee0be6f1538b5f0a0e3a@group.calendar.google.com',
  discordChannelId: '1251909861789270069',
  apiBaseUrl: (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000',
  googleApiKey: (import.meta.env.VITE_GOOGLE_API_KEY as string) || '',
} as const

// ─── Watcher's League ────────────────────────────────────────────────────────
export const LEADERBOARD_GIST_URL =
  'https://gist.githubusercontent.com/Sp0kn/6f9752e3427d965ef8d4114ec614b7ff/raw/leaderboard.json'

export const WATCHER_RANKS = [
  { maxRank: 1,  label: 'Keeper of The Cosmos' },
  { maxRank: 3,  label: 'Cosmic Watcher' },
  { maxRank: 6,  label: 'Starforged' },
  { maxRank: 10, label: 'Diamond' },
  { maxRank: 14, label: 'Platinum' },
  { maxRank: 19, label: 'Gold' },
  { maxRank: 24, label: 'Silver' },
  { maxRank: 30, label: 'Bronze' },
] as const

// ─── Social links ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  twitch:    'https://www.twitch.tv/sp0kn',
  instagram: 'https://www.instagram.com/sp0kn_/',
  tiktok:    'https://www.tiktok.com/@sp0kn',
  youtube:   'https://www.youtube.com/@sp0kn/shorts',
  patreon:   'https://www.patreon.com/Sp0kn',
  discord:   'https://discord.gg/aubergedesstreamers',
} as const

// ─── Tips platforms ───────────────────────────────────────────────────────────
// Add your Ko-fi and Tipeee URLs when ready
export const TIPS_PLATFORMS = [
  {
    name: 'Patreon',
    description: 'Abonnement mensuel avec avantages exclusifs',
    url: 'https://www.patreon.com/Sp0kn',
    color: '#FF424D',
    iconName: 'FaPatreon',
  },
  {
    name: 'Ko-fi',
    description: 'Donation unique, aucune inscription requise',
    url: '', // TODO: add your Ko-fi URL
    color: '#FF5E5B',
    iconName: 'SiKofi',
  },
  {
    name: 'Tipeee',
    description: 'Pourboire via la plateforme francophone',
    url: '', // TODO: add your Tipeee URL
    color: '#A855F7',
    iconName: 'tipeee',
  },
] as const

// ─── Announcement banner ──────────────────────────────────────────────────────
// Set enabled to true and add a message to show the banner
export const ANNOUNCEMENT_BANNER = {
  enabled: false,
  message: '',
  linkText: '',
  linkUrl: '',
} as const

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { path: '/',          label: 'Accueil' },
  { path: '/vods',      label: 'VODs' },
  { path: '/concepts',  label: 'Concepts' },
  { path: '/auberge',   label: 'Auberge des streamers' },
  { path: '/fondation', label: 'Gardiens Virtuels' },
  { path: '/a-propos',  label: 'À Propos' },
] as const
