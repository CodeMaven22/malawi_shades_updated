import { Button } from "@/components/ui/button"
import Link from "next/link"
import { heroImages } from "@/app/utils/image-data"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroImages[0].url}')`,
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              Discover the <span className="text-malawi-gold">Warm Heart</span> of Africa
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 drop-shadow-md">
              Find the perfect place to stay, explore breathtaking attractions, and create unforgettable memories in
              Malawi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-malawi-green hover:bg-malawi-green/90 text-white shadow-lg" asChild>
                <Link href="/accommodations">Browse Accommodations</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/20 shadow-lg"
                asChild
              >
                <Link href="/tourism">Explore Tourism Sites</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b shadow-md py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center feature-card">
              <div className="font-bold text-2xl md:text-3xl text-malawi-green">200+</div>
              <div className="text-sm md:text-base text-muted-foreground">Accommodations</div>
            </div>
            <div className="text-center feature-card">
              <div className="font-bold text-2xl md:text-3xl text-malawi-green">50+</div>
              <div className="text-sm md:text-base text-muted-foreground">Tourism Sites</div>
            </div>
            <div className="text-center feature-card">
              <div className="font-bold text-2xl md:text-3xl text-malawi-green">10k+</div>
              <div className="text-sm md:text-base text-muted-foreground">Happy Visitors</div>
            </div>
            <div className="text-center feature-card">
              <div className="font-bold text-2xl md:text-3xl text-malawi-green">100%</div>
              <div className="text-sm md:text-base text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

