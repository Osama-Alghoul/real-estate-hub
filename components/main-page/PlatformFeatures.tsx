import SectionTitle from "../common/SectionTitle";
import Features from "./Features";

export default function PlatformFeatures() {
  return (
    <section className="bg-primary-extra-light flex flex-col items-center justify-center">
      <SectionTitle
        title="Properties Area"
        description="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat."
      />
      <Features />
    </section>
  );
}
