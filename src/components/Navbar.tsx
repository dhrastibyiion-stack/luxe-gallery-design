import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const navLinks = ["Shop", "Our Story", "Ingredients", "Journal"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { count, setIsOpen: setCartOpen } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const id = link.toLowerCase().replace(" ", "-");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between py-4 px-5 sm:px-6 md:py-5">
        <Link
          to="/"
          className="font-display text-xl font-light tracking-wider text-foreground sm:text-2xl md:text-3xl"
        >
          BOTANICA
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              onClick={(e) => scrollToSection(e, link)}
              className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate(user ? "/account" : "/auth")}
            aria-label={user ? "Your account" : "Sign in"}
            className="flex h-11 w-11 items-center justify-center text-foreground"
          >
            <User size={20} />
          </button>
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open bag"
            className="relative flex h-11 w-11 items-center justify-center text-foreground"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-body text-[10px] text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-11 w-11 items-center justify-center text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background border-t border-border"
          >
            <div className="flex flex-col items-center py-6 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  onClick={(e) => scrollToSection(e, link)}
                  className="w-full py-3 text-center font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
