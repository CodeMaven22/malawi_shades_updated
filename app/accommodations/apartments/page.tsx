import type { Metadata } from "next"
import { AccommodationSection } from "@/components/accommodation-section"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Apartments | Malawi Shades",
  description: "Fully furnished apartments for short and long-term stays in Malawi.",
}

export default function ApartmentsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Comfortable Apartments"
        description="Fully furnished apartments for short and long-term stays"
      />

      <div className="mt-12">
        <AccommodationSection
          title="Featured Apartments"
          description="Our most popular apartment accommodations"
          type="apartments"
        />
      </div>
    </div>
  )
}

