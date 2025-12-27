import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";

interface SlideProps {
  place: string;
  area: number;
  img: string;
}

export default function Slide({ place, area, img }: SlideProps) {
  return (
    <Card className="border-none shadow-none bg-transparent group cursor-pointer">
      <CardContent className="p-0 relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl">
        <Image
          src={img}
          alt={place}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolutىحe bottom-6 left-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{place}</h3>
          <p className="text-sm font-medium text-gray-200">
            {area.toLocaleString()} Properties
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
