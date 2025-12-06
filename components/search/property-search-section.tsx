"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, MapPin, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilterState {
  searchQuery: string
  propertyType: string
  contractType: string
  areaMin: number
  areaMax: number
  priceMin: number
  priceMax: number
  selectedBedrooms: string | null
  selectedBathrooms: string | null
  selectedFeatures: string[]
}

const INITIAL_FILTERS: FilterState = {
  searchQuery: "",
  propertyType: "all",
  contractType: "all",
  areaMin: 50,
  areaMax: 500,
  priceMin: 50000,
  priceMax: 1000000,
  selectedBedrooms: "3",
  selectedBathrooms: "3",
  selectedFeatures: ["Parking", "Furnished"],
}

export default function PropertySearchSection() {
  const router = useRouter()
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  // للسلايدر (range)
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const num = Number.parseInt(value) || 0
    setFilters((prev) => ({ ...prev, [name]: num }))
  }

  // للـ inputs الرقمية (min/max) – كتابة مباشرة
  const handleNumberFieldChange = (
    name: "areaMin" | "areaMax" | "priceMin" | "priceMax",
    value: string,
  ) => {
    if (value === "") {
      // نخليها 0 مؤقتًا لو الحقل فاضي
      setFilters((prev) => ({ ...prev, [name]: 0 }))
      return
    }

    const num = Number(value)
    setFilters((prev) => ({
      ...prev,
      [name]: Number.isNaN(num) ? prev[name] : num,
    }))
  }

  const handleBedBathToggle = (
    type: "bedrooms" | "bathrooms",
    value: string,
  ) => {
    const key =
      type === "bedrooms" ? "selectedBedrooms" : "selectedBathrooms"

    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }))
  }

  const handleFeatureToggle = (feature: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(feature)
        ? prev.selectedFeatures.filter((f) => f !== feature)
        : [...prev.selectedFeatures, feature],
    }))
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams()

    if (filters.searchQuery) params.set("q", filters.searchQuery)

    params.set("areaMin", String(filters.areaMin))
    params.set("areaMax", String(filters.areaMax))
    params.set("priceMin", String(filters.priceMin))
    params.set("priceMax", String(filters.priceMax))

    if (filters.selectedBathrooms)
      params.set("baths", filters.selectedBathrooms)

    if (filters.propertyType !== "all")
      params.set("type", filters.propertyType)

    if (filters.contractType !== "all")
      params.set("contract", filters.contractType)

    if (filters.selectedBedrooms)
      params.set("beds", filters.selectedBedrooms)

    if (filters.selectedFeatures.length > 0)
      params.set("features", filters.selectedFeatures.join(","))

    const qs = params.toString()
    router.push(qs ? `/search?${qs}` : "/search")
  }

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS)
    router.push("/search")
  }

  return (
    <section className="bg-slate-50 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Search for your property
          </h1>
        </div>

        {/* Main Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Location
              </label>
              <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="searchQuery"
                  value={filters.searchQuery}
                  onChange={handleInputChange}
                  placeholder="City, neighborhood, or street"
                  className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Property type
              </label>
              <div className="relative">
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleInputChange}
                  className="w-full appearance-none bg-white border border-input rounded-lg px-3 py-2 text-foreground cursor-pointer pr-8"
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Contract type
              </label>
              <div className="relative">
                <select
                  name="contractType"
                  value={filters.contractType}
                  onChange={handleInputChange}
                  className="w-full appearance-none bg-white border border-input rounded-lg px-3 py-2 text-foreground cursor-pointer pr-8"
                >
                  <option value="all">All Types</option>
                  <option value="rent">Rent</option>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Button
                type="button"
                className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleApplyFilters}
              >
                Search
              </Button>
              <button
                type="button"
                className="px-3 py-2 bg-muted border border-input rounded-lg hover:bg-muted/80 transition-colors"
              >
                <MapPin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 text-foreground font-medium hover:opacity-80 transition-opacity"
          >
            <Filter className="w-4 h-4" />
            Advanced filters
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Area Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Area (m²)
                </h3>

                {/* Min / Max فوق السلايدر */}
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Min: {filters.areaMin} m²</span>
                  <span>Max: {filters.areaMax} m²</span>
                </div>

                <div className="space-y-4">
                  <input
                    type="range"
                    name="areaMin"
                    min={0}
                    max={500}
                    value={filters.areaMin}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Min
                      </label>
                      <input
                        type="number"
                        value={filters.areaMin}
                        onChange={(e) =>
                          handleNumberFieldChange(
                            "areaMin",
                            e.target.value,
                          )
                        }
                        className="w-full border border-input rounded-lg px-3 py-2 text-foreground bg-white"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Max
                      </label>
                      <input
                        type="number"
                        value={filters.areaMax}
                        onChange={(e) =>
                          handleNumberFieldChange(
                            "areaMax",
                            e.target.value,
                          )
                        }
                        className="w-full border border-input rounded-lg px-3 py-2 text-foreground bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Price
                </h3>

                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>
                    Min: $
                    {filters.priceMin.toLocaleString("en-US")}
                  </span>
                  <span>
                    Max: $
                    {filters.priceMax.toLocaleString("en-US")}
                  </span>
                </div>

                <div className="space-y-4">
                  <input
                    type="range"
                    name="priceMin"
                    min={0}
                    max={1000000}
                    value={filters.priceMin}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Min
                      </label>
                      <input
                        type="number"
                        value={filters.priceMin}
                        onChange={(e) =>
                          handleNumberFieldChange(
                            "priceMin",
                            e.target.value,
                          )
                        }
                        className="w-full border border-input rounded-lg px-3 py-2 text-foreground bg-white"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Max
                      </label>
                      <input
                        type="number"
                        value={filters.priceMax}
                        onChange={(e) =>
                          handleNumberFieldChange(
                            "priceMax",
                            e.target.value,
                          )
                        }
                        className="w-full border border-input rounded-lg px-3 py-2 text-foreground bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Bedrooms */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  Bedrooms
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {["1", "2", "3", "4", "5+"].map((bed) => (
                    <button
                      key={bed}
                      type="button"
                      onClick={() =>
                        handleBedBathToggle("bedrooms", bed)
                      }
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        filters.selectedBedrooms === bed
                          ? "bg-blue-600 text-white"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {bed}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  Bathrooms
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {["1", "2", "3", "4+"].map((bath) => (
                    <button
                      key={bath}
                      type="button"
                      onClick={() =>
                        handleBedBathToggle("bathrooms", bath)
                      }
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        filters.selectedBathrooms === bath
                          ? "bg-blue-600 text-white"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {bath}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Extra Features */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-4">
                Extra features
              </h3>
              <div className="flex gap-2 flex-wrap">
                {["Parking", "Balcony / Garden", "Furnished"].map(
                  (feature) => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() =>
                        handleFeatureToggle(feature)
                      }
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        filters.selectedFeatures.includes(feature)
                          ? "bg-blue-600 text-white"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {feature}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-border">
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Clear all filters
              </button>
              <Button
                type="button"
                onClick={handleApplyFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
