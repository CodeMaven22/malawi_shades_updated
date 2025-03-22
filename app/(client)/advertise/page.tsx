import type { Metadata } from "next"
import { AdvertiseSection } from "@/components/advertise-section"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Advertise With Us | Malawi Shades",
  description: "Reach thousands of potential customers looking for accommodations and tourism experiences in Malawi.",
}

export default function AdvertisePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Advertise With Us"
        description="Reach thousands of potential customers looking for accommodations and tourism experiences in Malawi"
      />

      <div className="mt-12">
        <AdvertiseSection />
      </div>
    </div>
  )
}

