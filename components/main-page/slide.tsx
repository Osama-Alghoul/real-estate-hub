import { Expand, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";

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
    <CardContent
      className={`relative flex flex-col justify-between items-start aspect-square rounded-lg overflow-hidden text-white p-6 bg-cover group`}
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-primary/90 to-transparent opacity-100 md:opacity-70 group-hover:opacity-100 transition duration-500"></div>

      {/* بقية المحتوى تظل فوق بشكل طبيعي */}
      <div className="bg-primary rounded-sm px-3 py-1 relative z-10">
        Hot offer
      </div>

      <Button variant="outline" className="self-center relative z-10 block md:hidden group-hover:block">
        View Details
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
  );
}
