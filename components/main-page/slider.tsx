import SectionTitle from "../common/SectionTitle";
import { CarouselSize } from "./SliderCarousel";

export default function Slider() {
  return (
    <section className="flex flex-col items-center">
      <SectionTitle
        title="Letest Properties of Rent"
        description="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat."
      />
      <CarouselSize />
    </section>
  );
}
