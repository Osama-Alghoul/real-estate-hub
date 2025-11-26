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
    <div className="w-[424px] bg-[#FFFFFF] rounded-lg">
      <Image
        src={img}
        alt={title}
        className="w-full"
        width={400}
        height={400}
      />
      <div className="p-6 flex flex-col gap-4">
        <div className="font-medium text-xl">{title}</div>
        <div className="font-semibold text-xl text-primary-light">${price}</div>
        <div className="flex items-center gap-6 font-medium text-gray-500">
          <div className="flex gap-1.5">
            <CarFront />
            <span>{garag}</span>
          </div>
          <div className="flex gap-1.5">
            <Bath />
            <span>{bath}</span>
          </div>
          <div className="flex gap-1.5">
            <Fullscreen />
            <span>{size}ft</span>
          </div>
        </div>
        <hr className="text-[#E7E9EB]" />
        <div className="flex justify-between items-center">
          <Avatar src={avatar} name={name} />
          <div className="flex gap-3">
            <div className="cursor-pointer bg-primary-extra-light text-primary-light p-1 rounded-sm">
              <Share2 />
            </div>
            <div className="cursor-pointer bg-primary-extra-light text-primary-light p-1 rounded-sm">
              <Heart />
            </div>
            <div className="cursor-pointer bg-primary-extra-light text-primary-light p-1 rounded-sm">
              <Plus />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
