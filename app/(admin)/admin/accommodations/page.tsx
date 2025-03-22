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

// Mock data for accommodations
const accommodations = [
    {
        id: 1,
        name: "Lakeside Villa",
        type: "Villa",
        location: "Lake Malawi, Mangochi",
        price: "$250",
        status: "Active",
        featured: true,
    },
    {
        id: 2,
        name: "Mountain View Villa",
        type: "Villa",
        location: "Zomba Plateau",
        price: "$220",
        status: "Active",
        featured: false,
    },
    {
        id: 3,
        name: "Beachfront Villa",
        type: "Villa",
        location: "Cape Maclear",
        price: "$280",
        status: "Active",
        featured: true,
    },
    {
        id: 4,
        name: "Palm Beach Resort",
        type: "Resort",
        location: "Lake Malawi, Mangochi",
        price: "$180",
        status: "Active",
        featured: true,
    },
    {
        id: 5,
        name: "Sunset Bay Resort",
        type: "Resort",
        location: "Zomba Plateau",
        price: "$150",
        status: "Inactive",
        featured: false,
    },
    {
        id: 6,
        name: "City View Apartment",
        type: "Apartment",
        location: "Lilongwe City Center",
        price: "$80",
        status: "Active",
        featured: false,
    },
    {
        id: 7,
        name: "Forest Lodge",
        type: "Lodge",
        location: "Nyika National Park",
        price: "$120",
        status: "Active",
        featured: true,
    },
    {
        id: 8,
        name: "Safari Lodge",
        type: "Lodge",
        location: "Liwonde National Park",
        price: "$140",
        status: "Active",
        featured: false,
    },
]

export default function AccommodationsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [typeFilter, setTypeFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const router = useRouter()

    // Filter accommodations based on search query and filters
    const filteredAccommodations = accommodations.filter((accommodation) => {
        const matchesSearch =
            accommodation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            accommodation.location.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesType = typeFilter === "all" || accommodation.type.toLowerCase() === typeFilter.toLowerCase()
        const matchesStatus = statusFilter === "all" || accommodation.status.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesType && matchesStatus
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Accommodations</h1>
                    <p className="text-muted-foreground">Manage your accommodation listings</p>
                </div>
                <Button onClick={() => router.push("/admin/accommodations/new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Accommodation
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-auto flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search accommodations..."
                        className="pl-9 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="resort">Resort</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="lodge">Lodge</SelectItem>
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
                            <TableHead>Type</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAccommodations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                    No accommodations found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAccommodations.map((accommodation) => (
                                <TableRow key={accommodation.id}>
                                    <TableCell className="font-medium">{accommodation.name}</TableCell>
                                    <TableCell>{accommodation.type}</TableCell>
                                    <TableCell>{accommodation.location}</TableCell>
                                    <TableCell>{accommodation.price}</TableCell>
                                    <TableCell>
                                        <Badge variant={accommodation.status === "Active" ? "success" : "secondary"}>
                                            {accommodation.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {accommodation.featured ? (
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
                    Showing <strong>{filteredAccommodations.length}</strong> of <strong>{accommodations.length}</strong>{" "}
                    accommodations
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

