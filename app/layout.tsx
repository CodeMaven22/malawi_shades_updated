import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={`${inter.className} flex min-h-screen flex-col`}>{children}</body>
      </html>
  )
}

