import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { GalleryNav } from "@/components/gallery-nav"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

// Path and Passages - Main page
export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      <GalleryNav />
      <div className="md:hidden">
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
