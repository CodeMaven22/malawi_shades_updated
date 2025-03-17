"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Building2,
    MapPin,
    Compass,
    Users,
    CalendarCheck,
    ImageIcon,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    FileText,
    MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AdminSidebar() {
    const router = useRouter()
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    const handleLogout = () => {
        // In a real app, you would clear auth tokens/cookies here
        router.push("/admin")
    }

    const navItems = [
        {
            title: "Dashboard",
            href: "/admin/dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
            title: "Accommodations",
            href: "/admin/accommodations",
            icon: <Building2 className="h-5 w-5" />,
        },
        {
            title: "Tourism Sites",
            href: "/admin/tourism-sites",
            icon: <MapPin className="h-5 w-5" />,
        },
        {
            title: "Experiences",
            href: "/admin/experiences",
            icon: <Compass className="h-5 w-5" />,
        },
        {
            title: "Users",
            href: "/admin/users",
            icon: <Users className="h-5 w-5" />,
        },
        {
            title: "Bookings",
            href: "/admin/bookings",
            icon: <CalendarCheck className="h-5 w-5" />,
        },
        {
            title: "Media Library",
            href: "/admin/media",
            icon: <ImageIcon className="h-5 w-5" />,
        },
        {
            title: "Pages",
            href: "/admin/pages",
            icon: <FileText className="h-5 w-5" />,
        },
        {
            title: "Messages",
            href: "/admin/messages",
            icon: <MessageSquare className="h-5 w-5" />,
        },
        {
            title: "Settings",
            href: "/admin/settings",
            icon: <Settings className="h-5 w-5" />,
        },
    ]

    return (
        <div
            className={cn(
                "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
                collapsed ? "w-16" : "w-64",
            )}
        >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                {!collapsed && (
                    <div className="flex items-center">
                        <MapPin className="h-6 w-6 text-malawi-green" />
                        <span className="ml-2 font-bold text-lg">Malawi Admin</span>
                    </div>
                )}
                <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="ml-auto">
                    {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </Button>
            </div>

            <div className="flex-1 py-4 overflow-y-auto">
                <nav className="space-y-1 px-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                pathname === item.href ? "bg-malawi-green/10 text-malawi-green" : "text-gray-700 hover:bg-gray-100",
                                collapsed && "justify-center",
                            )}
                        >
                            {item.icon}
                            {!collapsed && <span className="ml-3">{item.title}</span>}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-200">
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className={cn(
                        "flex items-center w-full text-red-600 hover:bg-red-50 hover:text-red-700",
                        collapsed && "justify-center",
                    )}
                >
                    <LogOut className="h-5 w-5" />
                    {!collapsed && <span className="ml-2">Logout</span>}
                </Button>
            </div>
        </div>
    )
}

