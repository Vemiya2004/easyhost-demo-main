import { motion } from "framer-motion";
import { Globe, Layers, ExternalLink } from "lucide-react";

const cards = [
  {
    icon: Globe,
    title: "Domain-First Experience",
    desc: "Search, compare, and discover domains with a beautiful, intuitive interface.",
  },
  {
    icon: Layers,
    title: "Hosting & VPS Separation",
    desc: "Clearly organized plans so you find exactly what you need — fast.",
  },
  {
    icon: ExternalLink,
    title: "Referral-Ready Buttons",
    desc: "Every CTA links directly to Hostinger for seamless sign-up and purchase.",
  },
];

const AboutSection = () => (
  <section id="about" className="relative py-24">
    <div className="absolute inset-0 bg-glow pointer-events-none" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          About <span className="text-gradient">EasyHost </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          EasyHost  is a premium frontend demo hosting brand experience. We help users explore domains, hosting, and VPS in a clean, elegant interface — designed for conversion and clarity.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass glow-border glow-border-hover rounded-3xl p-6 text-center transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <c.icon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-display font-bold mb-2">{c.title}</h4>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
