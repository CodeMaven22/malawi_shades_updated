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

// Mock data for a single experience
const experienceData = {
    id: 1,
    name: "Lake Malawi Boat Tours",
    category: "Water Activities",
    location: "Lake Malawi",
    description: "Explore the crystal clear waters of Lake Malawi on a traditional wooden boat.",
    shortDescription: "Explore crystal clear waters on a traditional wooden boat.",
    address: "Cape Maclear, Mangochi",
    region: "southern",
    district: "mangochi",
    price: "45",
    currency: "USD",
    duration: "3 hours",
    maxParticipants: "12",
    included: ["Guide", "Refreshments", "Equipment"],
    requirements: ["Swimming ability", "Sunscreen", "Hat"],
    isFeatured: true,
    isActive: true,
}

// Mock data for regions and districts (same as in accommodation form)
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

export default function ExperienceForm() {
    const params = useParams()
    const router = useRouter()
    const isEditing = params.id !== "new"

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        location: "",
        description: "",
        shortDescription: "",
        address: "",
        region: "",
        district: "",
        price: "",
        currency: "USD",
        duration: "",
        maxParticipants: "",
        included: [] as string[],
        requirements: [] as string[],
        isFeatured: false,
        isActive: true,
    })

    const [newIncluded, setNewIncluded] = useState("")
    const [newRequirement, setNewRequirement] = useState("")
    const [availableDistricts, setAvailableDistricts] = useState<{ id: string; name: string }[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Load experience data if editing
    useEffect(() => {
        if (isEditing) {
            // In a real app, you would fetch the data from your API
            setFormData({
                name: experienceData.name,
                category: experienceData.category.toLowerCase().replace(/\s+/g, "-"),
                location: experienceData.location,
                description: experienceData.description,
                shortDescription: experienceData.shortDescription,
                address: experienceData.address,
                region: experienceData.region,
                district: experienceData.district,
                price: experienceData.price,
                currency: experienceData.currency,
                duration: experienceData.duration,
                maxParticipants: experienceData.maxParticipants,
                included: experienceData.included,
                requirements: experienceData.requirements,
                isFeatured: experienceData.isFeatured,
                isActive: experienceData.isActive,
            })

            // Set available districts based on selected region
            const region = regions.find((r) => r.id === experienceData.region)
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

    const addIncluded = () => {
        if (newIncluded.trim()) {
            setFormData((prev) => ({
                ...prev,
                included: [...prev.included, newIncluded.trim()],
            }))
            setNewIncluded("")
        }
    }

    const removeIncluded = (item: string) => {
        setFormData((prev) => ({
            ...prev,
            included: prev.included.filter((i) => i !== item),
        }))
    }

    const addRequirement = () => {
        if (newRequirement.trim()) {
            setFormData((prev) => ({
                ...prev,
                requirements: [...prev.requirements, newRequirement.trim()],
            }))
            setNewRequirement("")
        }
    }

    const removeRequirement = (item: string) => {
        setFormData((prev) => ({
            ...prev,
            requirements: prev.requirements.filter((i) => i !== item),
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

            // Redirect to experiences list
            router.push("/admin/experiences")
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
                    <Button variant="ghost" size="icon" onClick={() => router.push("/admin/experiences")} className="mr-2">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {isEditing ? `Edit ${formData.name}` : "Add New Experience"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEditing ? "Update experience details" : "Create a new experience listing"}
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
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
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
                                        placeholder="Enter experience name"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="category" className="text-sm font-medium">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => handleSelectChange("category", value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="water-activities">Water Activities</SelectItem>
                                            <SelectItem value="cultural-experiences">Cultural Experiences</SelectItem>
                                            <SelectItem value="adventure">Adventure</SelectItem>
                                            <SelectItem value="food-drink">Food & Drink</SelectItem>
                                            <SelectItem value="wellness">Wellness</SelectItem>
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
                                    <p className="text-xs text-muted-foreground">This will be displayed in experience cards</p>
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
                                        placeholder="Detailed description of the experience"
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
                                        placeholder="General location (e.g., Lake Malawi, Zomba Plateau)"
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
                                            Featured Experience
                                        </label>
                                    </div>
                                    <p className="text-xs text-muted-foreground pl-6">
                                        Featured experiences are highlighted on the homepage
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

                                <div className="space-y-2">
                                    <label htmlFor="duration" className="text-sm font-medium">
                                        Duration <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="duration"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 3 hours, Half day, Full day"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="maxParticipants" className="text-sm font-medium">
                                        Maximum Participants
                                    </label>
                                    <Input
                                        id="maxParticipants"
                                        name="maxParticipants"
                                        type="number"
                                        min="1"
                                        value={formData.maxParticipants}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>What's Included</CardTitle>
                                        <CardDescription>List items that are included in this experience</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex space-x-2">
                                                <Input
                                                    value={newIncluded}
                                                    onChange={(e) => setNewIncluded(e.target.value)}
                                                    placeholder="Add included item"
                                                />
                                                <Button type="button" onClick={addIncluded}>
                                                    Add
                                                </Button>
                                            </div>
                                            {formData.included.length > 0 && (
                                                <ul className="space-y-2">
                                                    {formData.included.map((item, index) => (
                                                        <li key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                                                            <span>{item}</span>
                                                            <Button type="button" variant="ghost" size="sm" onClick={() => removeIncluded(item)}>
                                                                Remove
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Requirements</CardTitle>
                                        <CardDescription>List requirements for participants</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex space-x-2">
                                                <Input
                                                    value={newRequirement}
                                                    onChange={(e) => setNewRequirement(e.target.value)}
                                                    placeholder="Add requirement"
                                                />
                                                <Button type="button" onClick={addRequirement}>
                                                    Add
                                                </Button>
                                            </div>
                                            {formData.requirements.length > 0 && (
                                                <ul className="space-y-2">
                                                    {formData.requirements.map((item, index) => (
                                                        <li key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                                                            <span>{item}</span>
                                                            <Button type="button" variant="ghost" size="sm" onClick={() => removeRequirement(item)}>
                                                                Remove
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="images" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Images</CardTitle>
                                <CardDescription>Upload and manage images for this experience</CardDescription>
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
                                                <div className="relative group">
                                                    <div className="aspect-video relative rounded-md overflow-hidden border">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop"
                                                            alt="Lake Malawi Boat Tour"
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <div className="flex space-x-2">
                                                            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                                                                Edit
                                                            </Button>
                                                            <Button variant="destructive" size="sm">
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <div className="mt-6 flex items-center justify-end space-x-4">
                        <Button variant="outline" type="button" onClick={() => router.push("/admin/experiences")}>
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
                  Save {isEditing ? "Changes" : "Experience"}
                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </Tabs>
        </div>
    )
}

