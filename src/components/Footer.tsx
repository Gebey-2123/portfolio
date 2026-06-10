"use client";

import { useRef, useMemo } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, TelegramIcon, TiktokIcon, ALL_SOCIAL_LINKS, SocialLinkItem, SocialIcon } from "./SocialIcons"; // Import from new file
import { motion, useInView } from "framer-motion";

const footerLinks = ALL_SOCIAL_LINKS; // Use the centralized social links

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
          <a
            href="https://github.com/Gebey-2123"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3d494c] hover:text-cyan transition-colors group"
            title="GitHub"
          >
            <GithubIcon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
          </a>
          <a
            href="https://linkedin.com/in/gebregebey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3d494c] hover:text-cyan transition-colors group"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
          </a>
          <a
            href="https://instagram.com/gigi1232073"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3d494c] hover:text-cyan transition-colors group"
            title="Instagram"
          >
            <InstagramIcon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
          </a>
          <a
            href="https://t.me/GebeyG"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3d494c] hover:text-cyan transition-colors group"
            title="Telegram"
          >
            <TelegramIcon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
          </a>
          <a
            href="https://tiktok.com/@gebregebey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3d494c] hover:text-cyan transition-colors group"
            title="TikTok"
          >
            <TiktokIcon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
          </a>
          <a
            href="mailto:gebregebey@gmail.com"
            className="text-[#3d494c] hover:text-cyan transition-colors group"
            title="Email"
          >
            <Mail className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
