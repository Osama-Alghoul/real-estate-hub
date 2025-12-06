"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import PropertySearchSection from "@/components/search/property-search-section"
import PropertyCard from "@/components/search/property-card"

const DEMO_PROPERTIES = [
  {
    id: 1,
    price: "$450,000",
    title: "Modern City Apartment",
    beds: 2,
    baths: 2,
    area: 110,
    image: "/modern-apartment-with-windows.jpg",
  },
  {
    id: 2,
    price: "$1,200,000",
    title: "Suburban Family Villa",
    beds: 4,
    baths: 3,
    area: 320,
    image: "/luxury-villa-pool.png",
  },
  {
    id: 3,
    price: "$780,000",
    title: "Charming Family Home",
    beds: 3,
    baths: 2,
    area: 180,
    image: "/modern-house-exterior.png",
  },
  {
    id: 4,
    price: "$350,000",
    title: "Cozy Studio Apartment",
    beds: 1,
    baths: 1,
    area: 55,
    image: "/studio-apartment-interior.png",
  },
  {
    id: 5,
    price: "$950,000",
    title: "Contemporary Penthouse",
    beds: 3,
    baths: 2,
    area: 250,
    image: "/penthouse-with-city-view.jpg",
  },
  {
    id: 6,
    price: "$620,000",
    title: "Elegant Downtown Condo",
    beds: 2,
    baths: 2,
    area: 140,
    image: "/downtown-condo-modern.jpg",
  },
]

export default function PropertiesPage() {
  const searchParams = useSearchParams()

  const filteredProperties = (() => {
    let result = [...DEMO_PROPERTIES]

    const q = searchParams.get("q")
    const beds = searchParams.get("beds")
    const baths = searchParams.get("baths")
    const areaMin = searchParams.get("areaMin")
    const areaMax = searchParams.get("areaMax")
    const priceMin = searchParams.get("priceMin")
    const priceMax = searchParams.get("priceMax")

    const parseNumber = (value: string | null) => {
      if (!value) return null
      const n = Number(value)
      return Number.isNaN(n) ? null : n
    }

    const parsePriceFromString = (price: string) => {
      const onlyNumbers = price.replace(/[^0-9]/g, "")
      const n = Number(onlyNumbers)
      return Number.isNaN(n) ? null : n
    }

    // بحث بالعنوان
    if (q) {
      const query = q.toLowerCase()
      result = result.filter((property) =>
        property.title.toLowerCase().includes(query),
      )
    }

    const areaMinNum = parseNumber(areaMin)
    const areaMaxNum = parseNumber(areaMax)

    if (areaMinNum !== null) {
      result = result.filter((p) => p.area >= areaMinNum)
    }

    if (areaMaxNum !== null) {
      result = result.filter((p) => p.area <= areaMaxNum)
    }

    const priceMinNum = parseNumber(priceMin)
    const priceMaxNum = parseNumber(priceMax)

    if (priceMinNum !== null) {
      result = result.filter((p) => {
        const price = parsePriceFromString(p.price)
        return price !== null && price >= priceMinNum
      })
    }

    if (priceMaxNum !== null) {
      result = result.filter((p) => {
        const price = parsePriceFromString(p.price)
        return price !== null && price <= priceMaxNum
      })
    }

    if (beds) {
      const numericBeds = Number(beds.replace("+", ""))
      if (!Number.isNaN(numericBeds)) {
        result = result.filter((p) =>
          beds.includes("+") ? p.beds >= numericBeds : p.beds === numericBeds,
        )
      }
    }

    if (baths) {
      const numericBaths = Number(baths.replace("+", ""))
      if (!Number.isNaN(numericBaths)) {
        result = result.filter((p) =>
          baths.includes("+")
            ? p.baths >= numericBaths
            : p.baths === numericBaths,
        )
      }
    }

    return result
  })()

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative w-full py-24 md:py-32 bg-cover bg-center"
        style={{ backgroundImage: "url(/banner/hero.png)" }}
      >
        <div className="absolute inset-0 bg-primary/40" />

        <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 text-balance">
            Search
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-6 max-w-2xl text-pretty">
            Find your next home with our advanced search tools
          </p>
          <nav className="text-primary-foreground/80 text-sm">
            <Link
              href="/"
              className="hover:text-primary-foreground transition-colors"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Search</span>
          </nav>
        </div>
      </section>

      <PropertySearchSection />

      {/* Property Cards Grid */}
      <section className="bg-background py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Featured Properties
          </h2>

          {filteredProperties.length === 0 ? (
            <p className="text-muted-foreground">
              No properties match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
