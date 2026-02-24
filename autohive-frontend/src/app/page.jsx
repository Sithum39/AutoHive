import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/home/hero";
import StatsSection from "@/components/home/StatsSection";
import FeaturedSellers from "@/components/home/FeaturedSellers";
import TrendingParts from "@/components/home/TrendingParts";

export default function Home() {
  return (
    <div>

      <Navbar />
      <HeroSection />
      <StatsSection />
     
      <h1>Welcome to the Auto Hive</h1>
      <p>The best place to find auto parts for your vehicle</p>
      

      <Footer />
    </div>
  );
}
