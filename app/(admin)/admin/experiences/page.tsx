"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

// Mock data for experiences
const experiences = [
    {
        id: 1,
        name: "Lake Malawi Boat Tours",
        category: "Water Activities",
        location: "Lake Malawi",
        price: "$45",
        duration: "3 hours",
        status: "Active",
        featured: true,
    },
    {
        id: 2,
        name: "Cultural Village Visits",
        category: "Cultural Experiences",
        location: "Various Villages",
        price: "$35",
        duration: "Half day",
        status: "Active",
        featured: true,
    },
    {
        id: 3,
        name: "Safari Adventures",
        category: "Adventure",
        location: "Liwonde National Park",
        price: "$85",
        duration: "Full day",
        status: "Active",
        featured: false,
    },
    {
        id: 4,
        name: "Hiking & Trekking",
        category: "Adventure",
        location: "Mount Mulanje",
        price: "$50",
        duration: "Full day",
        status: "Active",
        featured: false,
    },
    {
        id: 5,
        name: "Local Cuisine Workshops",
        category: "Food & Drink",
        location: "Lilongwe",
        price: "$40",
        duration: "3 hours",
        status: "Inactive",
        featured: false,
    },
    {
        id: 6,
        name: "Fishing Expeditions",
        category: "Water Activities",
        location: "Lake Malawi",
        price: "$60",
        duration: "4 hours",
        status: "Active",
        featured: true,
    },
]

export default function ExperiencesPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    // Filter experiences based on search query and filters
    const filteredExperiences = experiences.filter((experience) => {
        const matchesSearch =
            experience.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            experience.location.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory =
            categoryFilter === "all" || experience.category.toLowerCase().includes(categoryFilter.toLowerCase())
        const matchesStatus = statusFilter === "all" || experience.status.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesCategory && matchesStatus
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Experiences</h1>
                    <p className="text-muted-foreground">Manage your experience listings</p>
                </div>
                <Button onClick={() => router.push("/admin/experiences/new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-auto flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search experiences..."
                        className="pl-9 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="water">Water Activities</SelectItem>
                                <SelectItem value="cultural">Cultural Experiences</SelectItem>
                                <SelectItem value="adventure">Adventure</SelectItem>
                                <SelectItem value="food">Food & Drink</SelectItem>
                                <SelectItem value="wellness">Wellness</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredExperiences.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    No experiences found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredExperiences.map((experience) => (
                                <TableRow key={experience.id}>
                                    <TableCell className="font-medium">{experience.name}</TableCell>
                                    <TableCell>{experience.category}</TableCell>
                                    <TableCell>{experience.location}</TableCell>
                                    <TableCell>{experience.price}</TableCell>
                                    <TableCell>{experience.duration}</TableCell>
                                    <TableCell>
                                        <Badge variant={experience.status === "Active" ? "success" : "secondary"}>
                                            {experience.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {experience.featured ? (
                                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                                Featured
                                            </Badge>
                                        ) : (
                                            <span className="text-muted-foreground text-sm">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Actions</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing <strong>{filteredExperiences.length}</strong> of <strong>{experiences.length}</strong> experiences
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

