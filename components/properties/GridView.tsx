import { type Property } from "@/types/property.type";
import Card from "../common/Card";

interface GridViewProps {
  data: Property[];
}

export default function GridView({ data }: GridViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center m-4">
      {data.map((item, index) => (
        <Card key={index} {...item} variant="grid" />
      ))}
    </div>
  );
}
