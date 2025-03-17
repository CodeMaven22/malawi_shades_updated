"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Malawi regions and districts data
export const malawiRegions = [
  {
    id: "northern",
    name: "Northern Region",
    districts: [
      { id: "chitipa", name: "Chitipa" },
      { id: "karonga", name: "Karonga" },
      { id: "likoma", name: "Likoma" },
      { id: "mzimba", name: "Mzimba" },
      { id: "nkhata-bay", name: "Nkhata Bay" },
      { id: "rumphi", name: "Rumphi" },
    ],
  },
  {
    id: "central",
    name: "Central Region",
    districts: [
      { id: "dedza", name: "Dedza" },
      { id: "dowa", name: "Dowa" },
      { id: "kasungu", name: "Kasungu" },
      { id: "lilongwe", name: "Lilongwe" },
      { id: "mchinji", name: "Mchinji" },
      { id: "nkhotakota", name: "Nkhotakota" },
      { id: "ntcheu", name: "Ntcheu" },
      { id: "ntchisi", name: "Ntchisi" },
      { id: "salima", name: "Salima" },
    ],
  },
  {
    id: "southern",
    name: "Southern Region",
    districts: [
      { id: "balaka", name: "Balaka" },
      { id: "blantyre", name: "Blantyre" },
      { id: "chikwawa", name: "Chikwawa" },
      { id: "chiradzulu", name: "Chiradzulu" },
      { id: "machinga", name: "Machinga" },
      { id: "mangochi", name: "Mangochi" },
      { id: "mulanje", name: "Mulanje" },
      { id: "mwanza", name: "Mwanza" },
      { id: "nsanje", name: "Nsanje" },
      { id: "thyolo", name: "Thyolo" },
      { id: "phalombe", name: "Phalombe" },
      { id: "zomba", name: "Zomba" },
      { id: "neno", name: "Neno" },
    ],
  },
]

export interface RegionFilterProps {
  onFilterChange: (region: string | null, district: string | null) => void
}

export function RegionFilter({ onFilterChange }: RegionFilterProps) {
  const [openRegion, setOpenRegion] = useState(false)
  const [openDistrict, setOpenDistrict] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [availableDistricts, setAvailableDistricts] = useState<{ id: string; name: string }[]>([])

  // Update available districts when region changes
  useEffect(() => {
    if (selectedRegion) {
      const region = malawiRegions.find((r) => r.id === selectedRegion)
      setAvailableDistricts(region?.districts || [])
    } else {
      // If no region is selected, flatten all districts from all regions
      const allDistricts = malawiRegions.flatMap((region) => region.districts)
      setAvailableDistricts(allDistricts)
    }
  }, [selectedRegion])

  // Reset district when region changes
  useEffect(() => {
    setSelectedDistrict(null)
  }, [selectedRegion])

  // Notify parent component when filters change
  useEffect(() => {
    onFilterChange(selectedRegion, selectedDistrict)
  }, [selectedRegion, selectedDistrict, onFilterChange])

  const handleClearFilters = () => {
    setSelectedRegion(null)
    setSelectedDistrict(null)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-gradient-to-r from-malawi-green/5 to-malawi-lake/5 rounded-lg border border-malawi-green/20">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-malawi-green">Region</label>
        <Popover open={openRegion} onOpenChange={setOpenRegion}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openRegion}
              className="w-full sm:w-[200px] justify-between border-malawi-green/30 hover:border-malawi-green hover:bg-malawi-green/5"
            >
              {selectedRegion ? malawiRegions.find((region) => region.id === selectedRegion)?.name : "Select region..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full sm:w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search region..." />
              <CommandList>
                <CommandEmpty>No region found.</CommandEmpty>
                <CommandGroup>
                  {malawiRegions.map((region) => (
                    <CommandItem
                      key={region.id}
                      value={region.id}
                      onSelect={(currentValue) => {
                        setSelectedRegion(currentValue === selectedRegion ? null : currentValue)
                        setOpenRegion(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 text-malawi-green",
                          selectedRegion === region.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {region.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-malawi-green">District</label>
        <Popover open={openDistrict} onOpenChange={setOpenDistrict}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openDistrict}
              className="w-full sm:w-[200px] justify-between border-malawi-green/30 hover:border-malawi-green hover:bg-malawi-green/5"
              disabled={availableDistricts.length === 0}
            >
              {selectedDistrict
                ? availableDistricts.find((district) => district.id === selectedDistrict)?.name
                : "Select district..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full sm:w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search district..." />
              <CommandList>
                <CommandEmpty>No district found.</CommandEmpty>
                <CommandGroup>
                  {availableDistricts.map((district) => (
                    <CommandItem
                      key={district.id}
                      value={district.id}
                      onSelect={(currentValue) => {
                        setSelectedDistrict(currentValue === selectedDistrict ? null : currentValue)
                        setOpenDistrict(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 text-malawi-green",
                          selectedDistrict === district.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {district.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {(selectedRegion || selectedDistrict) && (
        <div className="flex items-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-malawi-red hover:text-malawi-red/90 hover:bg-malawi-red/10"
          >
            Clear filters
          </Button>
        </div>
      )}

      {(selectedRegion || selectedDistrict) && (
        <div className="flex items-end gap-2">
          {selectedRegion && (
            <Badge
              variant="secondary"
              className="text-xs bg-malawi-green/20 text-malawi-green hover:bg-malawi-green/30"
            >
              {malawiRegions.find((r) => r.id === selectedRegion)?.name}
            </Badge>
          )}
          {selectedDistrict && (
            <Badge
              variant="secondary"
              className="text-xs bg-malawi-green/20 text-malawi-green hover:bg-malawi-green/30"
            >
              {availableDistricts.find((d) => d.id === selectedDistrict)?.name}
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

