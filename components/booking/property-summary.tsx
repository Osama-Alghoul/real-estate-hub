import { Card } from "@/components/ui/card";
import Avatar from "@/components/ui/avatar";
import { BedDouble, Bath, Ruler as Ruler2 } from "lucide-react";

export default function PropertySummary() {
  return (
    <Card className="overflow-hidden shadow-md">
      {/* Property Image */}
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(/placeholder.svg?height=400&width=400&query=luxury home exterior with white columns)",
        }}
      />

      {/* Content */}
      <div className="p-6">
        {/* Address */}
        <h2 className="text-xl font-bold text-[#2C3E50] mb-2">
          92 ALLIUM PLACE, ORLANDO FL 32827
        </h2>

        {/* Price */}
        <p className="text-2xl font-bold text-[#4DA6C7] mb-4">$ 590,693</p>

        {/* Property Details Icons */}
        <div className="flex gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">4</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">4</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler2 className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">2,096.00 ft</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-4" />
        {/* Agent Info */}
        <div className="flex items-center gap-3">
          <Avatar
            src="https://api.dicebear.com/9x/avataaars/svg?seed=Jenny"
            name="Jenny Wilson"
          />
          <div>
            <p className="font-semibold text-gray-800">Jenny Wilson</p>
            <p className="text-xs text-gray-500">Luxury Real Estate Agent</p>
          </div>
        </div>

        {/* Property Description */}
        <div className="mt-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Beautiful modern home with spacious interiors, premium finishes, and
            a stunning backyard perfect for entertaining. Located in a
            prestigious neighborhood with excellent schools and amenities.
          </p>
        </div>
      </div>
    </Card>
  );
}
