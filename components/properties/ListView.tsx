import Card from "../common/Card";
import { type CardProps } from "@/types/card.type";

interface ListViewProps {
  data: CardProps[];
}

export default function ListView({ data }:ListViewProps) {
  return (
    <div className="flex flex-col gap-6 m-10">
      {data.map((item, index) => (
        <Card key={index} {...item} variant="list" index={index} />
      ))}
    </div>
  );
}
