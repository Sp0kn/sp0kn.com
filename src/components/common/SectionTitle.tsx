interface SectionTitleProps {
  title: string
  subtitle?: string
  accent?: boolean
}

export default function SectionTitle({ title, subtitle, accent = true }: SectionTitleProps) {
  return (
    <div className="mb-8">
      <h2 className="section-title mb-2">{title}</h2>
      <div className={`h-px w-20 ${accent ? 'bg-accent-orange' : 'bg-space-600'} mb-3`} />
      {subtitle && <p className="text-text-muted text-sm">{subtitle}</p>}
    </div>
  )
}
