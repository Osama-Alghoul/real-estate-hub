import PropertiesExplorer from "@/components/properties/PropertiesExplore";
import { fetchProperties } from "@/app/services/propertyService";

export default async function BuyerPropertiesPage() {
  const { data } = await fetchProperties();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Explore Properties
      </h1>

      <PropertiesExplorer properties={data} mode="buyer" />
    </div>
  );
}
