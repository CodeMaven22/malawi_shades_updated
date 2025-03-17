import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { aboutImages } from "@/app/utils/image-data"

export const metadata: Metadata = {
  title: "About Us | Malawi Shades",
  description:
    "Learn about Malawi Shades - your premier platform for finding accommodations and tourism experiences in Malawi.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="About Malawi Shades"
        description="Your premier platform for finding the best accommodations and tourism experiences in Malawi"
      />

      <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Malawi Shades was founded in 2020 with a simple mission: to showcase the beauty of Malawi and connect
            travelers with the best accommodations and experiences the country has to offer.
          </p>
          <p className="text-muted-foreground mb-4">
            What started as a small directory of lodges around Lake Malawi has grown into the country's premier platform
            for tourism and accommodation bookings, helping thousands of visitors discover the warm heart of Africa.
          </p>
          <p className="text-muted-foreground">
            Today, we partner with hundreds of property owners and tourism operators across Malawi to provide a
            comprehensive service for both domestic and international travelers.
          </p>
        </div>
        <div className="relative h-[400px]">
          <img
            src={aboutImages.about || "/placeholder.svg"}
            alt="About Malawi Shades"
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Community Support</h3>
            <p className="text-muted-foreground">
              We believe in supporting local communities and businesses. A portion of our revenue goes directly to
              community development projects across Malawi.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Sustainable Tourism</h3>
            <p className="text-muted-foreground">
              We promote responsible and sustainable tourism practices that preserve Malawi's natural beauty and
              cultural heritage for future generations.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Authentic Experiences</h3>
            <p className="text-muted-foreground">
              We showcase authentic Malawian experiences that connect travelers with the real culture, people, and
              natural wonders of this beautiful country.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={aboutImages.team[i - 1] || "/placeholder.svg"}
                  alt={`Team member ${i}`}
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">Team Member {i}</h3>
              <p className="text-muted-foreground">Position</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

