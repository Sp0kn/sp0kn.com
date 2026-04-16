import { SITE_CONFIG } from '../../config/constants'
import SectionTitle from '../common/SectionTitle'

export default function TwitchEmbed() {
  const { twitchChannel, twitchParent } = SITE_CONFIG
  const playerSrc = `https://player.twitch.tv/?channel=${twitchChannel}&parent=${twitchParent}&autoplay=false`
  const chatSrc   = `https://www.twitch.tv/embed/${twitchChannel}/chat?parent=${twitchParent}&darkpopout`

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionTitle title="Stream en direct" subtitle="Regardez et chattez directement depuis le site" />

      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Player */}
        <div className="lg:flex-[2] w-full">
          <div className="relative w-full rounded-xl overflow-hidden border border-space-600 shadow-card"
               style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={playerSrc}
              title={`Stream Twitch de ${twitchChannel}`}
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        {/* Chat */}
        <div className="lg:flex-[1] w-full lg:min-w-[280px] lg:max-w-[340px]">
          <div className="w-full h-[400px] lg:h-full min-h-[400px] rounded-xl overflow-hidden border border-space-600 shadow-card">
            <iframe
              src={chatSrc}
              title={`Chat Twitch de ${twitchChannel}`}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
