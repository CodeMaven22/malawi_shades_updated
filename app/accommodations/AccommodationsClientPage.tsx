"use client"

import { useState } from "react"
import { AccommodationSection } from "@/components/accommodation-section"
import { PageHeader } from "@/components/page-header"
import { RegionFilter } from "@/components/region-filter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AccommodationsClientPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)

  const handleFilterChange = (region: string | null, district: string | null) => {
    setSelectedRegion(region)
    setSelectedDistrict(district)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Accommodations"
        description="Find your perfect stay in Malawi, from luxury villas to cozy lodges."
      />

      <div className="mt-8">
        <RegionFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="mt-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="villas">Villas</TabsTrigger>
            <TabsTrigger value="resorts">Resorts</TabsTrigger>
            <TabsTrigger value="apartments">Apartments</TabsTrigger>
            <TabsTrigger value="lodges">Lodges</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-16 mt-8">
            <AccommodationSection
              title="Luxury Villas"
              description="Exclusive private villas with stunning views and premium amenities"
              type="villas"
              showFilter={false}
            />
            <AccommodationSection
              title="Premium Resorts"
              description="All-inclusive resorts offering the ultimate relaxation experience"
              type="resorts"
              showFilter={false}
            />
            <AccommodationSection
              title="Comfortable Apartments"
              description="Fully furnished apartments for short and long-term stays"
              type="apartments"
              showFilter={false}
            />
            <AccommodationSection
              title="Scenic Lodges"
              description="Authentic lodges immersed in Malawi's natural beauty"
              type="lodges"
              showFilter={false}
            />
          </TabsContent>

          <TabsContent value="villas" className="mt-8">
            <AccommodationSection
              title="Luxury Villas"
              description="Exclusive private villas with stunning views and premium amenities"
              type="villas"
              showFilter={true}
            />
          </TabsContent>

          <TabsContent value="resorts" className="mt-8">
            <AccommodationSection
              title="Premium Resorts"
              description="All-inclusive resorts offering the ultimate relaxation experience"
              type="resorts"
              showFilter={true}
            />
          </TabsContent>

          <TabsContent value="apartments" className="mt-8">
            <AccommodationSection
              title="Comfortable Apartments"
              description="Fully furnished apartments for short and long-term stays"
              type="apartments"
              showFilter={true}
            />
          </TabsContent>

          <TabsContent value="lodges" className="mt-8">
            <AccommodationSection
              title="Scenic Lodges"
              description="Authentic lodges immersed in Malawi's natural beauty"
              type="lodges"
              showFilter={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

