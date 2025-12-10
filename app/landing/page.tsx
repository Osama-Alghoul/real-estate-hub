import Hero from "../../components/main-page/hero";
import Footer from "@/components/layout/footer";
import Cards from "@/components/main-page/cards";
import CTA from "@/components/main-page/CTA";
import PlatformFeatures from "@/components/main-page/platformFeatures";
import PropertiesAreaGallery from "@/components/main-page/PropertiesAreaGallery";
import Slider from "@/components/main-page/slider";

export default function HomeLandingPage() {
  return (
    <>
      <Hero />
      <PropertiesAreaGallery />
      <PlatformFeatures />
      <Cards />
      <Slider />
      <CTA />
      <Footer />
    </>
  );
}
