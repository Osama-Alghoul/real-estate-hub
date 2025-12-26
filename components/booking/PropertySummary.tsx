import { Card } from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import { BedDouble, Bath, Ruler as Ruler2 } from "lucide-react";
import { Property } from "@/types/property";
import Image from "next/image";

interface PropertySummaryProps {
  property: Property;
}

export default function PropertySummary({ property }: PropertySummaryProps) {
  return (
    <Card className="overflow-hidden shadow-md">
      {/* Property Image */}
      <div className="w-full h-48 relative">
        <Image
          src={property.img}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Address */}
        <h2 className="text-xl font-bold text-[#2C3E50] mb-2">
          {property.title}
        </h2>

        {/* Price */}
        <p className="text-2xl font-bold text-[#4DA6C7] mb-4">
          ${property.price.toLocaleString("en-US")}
        </p>

        {/* Property Details Icons */}
        <div className="flex gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">{property.garag}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">{property.bath}</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler2 className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">
              {property.size.toLocaleString()} sqft
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-4" />

        {/* Agent Info */}
        <div className="flex items-center gap-3">
          <Avatar src={property.avatar} name={property.name} />
          <div>
            <p className="font-semibold text-gray-800">{property.name}</p>
            <p className="text-xs text-gray-500">Real Estate Agent</p>
          </div>
        </div>

        {/* Property Description */}
        <div className="mt-4 text-sm text-gray-600 leading-relaxed">
          <p>{property.description}</p>
        </div>
      </div>
    </Card>
  );
}
