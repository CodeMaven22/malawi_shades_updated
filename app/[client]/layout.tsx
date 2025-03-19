import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ClientLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </>
    )
}

