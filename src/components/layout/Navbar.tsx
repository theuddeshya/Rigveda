import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUIStore } from '../../store/uiStore';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '../../lib/utils';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleSidebar, theme, toggleTheme } = useUIStore();
  const location = useLocation();

  // Track scroll position for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore' },
    { to: '/discover', label: 'Discover' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        "w-full sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-vedic-ui/95 backdrop-blur-lg border-b border-vedic-accent/20 shadow-xl"
          : "bg-vedic-ui border-b border-vedic-accent/10"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Sidebar toggle + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleSidebar()}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                "hover:bg-vedic-sage/20 text-vedic-text",
                "min-w-[44px] min-h-[44px] flex items-center justify-center"
              )}
              aria-label="Toggle index sidebar"
            >
              <Menu size={20} />
            </button>
            <Link
              to="/"
              className={cn(
                "font-bold text-2xl tracking-wide font-ui transition-colors",
                "text-vedic-text hover:text-vedic-sage"
              )}
            >
              <span className="bg-gradient-to-r from-vedic-cream via-vedic-sage to-vedic-cream bg-clip-text">
                Rigveda
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "px-4 py-2 rounded-lg text-base font-medium transition-all duration-200",
                  "hover:bg-vedic-sage/20",
                  isActive(link.to)
                    ? "bg-vedic-sage/30 text-vedic-text"
                    : "text-vedic-text/80 hover:text-vedic-text"
                )}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => toggleTheme()}
              aria-label="Toggle theme"
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                "hover:bg-vedic-accent/20 text-vedic-text",
                "min-w-[44px] min-h-[44px] flex items-center justify-center"
              )}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => toggleTheme()}
              aria-label="Toggle theme"
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                "hover:bg-vedic-accent/20 text-vedic-text",
                "min-w-[44px] min-h-[44px] flex items-center justify-center"
              )}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                "hover:bg-vedic-sage/20 text-vedic-text",
                "min-w-[44px] min-h-[44px] flex items-center justify-center"
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={cn(
          "md:hidden border-t border-vedic-accent/20",
          "bg-vedic-slate/95 backdrop-blur-lg",
          "animate-slide-in-right"
        )}>
          <ul className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                    "hover:bg-vedic-sage/20",
                    isActive(link.to)
                      ? "bg-vedic-sage/30 text-vedic-text"
                      : "text-vedic-text/80 hover:text-vedic-text"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
