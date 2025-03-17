"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageGallery } from "@/components/image-gallery"
import { Calendar, Clock, MapPin, Tag, CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface TourismSiteDetailProps {
    tourismSite: {
        id: number
        name: string
        location: string
        description: string
        duration: string
        price: string
        image: string
        region: string
        district: string
        activities: string[]
        bestTimeToVisit: string
        images: string[]
    }
}

export function TourismSiteDetail({ tourismSite }: TourismSiteDetailProps) {
    const [date, setDate] = useState<Date>()
    const [participants, setParticipants] = useState("1")
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real application, this would submit the booking to a server
        setFormSubmitted(true)
    }

    const galleryImages = tourismSite.images.map((url, index) => ({
        url,
        alt: `${tourismSite.name} image ${index + 1}`,
    }))

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-6">
                <Link href="/tourism" className="text-malawi-green hover:underline mb-4 inline-flex items-center">
                    ← Back to Tourism Sites
                </Link>
                <h1 className="text-3xl font-bold mt-4">{tourismSite.name}</h1>
                <div className="flex items-center mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1 text-malawi-red" />
                    <span>{tourismSite.location}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="mb-8">
                        <ImageGallery images={galleryImages} />
                    </div>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>About {tourismSite.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{tourismSite.description}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Activities & Highlights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {tourismSite.activities.map((activity) => (
                                        <Badge
                                            key={activity}
                                            variant="outline"
                                            className="bg-malawi-green/10 text-malawi-green border-malawi-green"
                                        >
                                            {activity}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div className="flex items-start">
                                        <Clock className="h-5 w-5 mr-2 text-malawi-green mt-0.5" />
                                        <div>
                                            <h4 className="font-medium">Duration</h4>
                                            <p className="text-muted-foreground">{tourismSite.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Tag className="h-5 w-5 mr-2 text-malawi-green mt-0.5" />
                                        <div>
                                            <h4 className="font-medium">Price</h4>
                                            <p className="text-muted-foreground">From {tourismSite.price} per person</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Calendar className="h-5 w-5 mr-2 text-malawi-green mt-0.5" />
                                        <div>
                                            <h4 className="font-medium">Best Time to Visit</h4>
                                            <p className="text-muted-foreground">{tourismSite.bestTimeToVisit}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <MapPin className="h-5 w-5 mr-2 text-malawi-green mt-0.5" />
                                        <div>
                                            <h4 className="font-medium">Region</h4>
                                            <p className="text-muted-foreground capitalize">
                                                {tourismSite.region} Region, {tourismSite.district} District
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div>
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Book This Tour</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {formSubmitted ? (
                                <div className="text-center py-6">
                                    <div className="text-malawi-green text-xl mb-2">Booking Request Received!</div>
                                    <p className="text-muted-foreground mb-4">
                                        Thank you for your booking request. We will contact you shortly to confirm your tour.
                                    </p>
                                    <Button
                                        onClick={() => setFormSubmitted(false)}
                                        variant="outline"
                                        className="border-malawi-green text-malawi-green hover:bg-malawi-green/10"
                                    >
                                        Make Another Booking
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" placeholder="Enter your full name" required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="Enter your email" required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" placeholder="Enter your phone number" required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Preferred Date</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Select a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                    disabled={(date) => date < new Date()}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="participants">Number of Participants</Label>
                                        <Select value={participants} onValueChange={setParticipants}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select number of participants" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                    <SelectItem key={num} value={num.toString()}>
                                                        {num} {num === 1 ? "person" : "people"}
                                                    </SelectItem>
                                                ))}
                                                <SelectItem value="more">More than 10</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Special Requests</Label>
                                        <Textarea id="message" placeholder="Any special requirements or questions?" />
                                    </div>

                                    <div className="pt-2">
                                        <Button type="submit" className="w-full bg-malawi-red hover:bg-malawi-red/90 text-white">
                                            Request Booking
                                        </Button>
                                    </div>

                                    <p className="text-xs text-muted-foreground text-center mt-4">
                                        By submitting this form, you agree to our Terms of Service and Privacy Policy.
                                    </p>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

