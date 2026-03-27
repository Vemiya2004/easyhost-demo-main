import { motion } from "framer-motion";
import { Cpu, MemoryStick, HardDrive, Gauge } from "lucide-react";

const REFERRAL = "https://www.hostinger.com?REFERRALCODE=CJRSONEZBJNV";

const plans = [
  { name: "KVM 1", price: "$5.99/mo", cpu: "1 vCPU", ram: "4 GB RAM", storage: "50 GB NVMe", bandwidth: "1 TB" },
  { name: "KVM 2", price: "$8.99/mo", cpu: "2 vCPU", ram: "8 GB RAM", storage: "100 GB NVMe", bandwidth: "2 TB" },
  { name: "KVM 4", price: "$14.99/mo", cpu: "4 vCPU", ram: "16 GB RAM", storage: "200 GB NVMe", bandwidth: "4 TB" },
];

const specs = [
  { icon: Cpu, key: "cpu" as const },
  { icon: MemoryStick, key: "ram" as const },
  { icon: HardDrive, key: "storage" as const },
  { icon: Gauge, key: "bandwidth" as const },
];

const VPSPlans = () => (
  <div className="space-y-8">
    <div className="text-center mb-8">
      <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">VPS Hosting Plans</h3>
      <p className="text-muted-foreground">Full root access with dedicated resources.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass glow-border glow-border-hover rounded-3xl p-6 flex flex-col transition-all"
        >
          <h4 className="font-display text-xl font-bold mb-1">{plan.name}</h4>
          <p className="text-2xl font-bold text-gradient mb-6">{plan.price}</p>

          <div className="space-y-4 flex-1 mb-6">
            {specs.map((s) => (
              <div key={s.key} className="flex items-center gap-3 text-sm text-muted-foreground">
                <s.icon className="w-4 h-4 text-primary" />
                {plan[s.key]}
              </div>
            ))}
          </div>

          <a
            href={REFERRAL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center btn-primary-glow py-3 rounded-2xl text-sm font-semibold transition-all hover:scale-105"
          >
            Buy VPS
          </a>
          <p className="text-center text-xs text-muted-foreground mt-3">Powered by Hostinger</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default VPSPlans;
