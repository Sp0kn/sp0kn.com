import SectionTitle from '../components/common/SectionTitle'

export default function Fondation() {
  return (
    <div className="page-hero">
      <div className="max-w-4xl mx-auto px-4 py-16">

        <SectionTitle title="La Fondation des Gardiens Virtuels" />

        {/* Main description — TODO: fill in your content */}
        <div className="card mb-10">
          <p className="text-text-secondary leading-relaxed">
            {/* TODO: Add the full description of La Fondation des Gardiens Virtuels */}
            La Fondation des Gardiens Virtuels est une initiative dédiée à rassembler une communauté
            de gardiens du streaming francophone. Leur mission : protéger, animer et faire rayonner
            la culture du live et du jeu vidéo.
          </p>
        </div>

        {/* Pillars — TODO: customize these */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { emoji: '🛡️', title: 'Protection', description: 'Maintenir un espace sain et bienveillant pour toute la communauté.' },
            { emoji: '📡', title: 'Transmission', description: 'Partager les savoirs, tips et expériences entre gardiens.' },
            { emoji: '⚔️', title: 'Action', description: 'Organiser des événements, tournois et opérations spéciales.' },
            { emoji: '🌌', title: 'Exploration', description: 'Découvrir de nouveaux horizons gaming et streaming ensemble.' },
          ].map((pillar) => (
            <div key={pillar.title} className="card-hover flex gap-4">
              <span className="text-3xl shrink-0">{pillar.emoji}</span>
              <div>
                <h3 className="font-display text-base font-bold text-text-primary tracking-wide mb-1">{pillar.title}</h3>
                <p className="text-text-muted text-sm">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ranks / roles — TODO: add your Foundation ranks */}
        <SectionTitle title="Les rangs" subtitle="La hiérarchie des Gardiens" />
        <div className="card text-center py-16">
          <p className="text-5xl mb-4">🚧</p>
          <p className="text-text-primary font-semibold text-lg mb-2">En construction</p>
          <p className="text-text-muted text-sm">Les détails de la Fondation arrivent bientôt.</p>
        </div>
      </div>
    </div>
  )
}
