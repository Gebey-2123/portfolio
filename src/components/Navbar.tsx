"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react"; // Keep Mail for email link
import { GithubIcon, LinkedinIcon, ALL_SOCIAL_LINKS, SocialIcon } from "./SocialIcons"; // Import from new file
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    // IntersectionObserver to highlight active nav link
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // triggers when section is in the middle of the viewport
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-100 w-full z-[1000] transition-all duration-300 ${scrolled
          ? "bg-deep/80 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-mono text-sm font-extrabold tracking-wider text-cyan hover:text-cyan/80 transition-colors"
          >
            GG<span className="text-violet">_DEV</span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className={`font-mono text-xs uppercase tracking-widest transition-all duration-200 relative py-1 hover:text-cyan ${activeSection === item.href.slice(1)
                  ? "text-cyan font-bold"
                  : "text-on-muted"
                  }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan"
                    transition={{ type: "spring" as const, stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
            <div className="flex items-center gap-4.5 mr-2"> {/* Adjusted gap for consistency */}
              <a
                href="https://github.com/Gebey-2123"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-muted hover:text-cyan transition-colors group"
                title="GitHub"
              >
                <GithubIcon className="w-4.5 h-4.5 transition-transform duration-500 group-hover:rotate-[360deg]" />
              </a>
              <a
                href="https://linkedin.com/in/gebregebey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-muted hover:text-cyan transition-colors group"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4.5 h-4.5 transition-transform duration-500 group-hover:rotate-[360deg]" />
              </a>
              {ALL_SOCIAL_LINKS.filter(link => link.id !== "github" && link.id !== "linkedin").map((link) => ( // Render other social links
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-muted hover:text-cyan transition-colors group"
                  title={link.label}
                >
                  <SocialIcon link={link} className="w-4.5 h-4.5 transition-transform duration-500 group-hover:rotate-[360deg]" />
                </a>
              ))}
            </div>
            <a
              href="#"
              className="btn-secondary text-xs py-2 px-5 flex items-center gap-1.5"
            >
              Resume <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden text-on-surface p-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6 text-cyan" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-[64px] left-0 right-0 z-[999] glass-strong py-6 px-6 flex flex-col gap-4 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className={`font-mono text-sm tracking-wider py-2.5 border-b border-white/5 last:border-0 hover:text-cyan transition-colors ${activeSection === item.href.slice(1)
                  ? "text-cyan font-bold"
                  : "text-on-surface"
                  }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#"
              className="btn-secondary w-full text-center justify-center py-3 mt-2 text-xs flex items-center gap-1.5"
            >
              Resume <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-white/5">
              <a
                href="https://github.com/Gebey-2123"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-muted hover:text-cyan transition-colors group"
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
              </a>
              <a
                href="https://linkedin.com/in/gebregebey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-muted hover:text-cyan transition-colors group"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
              </a>
              {ALL_SOCIAL_LINKS.filter(link => link.id !== "github" && link.id !== "linkedin").map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-muted hover:text-cyan transition-colors group"
                  title={link.label}
                >
                  <SocialIcon link={link} className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
