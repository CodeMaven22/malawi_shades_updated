import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="bg-gradient-to-r from-malawi-green/10 to-malawi-lake/10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter to receive the latest updates on new accommodations, tourism attractions, and
            exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 input-styled border-2 border-malawi-green/30 focus:border-malawi-green"
            />
            <Button className="bg-malawi-green hover:bg-malawi-green/90 text-white">Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

