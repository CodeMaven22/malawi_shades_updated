"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageGalleryProps {
  images: {
    url: string
    alt: string
  }[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="w-full">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-4">
        <Image
          src={images[currentIndex].url || "/placeholder.svg"}
          alt={images[currentIndex].alt}
          fill
          className="object-cover transition-all duration-300 ease-in-out"
          priority
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/70 z-10"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/70 z-10"
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex overflow-x-auto gap-2 pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`flex-shrink-0 relative overflow-hidden rounded-md w-20 h-20 transition-all 
            ${currentIndex === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`}
            onClick={() => goToImage(index)}
            aria-label={`Go to image ${index + 1}`}
          >
            <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

