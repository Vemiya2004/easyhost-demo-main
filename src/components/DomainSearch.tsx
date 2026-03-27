import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, X as XIcon } from "lucide-react";

const REFERRAL = "https://www.hostinger.com?REFERRALCODE=CJRSONEZBJNV";

const TAKEN_DOMAINS = [
  "google.com", "facebook.com", "youtube.com", "openai.com",
  "amazon.com", "hostinger.com", "netflix.com", "menuos.com", "easyhostlk.com",
];

const EXTENSIONS = [".com", ".net", ".org", ".online", ".site", ".store"];

const DomainSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ domain: string; available: boolean }[] | null>(null);

  const handleSearch = () => {
    if (!query.trim()) return;

    let baseName = query.trim().toLowerCase().replace(/\s+/g, "");
    // Strip extension if user typed one
    const hasExt = EXTENSIONS.some((ext) => baseName.endsWith(ext));
    if (hasExt) {
      const dotIndex = baseName.lastIndexOf(".");
      baseName = baseName.substring(0, dotIndex);
    }

    const suggestions = EXTENSIONS.map((ext) => {
      const full = baseName + ext;
      return { domain: full, available: !TAKEN_DOMAINS.includes(full) };
    });

    setResults(suggestions);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">Find Your Perfect Domain</h3>
        <p className="text-muted-foreground">Search for available domains and secure your brand online.</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="flex glass glow-border rounded-2xl overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter your domain name (e.g. menuos)"
            className="flex-1 bg-transparent px-6 py-4 text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
          <button
            onClick={handleSearch}
            className="btn-primary-glow px-6 m-2 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all hover:scale-105"
          >
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {results.map((r, i) => (
              <motion.div
                key={r.domain}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass rounded-2xl p-5 flex flex-col gap-3 glow-border-hover transition-all ${r.available ? "glow-border" : "border-border/30"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold">{r.domain}</span>
                  {r.available ? (
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <Check className="w-3 h-3" /> Available
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-red-400">
                      <XIcon className="w-3 h-3" /> Taken
                    </span>
                  )}
                </div>
                <a
                  href={REFERRAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-center py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 ${
                    r.available
                      ? "btn-primary-glow"
                      : "glass border border-border/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r.available ? "Buy Domain" : "View Options"}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DomainSearch;
