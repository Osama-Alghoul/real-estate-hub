import SectionTitle from "../common/SectionTitle";
import AreaGallery from "./AreaGallery";

export default function PropertiesAreaGallery() {
  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="Properties by Area"
        description="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat."
      />
      <AreaGallery />
    </section>
  );
}
