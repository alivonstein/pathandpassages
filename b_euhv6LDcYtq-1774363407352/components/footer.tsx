"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { uiStrings } from "@/lib/ui-translations"

export function Footer() {
  const { lang } = useLanguage()
  const t = uiStrings[lang]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!mounted) return
    setIsSubmitting(true)
    setHasError(false)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      lang,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        setIsSubmitted(true)
      } else {
        setHasError(true)
      }
    } catch (error) {
      console.error('Failed to send:', error)
      setHasError(true)
    }
    
    setIsSubmitting(false)
  }

  return (
    <footer className="hidden md:block">
      {/* Green bar - top of footer */}
      <div className="bg-[#3d4f3a] py-2 w-full"></div>

      {/* Contact form bar */}
      <div id="footer-contact" className="bg-black py-4 px-6 md:px-10 scroll-mt-20">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <h2 className="text-lg text-white font-medium tracking-widest lowercase">
              {t.getInTouch}
            </h2>
            <a
              href="mailto:hello@pathandpassages.com"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              hello@pathandpassages.com
            </a>
            <a
              href="tel:+491781685550"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              +49 178 1685550
            </a>
          </div>

          {isSubmitted ? (
            <p className="text-white text-sm">{t.thankYouShort}</p>
          ) : (
            <div className="flex flex-col gap-2">
            {hasError && (
              <p className="text-red-300 text-xs">{t.sendError}</p>
            )}
            <form onSubmit={handleSubmit} className="flex items-start gap-3">
              <input
                type="text"
                name="name"
                placeholder={t.name}
                required
                className="bg-transparent border border-white/20 rounded px-3 py-2 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors w-32"
              />
              <input
                type="email"
                name="email"
                placeholder={t.email}
                required
                className="bg-transparent border border-white/20 rounded px-3 py-2 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors w-40"
              />
              <textarea
                name="message"
                placeholder={t.message}
                required
                rows={1}
                className="bg-transparent border border-white/20 rounded px-3 py-2 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-all resize-none hover:rows-3 focus:h-20"
                style={{ width: '283px' }}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#3d4f3a] hover:bg-[#3d4f3a]/90 text-white text-sm px-6 py-2"
              >
                {isSubmitting ? "..." : t.send}
              </Button>
            </form>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar with branding */}
      <div className="bg-[#3d4f3a] py-2 w-full px-6 md:px-10 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-white text-lg font-medium tracking-widest lowercase hover:opacity-80 transition-opacity"
        >
          pathandpassages
        </button>
        <a 
          href="https://www.google.com/maps/place/Asturias,+Spain"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-lg font-medium tracking-widest lowercase hover:opacity-80 transition-opacity"
        >
          {t.location}
        </a>
      </div>
    </footer>
  )
}
