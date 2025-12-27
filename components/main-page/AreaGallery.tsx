"use client";

import Link from "next/link";
import TileContent from "./Tile";
import { useEffect, useState } from "react";

interface Area {
  id: string;
  name: string;
  listings: number;
  image: string;
  href: string;
  colSpan?: number;
}

export default function AreaGallery() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);

  const tileBaseClasses =
    "overflow-hidden rounded-lg shadow-lg bg-cover bg-center transition duration-500 ease-in-out relative group";

  useEffect(() => {
    async function fetchAreas() {
      try {
        const res = await fetch("http://localhost:3001/areas");
        const data = await res.json();
        setAreas(data);
      } catch (err) {
        console.error("Failed to fetch areas", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAreas();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-4 lg:min-h-[500px] h-full">
      {areas.map((area) => (
        <Link
          key={area.id}
          href={area.href}
          className={`${tileBaseClasses} ${
            area.colSpan === 2 ? "md:col-span-2" : ""
          } h-72 sm:h-auto`}
          style={{ backgroundImage: `url('${area.image}')` }}
        >
          <TileContent area={area.name} listings={area.listings} />
        </Link>
      ))}
    </div>
  );
}
