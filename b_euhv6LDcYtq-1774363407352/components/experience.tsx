"use client"

import { useEffect, useRef, useState } from "react"
import { Mountain, Leaf, Sun, Wind } from "lucide-react"

const experiences = [
  {
    icon: Mountain,
    title: "Mountain Immersion",
    description:
      "Guided walks through ancient trails, where every step brings you closer to your inner landscape.",
  },
  {
    icon: Leaf,
    title: "Nature Connection",
    description:
      "Forest bathing, wild foraging, and contemplative practices rooted in the wisdom of the land.",
  },
  {
    icon: Sun,
    title: "Dawn Practices",
    description:
      "Greet each day with meditation, breathwork, and movement as the sun rises over the Cantabrian peaks.",
  },
  {
    icon: Wind,
    title: "Stillness Sessions",
    description:
      "Dedicated time for silence, reflection, and the art of simply being in the present moment.",
  },
]

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#2d3a2e] text-white"
    >
      <div className="container mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6">
            The Experience
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Every element of your stay has been thoughtfully designed to support
            your journey inward, while the magnificent landscape holds space for
            your transformation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.title}
              className={`group text-center p-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-1000 hover:bg-white/10 hover:border-white/20 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6 group-hover:bg-white/20 transition-colors">
                <exp.icon className="w-8 h-8 text-white/80" />
              </div>
              <h3 className="text-xl font-medium mb-3 italic">
                {exp.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <blockquote className="text-2xl md:text-3xl italic font-light text-white/90 max-w-3xl mx-auto">
            "The mountains are calling, and I must go—not to conquer them, but
            to be humbled by their timeless presence."
          </blockquote>
        </div>
      </div>
    </section>
  )
}
