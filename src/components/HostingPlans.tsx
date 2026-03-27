import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const REFERRAL = "https://www.hostinger.com?REFERRALCODE=CJRSONEZBJNV";

const plans = [
  {
    name: "Premium",
    price: "$2.99",
    period: "/mo",
    subtitle: "Perfect for personal websites",
    badge: false,
    features: ["100 GB SSD Storage", "Free Domain", "Free SSL Certificate", "Weekly Backups", "Unlimited Bandwidth"],
  },
  {
    name: "Business",
    price: "$3.99",
    period: "/mo",
    subtitle: "For growing businesses",
    badge: true,
    features: ["200 GB NVMe Storage", "Free Domain", "Free SSL & CDN", "Daily Backups", "Unlimited Bandwidth"],
  },
  {
    name: "Cloud Startup",
    price: "$9.99",
    period: "/mo",
    subtitle: "Maximum speed & resources",
    badge: false,
    features: ["300 GB NVMe Storage", "Free Domain", "Free SSL & CDN", "Daily Backups", "Dedicated IP Address"],
  },
];

const HostingPlans = () => (
  <div className="space-y-8">
    <div className="text-center mb-8">
      <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">Web Hosting Plans</h3>
      <p className="text-muted-foreground">Reliable, fast, and secure hosting for every project.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`relative glass rounded-3xl p-6 flex flex-col glow-border-hover transition-all ${plan.badge ? "glow-border scale-[1.02]" : ""}`}
        >
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
              <Star className="w-3 h-3" /> Most Popular
            </div>
          )}
          <h4 className="font-display text-xl font-bold mb-1">{plan.name}</h4>
          <p className="text-xs text-muted-foreground mb-4">{plan.subtitle}</p>
          <div className="mb-6">
            <span className="text-3xl font-bold text-gradient">{plan.price}</span>
            <span className="text-muted-foreground text-sm">{plan.period}</span>
          </div>
          <ul className="space-y-3 mb-6 flex-1">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <a
            href={REFERRAL}
            target="_blank"
            rel="noopener noreferrer"
            className={`block text-center py-3 rounded-2xl text-sm font-semibold transition-all hover:scale-105 ${
              plan.badge ? "btn-primary-glow" : "glass glow-border glow-border-hover"
            }`}
          >
            Buy Now
          </a>
          <p className="text-center text-xs text-muted-foreground mt-3">Powered by Hostinger</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default HostingPlans;
