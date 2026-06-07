"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import SkillOrbs from "@/components/SkillOrbs";
import OtherSkills from "@/components/OtherSkills";
import Experience from "@/components/Experience";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingParallax from "@/components/FloatingParallax";
import BootSequence from "@/components/BootSequence";

export default function Home() {
  const [booting, setBooting] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <Cursor />
      
      {booting && <BootSequence onComplete={() => setBooting(false)} />}

      {!booting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-cyan origin-left z-[9999]"
            style={{ scaleX }}
          />

          <Navbar />

          <main className="relative z-10">
            <FloatingParallax />
            <Hero />
            <About />
            <Projects />
            <SkillOrbs />
            <OtherSkills />
            <Experience />
            <InteractiveTerminal />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}
