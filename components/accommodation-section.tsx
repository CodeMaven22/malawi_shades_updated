"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MapPin, Wifi, Coffee, Utensils } from "lucide-react"
import Link from "next/link"
import { RegionFilter } from "@/components/region-filter"
// Add import for image data
import { accommodationImages } from "@/app/utils/image-data"

interface AccommodationSectionProps {
  title: string
  description: string
  type: "villas" | "resorts" | "apartments" | "lodges"
  showFilter?: boolean
}

export function AccommodationSection({ title, description, type, showFilter = false }: AccommodationSectionProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)

  // This would come from a database in a real application
  const allAccommodations = [
    {
      id: 1,
      name:
        type === "villas"
          ? "Lakeside Villa"
          : type === "resorts"
            ? "Palm Beach Resort"
            : type === "apartments"
              ? "City View Apartment"
              : "Forest Lodge",
      location: "Lake Malawi, Mangochi",
      price: type === "villas" ? "$250" : type === "resorts" ? "$180" : type === "apartments" ? "$80" : "$120",
      rating: 4.8,
      image: `/placeholder.svg?height=400&width=600`,
      amenities: ["Wi-Fi", "Pool", "Restaurant", "Bar"],
      region: "southern",
      district: "mangochi",
    },
    {
      id: 2,
      name:
        type === "villas"
          ? "Mountain View Villa"
          : type === "resorts"
            ? "Sunset Bay Resort"
            : type === "apartments"
              ? "Luxury Apartment"
              : "Safari Lodge",
      location: "Zomba Plateau",
      price: type === "villas" ? "$220" : type === "resorts" ? "$150" : type === "apartments" ? "$95" : "$140",
      rating: 4.6,
      image: `/placeholder.svg?height=400&width=600`,
      amenities: ["Wi-Fi", "Pool", "Restaurant", "Spa"],
      region: "southern",
      district: "zomba",
    },
    {
      id: 3,
      name:
        type === "villas"
          ? "Beachfront Villa"
          : type === "resorts"
            ? "Lakeview Resort"
            : type === "apartments"
              ? "Modern Apartment"
              : "Riverside Lodge",
      location: "Cape Maclear",
      price: type === "villas" ? "$280" : type === "resorts" ? "$200" : type === "apartments" ? "$75" : "$110",
      rating: 4.9,
      image: `/placeholder.svg?height=400&width=600`,
      amenities: ["Wi-Fi", "Pool", "Restaurant", "Gym"],
      region: "southern",
      district: "mangochi",
    },
    {
      id: 4,
      name:
        type === "villas"
          ? "Nyika Highland Villa"
          : type === "resorts"
            ? "Nyika Plateau Resort"
            : type === "apartments"
              ? "Mzuzu Executive Apartment"
              : "Nyika Safari Lodge",
      location: "Nyika Plateau",
      price: type === "villas" ? "$240" : type === "resorts" ? "$170" : type === "apartments" ? "$85" : "$130",
      rating: 4.7,
      image: `/placeholder.svg?height=400&width=600`,
      amenities: ["Wi-Fi", "Fireplace", "Restaurant", "Safari Tours"],
      region: "northern",
      district: "rumphi",
    },
    {
      id: 5,
      name:
        type === "villas"
          ? "Lilongwe Luxury Villa"
          : type === "resorts"
            ? "Capital City Resort"
            : type === "apartments"
              ? "Business District Apartment"
              : "Lilongwe Nature Lodge",
      location: "Lilongwe",
      price: type === "villas" ? "$260" : type === "resorts" ? "$190" : type === "apartments" ? "$90" : "$125",
      rating: 4.5,
      image: `/placeholder.svg?height=400&width=600`,
      amenities: ["Wi-Fi", "Pool", "Business Center", "Restaurant"],
      region: "central",
      district: "lilongwe",
    },
    {
      id: 6,
      name:
        type === "villas"
          ? "Kasungu Safari Villa"
          : type === "resorts"
            ? "Kasungu Wildlife Resort"
            : type === "apartments"
              ? "Kasungu Town Apartment"
              : "Kasungu Wildlife Lodge",
      location: "Kasungu",
      price: type === "villas" ? "$230" : type === "resorts" ? "$160" : type === "apartments" ? "$70" : "$115",
      rating: 4.4,
      image: `/placeholder.svg?height=400&width=600`,
      amenities: ["Wi-Fi", "Safari Tours", "Restaurant", "Viewing Deck"],
      region: "central",
      district: "kasungu",
    },
  ]

  const handleFilterChange = (region: string | null, district: string | null) => {
    setSelectedRegion(region)
    setSelectedDistrict(district)
  }

  // Filter accommodations based on selected region and district
  const filteredAccommodations = allAccommodations.filter((accommodation) => {
    if (selectedRegion && selectedDistrict) {
      return accommodation.region === selectedRegion && accommodation.district === selectedDistrict
    } else if (selectedRegion) {
      return accommodation.region === selectedRegion
    } else if (selectedDistrict) {
      return accommodation.district === selectedDistrict
    }
    return true
  })

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Wi-Fi":
        return <Wifi className="h-4 w-4" />
      case "Restaurant":
        return <Utensils className="h-4 w-4" />
      case "Coffee":
        return <Coffee className="h-4 w-4" />
      default:
        return null
    }
  }

  // Find the getAccommodationImage function (add it if it doesn't exist) before the return statementxist) before the return statement
  const getAccommodationImage = (id: number) => {
    const accommodationType = accommodationImages[type]
    const accommodation = accommodationType.find((acc) => acc.id === id)
    return accommodation?.thumbnail || `/placeholder.svg?height=400&width=600`
  }

  return (
    <section id={type} className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div className="max-w-2xl">
          <h2 className="section-title text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
        <Button
          variant="outline"
          className="mt-4 md:mt-0 border-malawi-green text-malawi-green hover:bg-malawi-green/10"
        >
          View All {title}
        </Button>
      </div>

      {showFilter && <RegionFilter onFilterChange={handleFilterChange} />}

      {filteredAccommodations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No accommodations found for the selected filters.</p>
          <Button variant="link" onClick={() => handleFilterChange(null, null)} className="text-malawi-green">
            Clear filters to see all accommodations
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccommodations.map((accommodation) => (
            <Card
              key={accommodation.id}
              className="overflow-hidden card-hover border border-border hover:border-malawi-green"
            >
              <div className="aspect-video relative">
                <Image
                  src={getAccommodationImage(accommodation.id) || "/placeholder.svg"}
                  alt={accommodation.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl hover:text-malawi-green transition-colors">
                    {accommodation.name}
                  </CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-malawi-gold text-malawi-gold mr-1" />
                    <span className="text-sm font-medium">{accommodation.rating}</span>
                  </div>
                </div>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-malawi-red" />
                  {accommodation.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {accommodation.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center text-xs bg-malawi-green/10 text-malawi-green px-2 py-1 rounded"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-malawi-green">{accommodation.price}</span>
                    <span className="text-muted-foreground text-sm"> / night</span>
                  </div>
                  <Button size="sm" className="bg-malawi-red hover:bg-malawi-red/90 text-white" asChild>
                    <Link href={`/accommodations/${type}/${accommodation.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

