/**
 * Path and Passages - Retreat Center Proposal
 * A single-page immersive experience for the retreat center proposal
 * Version: 2.0 - Cache clear rebuild
 */

import dynamic from "next/dynamic"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

// Dynamic imports with SSR disabled to avoid router initialization issues
const Header = dynamic(() => import("@/components/header").then(mod => ({ default: mod.Header })), { ssr: false })
const Hero = dynamic(() => import("@/components/hero").then(mod => ({ default: mod.Hero })), { ssr: false })
const GalleryNav = dynamic(() => import("@/components/gallery-nav").then(mod => ({ default: mod.GalleryNav })), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <GalleryNav />
      {/* Contact only visible on mobile - image buttons open lightbox on all devices */}
      <div className="md:hidden">
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
