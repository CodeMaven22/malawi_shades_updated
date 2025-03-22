"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Edit, Filter, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for bookings
const bookings = [
    {
        id: "B12345",
        user: "John Doe",
        userEmail: "john.doe@example.com",
        type: "Accommodation",
        item: "Lakeside Villa",
        date: "2023-04-15",
        checkIn: "2023-04-20",
        checkOut: "2023-04-25",
        guests: 4,
        amount: "$1,250",
        status: "Confirmed",
    },
    {
        id: "B12346",
        user: "Jane Smith",
        userEmail: "jane.smith@example.com",
        type: "Tourism Site",
        item: "Mount Mulanje",
        date: "2023-04-14",
        checkIn: "2023-04-22",
        checkOut: "2023-04-22",
        guests: 2,
        amount: "$160",
        status: "Pending",
    },
    {
        id: "B12347",
        user: "Robert Johnson",
        userEmail: "robert.j@example.com",
        type: "Experience",
        item: "Lake Malawi Boat Tour",
        date: "2023-04-13",
        checkIn: "2023-04-21",
        checkOut: "2023-04-21",
        guests: 3,
        amount: "$135",
        status: "Confirmed",
    },
    {
        id: "B12348",
        user: "Emily Davis",
        userEmail: "emily.d@example.com",
        type: "Accommodation",
        item: "Safari Lodge",
        date: "2023-04-12",
        checkIn: "2023-04-18",
        checkOut: "2023-04-20",
        guests: 2,
        amount: "$280",
        status: "Cancelled",
    },
    {
        id: "B12349",
        user: "Michael Wilson",
        userEmail: "michael.w@example.com",
        type: "Tourism Site",
        item: "Liwonde National Park",
        date: "2023-04-11",
        checkIn: "2023-04-19",
        checkOut: "2023-04-19",
        guests: 5,
        amount: "$325",
        status: "Confirmed",
    },
    {
        id: "B12350",
        user: "Sarah Brown",
        userEmail: "sarah.b@example.com",
        type: "Experience",
        item: "Cultural Village Visit",
        date: "2023-04-10",
        checkIn: "2023-04-17",
        checkOut: "2023-04-17",
        guests: 4,
        amount: "$140",
        status: "Confirmed",
    },
    {
        id: "B12351",
        user: "David Miller",
        userEmail: "david.m@example.com",
        type: "Accommodation",
        item: "City View Apartment",
        date: "2023-04-09",
        checkIn: "2023-04-16",
        checkOut: "2023-04-19",
        guests: 2,
        amount: "$240",
        status: "Pending",
    },
    {
        id: "B12352",
        user: "Jennifer Taylor",
        userEmail: "jennifer.t@example.com",
        type: "Tourism Site",
        item: "Zomba Plateau",
        date: "2023-04-08",
        checkIn: "2023-04-15",
        checkOut: "2023-04-15",
        guests: 3,
        amount: "$120",
        status: "No-show",
    },
]

export default function BookingsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [typeFilter, setTypeFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    // Filter bookings based on search query and filters
    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch =
            booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.item.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesType = typeFilter === "all" || booking.type.toLowerCase() === typeFilter.toLowerCase()
        const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesType && matchesStatus
    })

    // Calculate statistics
    const totalBookings = bookings.length
    const confirmedBookings = bookings.filter((booking) => booking.status === "Confirmed").length
    const pendingBookings = bookings.filter((booking) => booking.status === "Pending").length
    const cancelledBookings = bookings.filter(
        (booking) => booking.status === "Cancelled" || booking.status === "No-show",
    ).length

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
                <p className="text-muted-foreground">Manage all bookings across your platform</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalBookings}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{confirmedBookings}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{pendingBookings}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Cancelled/No-show</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{cancelledBookings}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-auto flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search bookings..."
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
                                <SelectItem value="accommodation">Accommodation</SelectItem>
                                <SelectItem value="tourism site">Tourism Site</SelectItem>
                                <SelectItem value="experience">Experience</SelectItem>
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
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="no-show">No-show</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <Button variant="outline" size="sm">
                            Date Range
                        </Button>
                    </div>
                </div>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Guests</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                                    No bookings found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredBookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-medium">{booking.id}</TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{booking.user}</div>
                                            <div className="text-xs text-muted-foreground">{booking.userEmail}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{booking.type}</TableCell>
                                    <TableCell>{booking.item}</TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{booking.checkIn}</div>
                                            {booking.checkIn !== booking.checkOut && (
                                                <div className="text-xs text-muted-foreground">to {booking.checkOut}</div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>{booking.guests}</TableCell>
                                    <TableCell>{booking.amount}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                booking.status === "Confirmed"
                                                    ? "success"
                                                    : booking.status === "Pending"
                                                        ? "warning"
                                                        : "secondary"
                                            }
                                        >
                                            {booking.status}
                                        </Badge>
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
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Update Status
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
                    Showing <strong>{filteredBookings.length}</strong> of <strong>{bookings.length}</strong> bookings
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

