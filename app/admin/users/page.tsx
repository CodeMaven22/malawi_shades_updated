"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, Eye, Filter, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

// Mock data for users
const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Customer",
        status: "Active",
        lastLogin: "2023-04-15",
        bookings: 3,
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Customer",
        status: "Active",
        lastLogin: "2023-04-14",
        bookings: 1,
    },
    {
        id: 3,
        name: "Robert Johnson",
        email: "robert.j@example.com",
        role: "Customer",
        status: "Active",
        lastLogin: "2023-04-13",
        bookings: 2,
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily.d@example.com",
        role: "Customer",
        status: "Inactive",
        lastLogin: "2023-03-25",
        bookings: 1,
    },
    {
        id: 5,
        name: "Michael Wilson",
        email: "michael.w@example.com",
        role: "Customer",
        status: "Active",
        lastLogin: "2023-04-11",
        bookings: 4,
    },
    {
        id: 6,
        name: "Admin User",
        email: "admin@malawishades.com",
        role: "Admin",
        status: "Active",
        lastLogin: "2023-04-15",
        bookings: 0,
    },
    {
        id: 7,
        name: "Content Manager",
        email: "content@malawishades.com",
        role: "Manager",
        status: "Active",
        lastLogin: "2023-04-14",
        bookings: 0,
    },
    {
        id: 8,
        name: "Support Staff",
        email: "support@malawishades.com",
        role: "Editor",
        status: "Active",
        lastLogin: "2023-04-13",
        bookings: 0,
    },
]

export default function UsersPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [roleFilter, setRoleFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    // Filter users based on search query and filters
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
        const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesRole && matchesStatus
    })

    // Calculate statistics
    const totalUsers = users.length
    const activeUsers = users.filter((user) => user.status === "Active").length
    const customerUsers = users.filter((user) => user.role === "Customer").length
    const staffUsers = users.filter((user) => user.role !== "Customer").length

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">Manage users and their permissions</p>
                </div>
                <Button onClick={() => router.push("/admin/users/new")}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{customerUsers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Staff</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{staffUsers}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-auto flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search users..."
                        className="pl-9 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="customer">Customer</SelectItem>
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
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Login</TableHead>
                            <TableHead>Bookings</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                user.role === "Admin"
                                                    ? "destructive"
                                                    : user.role === "Manager" || user.role === "Editor"
                                                        ? "outline"
                                                        : "secondary"
                                            }
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === "Active" ? "success" : "secondary"}>{user.status}</Badge>
                                    </TableCell>
                                    <TableCell>{user.lastLogin}</TableCell>
                                    <TableCell>{user.bookings}</TableCell>
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
                                                    View Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit User
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete User
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
                    Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
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

