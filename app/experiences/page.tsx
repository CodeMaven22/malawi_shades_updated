import type { Metadata } from "next"
import { ExperiencesSection } from "@/components/experiences-section"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Local Experiences | Malawi Shades",
  description: "Immerse yourself in authentic Malawian experiences and create lasting memories.",
}

export default function ExperiencesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Local Experiences"
        description="Immerse yourself in authentic Malawian experiences and create lasting memories"
      />

      <div className="mt-12">
        <ExperiencesSection />
      </div>
    </div>
  )
}

