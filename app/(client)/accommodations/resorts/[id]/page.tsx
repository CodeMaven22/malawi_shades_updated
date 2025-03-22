import { notFound } from "next/navigation"
import { ImageGallery } from "@/components/image-gallery"
import { Button } from "@/components/ui/button"
import { MapPin, Wifi, Coffee, Utensils, PocketIcon as Pool, Dumbbell, SpadeIcon as Spa } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Add import for image data
import { accommodationImages } from "@/app/utils/image-data"

// Types for our accommodation data
interface Accommodation {
  id: number
  name: string
  location: string
  price: string
  rating: number
  description: string
  amenities: string[]
  rooms: number
  features: string[]
  images: {
    url: string
    alt: string
  }[]
}

// Update the getResortById function to use real images
// Find the resorts array in the getResortById function and update the images property:

const getResortById = (id: string): Accommodation | undefined => {
  const resorts: Accommodation[] = [
    {
      id: 1,
      name: "Palm Beach Resort",
      location: "Lake Malawi, Mangochi",
      price: "$180",
      rating: 4.7,
      description:
        "Indulge in the ultimate relaxation experience at Palm Beach Resort. Located on the pristine shores of Lake Malawi, this all-inclusive resort offers luxurious accommodations, world-class dining, and a wide range of water activities. Unwind at our spa, lounge by the infinity pool overlooking the lake, or enjoy water sports in the crystal-clear waters.",
      amenities: [
        "All-Inclusive",
        "Wi-Fi",
        "Multiple Pools",
        "Spa",
        "Fitness Center",
        "Restaurant",
        "Bar",
        "Water Sports",
      ],
      rooms: 45,
      features: ["Beachfront", "Airport Shuttle", "All-Inclusive Options", "Kids Club", "Evening Entertainment"],
      images: accommodationImages.resorts[0].images,
    },
    {
      id: 2,
      name: "Sunset Bay Resort",
      location: "Zomba Plateau",
      price: "$150",
      rating: 4.6,
      description:
        "Perched on a hilltop with panoramic views of Lake Malawi, Sunset Bay Resort offers a tranquil escape with breathtaking sunset views. The resort features spacious rooms with private balconies, fine dining restaurants serving international and local cuisine, and a world-class spa offering rejuvenating treatments inspired by local traditions.",
      amenities: ["Wi-Fi", "Infinity Pool", "Spa", "Restaurant", "Bar", "Room Service", "Concierge", "Guided Tours"],
      rooms: 35,
      features: ["Lake View", "Nature Trails", "Cultural Shows", "Safari Tours", "Conference Facilities"],
      images: accommodationImages.resorts[1].images,
    },
    {
      id: 3,
      name: "Lakeview Resort",
      location: "Cape Maclear",
      price: "$200",
      rating: 4.9,
      description:
        "Discover paradise at Lakeview Resort, nestled in the heart of Cape Maclear. This exclusive resort combines luxury with adventure, offering elegant accommodations in harmony with nature. The resort features private beaches, water activities, and expertly guided excursions to nearby islands and national parks. Immerse yourself in the beauty of Lake Malawi while enjoying world-class hospitality.",
      amenities: [
        "Wi-Fi",
        "Private Beach",
        "Multiple Restaurants",
        "Water Sports Center",
        "Dive School",
        "Spa",
        "Infinity Pool",
        "Bar",
      ],
      rooms: 30,
      features: ["Island Tours", "Snorkeling Trips", "Sunset Cruises", "Cultural Tours", "Fishing Expeditions"],
      images: accommodationImages.resorts[2].images,
    },
  ]

  return resorts.find((resort) => resort.id === Number.parseInt(id))
}

export default function ResortDetailPage({ params }: { params: { id: string } }) {
  const resort = getResortById(params.id)

  if (!resort) {
    notFound()
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Wi-Fi":
        return <Wifi className="h-4 w-4" />
      case "Multiple Pools":
      case "Infinity Pool":
      case "Pool":
        return <Pool className="h-4 w-4" />
      case "Restaurant":
      case "Multiple Restaurants":
        return <Utensils className="h-4 w-4" />
      case "Coffee":
        return <Coffee className="h-4 w-4" />
      case "Fitness Center":
        return <Dumbbell className="h-4 w-4" />
      case "Spa":
        return <Spa className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{resort.name}</h1>
          <div className="flex items-center text-muted-foreground mb-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{resort.location}</span>
          </div>

          <ImageGallery images={resort.images} />

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">About This Resort</h2>
            <p className="text-muted-foreground mb-6">{resort.description}</p>

            <h3 className="text-xl font-semibold mb-3">Resort Features</h3>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {resort.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {resort.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center bg-muted px-3 py-2 rounded">
                  {getAmenityIcon(amenity)}
                  <span className="ml-2">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-24 border rounded-lg p-6 shadow-sm">
            <div className="mb-4">
              <span className="text-2xl font-bold">{resort.price}</span>
              <span className="text-muted-foreground"> / night</span>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check-in</label>
                  <div className="border rounded px-3 py-2">Select date</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check-out</label>
                  <div className="border rounded px-3 py-2">Select date</div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rooms</label>
                <div className="border rounded px-3 py-2">Select room type</div>
              </div>
            </div>

            <Button className="w-full mb-3">Book Now</Button>
            <Button variant="outline" className="w-full">
              View All Packages
            </Button>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Special discounts for advance bookings!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

