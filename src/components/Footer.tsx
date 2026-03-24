const Footer = () => {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-light text-foreground mb-4">
              BOTANICA
            </h3>
            <p className="font-body text-sm font-light text-muted-foreground max-w-xs leading-relaxed">
              Handcrafted botanical skincare rooted in the wisdom of nature.
            </p>
          </div>

          <div>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              {["Shop", "Our Story", "Ingredients", "Journal"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="font-body text-sm font-light text-foreground/70 hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {["Instagram", "Pinterest", "TikTok"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-body text-sm font-light text-foreground/70 hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © 2026 Botanica. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Crafted with care for your skin & the earth.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
