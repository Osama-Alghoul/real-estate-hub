import Link from "next/link";
import TileContent from "./Tile";
export default function AreaGallery() {
  const tileBaseClasses =
    "overflow-hidden rounded-lg shadow-lg bg-cover bg-center transition duration-500 ease-in-out relative group";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-4 lg:h-[500px] h-full">
      {/* GP1 - Standard Tile */}
      <Link
        href="/properties?q=Washington"
        className={`${tileBaseClasses} bg-[url('/gallery/GP1.jpg')]`}
      >
        <TileContent area="Washington" listings={25} />
      </Link>

      {/* GP2 - Standard Tile */}
      <Link
        href="/properties?q=New York"
        className={`${tileBaseClasses} bg-[url('/gallery/GP2.jpg')]`}
      >
        <TileContent area="New York" listings={42} />
      </Link>

      {/* GP3 - Standard Tile */}
      <Link
        href="/properties?q=California"
        className={`${tileBaseClasses} bg-[url('/gallery/GP3.jpg')]`}
      >
        <TileContent area="California" listings={18} />
      </Link>

      {/* GP4 - Standard Tile (This naturally flows into the remaining spot) */}
      <Link
        href="/properties?q=Florida Beaches"
        className={`${tileBaseClasses} md:col-span-2 h-72 sm:h-auto bg-[url('/gallery/GP4.jpg')]`}
      >
        <TileContent area="Florida Beaches" listings={55} />
      </Link>

      {/* GP5 - Standard Tile (This naturally flows into the remaining spot) */}
      <Link
        href="/properties?q=Texas"
        className={`${tileBaseClasses} h-72 sm:h-auto bg-[url('/gallery/GP5.jpg')]`}
      >
        <TileContent area="Texas" listings={30} />
      </Link>
    </div>
  );
}
