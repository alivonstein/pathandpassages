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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-1",
        isScrolled ? "bg-transparent" : "bg-[#3d4f3a]",
        isHidden && "opacity-0 pointer-events-none"
      )}
    >
      <div className="w-full px-6 md:px-10 flex items-center justify-between">
        <a
          href="#"
          className="text-white text-lg font-medium tracking-widest lowercase hover:opacity-80 transition-opacity"
        >
          pathandpassages
        </a>

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

        <a
          href="#contact"
          className="text-white text-lg font-medium tracking-wide hover:opacity-80 transition-opacity"
        >
          get in touch
        </a>
      </div>
    </header>
  )
}
