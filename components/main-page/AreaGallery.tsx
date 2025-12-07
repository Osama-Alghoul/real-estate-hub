import Image from "next/image";

export default function AreaGallery() {
  return (
    // Base Grid: 1 col (mobile), 2 cols (sm), 3 cols (md/lg)
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-4">

      {/* GP1 - Standard Tile */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
          src={"/gallery/GP1.jpg"}
          alt={""}
          width={500}
          height={500}
          // The object-cover class and hover effect are great, keep them!
          className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-105"
        />
      </div>

      {/* GP2 - Standard Tile */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
          src={"/gallery/GP2.jpg"}
          alt={""}
          width={500}
          height={500}
          className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-105"
        />
      </div>

      {/* GP3 - Standard Tile (On 'md' and up, this is the 3rd tile on the first row) */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
          src={"/gallery/GP3.jpg"}
          alt={""}
          width={500}
          height={500}
          className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-105"
        />
      </div>

      {/* GP4 - Featured Wide Tile (Spans 2 columns on 'lg' screens) */}
      <div className="overflow-hidden rounded-lg shadow-lg md:col-span-2 h-full md:h-1/2"> 
        <Image
          src={"/gallery/GP4.jpg"}
          alt={""}
          width={500}
          height={500}
          className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-105"
        />
      </div>

      {/* GP5 - Standard Tile (This naturally flows into the remaining spot) */}
      <div className="overflow-hidden rounded-lg shadow-lg h-full md:h-1/2">
        <Image
          src={"/gallery/GP5.jpg"}
          alt={""}
          width={500}
          height={500}
          className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-105"
        />
      </div>
    </div>
  );
}