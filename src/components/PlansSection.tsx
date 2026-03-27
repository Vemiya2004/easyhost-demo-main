import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, HardDrive } from "lucide-react";
import DomainSearch from "./DomainSearch";
import HostingPlans from "./HostingPlans";
import VPSPlans from "./VPSPlans";

const tabs = [
  { id: "domain", label: "Domain", icon: Globe },
  { id: "hosting", label: "Hosting", icon: Server },
  { id: "vps", label: "VPS", icon: HardDrive },
];

interface PlansSectionProps {
  activeTab: string;
  onTabSwitch: (tab: string) => void;
}

const PlansSection = ({ activeTab, onTabSwitch }: PlansSectionProps) => (
  <section id="plans" className="relative py-24">
    <div className="absolute inset-0 bg-glow-center pointer-events-none" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Our <span className="text-gradient">Plans</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Explore domains, hosting, and VPS solutions tailored for you.
        </p>
      </motion.div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex glass rounded-2xl p-1.5 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabSwitch(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "btn-primary-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "domain" && <DomainSearch />}
          {activeTab === "hosting" && <HostingPlans />}
          {activeTab === "vps" && <VPSPlans />}
        </motion.div>
      </AnimatePresence>
    </div>
  </section>
);

export default PlansSection;
