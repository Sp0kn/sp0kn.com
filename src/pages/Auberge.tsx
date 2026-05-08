import { FaDiscord, FaExternalLinkAlt, FaTwitch } from 'react-icons/fa'
import SectionTitle from '../components/common/SectionTitle'
import { SOCIAL_LINKS } from '../config/constants'
import members from '../members'

export default function Auberge() {
  return (
    <div className="page-hero">
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <SectionTitle title="L'Auberge des Streamers" />
          <p className="text-text-secondary leading-relaxed">
            L'Auberge des Streamers est une équipe Twitch québécoise qui rassemble des créateurs de contenu
            passionnés. Un espace chaleureux où les streamers peuvent exprimer leur créativité, collaborer
            et grandir ensemble, tout en offrant à la communauté un environnement sain
            et sans jugement.
          </p>
        </div>

        {/* Values / description block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { emoji: '🏠', title: 'Une maison', description: 'Un espace bienveillant pour les streamers et leurs communautés.' },
            { emoji: '🤝', title: 'Entraide', description: 'Les membres se soutiennent mutuellement: raids, conseils techniques et bien plus.' },
            { emoji: '🌟', title: 'Visibilité', description: 'Grandir ensemble, partager nos audiences et créer des événements communs.' },
          ].map((val) => (
            <div key={val.title} className="card-hover text-center">
              <span className="text-4xl block mb-3">{val.emoji}</span>
              <h3 className="font-display text-lg font-bold text-text-primary tracking-wide mb-2">{val.title}</h3>
              <p className="text-text-muted text-sm">{val.description}</p>
            </div>
          ))}
        </div>

        {/* Discord CTA */}
        <div className="mb-10">
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FaDiscord className="w-4 h-4" />
            Rejoindre le Discord
          </a>
        </div>

        {/* Team members */}
        <div className="mb-8">
          <h2 className="section-title mb-2">Les membres</h2>
          <div className="h-px w-20 bg-accent-orange mb-3" />
          <a
            href="https://www.twitch.tv/team/laubergedesstreamers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-purple-400 transition-colors"
          >
            <FaTwitch className="w-3.5 h-3.5" />
            L'Auberge sur Twitch
            <FaExternalLinkAlt className="w-2.5 h-2.5 opacity-60" />
          </a>
        </div>

        {members.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-5xl mb-4">🚧</p>
            <p className="text-text-primary font-semibold text-lg mb-2">Liste en construction</p>
            <p className="text-text-muted">Les membres arrivent bientôt !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {members.map((member) => (
              <a
                key={member.id}
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
                <p className="text-text-muted text-xs mt-1 line-clamp-3">{member.description}</p>
                <div className="flex items-center justify-center gap-1.5 mt-3 text-text-faint text-xs group-hover:text-purple-400 transition-colors">
                  <FaTwitch className="w-3 h-3" />
                  Twitch
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
