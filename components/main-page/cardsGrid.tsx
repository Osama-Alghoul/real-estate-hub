'use client';

import { CardProps } from "@/types/card.type";
import GridView from "../properties/GridView";
import { useEffect, useState } from "react";

export default function CardsGrid() {
    const [data, setData] = useState<CardProps[]>([]);
    useEffect(() => {
      fetch("http://localhost:3001/properties?_limit=6", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => setData(data));
    }, [])
 
  return <GridView data={data} />;
}
