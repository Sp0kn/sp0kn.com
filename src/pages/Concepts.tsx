import SectionTitle from '../components/common/SectionTitle'
import ConceptCard from '../components/concepts/ConceptCard'
import concepts from '../concepts'

export default function Concepts() {
  return (
    <div className="page-hero min-h-[40vh]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle
          title="Les Concepts"
          subtitle="Streams spéciaux, séries et événements récurrents"
        />

        {concepts.length === 0 ? (
          <div className="card text-center py-20">
            <p className="text-5xl mb-4">🚧</p>
            <p className="text-text-primary font-semibold text-lg mb-2">En construction</p>
            <p className="text-text-muted max-w-sm mx-auto">
              Les concepts arrivent bientôt ! Rejoins le Discord pour être au courant en avant-première.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {concepts.map((concept) => (
              <ConceptCard key={concept.id} concept={concept} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
