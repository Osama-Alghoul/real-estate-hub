import SectionTitle from "../common/sectionTitle";
import Features from "./features";

export default function PlatformFeatures() {
  return (
    <section className="bg-primary-extra-light flex flex-col items-center justify-center">
      <SectionTitle
        title="Propertice by Area"
        description="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat."
      />
      <Features />
    </section>
  );
}
