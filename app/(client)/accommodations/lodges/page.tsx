import type { Metadata } from "next"
import { AccommodationSection } from "@/components/accommodation-section"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Scenic Lodges | Malawi Shades",
  description: "Authentic lodges immersed in Malawi's natural beauty.",
}

export default function LodgesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader title="Scenic Lodges" description="Authentic lodges immersed in Malawi's natural beauty" />

      <div className="mt-12">
        <AccommodationSection
          title="Featured Lodges"
          description="Our most popular lodge accommodations"
          type="lodges"
        />
      </div>
    </div>
  )
}

