"use client";

import { Bath, CarFront, Fullscreen, Heart, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../ui/Avatar";
import { CardProps } from "@/types/card";
import { getCurrentUser } from "@/app/services/authService";
import {
  isFavorited,
  addFavorite,
  removeFavorite,
} from "@/app/services/favoriteService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Card({
  id,
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
  type,
}: CardProps & { variant?: "grid" | "list"; index?: number; type?: "sale" | "rent" }) {
  const isEven = index !== undefined && index % 2 === 1;
  const listClasses = isEven ? "flex-row-reverse" : "flex-row";
  const [favorite, setFavorite] = useState<any>(null);
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) return;
    isFavorited(user.id, id).then(setFavorite);
  }, [id, user]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please Login First!");
      return;
    }

    if (favorite) {
      await removeFavorite(favorite.id);
      setFavorite(null);
      toast.error(`Removed From Favorites`);
    } else {
      const newFav = await addFavorite({
        userId: user.id,
        propertyId: id,
        title,
        image: img,
        price,
        owner: name,
        type,
        status: "available",
      });
      setFavorite(newFav);
      toast.success("Added to favorites");
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this property",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied for sharing");
      } catch (error) {
        console.error("Failed to copy:", error);
        toast.error("Failed to copy the link");
      }
    }
  };

  return (
    <Link href={`/properties/${id}`} className="block">
      <div
        className={
          variant === "grid"
            ? "max-w-[370px] bg-white rounded-lg shadow-md"
            : `flex w-full bg-white rounded-xl shadow-md overflow-hidden h-[270px] ${listClasses}`
        }
      >
        <Image
          src={img}
          alt={title}
          className={
            variant === "grid"
              ? "w-full h-[180px] object-cover rounded-t-lg"
              : "h-full w-[40%] object-cover"
          }
          width={300}
          height={180}
        />
        <div
          className={
            variant === "grid"
              ? "p-4 flex flex-col gap-2"
              : "p-5 flex flex-col justify-between w-[60%]"
          }
        >
          <div
            className={
              variant === "grid"
                ? "font-medium text-lg text-primary-light"
                : "font-medium text-lg text-primary-light order-2"
            }
          >
            {title}
          </div>
          <div
            className={
              variant === "grid"
                ? "hidden"
                : "font-normal text-sm text-gray-500 block order-3"
            }
          >
            {description}
          </div>
          <div
            className={
              variant === "grid"
                ? "font-bold text-xl text-primary-light"
                : "font-bold text-xl text-primary-light order-4"
            }
          >
            ${price}
          </div>
          <div
            className={
              variant === "grid"
                ? "flex items-center gap-4 text-gray-500 text-sm"
                : "items-center gap-6 text-gray-600 text-sm mt-2 hidden"
            }
          >
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
          <div
            className={
              variant === "grid"
                ? "flex justify-between items-center"
                : "flex justify-between items-center mt-4 order-1"
            }
          >
            <Avatar src={avatar} name={name} />
            <div className="flex gap-2">
              <div onClick={toggleFavorite} className={`cursor-pointer bg-primary-extra-light p-1 rounded-sm ${
                favorite ? "text-red-500" : "text-primary-light"}`}>
                <Heart size={16} fill={favorite ? "currentColor" : "none"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
