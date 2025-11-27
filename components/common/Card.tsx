import { Bath, CarFront, Fullscreen, Heart, Plus, Share2 } from "lucide-react";
import Image from "next/image";
import Avatar from "../ui/avatar";
import { type CardProps } from "@/types/card.type";

export default function Card({
  img,
  title,
  price,
  garag,
  bath,
  size,
  avatar,
  name,
  description,
  variant = "grid",
  index, 
}: CardProps & { variant?: "grid" | "list"; index?: number }) {
  const isEven = index !== undefined && index % 2 ===1;
  const listClasses = isEven ? "flex-row-reverse" : "flex-row";
  return (
    <div className={variant === "grid" ? "w-[370px] bg-white rounded-lg shadow-md" : `flex w-full bg-white rounded-xl shadow-md overflow-hidden h-[270px] ${listClasses}`}>
      <Image
        src={img}
        alt={title}
        className={variant === "grid" ? "w-full h-[180px] object-cover rounded-t-lg" : "h-full w-[40%] object-cover"}
        width={300}
        height={180}
      />
      <div className={variant === "grid" ? "p-4 flex flex-col gap-2" : "p-5 flex flex-col justify-between w-[60%]"}>
        <div className={variant === "grid" ? "font-medium text-lg text-primary-light" : "font-medium text-lg text-primary-light order-2"}>{title}</div>
        <div className={variant === "grid" ? "hidden" : "font-normal text-sm text-gray-500 block order-3"}>{description}</div>
        <div className={variant === "grid" ? "font-bold text-xl text-primary-light" : "font-bold text-xl text-primary-light order-4"}>${price}</div>
        <div className={variant === "grid" ? "flex items-center gap-4 text-gray-500 text-sm" : "flex items-center gap-6 text-gray-600 text-sm mt-2 hidden"}>
          <div className="flex gap-1.5 items-center">
            <CarFront size={16} />
            <span>{garag}</span>
          </div>
          <div className="flex gap-1.5 items-center">
            <Bath size={16} />
            <span>{bath}</span>
          </div>
          <div className="flex gap-1.5 items-center">
            <Fullscreen size={16} />
            <span>{size}ft</span>
          </div>
        </div>
        {variant === "grid" && <hr className="border-gray-200 my-2" />}
        <div className={variant === "grid" ? "flex justify-between items-center" : "flex justify-between items-center mt-4 order-1"}>
          <Avatar src={avatar} name={name} size={30} />
          <div className="flex gap-2">
            <div className="cursor-pointer bg-primary-extra-light text-primary-light p-1 rounded-sm">
              <Share2 size={16} />
            </div>
            <div className="cursor-pointer bg-primary-extra-light text-primary-light p-1 rounded-sm">
              <Heart size={16} />
            </div>
            <div className="cursor-pointer bg-primary-extra-light text-primary-light p-1 rounded-sm">
              <Plus size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
