"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import "../../globals.css";
import { Raleway } from "next/font/google"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

const raleway = Raleway({
    subsets: ["latin"],
    weight: "400"
})

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()

    // Check if we're on the login page (root admin path)
    const isLoginPage = pathname === "/admin"

    // If on login page, render without sidebar
    if (isLoginPage) {
        return (
            <html lang="en">
                <body className={`${raleway.className} min-h-screen bg-gray-100`}>
                     {children}
                </body>
            </html>
        )
    }

    // If on any other admin page, render with sidebar
    return (
        <html lang="en">
            <body className={`${raleway.className}`}>
                <div className="min-h-screen bg-gray-100 flex">
                <AdminSidebar />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <AdminHeader />
                        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    )
}

