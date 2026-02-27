import Image from "next/image";
import Topbar from "@/components/Topbar";
import HeroSection from "@/components/HeroSection";
import RefundInfoSection from "@/components/RefundInfoSection";
import PartnersSection from "@/components/PartnersSection";
import AboutUsSection from "@/components/AboutUsSection";
import Footer from "@/components/Footer";
import MainFormSection from "@/components/MainFormSection";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Image src="/svgs/home-bg.svg" alt="Hero" fill className="object-cover" />
      <Topbar />
      <HeroSection />
      <MainFormSection />

      <div className="max-w-[570px] w-[90%] mx-auto my-4 relative">
        <RefundInfoSection />
        <PartnersSection />
        <AboutUsSection />
      </div>
      <Footer />
    </div>
  );
}
