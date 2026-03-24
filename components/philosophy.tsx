"use client"

import { useEffect, useRef, useState } from "react"

const principles = [
  {
    title: "From Goal to Flow",
    description:
      "Release the pressure of achievement and discover the natural rhythm of being. Here, progress is measured not in milestones, but in moments of genuine presence.",
  },
  {
    title: "Deep and Bright",
    description:
      "Embrace the full spectrum of experience. In the depths of introspection and the heights of joy, we find the complete picture of who we are becoming.",
  },
  {
    title: "Let Go and Be",
    description:
      "Surrender is not giving up—it is opening up. In releasing what no longer serves us, we create space for what truly matters to emerge.",
  },
]

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
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
  }, [])

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-light tracking-wide mb-6">
            Our Philosophy
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            At Path and Passages, we believe transformation happens not through
            force, but through gentle invitation. Our retreat is a space where
            the mountains teach patience and the valleys whisper wisdom.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              className={`text-center p-8 rounded-lg bg-card border border-border transition-all duration-1000 hover:shadow-lg hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <h3 className="text-2xl text-foreground font-medium mb-4 italic">
                {principle.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
