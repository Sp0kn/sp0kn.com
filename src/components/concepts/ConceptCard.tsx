import { useState } from 'react'
import { HiChevronDown, HiExternalLink } from 'react-icons/hi'
import type { Concept } from '../../concepts/types'

interface Props {
  concept: Concept
}

export default function ConceptCard({ concept }: Props) {
  const [expanded, setExpanded] = useState(false)
  const hasSections = concept.sections && concept.sections.length > 0

  return (
    <div className={`card flex flex-col gap-4 transition-all duration-300 ${hasSections ? 'cursor-default' : ''}`}>
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="shrink-0 w-14 h-14 rounded-xl bg-space-700 border border-space-600 flex items-center justify-center overflow-hidden">
          {concept.imagePath
            ? <img src={concept.imagePath} alt={concept.title} className="w-full h-full object-cover" />
            : <span className="text-3xl">{concept.emoji}</span>
          }
        </div>

        {/* Title + subtitle */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-bold text-text-primary tracking-wide">
            {concept.title}
          </h3>
          <p className="text-text-muted text-sm mt-0.5">{concept.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line">{concept.description}</p>

      {/* Links */}
      {concept.links && concept.links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {concept.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-accent-blue hover:text-accent-blue-light
                         border border-accent-blue/30 hover:border-accent-blue/60 px-3 py-1 rounded-full
                         transition-colors duration-200"
            >
              <HiExternalLink className="w-3 h-3" />
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Expandable rules toggle */}
      {hasSections && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-xs font-semibold text-accent-orange hover:text-accent-orange-light
                       transition-colors duration-200 group"
          >
            <HiChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
            {expanded ? 'Masquer les règles' : 'Voir les règles'}
          </button>

          {/* Sections */}
          {expanded && (
            <div className="mt-4 space-y-5 border-t border-space-600 pt-4">
              {concept.sections!.map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-semibold text-accent-orange mb-2 tracking-wide">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.rules.map((rule, i) => (
                      <li key={i} className="text-sm text-text-muted leading-relaxed">
                        <span className="text-text-faint mr-2">›</span>
                        {rule.text}
                        {rule.sub && (
                          <ul className="mt-1.5 ml-4 space-y-1">
                            {rule.sub.map((s, j) => (
                              <li key={j} className="text-xs text-text-faint flex gap-2">
                                <span className="shrink-0">–</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
