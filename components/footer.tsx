import Link from "next/link"
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-malawi-green/10 to-malawi-lake/10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-malawi-red" />
              <span className="text-xl font-bold">
                Malawi <span className="text-malawi-green">Shades</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your premier platform for finding the best accommodations and tourism experiences in Malawi.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-malawi-red transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-malawi-red transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-malawi-red transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-malawi-red transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-malawi-green">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-malawi-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/accommodations"
                  className="text-muted-foreground hover:text-malawi-green transition-colors"
                >
                  Accommodations
                </Link>
              </li>
              <li>
                <Link href="/tourism" className="text-muted-foreground hover:text-malawi-green transition-colors">
                  Tourism Sites
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-muted-foreground hover:text-malawi-green transition-colors">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-muted-foreground hover:text-malawi-green transition-colors">
                  Advertise With Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-malawi-green transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-malawi-green transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-malawi-green">Accommodations</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/accommodations/villas"
                  className="text-muted-foreground hover:text-malawi-green transition-colors"
                >
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/accommodations/resorts"
                  className="text-muted-foreground hover:text-malawi-green transition-colors"
                >
                  Premium Resorts
                </Link>
              </li>
              <li>
                <Link
                  href="/accommodations/apartments"
                  className="text-muted-foreground hover:text-malawi-green transition-colors"
                >
                  Apartments
                </Link>
              </li>
              <li>
                <Link
                  href="/accommodations/lodges"
                  className="text-muted-foreground hover:text-malawi-green transition-colors"
                >
                  Scenic Lodges
                </Link>
              </li>
              <li>
                <Link
                  href="/accommodations"
                  className="text-muted-foreground hover:text-malawi-green transition-colors"
                >
                  All Accommodations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-malawi-green">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-malawi-red shrink-0 mt-0.5" />
                <span className="text-muted-foreground">123 Lake Shore Drive, Mangochi, Malawi</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-malawi-red shrink-0" />
                <span className="text-muted-foreground">+265 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-malawi-red shrink-0" />
                <span className="text-muted-foreground">info@malawishades.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Malawi Shades. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

