import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Expand, MapPin } from "lucide-react";
import Slide from "./slide";

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl px-4 mx-auto mb-20"
    >
      <CarouselContent>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <Slide place="Washington" area={12000} img="/home/slide1.jpg" />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <Slide place="Washington" area={12000} img="/home/slide2.jpg" />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <Slide place="Washington" area={12000} img="/home/slide3.jpg" />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <Slide place="Washington" area={12000} img="/home/slide4.jpg" />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <Slide place="Washington" area={12000} img="/home/slide5.jpg" />
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious className="hiddin md:block" />
      <CarouselNext className="hiddin md:block" />
    </Carousel>
  );
}
