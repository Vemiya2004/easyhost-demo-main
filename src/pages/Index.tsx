import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlansSection from "@/components/PlansSection";
import AboutSection from "@/components/AboutSection";
import DisclosureSection from "@/components/DisclosureSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeTab, setActiveTab] = useState("domain");

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onScrollTo={scrollTo} onTabSwitch={setActiveTab} />
      <HeroSection onScrollTo={scrollTo} onTabSwitch={setActiveTab} />
      <PlansSection activeTab={activeTab} onTabSwitch={setActiveTab} />
      <AboutSection />
      <DisclosureSection />
      <Footer onScrollTo={scrollTo} />
    </div>
  );
};

export default Index;
