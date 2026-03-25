/**
 * Path and Passages - Retreat Center Proposal
 * A single-page immersive experience for the retreat center proposal
 * Edge-to-edge layout with seamless hero-to-gallery transition
 */

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { GalleryNav } from "@/components/gallery-nav"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
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
