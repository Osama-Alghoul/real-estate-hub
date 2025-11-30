import SectionTitle from "../common/sectionTitle";
import AreaGallery from "./AreaGallery";

export default function PropertiesAreaGallery() {
  return (
    <section className="flex flex-col items-center justify-center">
      <SectionTitle
        title="Propertice by Area"
        description="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat."
      />
      <AreaGallery />
    </section>
  );
}
