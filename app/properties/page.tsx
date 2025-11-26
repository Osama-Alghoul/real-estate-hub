"use client"; 

import React, { useState, useEffect } from "react";
import FilterControl from "@/components/common/FilterControl"; 
import GridView from "@/components/common/GridView";
import Pagination from "@/components/common/Pagination";
import Banner from "@/components/layout/Banner";

const properties = [
  {
    img: "/properties/P1.png",
    title: "92 ALLIUM PLACE, ORLANDO FL 32827",
    price: 590693,
    garag: 4,
    bath: 2,
    size: 2096,
    avatar: "/people/A1.png",
    name: "Jenny Wilson",
    type: "sale", 
  },
  {
    img: "/properties/P1.png",
    title: "92 ALLIUM PLACE, ORLANDO FL 32827",
    price: 590693,
    garag: 4,
    bath: 2,
    size: 2096,
    avatar: "/people/jenny.png",
    name: "Jenny Wilson",
    type: "sale", 
  },
  {
    img: "/properties/P1.png",
    title: "92 ALLIUM PLACE, ORLANDO FL 32827",
    price: 590693,
    garag: 4,
    bath: 2,
    size: 2096,
    avatar: "/people/jenny.png",
    name: "Jenny Wilson",
    type: "sale", 
  },
  {
    img: "/properties/house1.jpg",
    title: "92 ALLIUM PLACE, ORLANDO FL 32827",
    price: 590693,
    garag: 4,
    bath: 2,
    size: 2096,
    avatar: "/people/jenny.png",
    name: "Jenny Wilson",
    type: "sale", 
  },
  {
    img: "/properties/house1.jpg",
    title: "92 ALLIUM PLACE, ORLANDO FL 32827",
    price: 590693,
    garag: 4,
    bath: 2,
    size: 2096,
    avatar: "/people/jenny.png",
    name: "Jenny Wilson",
    type: "sale",
  },
];

export default function PropertiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Banner title="Propertice" breadcrumb="Home / Properties" />
      
      <main className="flex-grow max-w-[1500px] mx-auto px-4 py-5 w-full">
        <FilterControl/>
        <GridView data={properties} />
        <div className="mt-12 flex justify-center">
          <Pagination totalPages={5} currentPage={1} />
        </div>
      </main>
    </div>
  );
}
