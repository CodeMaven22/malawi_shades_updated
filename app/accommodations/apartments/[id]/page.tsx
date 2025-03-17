import { notFound } from "next/navigation"
import { ImageGallery } from "@/components/image-gallery"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Wifi, Coffee, Utensils, Home, Car } from "lucide-react"
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
  size: string
  images: {
    url: string
    alt: string
  }[]
}

// Update the getApartmentById function to use real images
// Find the apartments array in the getApartmentById function and update the images property:

const getApartmentById = (id: string): Accommodation | undefined => {
  const apartments: Accommodation[] = [
    {
      id: 1,
      name: "City View Apartment",
      location: "Lilongwe City Center",
      price: "$80",
      rating: 4.5,
      description:
        "Enjoy modern living in this stylish city center apartment offering panoramic views of Lilongwe. Perfect for business travelers or tourists wanting to explore the capital, this fully furnished apartment features contemporary decor, high-speed internet, and all modern conveniences. Located within walking distance to shops, restaurants, and key attractions.",
      amenities: [
        "Wi-Fi",
        "Fully Equipped Kitchen",
        "TV",
        "Air Conditioning",
        "Washing Machine",
        "Security System",
        "Elevator",
        "Parking",
      ],
      bedrooms: 2,
      bathrooms: 1,
      size: "85 sq m",
      images: accommodationImages.apartments[0].images,
    },
    {
      id: 2,
      name: "Luxury Apartment",
      location: "Blantyre Business District",
      price: "$95",
      rating: 4.7,
      description:
        "Experience premium living in this luxury apartment located in the heart of Blantyre's business district. Featuring high-end finishes, designer furniture, and state-of-the-art appliances, this apartment is ideal for discerning travelers. Enjoy the private balcony with city views, fully equipped gourmet kitchen, and access to building amenities including a fitness center and rooftop terrace.",
      amenities: [
        "Wi-Fi",
        "Gourmet Kitchen",
        "Smart TV",
        "Air Conditioning",
        "Balcony",
        "In-building Gym",
        "24/7 Security",
        "Parking",
      ],
      bedrooms: 2,
      bathrooms: 2,
      size: "110 sq m",
      images: accommodationImages.apartments[1].images,
    },
    {
      id: 3,
      name: "Modern Apartment",
      location: "Mzuzu Downtown",
      price: "$75",
      rating: 4.4,
      description:
        "This modern apartment in Mzuzu offers comfort and convenience for both short and long-term stays. Thoughtfully designed with a blend of functionality and style, the apartment features an open floor plan, comfortable furnishings, and all essential amenities. Located in a vibrant neighborhood with easy access to local markets, restaurants, and transportation.",
      amenities: [
        "Wi-Fi",
        "Kitchen",
        "TV",
        "Workspace",
        "Laundry Facilities",
        "Heating",
        "Security",
        "Public Transport Nearby",
      ],
      bedrooms: 1,
      bathrooms: 1,
      size: "65 sq m",
      images: accommodationImages.apartments[2].images,
    },
  ]

  return apartments.find((apartment) => apartment.id === Number.parseInt(id))
}

export default function ApartmentDetailPage({ params }: { params: { id: string } }) {
  const apartment = getApartmentById(params.id)

  if (!apartment) {
    notFound()
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Wi-Fi":
        return <Wifi className="h-4 w-4" />
      case "Kitchen":
      case "Fully Equipped Kitchen":
      case "Gourmet Kitchen":
        return <Utensils className="h-4 w-4" />
      case "Coffee":
        return <Coffee className="h-4 w-4" />
      case "Parking":
        return <Car className="h-4 w-4" />
      case "Elevator":
      case "Building Amenities":
        return <Home className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{apartment.name}</h1>
          <div className="flex items-center text-muted-foreground mb-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{apartment.location}</span>
          </div>

          <ImageGallery images={apartment.images} />

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">About This Apartment</h2>
            <p className="text-muted-foreground mb-6">{apartment.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Home className="h-6 w-6 mb-2" />
                <span className="font-medium">{apartment.size}</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Users className="h-6 w-6 mb-2" />
                <span className="font-medium">{apartment.bedrooms} bedroom(s)</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="font-medium">{apartment.bathrooms} bathroom(s)</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {apartment.amenities.map((amenity, index) => (
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
              <span className="text-2xl font-bold">{apartment.price}</span>
              <span className="text-muted-foreground"> / night</span>
              <p className="text-sm text-muted-foreground mt-1">Special rates for weekly and monthly stays</p>
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
              Contact Owner
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

