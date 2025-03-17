import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/page-header"
import { MapPin, Mail, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Malawi Shades",
  description: "Get in touch with the Malawi Shades team for inquiries, support, or partnership opportunities.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Contact Us"
        description="Get in touch with our team for inquiries, support, or partnership opportunities"
      />

      <div className="mt-12 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first-name" className="text-sm font-medium">
                  First Name
                </label>
                <Input id="first-name" placeholder="Enter your first name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium">
                  Last Name
                </label>
                <Input id="last-name" placeholder="Enter your last name" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input id="subject" placeholder="Enter subject" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea id="message" placeholder="Enter your message" rows={5} />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-bold">Address</h3>
                <p className="text-muted-foreground">123 Lake Shore Drive, Mangochi, Malawi</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-muted-foreground">info@malawishades.com</p>
                <p className="text-muted-foreground">support@malawishades.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-bold">Phone</h3>
                <p className="text-muted-foreground">+265 1234 5678</p>
                <p className="text-muted-foreground">+265 9876 5432</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold mb-4">Office Hours</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p>Saturday: 9:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="mt-8 bg-muted p-6 rounded-lg">
            <h3 className="font-bold mb-2">Emergency Contact</h3>
            <p className="text-muted-foreground mb-4">
              For urgent matters outside of office hours, please call our emergency line:
            </p>
            <p className="font-bold">+265 9999 8888</p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Find Us</h2>
        <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Map will be embedded here</p>
        </div>
      </div>
    </div>
  )
}

