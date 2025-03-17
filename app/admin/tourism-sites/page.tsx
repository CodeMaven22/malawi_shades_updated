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

// Mock data for tourism sites
const tourismSites = [
    {
        id: 1,
        name: "Lake Malawi National Park",
        category: "Nature",
        location: "Cape Maclear",
        price: "$45",
        status: "Active",
        featured: true,
    },
    {
        id: 2,
        name: "Liwonde National Park",
        category: "Wildlife",
        location: "Southern Malawi",
        price: "$65",
        status: "Active",
        featured: true,
    },
    {
        id: 3,
        name: "Mount Mulanje",
        category: "Adventure",
        location: "Mulanje",
        price: "$80",
        status: "Active",
        featured: false,
    },
    {
        id: 4,
        name: "Zomba Plateau",
        category: "Nature",
        location: "Zomba",
        price: "$40",
        status: "Active",
        featured: false,
    },
    {
        id: 5,
        name: "Nyika National Park",
        category: "Wildlife",
        location: "Northern Malawi",
        price: "$70",
        status: "Active",
        featured: true,
    },
    {
        id: 6,
        name: "Livingstonia",
        category: "Cultural",
        location: "Northern Region",
        price: "$35",
        status: "Inactive",
        featured: false,
    },
    {
        id: 7,
        name: "Chongoni Rock Art",
        category: "Cultural",
        location: "Dedza",
        price: "$25",
        status: "Active",
        featured: false,
    },
    {
        id: 8,
        name: "Nkhotakota Wildlife Reserve",
        category: "Wildlife",
        location: "Central Malawi",
        price: "$55",
        status: "Active",
        featured: false,
    },
]

export default function TourismSitesPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    // Filter tourism sites based on search query and filters
    const filteredTourismSites = tourismSites.filter((site) => {
        const matchesSearch =
            site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            site.location.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory = categoryFilter === "all" || site.category.toLowerCase() === categoryFilter.toLowerCase()
        const matchesStatus = statusFilter === "all" || site.status.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesCategory && matchesStatus
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Tourism Sites</h1>
                    <p className="text-muted-foreground">Manage your tourism site listings</p>
                </div>
                <Button onClick={() => router.push("/admin/tourism-sites/new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tourism Site
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-auto flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search tourism sites..."
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
                                <SelectItem value="nature">Nature</SelectItem>
                                <SelectItem value="wildlife">Wildlife</SelectItem>
                                <SelectItem value="adventure">Adventure</SelectItem>
                                <SelectItem value="cultural">Cultural</SelectItem>
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
                            <TableHead>Status</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTourismSites.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                    No tourism sites found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredTourismSites.map((site) => (
                                <TableRow key={site.id}>
                                    <TableCell className="font-medium">{site.name}</TableCell>
                                    <TableCell>{site.category}</TableCell>
                                    <TableCell>{site.location}</TableCell>
                                    <TableCell>{site.price}</TableCell>
                                    <TableCell>
                                        <Badge variant={site.status === "Active" ? "success" : "secondary"}>{site.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        {site.featured ? (
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
                    Showing <strong>{filteredTourismSites.length}</strong> of <strong>{tourismSites.length}</strong> tourism sites
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

