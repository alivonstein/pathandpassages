"use client"

import Image from "next/image"

export function Hero() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("openLightbox", { detail: "project-proposal" }))
  }

  return (
    <section className="relative w-full">
      {/* Full edge-to-edge background image - maintains aspect ratio on mobile */}
      <button 
        onClick={handleClick}
        className="relative w-full cursor-pointer group"
      >
        <Image
          src="/images/hero-landscape.jpg"
          alt="Lush green mountains of northern Spain with a person walking through ferns"
          width={1280}
          height={960}
          priority
          className="w-full h-auto"
          sizes="100vw"
        />
        {/* Gradient overlay for text readability on mobile */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none md:hidden" />
        {/* Text on bottom left, aligned with mobile image column (px-1 = 4px padding) */}
        <span className="absolute bottom-2 left-1 text-white text-xs font-light tracking-wide md:hidden">
          the project proposal
        </span>
      </button>
    </section>
  )
}
