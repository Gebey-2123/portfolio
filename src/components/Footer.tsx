"use client";

import { useRef } from "react";
import { ALL_SOCIAL_LINKS, SocialIcon } from "./SocialIcons"; // Import from new file
import { motion, useInView } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const footerLinks = ALL_SOCIAL_LINKS; // This is used in the JSX below, but ESLint might flag it as unused if not directly destructured.

const TypewriterText = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const child = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline-block" }
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-[#070d1f] relative z-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <div className="font-mono text-sm font-bold text-cyan mb-1">Gebey Gebre</div>
          <div className="font-mono text-[9px] md:text-[10px] text-outline tracking-wider uppercase">
            SE Student · Woldia University · 2026
          </div>
        </div>

        <div className="font-mono text-[9px] md:text-[10px] text-outline text-center hidden md:block min-w-[280px]">
          <TypewriterText text="Built with React & Next.js · Designed with high-performance animations" />
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 items-center">
          {ALL_SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3d494c] hover:text-cyan transition-colors group"
              title={link.label}
            >
              <SocialIcon link={link} className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
