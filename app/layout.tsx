import type React from "react"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import "./globals.css"

const raleway = Raleway({
    subsets: ["latin"],
    weight: "400"
})

export const metadata: Metadata = {
  title: "Malawi Shades | Discover the Warm Heart of Africa",
  description: "Your premier platform for finding accommodations and tourism experiences in Malawi",
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={`${raleway.className} flex min-h-screen flex-col`}>{children}</body>
      </html>
  )
}

