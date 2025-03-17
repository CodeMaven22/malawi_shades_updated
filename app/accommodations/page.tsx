import type { Metadata } from "next"
import AccommodationsClientPage from "./AccommodationsClientPage"

export const metadata: Metadata = {
  title: "Accommodations | Malawi Shades",
  description: "Find the perfect place to stay in Malawi - from luxury villas to scenic lodges.",
}

export default function AccommodationsPage() {
  return <AccommodationsClientPage />
}

