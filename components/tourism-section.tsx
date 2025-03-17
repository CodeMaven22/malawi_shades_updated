"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock } from "lucide-react"
import { RegionFilter } from "@/components/region-filter"
// Add import for image data
import { tourismSiteImages } from "@/app/utils/image-data"
import Link from "next/link"

// This would come from a database in a real application
const allTourismSites = [
  {
    id: 1,
    name: "Lake Malawi National Park",
    location: "Cape Maclear",
    description: "A UNESCO World Heritage site with crystal clear waters and diverse fish species.",
    duration: "Full day",
    price: "$45",
    image: tourismSiteImages[0].image,
    region: "southern",
    district: "mangochi",
  },
  {
    id: 2,
    name: "Liwonde National Park",
    location: "Southern Malawi",
    description: "Home to elephants, hippos, crocodiles and various antelope species.",
    duration: "1-3 days",
    price: "$65",
    image: tourismSiteImages[1].image,
    region: "southern",
    district: "machinga",
  },
  {
    id: 3,
    name: "Mount Mulanje",
    location: "Mulanje",
    description: "The highest mountain in Central Africa with breathtaking hiking trails.",
    duration: "2-5 days",
    price: "$80",
    image: tourismSiteImages[2].image,
    region: "southern",
    district: "mulanje",
  },
  {
    id: 4,
    name: "Zomba Plateau",
    location: "Zomba",
    description: "A magnificent table mountain with panoramic views and forest trails.",
    duration: "1-2 days",
    price: "$40",
    image: tourismSiteImages[3].image,
    region: "southern",
    district: "zomba",
  },
  {
    id: 5,
    name: "Nyika National Park",
    location: "Northern Malawi",
    description: "Malawi's largest national park with rolling hills, wildlife and wildflowers.",
    duration: "2-4 days",
    price: "$70",
    image: tourismSiteImages[4].image,
    region: "northern",
    district: "rumphi",
  },
  {
    id: 6,
    name: "Livingstonia",
    location: "Northern Region",
    description: "Historic mission station with stunning views of Lake Malawi.",
    duration: "1 day",
    price: "$35",
    image: tourismSiteImages[5].image,
    region: "northern",
    district: "rumphi",
  },
  {
    id: 7,
    name: "Chongoni Rock Art",
    location: "Dedza",
    description: "UNESCO World Heritage site featuring ancient rock paintings.",
    duration: "Half day",
    price: "$25",
    image: tourismSiteImages[6].image,
    region: "central",
    district: "dedza",
  },
  {
    id: 8,
    name: "Nkhotakota Wildlife Reserve",
    location: "Central Malawi",
    description: "Malawi's oldest and largest wildlife reserve with diverse ecosystems.",
    duration: "1-3 days",
    price: "$55",
    image: tourismSiteImages[7].image,
    region: "central",
    district: "nkhotakota",
  },
]

export function TourismSection() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)

  const handleFilterChange = (region: string | null, district: string | null) => {
    setSelectedRegion(region)
    setSelectedDistrict(district)
  }

  // Filter tourism sites based on selected region and district
  const filteredTourismSites = allTourismSites.filter((site) => {
    if (selectedRegion && selectedDistrict) {
      return site.region === selectedRegion && site.district === selectedDistrict
    } else if (selectedRegion) {
      return site.region === selectedRegion
    } else if (selectedDistrict) {
      return site.district === selectedDistrict
    }
    return true
  })

  return (
      <section id="tourism" className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div className="max-w-2xl">
            <h2 className="section-title text-3xl font-bold tracking-tight">Tourism Attractions</h2>
            <p className="text-muted-foreground mt-2">
              Explore Malawi's breathtaking natural wonders, wildlife, and cultural heritage.
            </p>
          </div>
          <Button
              variant="outline"
              className="mt-4 md:mt-0 border-malawi-green text-malawi-green hover:bg-malawi-green/10"
          >
            View All Attractions
          </Button>
        </div>

        <RegionFilter onFilterChange={handleFilterChange} />

        {filteredTourismSites.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tourism sites found for the selected filters.</p>
              <Button variant="link" onClick={() => handleFilterChange(null, null)} className="text-malawi-green">
                Clear filters to see all sites
              </Button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTourismSites.map((site) => (
                  <Card key={site.id} className="overflow-hidden card-hover border border-border hover:border-malawi-green">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-full min-h-[200px]">
                        <Image src={site.image || "/placeholder.svg"} alt={site.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <CardHeader>
                          <CardTitle className="text-xl hover:text-malawi-green transition-colors">{site.name}</CardTitle>
                          <CardDescription className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-malawi-red" />
                            {site.location}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <p className="text-sm text-muted-foreground mb-4">{site.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-malawi-green" />
                              <span>{site.duration}</span>
                            </div>
                            <div className="font-medium text-malawi-green">From {site.price}</div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button size="sm" className="w-full bg-malawi-red hover:bg-malawi-red/90 text-white" asChild>
                            <Link href={`/tourism/${site.id}`}>View Details</Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
              ))}
            </div>
        )}
      </section>
  )
}

