import { Button } from "../ui/button";
import { MapPin } from "lucide-react";

export default function TileContent({
  area,
  listings,
}: {
  area: string;
  listings: number;
}) {
  return (
    <>
      {/* Gradient Overlay */}
      <div
        className="
          absolute inset-0
          bg-linear-to-t from-black/60 to-transparent
          md:opacity-0 opacity-100 group-hover:opacity-100
          transition duration-500
        "
      ></div>

      <div className="p-6 flex flex-col text-white h-full justify-between relative z-10">
        <div>
          <div className="text-xl font-bold">{area}</div>
          <div className="text-sm">{listings} listings</div>
        </div>
        <Button
          variant={"outline"}
          className="self-center opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-500"
        >
          View Details
        </Button>
        <MapPin className="self-end" size={20} />
      </div>
    </>
  );
}
