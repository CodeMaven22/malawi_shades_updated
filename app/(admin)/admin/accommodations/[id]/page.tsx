"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Trash2, Upload } from "lucide-react"

// Mock data for a single accommodation
const accommodationData = {
    id: 1,
    name: "Lakeside Villa",
    type: "villa",
    description:
        "Experience luxury living at our stunning Lakeside Villa. This spacious villa offers breathtaking views of Lake Malawi from every room.",
    shortDescription: "Exclusive private villa with stunning lake views and premium amenities",
    location: "Lake Malawi, Mangochi",
    address: "123 Lakeshore Drive, Mangochi",
    region: "southern",
    district: "mangochi",
    price: 250,
    currency: "USD",
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    size: "350 sq m",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    minStay: 2,
    amenities: ["wifi", "pool", "beach-access", "air-conditioning", "kitchen", "parking"],
    images: [
        {
            id: 1,
            url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
            alt: "Lakeside Villa exterior view",
            isFeatured: true,
        },
        {
            id: 2,
            url: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2",
            alt: "Lakeside Villa living room",
            isFeatured: false,
        },
        {
            id: 3,
            url: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799",
            alt: "Lakeside Villa kitchen",
            isFeatured: false,
        },
    ],
    isFeatured: true,
    isActive: true,
}

// Mock data for regions and districts
const regions = [
    {
        id: "northern",
        name: "Northern Region",
        districts: [
            { id: "chitipa", name: "Chitipa" },
            { id: "karonga", name: "Karonga" },
            { id: "likoma", name: "Likoma" },
            { id: "mzimba", name: "Mzimba" },
            { id: "nkhata-bay", name: "Nkhata Bay" },
            { id: "rumphi", name: "Rumphi" },
        ],
    },
    {
        id: "central",
        name: "Central Region",
        districts: [
            { id: "dedza", name: "Dedza" },
            { id: "dowa", name: "Dowa" },
            { id: "kasungu", name: "Kasungu" },
            { id: "lilongwe", name: "Lilongwe" },
            { id: "mchinji", name: "Mchinji" },
            { id: "nkhotakota", name: "Nkhotakota" },
            { id: "ntcheu", name: "Ntcheu" },
            { id: "ntchisi", name: "Ntchisi" },
            { id: "salima", name: "Salima" },
        ],
    },
    {
        id: "southern",
        name: "Southern Region",
        districts: [
            { id: "balaka", name: "Balaka" },
            { id: "blantyre", name: "Blantyre" },
            { id: "chikwawa", name: "Chikwawa" },
            { id: "chiradzulu", name: "Chiradzulu" },
            { id: "machinga", name: "Machinga" },
            { id: "mangochi", name: "Mangochi" },
            { id: "mulanje", name: "Mulanje" },
            { id: "mwanza", name: "Mwanza" },
            { id: "nsanje", name: "Nsanje" },
            { id: "thyolo", name: "Thyolo" },
            { id: "phalombe", name: "Phalombe" },
            { id: "zomba", name: "Zomba" },
            { id: "neno", name: "Neno" },
        ],
    },
]

// Mock data for amenities
const amenitiesList = [
    { id: "wifi", name: "Wi-Fi", category: "basic" },
    { id: "pool", name: "Pool", category: "luxury" },
    { id: "beach-access", name: "Beach Access", category: "outdoor" },
    { id: "restaurant", name: "Restaurant", category: "dining" },
    { id: "bar", name: "Bar", category: "dining" },
    { id: "spa", name: "Spa", category: "luxury" },
    { id: "gym", name: "Gym", category: "fitness" },
    { id: "air-conditioning", name: "Air Conditioning", category: "comfort" },
    { id: "kitchen", name: "Kitchen", category: "basic" },
    { id: "parking", name: "Parking", category: "basic" },
    { id: "room-service", name: "Room Service", category: "service" },
    { id: "laundry", name: "Laundry", category: "service" },
    { id: "safari-tours", name: "Safari Tours", category: "activities" },
]

export default function AccommodationForm() {
    const params = useParams()
    const router = useRouter()
    const isEditing = params.id !== "new"

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
        shortDescription: "",
        location: "",
        address: "",
        region: "",
        district: "",
        price: "",
        currency: "USD",
        maxGuests: "",
        bedrooms: "",
        bathrooms: "",
        size: "",
        checkInTime: "",
        checkOutTime: "",
        minStay: "",
        amenities: [] as string[],
        isFeatured: false,
        isActive: true,
    })

    const [availableDistricts, setAvailableDistricts] = useState<{ id: string; name: string }[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Load accommodation data if editing
    useEffect(() => {
        if (isEditing) {
            // In a real app, you would fetch the data from your API
            setFormData({
                name: accommodationData.name,
                type: accommodationData.type,
                description: accommodationData.description,
                shortDescription: accommodationData.shortDescription,
                location: accommodationData.location,
                address: accommodationData.address,
                region: accommodationData.region,
                district: accommodationData.district,
                price: accommodationData.price.toString(),
                currency: accommodationData.currency,
                maxGuests: accommodationData.maxGuests.toString(),
                bedrooms: accommodationData.bedrooms.toString(),
                bathrooms: accommodationData.bathrooms.toString(),
                size: accommodationData.size,
                checkInTime: accommodationData.checkInTime,
                checkOutTime: accommodationData.checkOutTime,
                minStay: accommodationData.minStay.toString(),
                amenities: accommodationData.amenities,
                isFeatured: accommodationData.isFeatured,
                isActive: accommodationData.isActive,
            })

            // Set available districts based on selected region
            const region = regions.find((r) => r.id === accommodationData.region)
            if (region) {
                setAvailableDistricts(region.districts)
            }
        }
    }, [isEditing])

    // Update available districts when region changes
    useEffect(() => {
        if (formData.region) {
            const region = regions.find((r) => r.id === formData.region)
            if (region) {
                setAvailableDistricts(region.districts)

                // Reset district if it doesn't belong to the selected region
                const districtExists = region.districts.some((d) => d.id === formData.district)
                if (!districtExists) {
                    setFormData((prev) => ({ ...prev, district: "" }))
                }
            }
        } else {
            setAvailableDistricts([])
        }
    }, [formData.region])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData((prev) => ({ ...prev, [name]: checked }))
    }

    const handleAmenityToggle = (amenityId: string, checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            amenities: checked ? [...prev.amenities, amenityId] : prev.amenities.filter((id) => id !== amenityId),
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // In a real app, you would send the data to your API
            console.log("Submitting form data:", formData)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Redirect to accommodations list
            router.push("/admin/accommodations")
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" onClick={() => router.push("/admin/accommodations")} className="mr-2">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {isEditing ? `Edit ${formData.name}` : "Add New Accommodation"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEditing ? "Update accommodation details" : "Create a new accommodation listing"}
                        </p>
                    </div>
                </div>

                {isEditing && (
                    <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                )}
            </div>

            <Tabs defaultValue="basic">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit}>
                    <TabsContent value="basic" className="space-y-6 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter accommodation name"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="type" className="text-sm font-medium">
                                        Type <span className="text-red-500">*</span>
                                    </label>
                                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select accommodation type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="villa">Villa</SelectItem>
                                            <SelectItem value="resort">Resort</SelectItem>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="lodge">Lodge</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="shortDescription" className="text-sm font-medium">
                                        Short Description <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="shortDescription"
                                        name="shortDescription"
                                        value={formData.shortDescription}
                                        onChange={handleInputChange}
                                        placeholder="Brief description (max 100 characters)"
                                        maxLength={100}
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">This will be displayed in accommodation cards</p>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="description" className="text-sm font-medium">
                                        Full Description <span className="text-red-500">*</span>
                                    </label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Detailed description of the accommodation"
                                        rows={5}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="location" className="text-sm font-medium">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="General location (e.g., Lake Malawi, Mangochi)"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-sm font-medium">
                                        Address <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Full address"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="region" className="text-sm font-medium">
                                            Region <span className="text-red-500">*</span>
                                        </label>
                                        <Select
                                            value={formData.region}
                                            onValueChange={(value) => handleSelectChange("region", value)}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select region" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {regions.map((region) => (
                                                    <SelectItem key={region.id} value={region.id}>
                                                        {region.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="district" className="text-sm font-medium">
                                            District <span className="text-red-500">*</span>
                                        </label>
                                        <Select
                                            value={formData.district}
                                            onValueChange={(value) => handleSelectChange("district", value)}
                                            disabled={!formData.region}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select district" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableDistricts.map((district) => (
                                                    <SelectItem key={district.id} value={district.id}>
                                                        {district.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="isFeatured"
                                            checked={formData.isFeatured}
                                            onCheckedChange={(checked) => handleCheckboxChange("isFeatured", checked as boolean)}
                                        />
                                        <label
                                            htmlFor="isFeatured"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Featured Accommodation
                                        </label>
                                    </div>
                                    <p className="text-xs text-muted-foreground pl-6">
                                        Featured accommodations are highlighted on the homepage
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="isActive"
                                            checked={formData.isActive}
                                            onCheckedChange={(checked) => handleCheckboxChange("isActive", checked as boolean)}
                                        />
                                        <label
                                            htmlFor="isActive"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Active Listing
                                        </label>
                                    </div>
                                    <p className="text-xs text-muted-foreground pl-6">Inactive listings are not visible to users</p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="details" className="space-y-6 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="price" className="text-sm font-medium">
                                            Price <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="currency" className="text-sm font-medium">
                                            Currency <span className="text-red-500">*</span>
                                        </label>
                                        <Select
                                            value={formData.currency}
                                            onValueChange={(value) => handleSelectChange("currency", value)}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select currency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="USD">USD ($)</SelectItem>
                                                <SelectItem value="MWK">MWK (K)</SelectItem>
                                                <SelectItem value="EUR">EUR (€)</SelectItem>
                                                <SelectItem value="GBP">GBP (£)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="maxGuests" className="text-sm font-medium">
                                            Max Guests <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="maxGuests"
                                            name="maxGuests"
                                            type="number"
                                            min="1"
                                            value={formData.maxGuests}
                                            onChange={handleInputChange}
                                            placeholder="1"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="bedrooms" className="text-sm font-medium">
                                            Bedrooms <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="bedrooms"
                                            name="bedrooms"
                                            type="number"
                                            min="0"
                                            value={formData.bedrooms}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="bathrooms" className="text-sm font-medium">
                                            Bathrooms <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="bathrooms"
                                            name="bathrooms"
                                            type="number"
                                            min="0"
                                            step="0.5"
                                            value={formData.bathrooms}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="size" className="text-sm font-medium">
                                        Size
                                    </label>
                                    <Input
                                        id="size"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 85 sq m"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="checkInTime" className="text-sm font-medium">
                                            Check-in Time <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="checkInTime"
                                            name="checkInTime"
                                            type="time"
                                            value={formData.checkInTime}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="checkOutTime" className="text-sm font-medium">
                                            Check-out Time <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="checkOutTime"
                                            name="checkOutTime"
                                            type="time"
                                            value={formData.checkOutTime}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="minStay" className="text-sm font-medium">
                                        Minimum Stay (nights) <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="minStay"
                                        name="minStay"
                                        type="number"
                                        min="1"
                                        value={formData.minStay}
                                        onChange={handleInputChange}
                                        placeholder="1"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="amenities" className="space-y-6 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {["basic", "comfort", "luxury", "dining", "fitness", "service", "outdoor", "activities"].map(
                                (category) => (
                                    <Card key={category}>
                                        <CardHeader>
                                            <CardTitle className="capitalize">{category}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {amenitiesList
                                                    .filter((amenity) => amenity.category === category)
                                                    .map((amenity) => (
                                                        <div key={amenity.id} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`amenity-${amenity.id}`}
                                                                checked={formData.amenities.includes(amenity.id)}
                                                                onCheckedChange={(checked) => handleAmenityToggle(amenity.id, checked as boolean)}
                                                            />
                                                            <label
                                                                htmlFor={`amenity-${amenity.id}`}
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                {amenity.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ),
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="images" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Images</CardTitle>
                                <CardDescription>Upload and manage images for this accommodation</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <div className="flex flex-col items-center">
                                            <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                            <p className="text-sm text-muted-foreground mb-1">Drag and drop images here or click to browse</p>
                                            <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, WEBP. Max size: 5MB</p>
                                            <Button variant="outline" size="sm" className="mt-4">
                                                Upload Images
                                            </Button>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div>
                                            <h3 className="text-sm font-medium mb-3">Current Images</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                {accommodationData.images.map((image) => (
                                                    <div key={image.id} className="relative group">
                                                        <div className="aspect-video relative rounded-md overflow-hidden border">
                                                            <img
                                                                src={image.url || "/placeholder.svg"}
                                                                alt={image.alt}
                                                                className="object-cover w-full h-full"
                                                            />
                                                        </div>
                                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <div className="flex space-x-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="text-white border-white hover:bg-white/20"
                                                                >
                                                                    Edit
                                                                </Button>
                                                                <Button variant="destructive" size="sm">
                                                                    Remove
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        {image.isFeatured && (
                                                            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                                                                Featured
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <div className="mt-6 flex items-center justify-end space-x-4">
                        <Button variant="outline" type="button" onClick={() => router.push("/admin/accommodations")}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center">
                  <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                  >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
                            ) : (
                                <span className="flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save {isEditing ? "Changes" : "Accommodation"}
                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </Tabs>
        </div>
    )
}

