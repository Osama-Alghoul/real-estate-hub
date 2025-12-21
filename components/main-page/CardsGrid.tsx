'use client';

import GridView from "../properties/GridView";
import { useEffect, useState } from "react";
import { Property } from "@/types/property";

export default function CardsGrid() {
    const [data, setData] = useState<Property[]>([]);
    useEffect(() => {
      fetch("http://localhost:3001/properties?_limit=6", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => setData(data));
    }, [])
 
  return <GridView data={data} />;
}
