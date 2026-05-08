import { FaExternalLinkAlt } from 'react-icons/fa'
import SectionTitle from '../components/common/SectionTitle'

export default function Fondation() {
  return (
    <div className="page-hero">
      <div className="max-w-4xl mx-auto px-4 py-16">

        <SectionTitle title="Fondation des Gardiens Virtuels" />

        {/* Main description */}
        <div className="card mb-10">
          <p className="text-text-secondary leading-relaxed">
            Depuis 2018, la Fondation des Gardiens virtuels (FGV) oeuvre à transformer les plateformes
            numériques, telles que Twitch et Discord, en espaces de soutien et d'intervention
            psychosociale préventive. À travers des projets novateurs, la FGV a contribué à
            répondre concrètement aux enjeux croissants de détresse psychologique et d'isolement social,
            en proposant des solutions ancrées dans les réalités numériques de notre époque.
          </p>
        </div>

        {/* Mission card */}
        <div className="card-hover flex gap-4 mb-10">
          <span className="text-3xl shrink-0">🛡️</span>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary tracking-wide mb-1">Mission</h3>
            <p className="text-text-muted text-sm">
              Être une balise sur Internet pour les personnes en détresse et promouvoir l'utilisation
              responsable du numérique.
            </p>
          </div>
        </div>
		
		{/* Presence */}
        <div className="card-hover flex gap-4 mb-10">
          <span className="text-3xl shrink-0">🛟</span>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary tracking-wide mb-1">Présence</h3>
            <p className="text-text-muted text-sm">
              Un intervenant de la FGV est présent sur ma chaîne, dans le chat, entre 7pm et 10pm à chaque stream.
            </p>
          </div>
        </div>

        {/* Website link */}
        <a
          href="https://gardiensvirtuels.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Visiter le site web
          <FaExternalLinkAlt className="w-3.5 h-3.5 opacity-80" />
        </a>

      </div>
    </div>
  )
}
