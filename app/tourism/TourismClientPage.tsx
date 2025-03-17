"use client"

import { TourismSection } from "@/components/tourism-section"
import { PageHeader } from "@/components/page-header"

export default function TourismClientPage() {
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

