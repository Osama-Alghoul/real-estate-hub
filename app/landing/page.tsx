import Hero from "../../components/main-page/Hero";
import Footer from "@/components/layout/Footer";
import Cards from "@/components/main-page/Cards";
import CTA from "@/components/main-page/CTA";
import PlatformFeatures from "@/components/main-page/PlatformFeatures";
import PropertiesAreaGallery from "@/components/main-page/PropertiesAreaGallery";

export default function HomeLandingPage() {
  return (
    <>
      <Hero />
      <PropertiesAreaGallery />
      <PlatformFeatures />
      <Cards />
      <CTA />
      <Footer />
    </>
  );
}
