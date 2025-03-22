"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Trash2 } from "lucide-react"

// Mock data for a single user
const userData = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+265 1234 5678",
    role: "customer",
    isActive: true,
    emailVerified: true,
    address: {
        addressLine1: "123 Lake Shore Drive",
        addressLine2: "",
        city: "Mangochi",
        state: "",
        postalCode: "",
        country: "Malawi",
    },
}

export default function UserForm() {
    const params = useParams()
    const router = useRouter()
    const isEditing = params.id !== "new"

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "customer",
        isActive: true,
        emailVerified: false,
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "Malawi",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [passwordError, setPasswordError] = useState("")

    // Load user data if editing
    useEffect(() => {
        if (isEditing) {
            // In a real app, you would fetch the data from your API
            setFormData({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone,
                password: "",
                confirmPassword: "",
                role: userData.role,
                isActive: userData.isActive,
                emailVerified: userData.emailVerified,
                addressLine1: userData.address.addressLine1,
                addressLine2: userData.address.addressLine2,
                city: userData.address.city,
                state: userData.address.state,
                postalCode: userData.address.postalCode,
                country: userData.address.country,
            })
        }
    }, [isEditing])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear password error when user types in password fields
        if (name === "password" || name === "confirmPassword") {
            setPasswordError("")
        }
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData((prev) => ({ ...prev, [name]: checked }))
    }

    const validatePasswords = () => {
        if (!isEditing && !formData.password) {
            setPasswordError("Password is required for new users")
            return false
        }

        if (formData.password && formData.password.length < 8) {
            setPasswordError("Password must be at least 8 characters long")
            return false
        }

        if (formData.password && formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords do not match")
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validatePasswords()) {
            return
        }

        setIsLoading(true)

        try {
            // In a real app, you would send the data to your API
            console.log("Submitting form data:", formData)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Redirect to users list
            router.push("/admin/users")
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" onClick={() => router.push("/admin/users")} className="mr-2">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {isEditing ? `Edit ${formData.firstName} ${formData.lastName}` : "Add New User"}
                        </h1>
                        <p className="text-muted-foreground">{isEditing ? "Update user details" : "Create a new user account"}</p>
                    </div>
                </div>

                {isEditing && (
                    <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                )}
            </div>

            <Tabs defaultValue="account">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="address">Address</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit}>
                    <TabsContent value="account" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Basic user information</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-sm font-medium">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter first name"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-sm font-medium">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter last name"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter email address"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium">
                                            Phone
                                        </label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                                <CardDescription>User role and account status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="role" className="text-sm font-medium">
                                            Role <span className="text-red-500">*</span>
                                        </label>
                                        <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="manager">Manager</SelectItem>
                                                <SelectItem value="editor">Editor</SelectItem>
                                                <SelectItem value="customer">Customer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="isActive"
                                                checked={formData.isActive}
                                                onCheckedChange={(checked) => handleCheckboxChange("isActive", checked as boolean)}
                                            />
                                            <label
                                                htmlFor="isActive"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Active Account
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="emailVerified"
                                                checked={formData.emailVerified}
                                                onCheckedChange={(checked) => handleCheckboxChange("emailVerified", checked as boolean)}
                                            />
                                            <label
                                                htmlFor="emailVerified"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Email Verified
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {(!isEditing || formData.password) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>
                                        {isEditing ? "Change user password (leave blank to keep current password)" : "Set user password"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="password" className="text-sm font-medium">
                                                Password {!isEditing && <span className="text-red-500">*</span>}
                                            </label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder={isEditing ? "New password" : "Enter password"}
                                                required={!isEditing}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="confirmPassword" className="text-sm font-medium">
                                                Confirm Password {!isEditing && <span className="text-red-500">*</span>}
                                            </label>
                                            <Input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                placeholder="Confirm password"
                                                required={!isEditing}
                                            />
                                        </div>
                                    </div>
                                    {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="address" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Address Information</CardTitle>
                                <CardDescription>User's address details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="addressLine1" className="text-sm font-medium">
                                            Address Line 1
                                        </label>
                                        <Input
                                            id="addressLine1"
                                            name="addressLine1"
                                            value={formData.addressLine1}
                                            onChange={handleInputChange}
                                            placeholder="Street address"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="addressLine2" className="text-sm font-medium">
                                            Address Line 2
                                        </label>
                                        <Input
                                            id="addressLine2"
                                            name="addressLine2"
                                            value={formData.addressLine2}
                                            onChange={handleInputChange}
                                            placeholder="Apartment, suite, etc."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="city" className="text-sm font-medium">
                                                City
                                            </label>
                                            <Input
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="City"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="state" className="text-sm font-medium">
                                                State/Province
                                            </label>
                                            <Input
                                                id="state"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                placeholder="State or province"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="postalCode" className="text-sm font-medium">
                                                Postal Code
                                            </label>
                                            <Input
                                                id="postalCode"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                placeholder="Postal code"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="country" className="text-sm font-medium">
                                                Country
                                            </label>
                                            <Input
                                                id="country"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                placeholder="Country"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <div className="mt-6 flex items-center justify-end space-x-4">
                        <Button variant="outline" type="button" onClick={() => router.push("/admin/users")}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
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
                  Saving...
                </span>
                            ) : (
                                <span className="flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save {isEditing ? "Changes" : "User"}
                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </Tabs>
        </div>
    )
}

