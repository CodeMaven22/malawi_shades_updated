import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

// Add import for image data
import { advertiseImages } from "@/app/utils/image-data"

export function AdvertiseSection() {
  const advertisingPackages = [
    {
      id: 1,
      name: "Basic",
      price: "$99",
      duration: "per month",
      description: "Perfect for small businesses and individual property owners",
      features: ["1 property listing", "Basic analytics", "30-day listing duration", "Email support"],
    },
    {
      id: 2,
      name: "Premium",
      price: "$249",
      duration: "per month",
      description: "Ideal for medium-sized businesses with multiple properties",
      features: [
        "5 property listings",
        "Featured placement",
        "Advanced analytics",
        "60-day listing duration",
        "Priority email & phone support",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$499",
      duration: "per month",
      description: "Comprehensive solution for large businesses and agencies",
      features: [
        "Unlimited property listings",
        "Premium placement",
        "Comprehensive analytics dashboard",
        "90-day listing duration",
        "Dedicated account manager",
        "Custom branding options",
      ],
    },
  ]

  return (
    <section id="advertise" className="py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Advertise With Us</h2>
        <p className="text-muted-foreground">
          Reach thousands of potential customers looking for accommodations and tourism experiences in Malawi. Choose
          the advertising package that best suits your business needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {advertisingPackages.map((pkg) => (
          <Card key={pkg.id} className={`flex flex-col ${pkg.popular ? "border-primary shadow-lg relative" : ""}`}>
            {pkg.popular && (
              <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <span className="text-3xl font-bold">{pkg.price}</span>
                <span className="text-muted-foreground"> {pkg.duration}</span>
              </div>
              <ul className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-muted rounded-lg p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Custom Advertising Solutions</h3>
            <p className="text-muted-foreground mb-6">
              Need a tailored advertising solution for your business? Our team can create custom packages to meet your
              specific needs and goals.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Sponsored content and featured articles</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Banner advertisements on high-traffic pages</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Email marketing campaigns to our subscriber base</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Social media promotion and partnerships</span>
              </li>
            </ul>
            <Button>Contact Our Team</Button>
          </div>
          <div className="relative h-[300px]">
            <Image
              src={advertiseImages.custom || "/placeholder.svg"}
              alt="Custom advertising"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

