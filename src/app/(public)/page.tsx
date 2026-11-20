import FeaturedServices from "@/components/FeaturedServices";
import HeroSection from "@/components/HeroSection";
import ServiceCategories from "@/components/ServiceCategories";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServiceCategories />
      <FeaturedServices />
      <WhyChooseUs />
    </div>
  );
}
