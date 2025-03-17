import type { Metadata } from "next"
import VillasPageClient from "./VillasPageClient"

export const metadata: Metadata = {
  title: "Luxury Villas | Malawi Shades",
  description: "Exclusive private villas with stunning views and premium amenities in Malawi.",
}

export default function VillasPage() {
  return <VillasPageClient />
}

