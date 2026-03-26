"use client"

import Image from "next/image"

export function Hero() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("openLightbox", { detail: "project-proposal" }))
  }

  return (
    <section className="relative w-full bg-black mb-1 md:mb-2">
      {/* Full edge-to-edge background image - maintains aspect ratio on mobile */}
      <button 
        onClick={handleClick}
        className="relative w-full cursor-pointer group block m-0 p-0"
      >
        <Image
          src="/images/hero-landscape.jpg"
          alt="Lush green mountains of northern Spain with a person walking through ferns"
          width={1280}
          height={960}
          priority
          className="block w-full h-auto"
          sizes="100vw"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Mobile text - always visible, aligned left to match gallery title text position */}
        <span className="absolute bottom-2 left-2 text-white text-xs font-light tracking-wide md:hidden">
          the project proposal
        </span>
        {/* Desktop text - visible on hover, centered */}
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg font-normal tracking-widest hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          the project proposal
        </span>
      </button>
    </section>
  )
}
