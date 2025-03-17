"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Lock } from "lucide-react"

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            // In a real app, you would authenticate with your API
            // For demo purposes, we'll just redirect to the admin dashboard
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // For demo, let's use a simple validation
            if (email === "admin@malawishades.com" && password === "password") {
                router.push("/admin/dashboard")
            } else {
                setError("Invalid email or password")
            }
        } catch (error) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <MapPin className="h-8 w-8 text-malawi-green" />
                        <span className="ml-2 text-2xl font-bold">
              Malawi <span className="text-malawi-green">Shades</span>
            </span>
                    </div>
                    <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
                    <CardDescription className="text-center">Enter your credentials to access the admin panel</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@malawishades.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center">
                  <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                  >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
                            ) : (
                                <span className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Login
                </span>
                            )}
                        </Button>
                    </CardFooter>
                </form>
                <div className="p-4 text-center text-sm text-muted-foreground">
                    <p>Demo credentials:</p>
                    <p>Email: admin@malawishades.com</p>
                    <p>Password: password</p>
                </div>
            </Card>
        </div>
    )
}

