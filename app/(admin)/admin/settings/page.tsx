"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your website settings and configurations</p>
            </div>

            <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Site Information</CardTitle>
                            <CardDescription>Basic information about your website</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="site-name">Site Name</Label>
                                    <Input id="site-name" defaultValue="Malawi Shades" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="site-description">Site Description</Label>
                                    <Textarea
                                        id="site-description"
                                        defaultValue="Your premier platform for finding accommodations and tourism experiences in Malawi"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="site-url">Site URL</Label>
                                    <Input id="site-url" defaultValue="https://malawishades.com" />
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>Contact details displayed on your website</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contact-email">Contact Email</Label>
                                    <Input id="contact-email" defaultValue="info@malawishades.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contact-phone">Contact Phone</Label>
                                    <Input id="contact-phone" defaultValue="+265 1234 5678" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contact-address">Address</Label>
                                    <Textarea id="contact-address" defaultValue="123 Lake Shore Drive, Mangochi, Malawi" />
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Social Media</CardTitle>
                            <CardDescription>Links to your social media profiles</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="facebook">Facebook</Label>
                                    <Input id="facebook" defaultValue="https://facebook.com/malawishades" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="twitter">Twitter</Label>
                                    <Input id="twitter" defaultValue="https://twitter.com/malawishades" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instagram">Instagram</Label>
                                    <Input id="instagram" defaultValue="https://instagram.com/malawishades" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="youtube">YouTube</Label>
                                    <Input id="youtube" defaultValue="https://youtube.com/malawishades" />
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Theme Settings</CardTitle>
                            <CardDescription>Customize the appearance of your website</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="primary-color">Primary Color</Label>
                                    <div className="flex items-center gap-2">
                                        <Input id="primary-color" defaultValue="#339E35" />
                                        <div className="w-10 h-10 rounded-md bg-malawi-green" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="secondary-color">Secondary Color</Label>
                                    <div className="flex items-center gap-2">
                                        <Input id="secondary-color" defaultValue="#CE1126" />
                                        <div className="w-10 h-10 rounded-md bg-malawi-red" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="accent-color">Accent Color</Label>
                                    <div className="flex items-center gap-2">
                                        <Input id="accent-color" defaultValue="#FFD700" />
                                        <div className="w-10 h-10 rounded-md bg-malawi-gold" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="font">Font Family</Label>
                                    <Select defaultValue="inter">
                                        <SelectTrigger id="font">
                                            <SelectValue placeholder="Select font" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="inter">Inter</SelectItem>
                                            <SelectItem value="roboto">Roboto</SelectItem>
                                            <SelectItem value="open-sans">Open Sans</SelectItem>
                                            <SelectItem value="lato">Lato</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="dark-mode" />
                                    <Label htmlFor="dark-mode">Enable Dark Mode</Label>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Homepage Layout</CardTitle>
                            <CardDescription>Configure the layout of your homepage</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hero-style">Hero Style</Label>
                                    <Select defaultValue="fullscreen">
                                        <SelectTrigger id="hero-style">
                                            <SelectValue placeholder="Select hero style" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fullscreen">Fullscreen</SelectItem>
                                            <SelectItem value="boxed">Boxed</SelectItem>
                                            <SelectItem value="minimal">Minimal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Featured Sections</Label>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="show-accommodations" defaultChecked />
                                            <Label htmlFor="show-accommodations">Show Accommodations</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="show-tourism" defaultChecked />
                                            <Label htmlFor="show-tourism">Show Tourism Sites</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="show-experiences" defaultChecked />
                                            <Label htmlFor="show-experiences">Show Experiences</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="show-advertise" defaultChecked />
                                            <Label htmlFor="show-advertise">Show Advertise</Label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="email" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Settings</CardTitle>
                            <CardDescription>Configure email sending settings</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="smtp-host">SMTP Host</Label>
                                    <Input id="smtp-host" defaultValue="smtp.example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtp-port">SMTP Port</Label>
                                    <Input id="smtp-port" defaultValue="587" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtp-username">SMTP Username</Label>
                                    <Input id="smtp-username" defaultValue="noreply@malawishades.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtp-password">SMTP Password</Label>
                                    <Input id="smtp-password" type="password" defaultValue="••••••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="from-email">From Email</Label>
                                    <Input id="from-email" defaultValue="noreply@malawishades.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="from-name">From Name</Label>
                                    <Input id="from-name" defaultValue="Malawi Shades" />
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>Configure email notification settings</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Booking Notifications</Label>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="notify-new-booking" defaultChecked />
                                            <Label htmlFor="notify-new-booking">New Booking</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="notify-booking-confirmed" defaultChecked />
                                            <Label htmlFor="notify-booking-confirmed">Booking Confirmed</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="notify-booking-cancelled" defaultChecked />
                                            <Label htmlFor="notify-booking-cancelled">Booking Cancelled</Label>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>User Notifications</Label>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="notify-new-user" defaultChecked />
                                            <Label htmlFor="notify-new-user">New User Registration</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="notify-contact-form" defaultChecked />
                                            <Label htmlFor="notify-contact-form">Contact Form Submission</Label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Settings</CardTitle>
                            <CardDescription>Advanced system configuration</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Default Currency</Label>
                                    <Select defaultValue="usd">
                                        <SelectTrigger id="currency">
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="usd">USD ($)</SelectItem>
                                            <SelectItem value="mwk">MWK (K)</SelectItem>
                                            <SelectItem value="eur">EUR (€)</SelectItem>
                                            <SelectItem value="gbp">GBP (£)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="booking-fee">Booking Fee (%)</Label>
                                    <Input id="booking-fee" defaultValue="5" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="google-analytics">Google Analytics ID</Label>
                                    <Input id="google-analytics" defaultValue="UA-XXXXXXXX-X" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="maintenance-mode" />
                                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="debug-mode" />
                                    <Label htmlFor="debug-mode">Debug Mode</Label>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Backup & Restore</CardTitle>
                            <CardDescription>Manage database backups</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Button variant="outline">Create Backup</Button>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="restore-backup">Restore from Backup</Label>
                                    <div className="flex items-center gap-2">
                                        <Input id="restore-backup" type="file" />
                                        <Button variant="outline">Restore</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex justify-end">
                <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? (
                        <span className="flex items-center">
              <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
              Save Settings
            </span>
                    )}
                </Button>
            </div>
        </div>
    )
}

