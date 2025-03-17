"use client"

import { AccommodationSection } from "@/components/accommodation-section"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"

export default function VillasPageClient() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Luxury Villas"
        description="Exclusive private villas with stunning views and premium amenities"
      />

      <div className="mt-12">
        <AccommodationSection
          title="Featured Villas"
          description="Our most popular luxury villa accommodations"
          type="villas"
          showFilter={true}
        />

        <div className="mt-16 bg-muted rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Villa Booking Service</h3>
              <p className="text-muted-foreground mb-6">
                Looking for a specific type of villa or need help finding the perfect match for your needs? Our villa
                specialists can help you find and book the ideal villa for your stay in Malawi.
              </p>
              <Button>Contact Villa Specialist</Button>
            </div>
            <div className="relative h-[300px]">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Luxury villa service"
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

