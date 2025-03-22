"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Trash2, Upload } from "lucide-react"

// Mock data for a single page
const pageData = {
    id: 1,
    title: "About Us",
    slug: "/about",
    content:
        "<h1>About Malawi Shades</h1><p>Your premier platform for finding the best accommodations and tourism experiences in Malawi.</p>",
    metaTitle: "About Us | Malawi Shades",
    metaDescription:
        "Learn about Malawi Shades - your premier platform for finding accommodations and tourism experiences in Malawi.",
    category: "main",
    status: "published",
    author: "Admin User",
    lastUpdated: "2023-04-14",
}

export default function PageForm() {
    const params = useParams()
    const router = useRouter()
    const isEditing = params.id !== "new"

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        category: "main",
        status: "draft",
    })

    const [isLoading, setIsLoading] = useState(false)

    // Load page data if editing
    useEffect(() => {
        if (isEditing) {
            // In a real app, you would fetch the data from your API
            setFormData({
                title: pageData.title,
                slug: pageData.slug,
                content: pageData.content,
                metaTitle: pageData.metaTitle,
                metaDescription: pageData.metaDescription,
                category: pageData.category,
                status: pageData.status,
            })
        }
    }, [isEditing])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setFormData((prev) => ({
            ...prev,
            title,
            // Generate slug from title if it's a new page or the slug hasn't been manually edited
            slug: isEditing
                ? prev.slug
                : `/${title
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")}`,
            // Generate meta title from title if it hasn't been manually edited
            metaTitle:
                prev.metaTitle === "" || prev.metaTitle === `${prev.title} | Malawi Shades`
                    ? `${title} | Malawi Shades`
                    : prev.metaTitle,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // In a real app, you would send the data to your API
            console.log("Submitting form data:", formData)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Redirect to pages list
            router.push("/admin/pages")
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
                    <Button variant="ghost" size="icon" onClick={() => router.push("/admin/pages")} className="mr-2">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {isEditing ? `Edit "${formData.title}"` : "Create New Page"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEditing ? "Update page content and settings" : "Create a new website page"}
                        </p>
                    </div>
                </div>

                {isEditing && (
                    <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                )}
            </div>

            <Tabs defaultValue="content">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit}>
                    <TabsContent value="content" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Page Content</CardTitle>
                                <CardDescription>Create and edit your page content</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="text-sm font-medium">
                                            Page Title <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleTitleChange}
                                            placeholder="Enter page title"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="slug" className="text-sm font-medium">
                                            Slug <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex items-center">
                                            <span className="mr-1 text-muted-foreground">malawishades.com</span>
                                            <Input
                                                id="slug"
                                                name="slug"
                                                value={formData.slug}
                                                onChange={handleInputChange}
                                                placeholder="/page-slug"
                                                required
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">The URL path for this page</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="content" className="text-sm font-medium">
                                            Content <span className="text-red-500">*</span>
                                        </label>
                                        <Textarea
                                            id="content"
                                            name="content"
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            placeholder="Enter page content (HTML supported)"
                                            rows={12}
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">HTML formatting is supported</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="seo" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Settings</CardTitle>
                                <CardDescription>Optimize your page for search engines</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="metaTitle" className="text-sm font-medium">
                                            Meta Title
                                        </label>
                                        <Input
                                            id="metaTitle"
                                            name="metaTitle"
                                            value={formData.metaTitle}
                                            onChange={handleInputChange}
                                            placeholder="Enter meta title"
                                        />
                                        <p className="text-xs text-muted-foreground">Appears in browser tab and search results</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="metaDescription" className="text-sm font-medium">
                                            Meta Description
                                        </label>
                                        <Textarea
                                            id="metaDescription"
                                            name="metaDescription"
                                            value={formData.metaDescription}
                                            onChange={handleInputChange}
                                            placeholder="Enter meta description"
                                            rows={3}
                                        />
                                        <p className="text-xs text-muted-foreground">Displayed in search engine results</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Featured Image</CardTitle>
                                <CardDescription>Add a featured image for social sharing</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <div className="flex flex-col items-center">
                                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                        <p className="text-sm text-muted-foreground mb-1">Drag and drop an image here or click to browse</p>
                                        <p className="text-xs text-muted-foreground">Recommended size: 1200 x 630 pixels</p>
                                        <Button variant="outline" size="sm" className="mt-4">
                                            Upload Image
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Page Settings</CardTitle>
                                <CardDescription>Configure page options</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="category" className="text-sm font-medium">
                                            Category
                                        </label>
                                        <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="main">Main</SelectItem>
                                                <SelectItem value="legal">Legal</SelectItem>
                                                <SelectItem value="support">Support</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="status" className="text-sm font-medium">
                                            Status
                                        </label>
                                        <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="published">Published</SelectItem>
                                                <SelectItem value="draft">Draft</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <div className="mt-6 flex items-center justify-end space-x-4">
                        <Button variant="outline" type="button" onClick={() => router.push("/admin/pages")}>
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
                                    {formData.status === "published" ? "Publish" : "Save Draft"}
                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </Tabs>
        </div>
    )
}

