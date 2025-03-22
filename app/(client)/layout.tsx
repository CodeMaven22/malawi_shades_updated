import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {Raleway} from "next/font/google";
import {Metadata} from "next";
import "../globals.css";

const raleway = Raleway({
    subsets: ["latin"],
    weight: "400"
})


export const metadata: Metadata = {
    title: "Malawi Shades | Discover the Warm Heart of Africa",
    description: "Your premier platform for finding accommodations and tourism experiences in Malawi",
};


export default function ClientLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${raleway.className} flex min-h-screen flex-col`}>
                <Header />
                    <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    )
}

