import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe, Server, HardDrive, Menu, X } from "lucide-react";

const REFERRAL = "https://www.hostinger.com?REFERRALCODE=CJRSONEZBJNV";

interface NavbarProps {
  onScrollTo: (id: string) => void;
  onTabSwitch: (tab: string) => void;
}

const Navbar = ({ onScrollTo, onTabSwitch }: NavbarProps) => {
  const [plansOpen, setPlansOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handlePlanClick = (tab: string) => {
    onTabSwitch(tab);
    onScrollTo("plans");
    setPlansOpen(false);
    setMobileOpen(false);
  };

  const subItems = [
    { label: "Domain", icon: Globe, tab: "domain" },
    { label: "Hosting", icon: Server, tab: "hosting" },
    { label: "VPS", icon: HardDrive, tab: "vps" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => onScrollTo("hero")} className="font-display text-xl font-bold text-gradient">
            EasyHost LK
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onScrollTo("hero")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </button>

            {/* Plans Dropdown */}
            <div className="relative" onMouseEnter={() => setPlansOpen(true)} onMouseLeave={() => setPlansOpen(false)}>
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Plans <ChevronDown className={`w-4 h-4 transition-transform ${plansOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {plansOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 glass-strong rounded-2xl overflow-hidden p-2"
                  >
                    {subItems.map((item) => (
                      <button
                        key={item.tab}
                        onClick={() => handlePlanClick(item.tab)}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-primary" />
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => onScrollTo("about")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </button>

            <a href={REFERRAL} target="_blank" rel="noopener noreferrer" className="btn-primary-glow px-5 py-2 rounded-xl text-sm transition-all hover:scale-105">
              Get Started
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-strong border-t border-border/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              <button onClick={() => { onScrollTo("hero"); setMobileOpen(false); }} className="block w-full text-left px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary/50 transition-colors">
                Home
              </button>
              {subItems.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => handlePlanClick(item.tab)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  {item.label}
                </button>
              ))}
              <button onClick={() => { onScrollTo("about"); setMobileOpen(false); }} className="block w-full text-left px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary/50 transition-colors">
                About
              </button>
              <a href={REFERRAL} target="_blank" rel="noopener noreferrer" className="block w-full text-center btn-primary-glow px-5 py-3 rounded-xl text-sm mt-2">
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
