import { notFound } from "next/navigation"
import { ImageGallery } from "@/components/image-gallery"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Wifi, Coffee, Utensils, PocketIcon as Pool, Dumbbell, Leaf } from "lucide-react"
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
  bedrooms: number
  bathrooms: number
  guests: number
  images: {
    url: string
    alt: string
  }[]
}

// Update the getVillaById function to use real images
// Find the villas array in the getVillaById function and update the images property:

// This would normally come from a database
const getVillaById = (id: string): Accommodation | undefined => {
  const villas: Accommodation[] = [
    {
      id: 1,
      name: "Lakeside Villa",
      location: "Lake Malawi, Mangochi",
      price: "$250",
      rating: 4.8,
      description:
        "Experience luxury living at our stunning Lakeside Villa. This spacious villa offers breathtaking views of Lake Malawi from every room. Featuring an open-concept design, private pool, and direct beach access, it's the perfect retreat for families or groups seeking privacy and comfort. The villa includes a fully equipped kitchen, outdoor BBQ area, and a private jetty for water activities.",
      amenities: [
        "Wi-Fi",
        "Private Pool",
        "Beach Access",
        "Outdoor Kitchen",
        "Air Conditioning",
        "Smart TV",
        "Direct Lake Access",
        "24/7 Security",
      ],
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      images: accommodationImages.villas[0].images,
    },
    {
      id: 2,
      name: "Mountain View Villa",
      location: "Zomba Plateau",
      price: "$220",
      rating: 4.6,
      description:
        "Nestled in the scenic Zomba Plateau, this Mountain View Villa offers a tranquil escape surrounded by nature. Wake up to misty mountain views and enjoy the peaceful sounds of the forest. The villa features rustic wooden architecture with modern amenities, a cozy fireplace for cool evenings, and a spacious terrace perfect for outdoor dining and stargazing.",
      amenities: ["Wi-Fi", "Fireplace", "Mountain Views", "Hiking Trails", "BBQ", "Parking", "Eco-Friendly", "Garden"],
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      images: accommodationImages.villas[1].images,
    },
    {
      id: 3,
      name: "Beachfront Villa",
      location: "Cape Maclear",
      price: "$280",
      rating: 4.9,
      description:
        "This exclusive Beachfront Villa sits directly on the pristine shores of Cape Maclear. Step from your private patio onto the soft white sand beach. The villa features high ceilings, floor-to-ceiling windows to maximize the spectacular views, and a seamless indoor-outdoor living design. Enjoy your own infinity pool that appears to merge with the lake horizon.",
      amenities: [
        "Wi-Fi",
        "Infinity Pool",
        "Private Beach",
        "Water Sports Equipment",
        "Chef Service Available",
        "Smart Home",
        "Snorkeling Gear",
        "Sunset Deck",
      ],
      bedrooms: 5,
      bathrooms: 4,
      guests: 10,
      images: accommodationImages.villas[2].images,
    },
  ]

  return villas.find((villa) => villa.id === Number.parseInt(id))
}

export default function VillaDetailPage({ params }: { params: { id: string } }) {
  const villa = getVillaById(params.id)

  if (!villa) {
    notFound()
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Wi-Fi":
        return <Wifi className="h-4 w-4" />
      case "Private Pool":
      case "Infinity Pool":
      case "Pool":
        return <Pool className="h-4 w-4" />
      case "Restaurant":
      case "Chef Service Available":
        return <Utensils className="h-4 w-4" />
      case "Coffee":
        return <Coffee className="h-4 w-4" />
      case "Gym":
        return <Dumbbell className="h-4 w-4" />
      case "Eco-Friendly":
        return <Leaf className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{villa.name}</h1>
          <div className="flex items-center text-muted-foreground mb-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{villa.location}</span>
          </div>

          <ImageGallery images={villa.images} />

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">About This Villa</h2>
            <p className="text-muted-foreground mb-6">{villa.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Users className="h-6 w-6 mb-2" />
                <span className="font-medium">{villa.guests} guests</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="font-medium">{villa.bedrooms} bedrooms</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Pool className="h-6 w-6 mb-2" />
                <span className="font-medium">{villa.bathrooms} bathrooms</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {villa.amenities.map((amenity, index) => (
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
              <span className="text-2xl font-bold">{villa.price}</span>
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
                <label className="text-sm font-medium">Guests</label>
                <div className="border rounded px-3 py-2">{villa.guests} guests maximum</div>
              </div>
            </div>

            <Button className="w-full mb-3">Book Now</Button>
            <Button variant="outline" className="w-full">
              Contact Host
            </Button>

            <div className="mt-6 text-center text-sm text-muted-foreground">You won't be charged yet</div>
          </div>
        </div>
      </div>
    </div>
  )
}

