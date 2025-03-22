"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Search,
    MoreHorizontal,
    Edit,
    Trash2,
    Download,
    Copy,
    Filter,
    Upload,
    ImageIcon,
    FileText,
    Video,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for media items
const mediaItems = [
    {
        id: 1,
        name: "lakeside-villa-exterior.jpg",
        type: "image",
        size: "1.2 MB",
        dimensions: "1920 x 1080",
        url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
        uploadedAt: "2023-04-15",
        category: "accommodations",
    },
    {
        id: 2,
        name: "palm-beach-resort.jpg",
        type: "image",
        size: "0.9 MB",
        dimensions: "1600 x 900",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        uploadedAt: "2023-04-14",
        category: "accommodations",
    },
    {
        id: 3,
        name: "lake-malawi-national-park.jpg",
        type: "image",
        size: "1.5 MB",
        dimensions: "2000 x 1333",
        url: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b",
        uploadedAt: "2023-04-13",
        category: "tourism",
    },
    {
        id: 4,
        name: "liwonde-national-park.jpg",
        type: "image",
        size: "1.1 MB",
        dimensions: "1800 x 1200",
        url: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285",
        uploadedAt: "2023-04-12",
        category: "tourism",
    },
    {
        id: 5,
        name: "boat-tour-experience.jpg",
        type: "image",
        size: "0.8 MB",
        dimensions: "1500 x 1000",
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
        uploadedAt: "2023-04-11",
        category: "experiences",
    },
    {
        id: 6,
        name: "malawi-tourism-brochure.pdf",
        type: "document",
        size: "2.3 MB",
        dimensions: "-",
        url: "#",
        uploadedAt: "2023-04-10",
        category: "documents",
    },
    {
        id: 7,
        name: "safari-adventure-video.mp4",
        type: "video",
        size: "15.7 MB",
        dimensions: "1920 x 1080",
        url: "#",
        uploadedAt: "2023-04-09",
        category: "experiences",
    },
    {
        id: 8,
        name: "mountain-view-villa.jpg",
        type: "image",
        size: "1.0 MB",
        dimensions: "1800 x 1200",
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
        uploadedAt: "2023-04-08",
        category: "accommodations",
    },
]

export default function MediaLibraryPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [typeFilter, setTypeFilter] = useState("all")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [selectedItems, setSelectedItems] = useState<number[]>([])

    // Filter media items based on search query and filters
    const filteredMediaItems = mediaItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = typeFilter === "all" || item.type === typeFilter
        const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

        return matchesSearch && matchesType && matchesCategory
    })

    const toggleSelectItem = (id: number) => {
        setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
    }

    const selectAll = () => {
        if (selectedItems.length === filteredMediaItems.length) {
            setSelectedItems([])
        } else {
            setSelectedItems(filteredMediaItems.map((item) => item.id))
        }
    }

    const getFileIcon = (type: string) => {
        switch (type) {
            case "image":
                return <ImageIcon className="h-12 w-12 text-blue-500" />
            case "document":
                return <FileText className="h-12 w-12 text-green-500" />
            case "video":
                return <Video className="h-12 w-12 text-red-500" />
            default:
                return <FileText className="h-12 w-12 text-gray-500" />
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
                    <p className="text-muted-foreground">Manage your images, videos, and documents</p>
                </div>
                <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-auto flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search media..."
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
                                <SelectItem value="image">Images</SelectItem>
                                <SelectItem value="document">Documents</SelectItem>
                                <SelectItem value="video">Videos</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="accommodations">Accommodations</SelectItem>
                                <SelectItem value="tourism">Tourism</SelectItem>
                                <SelectItem value="experiences">Experiences</SelectItem>
                                <SelectItem value="documents">Documents</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="grid">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="grid">Grid</TabsTrigger>
                        <TabsTrigger value="list">List</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={selectAll}>
                            {selectedItems.length === filteredMediaItems.length ? "Deselect All" : "Select All"}
                        </Button>

                        {selectedItems.length > 0 && (
                            <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Selected
                            </Button>
                        )}
                    </div>
                </div>

                <TabsContent value="grid" className="mt-6">
                    {filteredMediaItems.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">No media items found</div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredMediaItems.map((item) => (
                                <Card
                                    key={item.id}
                                    className={`overflow-hidden ${selectedItems.includes(item.id) ? "ring-2 ring-primary" : ""}`}
                                >
                                    <div className="aspect-square relative cursor-pointer" onClick={() => toggleSelectItem(item.id)}>
                                        {item.type === "image" ? (
                                            <img
                                                src={item.url || "/placeholder.svg"}
                                                alt={item.name}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                {getFileIcon(item.type)}
                                            </div>
                                        )}

                                        <div className="absolute top-2 left-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => toggleSelectItem(item.id)}
                                                className="h-4 w-4"
                                            />
                                        </div>
                                    </div>

                                    <CardContent className="p-3">
                                        <div className="truncate text-sm font-medium">{item.name}</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {item.size} • {item.uploadedAt}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="p-2 pt-0 flex justify-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Actions</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Download
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Copy className="h-4 w-4 mr-2" />
                                                    Copy URL
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="list" className="mt-6">
                    {filteredMediaItems.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">No media items found</div>
                    ) : (
                        <div className="border rounded-md">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 text-sm font-medium">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.length === filteredMediaItems.length}
                                            onChange={selectAll}
                                            className="h-4 w-4"
                                        />
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium">Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium">Type</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium">Size</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium">Dimensions</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium">Uploaded</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium">Category</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredMediaItems.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-3 px-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => toggleSelectItem(item.id)}
                                                className="h-4 w-4"
                                            />
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center">
                                                {item.type === "image" ? (
                                                    <div className="h-10 w-10 mr-3 rounded overflow-hidden">
                                                        <img
                                                            src={item.url || "/placeholder.svg"}
                                                            alt={item.name}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="h-10 w-10 mr-3 flex items-center justify-center bg-gray-100 rounded">
                                                        {getFileIcon(item.type)}
                                                    </div>
                                                )}
                                                <span className="text-sm font-medium">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm capitalize">{item.type}</td>
                                        <td className="py-3 px-4 text-sm">{item.size}</td>
                                        <td className="py-3 px-4 text-sm">{item.dimensions}</td>
                                        <td className="py-3 px-4 text-sm">{item.uploadedAt}</td>
                                        <td className="py-3 px-4 text-sm capitalize">{item.category}</td>
                                        <td className="py-3 px-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Download
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Copy className="h-4 w-4 mr-2" />
                                                        Copy URL
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing <strong>{filteredMediaItems.length}</strong> of <strong>{mediaItems.length}</strong> media items
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

