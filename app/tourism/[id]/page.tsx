import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { tourismSiteImages } from "@/app/utils/image-data"
import { TourismSiteDetail } from "./tourism-site-detail"

// This would come from a database in a real application
const allTourismSites = [
    {
        id: 1,
        name: "Lake Malawi National Park",
        location: "Cape Maclear",
        description:
            "A UNESCO World Heritage site with crystal clear waters and diverse fish species. Lake Malawi National Park is the world's first freshwater national park and a UNESCO World Heritage Site. It's home to hundreds of fish species, particularly the colorful cichlids. The park offers pristine beaches, clear waters, and excellent opportunities for snorkeling, diving, and kayaking.",
        duration: "Full day",
        price: "$45",
        image: tourismSiteImages[0].image,
        region: "southern",
        district: "mangochi",
        activities: ["Snorkeling", "Diving", "Kayaking", "Bird Watching", "Beach Relaxation"],
        bestTimeToVisit: "May to October",
        images: [
            "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?q=80&w=1200&auto=format&fit=crop",
        ],
    },
    {
        id: 2,
        name: "Liwonde National Park",
        location: "Southern Malawi",
        description:
            "Home to elephants, hippos, crocodiles and various antelope species. Liwonde is Malawi's premier wildlife destination, situated along the Shire River. The park is known for its large elephant population, hippos, crocodiles, and various antelope species. It's also a bird watcher's paradise with over 400 recorded bird species. Recent reintroductions have brought black rhinos, lions, and cheetahs back to the park.",
        duration: "1-3 days",
        price: "$65",
        image: tourismSiteImages[1].image,
        region: "southern",
        district: "machinga",
        activities: ["Game Drives", "Boat Safaris", "Bird Watching", "Walking Safaris", "Night Drives"],
        bestTimeToVisit: "May to November",
        images: [
            "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1528277342758-f1d7613953a2?q=80&w=1200&auto=format&fit=crop",
        ],
    },
    {
        id: 3,
        name: "Mount Mulanje",
        location: "Mulanje",
        description:
            "The highest mountain in Central Africa with breathtaking hiking trails. Mount Mulanje, also known as the 'Island in the Sky', rises dramatically from the surrounding plains. It's the highest mountain in Central Africa, with its highest peak, Sapitwa, reaching 3,002 meters. The mountain offers multiple hiking trails of varying difficulty, stunning waterfalls, and unique flora including the Mulanje Cedar, Malawi's national tree.",
        duration: "2-5 days",
        price: "$80",
        image: tourismSiteImages[2].image,
        region: "southern",
        district: "mulanje",
        activities: ["Hiking", "Rock Climbing", "Camping", "Photography", "Nature Walks"],
        bestTimeToVisit: "May to October",
        images: [
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470770903003-60a2ccd489d4?q=80&w=1200&auto=format&fit=crop",
        ],
    },
    {
        id: 4,
        name: "Zomba Plateau",
        location: "Zomba",
        description:
            "A magnificent table mountain with panoramic views and forest trails. The Zomba Plateau is a magnificent table mountain rising to 1,800 meters, offering spectacular views of the surrounding countryside. The plateau features forests, streams, waterfalls, and dams. It's perfect for hiking, mountain biking, and horseback riding. The colonial-era town of Zomba below was once the capital of Malawi.",
        duration: "1-2 days",
        price: "$40",
        image: tourismSiteImages[3].image,
        region: "southern",
        district: "zomba",
        activities: ["Hiking", "Mountain Biking", "Horseback Riding", "Trout Fishing", "Bird Watching"],
        bestTimeToVisit: "April to October",
        images: [
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470770903003-60a2ccd489d4?q=80&w=1200&auto=format&fit=crop",
        ],
    },
    {
        id: 5,
        name: "Nyika National Park",
        location: "Northern Malawi",
        description:
            "Malawi's largest national park with rolling hills, wildlife and wildflowers. Nyika is Malawi's largest national park, a beautiful high-altitude plateau with rolling hills covered in grasslands, wildflowers, and patches of evergreen forest. The park is home to large herds of antelope, zebras, and leopards. It's also known for its orchids, with over 200 species recorded. The cool climate makes it ideal for hiking and mountain biking.",
        duration: "2-4 days",
        price: "$70",
        image: tourismSiteImages[4].image,
        region: "northern",
        district: "rumphi",
        activities: ["Game Drives", "Mountain Biking", "Hiking", "Bird Watching", "Wildflower Viewing"],
        bestTimeToVisit: "May to October",
        images: [
            "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1528277342758-f1d7613953a2?q=80&w=1200&auto=format&fit=crop",
        ],
    },
    {
        id: 6,
        name: "Livingstonia",
        location: "Northern Region",
        description:
            "Historic mission station with stunning views of Lake Malawi. Livingstonia is a historic mission station founded by Scottish missionaries in 1894. Perched at 900 meters above Lake Malawi, it offers breathtaking views. The site includes the Stone House (museum), a church with beautiful stained glass, and the Livingstonia University. The challenging drive up the mountain includes 20 hairpin turns but rewards visitors with spectacular scenery.",
        duration: "1 day",
        price: "$35",
        image: tourismSiteImages[5].image,
        region: "northern",
        district: "rumphi",
        activities: ["Historical Tours", "Photography", "Hiking", "Cultural Experiences", "Scenic Drives"],
        bestTimeToVisit: "May to October",
        images: [
            "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?q=80&w=1200&auto=format&fit=crop",
        ],
    },
    {
        id: 7,
        name: "Chongoni Rock Art",
        location: "Dedza",
        description:
            "UNESCO World Heritage site featuring ancient rock paintings. The Chongoni Rock Art Area is a UNESCO World Heritage site comprising 127 sites featuring ancient rock paintings. These paintings, some dating back to the Late Stone Age, represent the richest concentration of rock art in Central Africa. They provide a valuable record of the traditions and beliefs of the hunter-gatherers who lived in the area from the Stone Age to the present day.",
        duration: "Half day",
        price: "$25",
        image: tourismSiteImages[6].image,
        region: "central",
        district: "dedza",
        activities: ["Archaeological Tours", "Cultural Experiences", "Photography", "Hiking", "Historical Learning"],
        bestTimeToVisit: "Year-round",
        images: [
            "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200&auto=format&fit=crop",
        ],
    },
    {
        id: 8,
        name: "Nkhotakota Wildlife Reserve",
        location: "Central Malawi",
        description:
            "Malawi's oldest and largest wildlife reserve with diverse ecosystems. Nkhotakota is Malawi's oldest wildlife reserve, covering 1,800 square kilometers of miombo woodland and riverine forest. The reserve has undergone a major restocking program, with elephants and other wildlife translocated from other parks. It offers a true wilderness experience with excellent bird watching, fishing in the Bua River, and the chance to see elephants, buffalo, and various antelope species.",
        duration: "1-3 days",
        price: "$55",
        image: tourismSiteImages[7].image,
        region: "central",
        district: "nkhotakota",
        activities: ["Game Drives", "Fishing", "Canoeing", "Bird Watching", "Walking Safaris"],
        bestTimeToVisit: "May to November",
        images: [
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1528277342758-f1d7613953a2?q=80&w=1200&auto=format&fit=crop",
        ],
    },
]

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const id = Number.parseInt(params.id)
    const tourismSite = allTourismSites.find((site) => site.id === id)

    if (!tourismSite) {
        return {
            title: "Tourism Site Not Found",
            description: "The requested tourism site could not be found.",
        }
    }

    return {
        title: `${tourismSite.name} | Malawi Shades Tourism`,
        description: tourismSite.description.substring(0, 160),
    }
}

export default function TourismSitePage({ params }: { params: { id: string } }) {
    const id = Number.parseInt(params.id)
    const tourismSite = allTourismSites.find((site) => site.id === id)

    if (!tourismSite) {
        notFound()
    }

    return <TourismSiteDetail tourismSite={tourismSite} />
}

