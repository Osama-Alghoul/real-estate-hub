import Card from "./Card";
import { type CardProps } from "@/types/card.type";

interface GridViewProps {
  data: CardProps[];
}

export default function GridView({ data }: GridViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center m-10">
      {data.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
}
