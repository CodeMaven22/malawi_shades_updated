import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { experienceImages } from "@/app/utils/image-data"

export function ExperiencesSection() {
  // This would come from a database in a real application
  const experiences = [
    {
      id: 1,
      title: "Lake Malawi Boat Tours",
      description: "Explore the crystal clear waters of Lake Malawi on a traditional wooden boat.",
      image: experienceImages[0].image,
    },
    {
      id: 2,
      title: "Cultural Village Visits",
      description: "Experience authentic Malawian culture and traditions in local villages.",
      image: experienceImages[1].image,
    },
    {
      id: 3,
      title: "Safari Adventures",
      description: "Encounter Malawi's diverse wildlife on guided safari tours.",
      image: experienceImages[2].image,
    },
    {
      id: 4,
      title: "Hiking & Trekking",
      description: "Discover breathtaking landscapes on guided hiking and trekking expeditions.",
      image: experienceImages[3].image,
    },
    {
      id: 5,
      title: "Local Cuisine Workshops",
      description: "Learn to prepare traditional Malawian dishes with local ingredients.",
      image: experienceImages[4].image,
    },
    {
      id: 6,
      title: "Fishing Expeditions",
      description: "Try your hand at fishing in Lake Malawi's abundant waters.",
      image: experienceImages[5].image,
    },
  ]

  return (
    <section id="experiences" className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">Local Experiences</h2>
          <p className="text-muted-foreground mt-2">
            Immerse yourself in authentic Malawian experiences and create lasting memories.
          </p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
          View All Experiences
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience) => (
          <Card key={experience.id} className="overflow-hidden group">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={experience.image || "/placeholder.svg"}
                alt={experience.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle>{experience.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{experience.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

