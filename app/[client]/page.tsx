import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeroSection } from "@/components/hero-section"
import { AccommodationSection } from "@/components/accommodation-section"
import { TourismSection } from "@/components/tourism-section"
import { AdvertiseSection } from "@/components/advertise-section"
import { ExperiencesSection } from "@/components/experiences-section"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <HeroSection />

                <div className="container mx-auto px-4 py-12 md:py-24">
                    <Tabs defaultValue="accommodations" className="w-full">
                        <div className="flex justify-center mb-8">
                            <TabsList className="grid w-full max-w-3xl grid-cols-2 md:grid-cols-4">
                                <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
                                <TabsTrigger value="tourism">Tourism Sites</TabsTrigger>
                                <TabsTrigger value="experiences">Experiences</TabsTrigger>
                                <TabsTrigger value="advertise">Advertise</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="accommodations" className="space-y-16">
                            <AccommodationSection
                                title="Luxury Villas"
                                description="Exclusive private villas with stunning views and premium amenities"
                                type="villas"
                            />
                            <AccommodationSection
                                title="Premium Resorts"
                                description="All-inclusive resorts offering the ultimate relaxation experience"
                                type="resorts"
                            />
                            <AccommodationSection
                                title="Comfortable Apartments"
                                description="Fully furnished apartments for short and long-term stays"
                                type="apartments"
                            />
                            <AccommodationSection
                                title="Scenic Lodges"
                                description="Authentic lodges immersed in Malawi's natural beauty"
                                type="lodges"
                            />
                        </TabsContent>

                        <TabsContent value="tourism">
                            <TourismSection />
                        </TabsContent>

                        <TabsContent value="experiences">
                            <ExperiencesSection />
                        </TabsContent>

                        <TabsContent value="advertise">
                            <AdvertiseSection />
                        </TabsContent>
                    </Tabs>
                </div>

                <Newsletter />
            </main>
        </div>
    )
}

