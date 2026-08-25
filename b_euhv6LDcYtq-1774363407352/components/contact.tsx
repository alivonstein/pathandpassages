"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { uiStrings } from "@/lib/ui-translations"

export function Contact() {
  const { lang } = useLanguage()
  const t = uiStrings[lang]
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [mounted])

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
    <section
      id="contact"
      ref={sectionRef}
      className="py-6 md:py-16 bg-black"
    >
      <div className="container mx-auto px-4 md:px-10 max-w-4xl">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-md">
            <h2 className="text-sm md:text-lg text-white/70 font-light tracking-wide mb-1">
              {t.getInTouch}
            </h2>
            <a
              href="mailto:hello@pathandpassages.com"
              className="block text-white/70 text-sm hover:text-white transition-colors"
            >
              hello@pathandpassages.com
            </a>
            <a
              href="tel:+491781685550"
              className="block text-white/70 text-sm hover:text-white transition-colors mb-6"
            >
              +49 178 1685550
            </a>

            {isSubmitted ? (
              <div className="text-center py-12">
                <h3 className="text-2xl text-white font-medium mb-3">
                  {t.thankYouTitle}
                </h3>
                <p className="text-white/70">
                  {t.thankYouBody}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-white/70 mb-2"
                  >
                    {t.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-white/70 mb-2"
                  >
                    {t.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-white/70 mb-2"
                  >
                    {t.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors resize-none"
                  />
                </div>

                {hasError && (
                  <p className="text-red-300 text-sm">{t.sendError}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3d4f3a] hover:bg-[#3d4f3a]/90 text-white"
                >
                  {isSubmitting ? t.sending : t.sendMessage}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
