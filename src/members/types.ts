export interface Member {
  id: string
  /** Display name shown on the card */
  name: string
  /** Full Twitch channel URL */
  twitchUrl: string
  /** Short description shown on the card */
  description: string
  /** Avatar image URL — tip: grab it from their Twitch profile page */
  avatarUrl?: string
}
