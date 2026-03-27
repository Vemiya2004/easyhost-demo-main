const Footer = ({ onScrollTo }: { onScrollTo: (id: string) => void }) => {
  const links = [
    { label: "Home", id: "hero" },
    { label: "Plans", id: "plans" },
    { label: "About", id: "about" },
  ];

  return (
    <footer className="border-t border-border/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-lg font-bold text-gradient">EasyHost LK</p>
            <p className="text-xs text-muted-foreground mt-1">Premium Hosting Experience</p>
          </div>
          <div className="flex items-center gap-6">
            {links.map((l) => (
              <button key={l.id} onClick={() => onScrollTo(l.id)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
  {new Date().getFullYear()} EasyHost. This is a demo site. All purchase buttons redirect to Hostinger via referral link.
  <br /> Made By
  <a
    href="https://sonez.me"
    className="text-green-500 hover:text-green-600"
    target="_blank"
    rel="noopener noreferrer"
  >
    Sonez
  </a>
</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
