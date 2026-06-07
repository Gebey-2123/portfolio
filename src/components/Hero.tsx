"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import { motion, useInView, animate } from "framer-motion";
import BackgroundMesh from "./BackgroundMesh";
import MagneticButton from "./MagneticButton";
import Image from "next/image";

const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Problem Solver",
  "Algorithm Enthusiast",
];

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

function Counter({ from, to, duration, suffix = "" }: { from: number, to: number, duration: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const node = nodeRef.current;
      animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toString() + suffix;
        },
      });
    }
  }, [from, to, duration, inView, suffix]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

export default function Hero() {
  const [roleText, setRoleText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = roles[roleIdx];

    if (isGlitching) {
      // Glitch effect: random characters flashing
      let iterations = 0;
      const glitchInterval = setInterval(() => {
        setRoleText(currentWord.split("").map((_, i) => 
          i < iterations ? " " : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        ).join(""));
        
        iterations += 0.5;
        if (iterations >= currentWord.length) {
          clearInterval(glitchInterval);
          setIsGlitching(false);
          setIsDeleting(true);
        }
      }, 30);
      return () => clearInterval(glitchInterval);
    }

    if (isDeleting) {
      // After glitch, quickly clear
      setRoleText("");
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % roles.length);
    } else {
      // Typing forward
      if (roleText.length < currentWord.length) {
        timer = setTimeout(() => {
          setRoleText(currentWord.slice(0, roleText.length + 1));
        }, 80);
      } else {
        // Hold, then trigger glitch
        timer = setTimeout(() => setIsGlitching(true), 2000);
      }
    }

    return () => clearTimeout(timer);
  }, [roleText, roleIdx, isDeleting, isGlitching]);

  const handleScrollDown = () => {
    const aboutSec = document.getElementById("about");
    if (aboutSec) aboutSec.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6"
    >
      <BackgroundMesh />

      <div className="absolute top-[15%] left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-cyan/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[8%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-violet/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center mt-12">
        {/* small profile avatar top-right of the hero */}
        <div className="absolute top-6 right-6 hidden sm:block">
          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/10 shadow-lg">
            <Image src="/profile.jpg" alt="Gebey" width={56} height={56} className="object-cover" />
          </div>
        </div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-grotesk font-extrabold text-5xl sm:text-7xl md:text-[5.5rem] tracking-tight leading-[1.1] mb-6 select-none"
        >
          <span className="text-white block">Hi, I&apos;m</span>
          <span className="bg-clip-text text-transparent bg-[linear-gradient(110deg,#00e5ff,45%,#fff,55%,#00e5ff)] bg-[length:200%_auto] animate-[shimmer_3s_infinite_linear] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            Gebey Gebre
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="h-10 md:h-12 mb-8 flex items-center justify-center"
        >
          <span className="font-mono text-base md:text-2xl text-on-muted">
            <span className="text-violet/90 font-bold tracking-wide">{roleText}</span>
            <span className="blink text-cyan font-bold ml-1">_</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-sm md:text-lg leading-relaxed text-on-muted max-w-xl md:max-w-2xl mb-12"
        >
          Software Engineering Student at{" "}
          <span className="text-white font-semibold underline decoration-cyan/40 hover:text-cyan transition-colors">
            Woldia University
          </span>
          , building solutions with clean code, efficient algorithms, and a passion for full-stack development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-wrap gap-5 justify-center items-center w-full"
        >
          <MagneticButton>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-cyan px-8 font-mono text-sm font-bold text-deep transition-all hover:bg-cyan/90 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] group"
            >
              VIEW PROJECTS
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-cyan/40 bg-transparent px-8 font-mono text-sm font-bold text-cyan transition-all hover:bg-cyan/10 hover:border-cyan hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] group"
            >
              GET IN TOUCH
              <Mail className="ml-2 w-4 h-4" />
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex gap-8 justify-center flex-wrap mt-20 md:mt-24 w-full border-t border-white/5 pt-8 max-w-xl"
        >
          <div className="text-center flex-1 min-w-[100px]">
            <div className="font-grotesk text-3xl md:text-4xl font-black text-cyan">
              <Counter from={0} to={5} duration={2} suffix="+" />
            </div>
            <div className="font-mono text-[9px] md:text-[10px] tracking-widest text-on-muted uppercase mt-2">
              Projects Built
            </div>
          </div>
          <div className="w-[1px] bg-white/10 hidden sm:block self-stretch" />
          <div className="text-center flex-1 min-w-[100px]">
            <div className="font-grotesk text-3xl md:text-4xl font-black text-violet">
              <Counter from={0} to={6} duration={2} suffix="+" />
            </div>
            <div className="font-mono text-[9px] md:text-[10px] tracking-widest text-on-muted uppercase mt-2">
              Languages
            </div>
          </div>
          <div className="w-[1px] bg-white/10 hidden sm:block self-stretch" />
          <div className="text-center flex-1 min-w-[100px]">
            <div className="font-grotesk text-3xl md:text-4xl font-black text-amber">∞</div>
            <div className="font-mono text-[9px] md:text-[10px] tracking-widest text-on-muted uppercase mt-2">
              Curiosity
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-100 transition-opacity"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] text-cyan uppercase">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-cyan" />
        </motion.div>
      </motion.div>
    </section>
  );
}
