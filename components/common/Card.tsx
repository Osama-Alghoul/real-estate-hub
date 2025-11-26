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
}: CardProps) {
  return (
    <div className="w-[370px] bg-white rounded-lg shadow-md">
      <Image
        src={img}
        alt={title}
        className="w-full h-[180px] object-cover rounded-t-lg"
        width={300}
        height={180}
      />
      <div className="p-4 flex flex-col gap-2">
        <div className="font-medium text-lg">{title}</div>
        <div className="font-semibold text-lg text-primary-light">${price}</div>
        <div className="flex items-center gap-4 text-gray-500 text-sm">
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
        <hr className="border-gray-200 my-2" />
        <div className="flex justify-between items-center">
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
