"use client"

// Updated: Force cache clear
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const topNavItem = { id: "project-proposal", label: "project proposal" }

const topicNavLinks = [
  { id: "problem-science", label: "the problem   -   the science" },
  { id: "gap-vision", label: "the gap   -   the vision" },
  { id: "philosophy-model", label: "the philosophy   -   the model" },
  { id: "structures-solutions", label: "structures and solutions" },
  { id: "qualification-experience", label: "qualification and experience" },
  { id: "unique-points", label: "unique points and methods" },
  { id: "place-environment", label: "place, environment and logistics" },
  { id: "financials-growth", label: "financials and growth plan" },
  { id: "marketing-benefits", label: "marketing and benefits" },
  { id: "call-to-action", label: "call to action and conclusion" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Failed to send:', error)
    }
    
    setIsSubmitting(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.6
      setIsScrolled(window.scrollY > 50)
      setIsHidden(window.scrollY > heroHeight)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3",
        isScrolled ? "bg-transparent" : "bg-[#3d4f3a]",
        isHidden && "opacity-0 pointer-events-none"
      )}
    >
      <div className="w-full px-6 md:px-10 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-white text-lg font-medium tracking-widest lowercase hover:opacity-80 transition-opacity"
        >
          pathandpassages
        </button>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:opacity-80 transition-opacity flex flex-col justify-center items-center gap-2"
            aria-label="Toggle menu"
          >
            <span 
              className={cn(
                "block w-8 h-0.5 bg-white transition-all duration-300",
                isMenuOpen && "rotate-45 translate-y-[5px]"
              )}
            />
            <span 
              className={cn(
                "block w-8 h-0.5 bg-white transition-all duration-300",
                isMenuOpen && "-rotate-45 -translate-y-[5px]"
              )}
            />
          </button>

          <div
            className={cn(
              "absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#3d4f3a] overflow-hidden transition-all duration-300 w-auto",
              isMenuOpen ? "max-h-[500px] py-4" : "max-h-0"
            )}
          >
            <nav className="flex flex-col items-start gap-3 px-6">
              {/* Project Proposal - top item */}
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  window.dispatchEvent(new CustomEvent("openLightbox", { detail: topNavItem.id }))
                }}
                className="text-white/70 hover:text-white text-lg font-normal tracking-widest transition-colors whitespace-nowrap text-left"
              >
                {topNavItem.label}
              </button>
              
              {/* Topics header */}
              <span className="text-white/50 text-sm font-light tracking-widest mt-2">
                topics
              </span>
              
              {/* Topic links */}
              {topicNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setIsMenuOpen(false)
                    window.dispatchEvent(new CustomEvent("openLightbox", { detail: link.id }))
                  }}
                  className="text-white/70 hover:text-white text-lg font-normal tracking-widest transition-colors whitespace-nowrap text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <button
          onClick={() => setIsContactOpen(!isContactOpen)}
          className="text-white text-lg font-medium tracking-wide hover:opacity-80 transition-opacity"
        >
          get in touch
        </button>
      </div>

      {/* Contact Popup */}
      {isContactOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
          onClick={() => setIsContactOpen(false)}
        >
          <div 
            className="bg-[#3d4f3a] p-6 rounded-sm shadow-2xl max-w-xs mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white text-base font-light tracking-widest mb-4">get in touch</h3>
            <a 
              href="mailto:hello@pathandpassages.com"
              className="block text-white/80 hover:text-white text-sm tracking-wide mb-1 transition-colors"
            >
              hello@pathandpassages.com
            </a>
            <a 
              href="tel:+491781685550"
              className="block text-white/80 hover:text-white text-sm tracking-wide mb-4 transition-colors"
            >
              +49 178 1685550
            </a>
            
            {isSubmitted ? (
              <p className="text-white/80 text-sm mb-4">Thank you. We will be in touch soon.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="bg-transparent border border-white/20 rounded px-3 py-2 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors w-full"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="bg-transparent border border-white/20 rounded px-3 py-2 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors w-full"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  required
                  rows={3}
                  className="bg-transparent border border-white/20 rounded px-3 py-2 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors resize-none w-full"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded transition-colors"
                >
                  {isSubmitting ? "..." : "Send"}
                </button>
              </form>
            )}
            
            <button
              onClick={() => setIsContactOpen(false)}
              className="text-white/50 hover:text-white text-xs tracking-widest transition-colors"
            >
              close
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
