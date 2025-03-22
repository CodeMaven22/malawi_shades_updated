"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Filter, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

// Mock data for pages
const pages = [
    {
        id: 1,
        title: "Home",
        slug: "/",
        category: "Main",
        status: "Published",
        author: "Admin User",
        lastUpdated: "2023-04-15",
    },
    {
        id: 2,
        title: "About Us",
        slug: "/about",
        category: "Main",
        status: "Published",
        author: "Content Manager",
        lastUpdated: "2023-04-14",
    },
    {
        id: 3,
        title: "Contact",
        slug: "/contact",
        category: "Main",
        status: "Published",
        author: "Admin User",
        lastUpdated: "2023-04-13",
    },
    {
        id: 4,
        title: "Accommodations",
        slug: "/accommodations",
        category: "Main",
        status: "Published",
        author: "Content Manager",
        lastUpdated: "2023-04-12",
    },
    {
        id: 5,
        title: "Tourism Sites",
        slug: "/tourism",
        category: "Main",
        status: "Published",
        author: "Content Manager",
        lastUpdated: "2023-04-11",
    },
    {
        id: 6,
        title: "Experiences",
        slug: "/experiences",
        category: "Main",
        status: "Published",
        author: "Content Manager",
        lastUpdated: "2023-04-10",
    },
    {
        id: 7,
        title: "Advertise With Us",
        slug: "/advertise",
        category: "Main",
        status: "Published",
        author: "Admin User",
        lastUpdated: "2023-04-09",
    },
    {
        id: 8,
        title: "Terms and Conditions",
        slug: "/terms",
        category: "Legal",
        status: "Published",
        author: "Admin User",
        lastUpdated: "2023-04-08",
    },
    {
        id: 9,
        title: "Privacy Policy",
        slug: "/privacy",
        category: "Legal",
        status: "Published",
        author: "Admin User",
        lastUpdated: "2023-04-07",
    },
    {
        id: 10,
        title: "FAQ",
        slug: "/faq",
        category: "Support",
        status: "Draft",
        author: "Content Manager",
        lastUpdated: "2023-04-06",
    },
]

export default function PagesPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    // Filter pages based on search query and filters
    const filteredPages = pages.filter((page) => {
        const matchesSearch =
            page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            page.slug.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory = categoryFilter === "all" || page.category.toLowerCase() === categoryFilter.toLowerCase()
        const matchesStatus = statusFilter === "all" || page.status.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesCategory && matchesStatus
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
                    <p className="text-muted-foreground">Manage website pages and content</p>
                </div>
                <Button onClick={() => router.push("/admin/pages/new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Page
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-auto flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search pages..."
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
                                <SelectItem value="main">Main</SelectItem>
                                <SelectItem value="legal">Legal</SelectItem>
                                <SelectItem value="support">Support</SelectItem>
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
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                    No pages found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredPages.map((page) => (
                                <TableRow key={page.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                            {page.title}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{page.slug}</TableCell>
                                    <TableCell>{page.category}</TableCell>
                                    <TableCell>
                                        <Badge variant={page.status === "Published" ? "success" : "secondary"}>{page.status}</Badge>
                                    </TableCell>
                                    <TableCell>{page.author}</TableCell>
                                    <TableCell>{page.lastUpdated}</TableCell>
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
                    Showing <strong>{filteredPages.length}</strong> of <strong>{pages.length}</strong> pages
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

