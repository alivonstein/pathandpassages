import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { GalleryNav } from "@/components/gallery-nav"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/components/language-provider"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-black">
        <Header />
        <Hero />
        <GalleryNav />
        <div className="md:hidden">
          <Contact />
        </div>
        <Footer />
      </main>
    </LanguageProvider>
  )
}
