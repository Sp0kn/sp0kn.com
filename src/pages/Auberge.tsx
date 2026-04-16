import { FaTwitch } from 'react-icons/fa'
import SectionTitle from '../components/common/SectionTitle'

// TODO: Fill in your team members and info
// Each member: name, twitchUrl, description, avatarUrl (optional), tags
const TEAM_MEMBERS: {
  name: string
  twitchUrl: string
  description: string
  avatarUrl?: string
  tags: string[]
}[] = [
  // Example:
  // {
  //   name: 'Sp0kn',
  //   twitchUrl: 'https://www.twitch.tv/sp0kn',
  //   description: 'Le fondateur de l\'Auberge.',
  //   tags: ['Fondateur', 'Gaming'],
  // },
]

export default function Auberge() {
  return (
    <div className="page-hero">
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <SectionTitle title="L'Auberge des Streamers" />
          <p className="text-text-secondary leading-relaxed">
            {/* TODO: Add your team description */}
            L'Auberge des Streamers est une équipe Twitch francophone qui rassemble des créateurs de contenu
            passionnés. Un endroit chaleureux où chaque streamer trouve sa place.
          </p>
        </div>

        {/* Values / description block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { emoji: '🏠', title: 'Une maison', description: 'Un espace bienveillant pour tous les streamers, qu\'ils soient débutants ou expérimentés.' },
            { emoji: '🤝', title: 'Entraide', description: 'Les membres se soutiennent mutuellement : hosting, raids, conseils techniques et bien plus.' },
            { emoji: '🌟', title: 'Visibilité', description: 'Grandir ensemble, partager nos audiences et créer des événements communs.' },
          ].map((val) => (
            <div key={val.title} className="card-hover text-center">
              <span className="text-4xl block mb-3">{val.emoji}</span>
              <h3 className="font-display text-lg font-bold text-text-primary tracking-wide mb-2">{val.title}</h3>
              <p className="text-text-muted text-sm">{val.description}</p>
            </div>
          ))}
        </div>

        {/* Team members */}
        <SectionTitle title="Les membres" subtitle="L'équipe de L'Auberge" />

        {TEAM_MEMBERS.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-5xl mb-4">🚧</p>
            <p className="text-text-primary font-semibold text-lg mb-2">Liste en construction</p>
            <p className="text-text-muted">Les membres arrivent bientôt !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {TEAM_MEMBERS.map((member) => (
              <a
                key={member.name}
                href={member.twitchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group text-center"
              >
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-space-600 group-hover:border-accent-orange/40 transition-colors object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-space-700 border-2 border-space-600 group-hover:border-accent-orange/40 transition-colors flex items-center justify-center">
                    <span className="font-display text-2xl text-accent-orange/70">{member.name[0]}</span>
                  </div>
                )}
                <h3 className="font-semibold text-text-primary group-hover:text-accent-orange transition-colors">{member.name}</h3>
                <p className="text-text-muted text-xs mt-1 line-clamp-2">{member.description}</p>
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {member.tags.map((t) => (
                    <span key={t} className="text-xs bg-space-700 border border-space-600 text-text-muted px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-3 text-text-faint text-xs group-hover:text-purple-400 transition-colors">
                  <FaTwitch className="w-3 h-3" />
                  Voir le stream
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
