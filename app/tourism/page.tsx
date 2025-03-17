"use client"
import { PageHeader } from "@/components/page-header"
import { TourismSection } from "@/components/tourism-section"

export default function TourismPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Tourism Sites"
        description="Explore Malawi's breathtaking natural wonders, wildlife, and cultural heritage"
      />

      <div className="mt-12">
        <TourismSection />
      </div>
    </div>
  )
}

