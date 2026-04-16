import SectionTitle from '../components/common/SectionTitle'

// TODO: Fill in your concepts here
// Each concept has: title, description, emoji/icon, tags, and optionally a color accent
const CONCEPTS: {
  title: string
  description: string
  emoji: string
  tags: string[]
  isActive?: boolean
}[] = [
  // Example — replace with your real concepts:
  // {
  //   title: 'Watchers League',
  //   description: 'Un classement des viewers les plus assidus du stream...',
  //   emoji: '🏆',
  //   tags: ['Classement', 'Points', 'Viewers'],
  //   isActive: true,
  // },
]

export default function Concepts() {
  return (
    <div className="page-hero min-h-[40vh]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle
          title="Les Concepts"
          subtitle="Streams spéciaux, concours, séries et événements récurrents"
        />

        {CONCEPTS.length === 0 ? (
          <div className="card text-center py-20">
            <p className="text-5xl mb-4">🚧</p>
            <p className="text-text-primary font-semibold text-lg mb-2">En construction</p>
            <p className="text-text-muted max-w-sm mx-auto">
              Les concepts arrivent bientôt ! Rejoins le Discord pour être au courant en avant-première.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONCEPTS.map((concept) => (
              <div key={concept.title} className="card-hover">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{concept.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-lg font-bold text-text-primary tracking-wide">
                        {concept.title}
                      </h3>
                      {concept.isActive && (
                        <span className="text-xs bg-green-400/10 border border-green-400/30 text-green-400 px-2 py-0.5 rounded-full">
                          Actif
                        </span>
                      )}
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed">{concept.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {concept.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-space-700 border border-space-600 text-text-muted px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
