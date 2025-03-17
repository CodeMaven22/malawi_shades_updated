"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 md:gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r-4 border-malawi-green">
                            <nav className="flex flex-col gap-6 mt-8">
                                <Link href="/" className="text-lg font-semibold hover:text-malawi-green transition-colors">
                                    Home
                                </Link>
                                <Link href="/accommodations" className="text-lg font-medium hover:text-malawi-green transition-colors">
                                    Accommodations
                                </Link>
                                <Link href="/tourism" className="text-lg font-medium hover:text-malawi-green transition-colors">
                                    Tourism Sites
                                </Link>
                                <Link href="/experiences" className="text-lg font-medium hover:text-malawi-green transition-colors">
                                    Experiences
                                </Link>
                                <Link href="/advertise" className="text-lg font-medium hover:text-malawi-green transition-colors">
                                    Advertise With Us
                                </Link>
                                <Link href="/about" className="text-lg font-medium hover:text-malawi-green transition-colors">
                                    About
                                </Link>
                                <Link href="/contact" className="text-lg font-medium hover:text-malawi-green transition-colors">
                                    Contact
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="flex items-center gap-2">
                        <MapPin className="h-6 w-6 text-malawi-red" />
                        <span className="text-xl font-bold tracking-tight">
              Malawi <span className="text-malawi-green">Shades</span>
            </span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="nav-link text-sm font-medium">
                        Home
                    </Link>
                    <Link href="/accommodations" className="nav-link text-sm font-medium">
                        Accommodations
                    </Link>
                    <Link href="/tourism" className="nav-link text-sm font-medium">
                        Tourism Sites
                    </Link>
                    <Link href="/experiences" className="nav-link text-sm font-medium">
                        Experiences
                    </Link>
                    <Link href="/advertise" className="nav-link text-sm font-medium">
                        Advertise
                    </Link>
                    <Link href="/about" className="nav-link text-sm font-medium">
                        About
                    </Link>
                    <Link href="/contact" className="nav-link text-sm font-medium">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-2">
                    {isSearchOpen ? (
                        <div className="flex items-center">
                            <Input
                                type="search"
                                placeholder="Search accommodations..."
                                className="w-[200px] md:w-[300px] input-styled"
                            />
                            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    ) : (
                        <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden md:flex border-malawi-green text-malawi-green hover:bg-malawi-green/10"
                    >
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                    </Button>
                    <Button size="sm" className="hidden md:flex bg-malawi-red hover:bg-malawi-red/90 text-white">
                        Book Now
                    </Button>
                </div>
            </div>
        </header>
    )
}

