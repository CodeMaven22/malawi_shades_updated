import type { Metadata } from "next"
import { AccommodationSection } from "@/components/accommodation-section"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Premium Resorts | Malawi Shades",
  description: "All-inclusive resorts offering the ultimate relaxation experience in Malawi.",
}

export default function ResortsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Premium Resorts"
        description="All-inclusive resorts offering the ultimate relaxation experience"
      />

      <div className="mt-12">
        <AccommodationSection
          title="Featured Resorts"
          description="Our most popular resort accommodations"
          type="resorts"
        />
      </div>
    </div>
  )
}

