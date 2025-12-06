"use client"

import Image from "next/image"

interface PropertyCardProps {
  price: string
  title: string
  beds: number
  baths: number
  area: number
  image: string
}

export default function PropertyCard({ price, title, beds, baths, area, image }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <p className="text-xl font-bold text-foreground mb-2">{price}</p>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {beds} beds • {baths} baths • {area} m²
        </p>
      </div>
    </div>
  )
}
