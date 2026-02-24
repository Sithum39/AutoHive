import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/home/hero";

export default function Home() {
  return (
    <div>

      <Navbar />
      <HeroSection />
        <h1 className="text-4xl font-bold text-center mt-10">Welcome to AutoHive</h1>
    </div>
  );
}
