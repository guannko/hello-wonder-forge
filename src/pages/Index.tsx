import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GeoSection from "@/components/GeoSection";
import DemoSection from "@/components/DemoSection";
import WhyGeoSection from "@/components/WhyGeoSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <GeoSection />
        <DemoSection />
        <WhyGeoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
