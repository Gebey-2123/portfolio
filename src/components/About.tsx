"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, GraduationCap, Briefcase, Rocket } from "lucide-react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  // Badge spring bounce entrance
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Typing effect for the JSON block
  const jsonLineVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
  };

  return (
    <section id="about" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-label mb-4"
      >
        About Me
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Left Side: Biography */}
        <motion.div variants={itemVariants} className="flex flex-col">
          {/* Profile Image Frame with Conic Gradient & Glitch */}
          <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl mb-8 group cursor-pointer glitch-hover overflow-hidden">
            {/* Spinning border */}
            <div className="conic-spin" />
            <div className="absolute inset-[2px] rounded-2xl bg-deep z-10 overflow-hidden">
              <div className="absolute inset-0 bg-[#070d1f]/10 group-hover:bg-transparent duration-300 z-20" />

              {/* Base Image */}
              <Image
                src="/profile.jpg"
                alt="Gebey Gebre"
                width={150}
                height={150}
                priority
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 z-10"
              />

              {/* Glitch Layer 1 (Red/Magenta) */}
              <div className="absolute inset-0 z-20 mix-blend-screen opacity-0 group-hover:opacity-100 glitch-layer-1">
                <Image src="/profile.jpg" alt="glitch1" width={150} height={150} className="w-full h-full object-cover filter brightness-110 sepia-[1] hue-rotate-[-50deg] saturate-[3]" />
              </div>

              {/* Glitch Layer 2 (Cyan) */}
              <div className="absolute inset-0 z-20 mix-blend-screen opacity-0 group-hover:opacity-100 glitch-layer-2">
                <Image src="/profile.jpg" alt="glitch2" width={150} height={150} className="w-full h-full object-cover filter brightness-110 sepia-[1] hue-rotate-[130deg] saturate-[3]" />
              </div>
            </div>

            {/* Active Status indicator */}
            <div className="absolute bottom-2 right-2 z-30 flex items-center gap-1 bg-deep/80 backdrop-blur-md border border-white/10 rounded-full px-2 py-0.5 font-mono text-[8px] text-cyan font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_2s_infinite]" />
              ONLINE
            </div>
          </div>

          <h2 className="font-grotesk text-3xl md:text-5xl font-black tracking-tight leading-tight mb-8">
            Turning <span className="text-cyan text-glow">ideas</span> into <br />
            working <span className="text-violet">software</span>
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-on-muted mb-6">
            I&apos;m <strong className="text-white font-semibold">Gebey Gebre</strong>, a Software Engineering student at{" "}
            <strong className="text-cyan font-semibold">Woldia University</strong>, Ethiopia. I am driven by the process of solving computational puzzles and building responsive applications that deliver great user experiences.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-on-muted mb-8">
            Having built strong academic foundations in object-oriented programming, database management, and data structures & algorithms, I actively construct end-to-end projects. I&apos;m looking for a technical internship where I can apply my problem-solving capabilities and adapt to modern development pipelines.
          </p>

          {/* Chips */}
          {(() => {
            const badges = [
              { id: "location", icon: <MapPin className="w-3.5 h-3.5 text-cyan" />, text: "📍 Woldia, Ethiopia" },
              { id: "university", icon: <GraduationCap className="w-3.5 h-3.5 text-violet" />, text: "🎓 Woldia University" },
              { id: "briefcase", icon: <Briefcase className="w-3.5 h-3.5 text-cyan" />, text: "" },
              { id: "role", icon: <Rocket className="w-3.5 h-3.5 text-amber" />, text: "🚀 Full-Stack Dev" },
            ];
            return (
              <motion.div
                className="flex flex-wrap gap-2.5 mb-8"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
              >
                {badges.map(badge => (
                  <motion.span key={badge.id} variants={badgeVariants} className="chip flex items-center gap-1.5">
                    {badge.icon}
                    {badge.text}
                  </motion.span>
                ))}
              </motion.div>
            );
          })()}

          {/* Chips */}
          <motion.div
            className="flex flex-wrap gap-2.5 mb-8"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
          </motion.div>

          <div>
            <MagneticButton>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="scanline-btn inline-flex items-center justify-center gap-2 bg-cyan/10 border border-cyan/30 text-cyan px-6 py-3 rounded-md font-mono text-sm font-bold hover:bg-cyan/20 hover:border-cyan transition-colors group cursor-pointer"
              >
                Let&apos;s Connect <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right Side: Mock Profile Editor */}
        <motion.div
          variants={itemVariants}
          className="terminal-window glass-strong glow-cyan border border-white/10"
        >
          {/* Header Bar */}
          <div className="terminal-bar flex items-center px-4 py-3 bg-[#191f31]/60">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[10px] md:text-xs text-[#869397] ml-4 font-medium select-none">
              gebey.profile.json
            </span>
          </div>

          {/* Editor Content */}
          <motion.div
            className="terminal-body p-6 bg-[#0a0f1e]/90 font-mono text-[11px] md:text-[13px] leading-relaxed text-[#dce1fb] select-none"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
            }}
          >
            <motion.div variants={jsonLineVariants} className="text-outline text-xs mb-3">{"// Gebey Gebre — Developer Profile"}</motion.div>
            <motion.div variants={jsonLineVariants}><span className="text-violet">{"{"}</span></motion.div>

            <motion.div variants={jsonLineVariants} className="pl-4 md:pl-6">
              <span className="text-cyan">&quot;name&quot;</span>: <span className="text-amber">&quot;Gebey Gebre&quot;</span>,
            </motion.div>

            <motion.div variants={jsonLineVariants} className="pl-4 md:pl-6">
              <span className="text-cyan">&quot;role&quot;</span>: <span className="text-amber">&quot;SE Student&quot;</span>,
            </motion.div>

            <motion.div variants={jsonLineVariants} className="pl-4 md:pl-6">
              <span className="text-cyan">&quot;university&quot;</span>: <span className="text-amber">&quot;Woldia Univ.&quot;</span>,
            </motion.div>

            <motion.div variants={jsonLineVariants} className="pl-4 md:pl-6">
              <span className="text-cyan">&quot;status&quot;</span>: <span className="text-green-400">&quot;open to work&quot;</span>,
            </motion.div>

            <motion.div variants={jsonLineVariants} className="pl-4 md:pl-6">
              <span className="text-cyan">&quot;languages&quot;</span>: <span className="text-violet">[</span>
              <div className="pl-4 md:pl-6">
                <span className="text-amber">&quot;C++&quot;</span>, <span className="text-amber">&quot;Java&quot;</span>, <span className="text-amber">&quot;PHP&quot;</span>,
              </div>
              <div className="pl-4 md:pl-6">
                <span className="text-amber">&quot;JavaScript&quot;</span>, <span className="text-amber">&quot;HTML&quot;</span>, <span className="text-amber">&quot;CSS&quot;</span>
              </div>
              <span className="text-violet">]</span>,
            </motion.div>

            <motion.div variants={jsonLineVariants} className="pl-4 md:pl-6">
              <span className="text-cyan">&quot;specialties&quot;</span>: <span className="text-violet">[</span>
              <div className="pl-4 md:pl-6">
                <span className="text-amber">&quot;Data Structures&quot;</span>,
              </div>
              <div className="pl-4 md:pl-6">
                <span className="text-amber">&quot;Algorithms&quot;</span>,
              </div>
              <div className="pl-4 md:pl-6">
                <span className="text-amber">&quot;Full-Stack Web&quot;</span>
              </div>
              <span className="text-violet">]</span>,
            </motion.div>

            <motion.div variants={jsonLineVariants} className="pl-4 md:pl-6">
              <span className="text-cyan">&quot;available&quot;</span>: <span className="text-amber">true</span>
            </motion.div>

            <motion.div variants={jsonLineVariants}><span className="text-violet">{"}"}</span></motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
