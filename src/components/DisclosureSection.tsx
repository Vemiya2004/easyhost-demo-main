import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const REFERRAL = "https://www.hostinger.com?REFERRALCODE=CJRSONEZBJNV";

const DisclosureSection = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass glow-border rounded-3xl p-8 sm:p-12 text-center"
      >
        <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-4">Recommended Provider</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Powered by <span className="text-gradient">Hostinger</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          This site may earn a commission through referral links at no extra cost to you. We recommend Hostinger for reliable, high-performance hosting.
        </p>
        <a
          href={REFERRAL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 btn-primary-glow px-8 py-3 rounded-2xl font-semibold transition-all hover:scale-105"
        >
          Visit Hostinger <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default DisclosureSection;
