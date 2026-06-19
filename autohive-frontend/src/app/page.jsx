import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/home/hero";
import StatsSection from "@/components/home/StatsSection";
import TrendingParts from "@/components/home/TrendingParts";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <StatsSection />

        {/* අලුතින් හදපු Dynamic Products Section එක */}
        <TrendingParts />
      </main>

      <Footer />
    </div>
  );
}
