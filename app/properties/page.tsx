import Banner from "@/components/layout/Banner";
// import PropertiesClient from "./PropertiesClient";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
// import PropertiesExplorer from "@/components/properties/PropertiesExplore";

export default async function PropertiesPage() {
  const res = await fetch("http://localhost:3001/properties", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Banner title="Properties" breadcrumb="Home / Properties" />
      <main className="grow max-w-[1500px] mx-auto px-4 py-5 w-full">
        {/* <PropertiesClient properties={data} /> */}
        {/* <PropertiesExplorer properties={data} mode="public" /> */}
      </main>
      <Footer />
    </div>
  );
}
