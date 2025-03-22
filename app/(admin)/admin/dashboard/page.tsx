import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, MapPin, Compass, Users, CalendarCheck, TrendingUp, TrendingDown } from "lucide-react"

export default function AdminDashboard() {
    // This would normally come from your database
    const stats = [
        {
            title: "Total Accommodations",
            value: 124,
            change: 12,
            trend: "up",
            icon: <Building2 className="h-5 w-5" />,
        },
        {
            title: "Tourism Sites",
            value: 48,
            change: 8,
            trend: "up",
            icon: <MapPin className="h-5 w-5" />,
        },
        {
            title: "Experiences",
            value: 36,
            change: 4,
            trend: "up",
            icon: <Compass className="h-5 w-5" />,
        },
        {
            title: "Registered Users",
            value: 1248,
            change: 86,
            trend: "up",
            icon: <Users className="h-5 w-5" />,
        },
        {
            title: "Bookings This Month",
            value: 156,
            change: 12,
            trend: "up",
            icon: <CalendarCheck className="h-5 w-5" />,
        },
        {
            title: "Pending Approvals",
            value: 8,
            change: 2,
            trend: "down",
            icon: <CalendarCheck className="h-5 w-5" />,
        },
    ]

    // Recent bookings data
    const recentBookings = [
        {
            id: "B12345",
            user: "John Doe",
            type: "Accommodation",
            item: "Lakeside Villa",
            date: "2023-04-15",
            status: "Confirmed",
        },
        {
            id: "B12346",
            user: "Jane Smith",
            type: "Tourism Site",
            item: "Mount Mulanje",
            date: "2023-04-14",
            status: "Pending",
        },
        {
            id: "B12347",
            user: "Robert Johnson",
            type: "Experience",
            item: "Lake Malawi Boat Tour",
            date: "2023-04-13",
            status: "Confirmed",
        },
        {
            id: "B12348",
            user: "Emily Davis",
            type: "Accommodation",
            item: "Safari Lodge",
            date: "2023-04-12",
            status: "Cancelled",
        },
        {
            id: "B12349",
            user: "Michael Wilson",
            type: "Tourism Site",
            item: "Liwonde National Park",
            date: "2023-04-11",
            status: "Confirmed",
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your Malawi Shades platform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <div className="p-2 bg-primary/10 rounded-full text-primary">{stat.icon}</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="flex items-center text-xs mt-1">
                                {stat.trend === "up" ? (
                                    <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                                ) : (
                                    <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                                )}
                                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}% from last month
                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                        <CardDescription>Latest booking activities across the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-2 text-sm font-medium">ID</th>
                                    <th className="text-left py-3 px-2 text-sm font-medium">User</th>
                                    <th className="text-left py-3 px-2 text-sm font-medium">Type</th>
                                    <th className="text-left py-3 px-2 text-sm font-medium">Item</th>
                                    <th className="text-left py-3 px-2 text-sm font-medium">Date</th>
                                    <th className="text-left py-3 px-2 text-sm font-medium">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id} className="border-b">
                                        <td className="py-3 px-2 text-sm">{booking.id}</td>
                                        <td className="py-3 px-2 text-sm">{booking.user}</td>
                                        <td className="py-3 px-2 text-sm">{booking.type}</td>
                                        <td className="py-3 px-2 text-sm">{booking.item}</td>
                                        <td className="py-3 px-2 text-sm">{booking.date}</td>
                                        <td className="py-3 px-2 text-sm">
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                booking.status === "Confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                            }`}
                        >
                          {booking.status}
                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Activity Log</CardTitle>
                        <CardDescription>Recent system activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="mr-4 mt-0.5">
                                    <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">New accommodation added</p>
                                    <p className="text-sm text-muted-foreground">Luxury Beach Villa was added by Admin</p>
                                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mr-4 mt-0.5">
                                    <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Booking confirmed</p>
                                    <p className="text-sm text-muted-foreground">Booking #B12345 was confirmed</p>
                                    <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mr-4 mt-0.5">
                                    <span className="flex h-2 w-2 rounded-full bg-yellow-500"></span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">User registered</p>
                                    <p className="text-sm text-muted-foreground">New user Emily Davis registered</p>
                                    <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mr-4 mt-0.5">
                                    <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Booking cancelled</p>
                                    <p className="text-sm text-muted-foreground">Booking #B12348 was cancelled</p>
                                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mr-4 mt-0.5">
                                    <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Tourism site updated</p>
                                    <p className="text-sm text-muted-foreground">Lake Malawi National Park details were updated</p>
                                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

