import { Expand, MapPin } from "lucide-react";
import { Button } from "../ui/Button";
import { CardContent } from "../ui/Card";
import Link from "next/link";

export default function Slide({
  place,
  area,
  img,
}: {
  place: string;
  area: number;
  img: string;
}) {
  return (
    <Link href={`/properties?q=${place}`} className="block">
      <CardContent
        className={`relative flex flex-col justify-between items-start aspect-square rounded-lg overflow-hidden text-white p-6 bg-cover group`}
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-primary/90 to-transparent opacity-100 md:opacity-70 group-hover:opacity-100 transition duration-500"></div>

        <div className="bg-primary rounded-sm px-3 py-1 relative z-10">
          Hot offer
        </div>

        <Button
          asChild
          variant="outline"
          className="self-center relative z-10 block md:hidden group-hover:block"
        >
          <span>View Details</span>
        </Button>

        <div className="flex justify-between w-full relative z-10">
          <div className="flex items-center gap-1">
            <MapPin /> {place}
          </div>

          <div className="flex items-center gap-1">
            <Expand /> {area}
          </div>
        </div>
      </CardContent>
    </Link>
  );
}
