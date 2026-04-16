import { useState, FormEvent } from 'react'
import { HiX, HiMail, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi'
import { SITE_CONFIG } from '../../config/constants'
import type { SuggestionPayload } from '../../types'

interface Props {
  onClose: () => void
}

export default function SuggestionBox({ onClose }: Props) {
  const [pseudonyme, setPseudonyme] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setStatus('loading')

    const payload: SuggestionPayload = { message: message.trim() }
    if (pseudonyme.trim()) payload.pseudonyme = pseudonyme.trim()

    try {
      const res = await fetch(`${SITE_CONFIG.apiBaseUrl}/api/suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Erreur serveur')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-space-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent-orange/10 border border-accent-orange/30 rounded-lg flex items-center justify-center">
              <HiMail className="w-5 h-5 text-accent-orange" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-text-primary tracking-wide">Boîte à suggestions</h2>
              <p className="text-text-muted text-xs">100% anonyme si tu le souhaites</p>
            </div>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-6">
              <HiCheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-text-primary font-semibold mb-1">Suggestion envoyée !</p>
              <p className="text-text-muted text-sm">Merci pour ton retour ✨</p>
              <button onClick={onClose} className="btn-primary mt-6 mx-auto">Fermer</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Pseudo <span className="text-text-muted font-normal">(optionnel)</span>
                </label>
                <input
                  type="text"
                  value={pseudonyme}
                  onChange={(e) => setPseudonyme(e.target.value)}
                  placeholder="Laisse vide pour rester anonyme"
                  maxLength={32}
                  className="w-full bg-space-700 border border-space-600 rounded-lg px-4 py-2.5 text-sm
                             text-text-primary placeholder:text-text-faint
                             focus:outline-none focus:border-accent-orange/60 focus:ring-1 focus:ring-accent-orange/30
                             transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Ta suggestion <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Idée de stream, retour sur un concept, suggestion de jeu..."
                  required
                  rows={5}
                  maxLength={1000}
                  className="w-full bg-space-700 border border-space-600 rounded-lg px-4 py-2.5 text-sm
                             text-text-primary placeholder:text-text-faint resize-none
                             focus:outline-none focus:border-accent-orange/60 focus:ring-1 focus:ring-accent-orange/30
                             transition-colors"
                />
                <p className="text-text-faint text-xs mt-1 text-right">{message.length}/1000</p>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                  <HiExclamationCircle className="w-4 h-4 shrink-0" />
                  <span>Erreur lors de l'envoi. Réessaie plus tard.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !message.trim()}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma suggestion'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
