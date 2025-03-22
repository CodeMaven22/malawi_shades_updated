"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Trash2, Filter, Mail, MailOpen, Reply } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for messages
const messages = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        subject: "Booking Inquiry",
        message: "I'm interested in booking the Lakeside Villa for next month. Do you have availability?",
        date: "2023-04-15",
        isRead: true,
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        subject: "Special Requirements",
        message: "We have some dietary restrictions. Can you accommodate these at your restaurant?",
        date: "2023-04-14",
        isRead: false,
    },
    {
        id: 3,
        name: "Robert Johnson",
        email: "robert.j@example.com",
        subject: "Cancellation Policy",
        message: "Could you please explain your cancellation policy for the Safari Adventure?",
        date: "2023-04-13",
        isRead: false,
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily.d@example.com",
        subject: "Transportation Options",
        message: "What transportation options are available from the airport to your resort?",
        date: "2023-04-12",
        isRead: true,
    },
    {
        id: 5,
        name: "Michael Wilson",
        email: "michael.w@example.com",
        subject: "Group Booking",
        message: "We're a group of 10 people looking to book several rooms. Do you offer group discounts?",
        date: "2023-04-11",
        isRead: true,
    },
    {
        id: 6,
        name: "Sarah Brown",
        email: "sarah.b@example.com",
        subject: "Accessibility Features",
        message: "Do your accommodations have wheelchair accessibility features?",
        date: "2023-04-10",
        isRead: false,
    },
    {
        id: 7,
        name: "David Miller",
        email: "david.m@example.com",
        subject: "Payment Methods",
        message: "What payment methods do you accept for bookings?",
        date: "2023-04-09",
        isRead: true,
    },
    {
        id: 8,
        name: "Jennifer Taylor",
        email: "jennifer.t@example.com",
        subject: "Feedback on Stay",
        message: "I wanted to share some feedback about our recent stay at your resort...",
        date: "2023-04-08",
        isRead: true,
    },
]

export default function MessagesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    // Filter messages based on search query and filters
    const filteredMessages = messages.filter((message) => {
        const matchesSearch =
            message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            message.subject.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "read" && message.isRead) ||
            (statusFilter === "unread" && !message.isRead)

        return matchesSearch && matchesStatus
    })

    // Calculate statistics
    const totalMessages = messages.length
    const unreadMessages = messages.filter((message) => !message.isRead).length
    const readMessages = messages.filter((message) => message.isRead).length

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
                <p className="text-muted-foreground">Manage contact form messages and inquiries</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalMessages}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{unreadMessages}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Read Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{readMessages}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-auto flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search messages..."
                        className="pl-9 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Messages</SelectItem>
                                <SelectItem value="read">Read</SelectItem>
                                <SelectItem value="unread">Unread</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button variant="outline" size="sm">
                        Mark All as Read
                    </Button>
                </div>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]">Status</TableHead>
                            <TableHead>From</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredMessages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No messages found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredMessages.map((message) => (
                                <TableRow key={message.id} className={message.isRead ? "" : "bg-blue-50 dark:bg-blue-900/10"}>
                                    <TableCell>
                                        {message.isRead ? (
                                            <MailOpen className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <Mail className="h-4 w-4 text-blue-600" />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className={`font-medium ${!message.isRead ? "font-semibold" : ""}`}>{message.name}</div>
                                            <div className="text-xs text-muted-foreground">{message.email}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={`${!message.isRead ? "font-semibold" : ""}`}>
                                            {message.subject}
                                            <div className="text-xs text-muted-foreground truncate max-w-[300px]">{message.message}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{message.date}</TableCell>
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
                                                    View Message
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Reply className="h-4 w-4 mr-2" />
                                                    Reply
                                                </DropdownMenuItem>
                                                {!message.isRead ? (
                                                    <DropdownMenuItem>
                                                        <MailOpen className="h-4 w-4 mr-2" />
                                                        Mark as Read
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem>
                                                        <Mail className="h-4 w-4 mr-2" />
                                                        Mark as Unread
                                                    </DropdownMenuItem>
                                                )}
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
                    Showing <strong>{filteredMessages.length}</strong> of <strong>{messages.length}</strong> messages
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

