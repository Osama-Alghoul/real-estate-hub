import Banner from "@/components/layout/Banner";
import PropertiesClient from "./PropertiesClient";

export default async function PropertiesPage() {
  const res = await fetch("http://localhost:3001/properties", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Banner title="Properties" breadcrumb="Home / Properties" />
      <main className="flex-grow max-w-[1500px] mx-auto px-4 py-5 w-full">
        <PropertiesClient properties={data} />
      </main>
    </div>
  );
}
