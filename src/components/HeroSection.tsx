import { motion } from "framer-motion";
import { Zap, Shield, Headphones, Activity, Database, Globe } from "lucide-react";

const REFERRAL = "https://www.hostinger.com?REFERRALCODE=CJRSONEZBJNV";

interface HeroProps {
  onScrollTo: (id: string) => void;
  onTabSwitch: (tab: string) => void;
}

const HeroSection = ({ onScrollTo, onTabSwitch }: HeroProps) => {
  const badges = [
    { icon: Zap, label: "Fast Performance", desc: "99.9% Uptime" },
    { icon: Shield, label: "Secure Setup", desc: "Free SSL" },
    { icon: Headphones, label: "24/7 Support", desc: "Always Online" },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-glow pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Premium Hosting
              <br />
              <span className="text-gradient">& Domains</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Search domains, compare hosting plans, and explore VPS options — all in one premium interface.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => { onTabSwitch("hosting"); onScrollTo("plans"); }}
                className="btn-primary-glow px-6 py-3 rounded-2xl font-semibold transition-all hover:scale-105"
              >
                View Hosting Plans
              </button>
              <button
                onClick={() => { onTabSwitch("domain"); onScrollTo("plans"); }}
                className="glass glow-border glow-border-hover px-6 py-3 rounded-2xl font-semibold transition-all hover:scale-105"
              >
                Search Domain
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-12">
              {badges.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass glow-border rounded-2xl p-4 text-center"
                >
                  <b.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs font-semibold">{b.label}</p>
                  <p className="text-xs text-muted-foreground">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Mock Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="glass glow-border rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-muted-foreground ml-2">EasyHost  Dashboard</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Globe, label: "Domains", val: "12 Active" },
                  { icon: Database, label: "Storage", val: "256 GB" },
                  { icon: Activity, label: "Uptime", val: "99.9%" },
                ].map((s) => (
                  <div key={s.label} className="bg-secondary/50 rounded-2xl p-4 text-center">
                    <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-sm font-bold">{s.val}</p>
                  </div>
                ))}
              </div>

              <div className="bg-secondary/30 rounded-2xl p-4">
                <p className="text-xs text-muted-foreground mb-2">Server Performance</p>
                <div className="flex gap-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex-1 rounded-full" style={{ height: `${20 + Math.random() * 40}px`, background: `hsl(var(--primary) / ${0.3 + Math.random() * 0.5})` }} />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between bg-secondary/30 rounded-2xl p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Active Plan</p>
                  <p className="text-sm font-bold">Business Pro</p>
                </div>
                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
