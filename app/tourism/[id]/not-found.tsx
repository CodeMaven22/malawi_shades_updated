import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TourismSiteNotFound() {
    return (
        <div className="container mx-auto px-4 py-24 text-center">
            <h1 className="text-4xl font-bold mb-4">Tourism Site Not Found</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                The tourism site you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
                <Link href="/tourism">Browse All Tourism Sites</Link>
            </Button>
        </div>
    )
}

