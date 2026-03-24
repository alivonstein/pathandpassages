import Image from "next/image"

export function Hero() {
  return (
    <section className="relative w-full">
      {/* Full edge-to-edge background image - maintains aspect ratio on mobile */}
      <Image
        src="/images/hero-landscape.jpg"
        alt="Lush green mountains of northern Spain with a person walking through ferns"
        width={1280}
        height={960}
        priority
        className="w-full h-auto"
        sizes="100vw"
      />
    </section>
  )
}
