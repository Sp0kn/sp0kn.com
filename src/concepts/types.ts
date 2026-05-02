export interface ConceptRule {
  text: string
  sub?: string[]
}

export interface ConceptSection {
  title: string
  rules: ConceptRule[]
}

export interface ConceptLink {
  label: string
  url: string
}

export interface Concept {
  id: string
  title: string
  subtitle: string
  description: string
  /** Standard emoji used as icon when no imagePath is provided */
  emoji: string
  /** Optional URL or path to an image (e.g. '/concepts/nuzlocke.png' or an external URL) */
  imagePath?: string
  /** Expandable rule sections (e.g. custom game rules) */
  sections?: ConceptSection[]
  /** External links shown as buttons on the card */
  links?: ConceptLink[]
}
