"use client"; // تأكد من وجودها

import React, { useState, useEffect } from "react";
// ... (بقية الـ Imports)
import FilterControl from "@/components/common/FilterControl"; // تأكد من المسار الصحيح
import GridView from "@/components/common/GridView";
import Pagination from "@/components/common/Pagination";
import Banner from "@/components/layout/Banner";
// الأيقونات لا تحتاج لاستيرادها هنا ما دامت مستخدمة في FilterControl

// --- Property Data Simulation (Extended to fill the page) ---
// ... (مصفوفة properties كما هي)
// ملاحظة: أضفت حقل 'type' لتمكين الفلترة "For Buy", "For Sale", "For Rent"
const properties = [
  // ... (عقار 1 مع إضافة حقل type)
  {
    img: "/properties/P1.png",
    title: "92 ALLIUM PLACE, ORLANDO FL 32827",
    price: 590693,
    garag: 4,
    bath: 2,
    size: 2096,
    avatar: "/people/A1.png",
    name: "Jenny Wilson",
    type: "sale", // مثال: إضافة نوع العقار
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
    type: "sale", // مثال: إضافة نوع العقار
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
    type: "sale", // مثال: إضافة نوع العقار
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
    type: "sale", // مثال: إضافة نوع العقار
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
