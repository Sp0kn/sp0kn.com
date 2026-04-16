import { useState } from 'react'
import HeroSection from '../components/home/HeroSection'
import TwitchEmbed from '../components/home/TwitchEmbed'
import Leaderboard from '../components/home/Leaderboard'
import StreamSchedule from '../components/home/StreamSchedule'
import ClipsCarousel from '../components/home/ClipsCarousel'
import DiscordFeed from '../components/home/DiscordFeed'
import { useTwitchStatus, useTwitchClips } from '../hooks/useTwitchData'
import { useLeaderboard } from '../hooks/useLeaderboard'
import { useDiscordFeed } from '../hooks/useDiscordFeed'
import { useCalendar } from '../hooks/useCalendar'

export default function Home() {
  const [clipsSort, setClipsSort] = useState<'featured' | 'recent' | 'popular'>('featured')
  const twitchStatus  = useTwitchStatus()
  const twitchClips   = useTwitchClips(12, clipsSort)
  const leaderboard   = useLeaderboard()
  const [discordFilter, setDiscordFilter] = useState<'important' | 'all'>('important')
  const discordFeed   = useDiscordFeed(10, discordFilter)
  const calendar      = useCalendar(20)

  return (
    <>
      <HeroSection
        status={twitchStatus.data}
        isLoading={twitchStatus.isLoading}
      />

      <div className="gradient-divider max-w-7xl mx-auto px-4 !mt-0" />

      <TwitchEmbed />

      <div className="gradient-divider max-w-7xl mx-auto px-4" />

      <StreamSchedule
        events={calendar.data ?? []}
        isLoading={calendar.isLoading}
        error={calendar.isError}
      />

      <div className="gradient-divider max-w-7xl mx-auto px-4" />

      <Leaderboard
        entries={leaderboard.data ?? []}
        isLoading={leaderboard.isLoading}
        error={leaderboard.isError}
      />

      <div className="gradient-divider max-w-7xl mx-auto px-4" />

      <ClipsCarousel
        clips={twitchClips.data ?? []}
        isLoading={twitchClips.isLoading}
        error={twitchClips.isError}
        sort={clipsSort}
        onSortChange={setClipsSort}
      />

      <div className="gradient-divider max-w-7xl mx-auto px-4" />

      <DiscordFeed
        messages={discordFeed.messages}
        isLoading={discordFeed.isLoading}
        error={discordFeed.error}
        filter={discordFilter}
        onFilterChange={setDiscordFilter}
      />
    </>
  )
}
