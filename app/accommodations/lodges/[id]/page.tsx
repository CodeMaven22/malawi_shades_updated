import { notFound } from "next/navigation"
import { ImageGallery } from "@/components/image-gallery"
import { Button } from "@/components/ui/button"
import { MapPin, Wifi, Coffee, Utensils, TreePine, Tent } from "lucide-react"
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
  activities: string[]
  images: {
    url: string
    alt: string
  }[]
}

// This would normally come from a database
// Update the getLodgeById function to use real images
// Find the lodges array in the getLodgeById function and update the images property:

const getLodgeById = (id: string): Accommodation | undefined => {
  const lodges: Accommodation[] = [
    {
      id: 1,
      name: "Forest Lodge",
      location: "Nyika National Park",
      price: "$120",
      rating: 4.6,
      description:
        "Tucked away in the breathtaking Nyika National Park, Forest Lodge offers an authentic wilderness experience with the comfort of modern amenities. The lodge features rustic but elegant accommodations with stunning views of the surrounding plateaus and forests. Immerse yourself in nature while enjoying guided wildlife safaris, bird watching, and stargazing from your private cabin.",
      amenities: [
        "Wi-Fi in Common Areas",
        "Restaurant",
        "Bar",
        "Guided Tours",
        "Wildlife Viewing",
        "Campfire",
        "Library",
        "Gift Shop",
      ],
      rooms: 12,
      activities: ["Game Drives", "Bird Watching", "Hiking Trails", "Mountain Biking", "Cultural Visits", "Stargazing"],
      images: accommodationImages.lodges[0].images,
    },
    {
      id: 2,
      name: "Safari Lodge",
      location: "Liwonde National Park",
      price: "$140",
      rating: 4.8,
      description:
        "Experience the magic of African wildlife at Safari Lodge, located on the banks of the Shire River in Liwonde National Park. The lodge offers comfortable tented accommodations that blend with the natural surroundings while providing all essential comforts. Watch elephants and hippos from your private deck, enjoy boat safaris along the river, and fall asleep to the sounds of nature.",
      amenities: [
        "Solar Power",
        "Restaurant",
        "Bar",
        "Swimming Pool",
        "Boat Safaris",
        "Game Drives",
        "Birdwatching",
        "River Views",
      ],
      rooms: 8,
      activities: ["River Safaris", "Game Drives", "Walking Safaris", "Fishing", "Bird Watching", "Sunset Cruises"],
      images: accommodationImages.lodges[1].images,
    },
    {
      id: 3,
      name: "Riverside Lodge",
      location: "Majete Wildlife Reserve",
      price: "$110",
      rating: 4.5,
      description:
        "Riverside Lodge offers a perfect balance of comfort and adventure in the heart of Majete Wildlife Reserve. Set along the banks of the Mkulumadzi River, this eco-friendly lodge provides authentic safari accommodations with modern comforts. The lodge is designed to blend with its surroundings, offering guests an immersive wildlife experience while minimizing environmental impact.",
      amenities: [
        "Eco-Friendly",
        "Restaurant",
        "Bar",
        "Viewing Deck",
        "Safari Activities",
        "Campfire",
        "Gift Shop",
        "Library",
      ],
      rooms: 10,
      activities: [
        "Game Drives",
        "Bush Walks",
        "Bird Watching",
        "Community Visits",
        "Star Gazing",
        "Conservation Tours",
      ],
      images: accommodationImages.lodges[2].images,
    },
  ]

  return lodges.find((lodge) => lodge.id === Number.parseInt(id))
}

export default function LodgeDetailPage({ params }: { params: { id: string } }) {
  const lodge = getLodgeById(params.id)

  if (!lodge) {
    notFound()
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Wi-Fi in Common Areas":
      case "Wi-Fi":
        return <Wifi className="h-4 w-4" />
      case "Restaurant":
        return <Utensils className="h-4 w-4" />
      case "Coffee":
        return <Coffee className="h-4 w-4" />
      case "Hiking Trails":
      case "Walking Safaris":
      case "Bush Walks":
        return <TreePine className="h-4 w-4" />
      case "Game Drives":
      case "Safari Activities":
        return <Tent className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{lodge.name}</h1>
          <div className="flex items-center text-muted-foreground mb-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{lodge.location}</span>
          </div>

          <ImageGallery images={lodge.images} />

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">About This Lodge</h2>
            <p className="text-muted-foreground mb-6">{lodge.description}</p>

            <h3 className="text-xl font-semibold mb-3">Activities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {lodge.activities.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                  <span>{activity}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {lodge.amenities.map((amenity, index) => (
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
              <span className="text-2xl font-bold">{lodge.price}</span>
              <span className="text-muted-foreground"> / night</span>
              <p className="text-sm text-muted-foreground mt-1">Includes breakfast and one safari activity per day</p>
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
                <label className="text-sm font-medium">Guests</label>
                <div className="border rounded px-3 py-2">Select number of guests</div>
              </div>
            </div>

            <Button className="w-full mb-3">Book Now</Button>
            <Button variant="outline" className="w-full">
              View Safari Packages
            </Button>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Best rates guaranteed when booking directly
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

