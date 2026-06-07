"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  bullet?: string;
  isCgpa?: boolean;
}

const educationItems: TimelineItem[] = [
  {
    year: "2023 — Present",
    title: "Software Engineering Student",
    institution: "Woldia University",
    description: "Acquiring deep knowledge in core computer science fields. Key courses include Object-Oriented Analysis and Design, Database Systems, Data Structures & Algorithms, Computer Networks, and Web Programming.",
    isCgpa: true,
  },
  {
    year: "2021 — 2023",
    title: "Preparatory School Student",
    institution: "Natural Science Division",
    description: "Graduated with top honors. Focused heavily on Advanced Mathematics, Physics, and analytical logic, scoring high marks in university entrance examinations.",
  },
];

const experienceItems: TimelineItem[] = [
  {
    year: "2023 — Present",
    title: "Code & Algorithmic Practice",
    institution: "LeetCode & GitHub Labs",
    description: "Consistently solving algorithm design problems. Focused on optimization, complexity analysis (Big O), and mastering recursive and greedy paradigms in C++ and Java.",
  },
  {
    year: "2024 - Present",
    title: "Software Developer",
    institution: "Woldia University Capstone",
    description: "Directed a team of 4 students to build the Online Voting System. Handled architectural design, ERD mapping, relational database setups, and PHP API backend routes.",
  },

];

function DecimalCounter({ from, to, duration, suffix = "" }: { from: number, to: number, duration: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const node = nodeRef.current;
      animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = value.toFixed(2) + suffix;
        },
      });
    }
  }, [from, to, duration, inView, suffix]);

  return <span ref={nodeRef}>{from.toFixed(2)}{suffix}</span>;
}

export default function Experience() {
  const getCardVariants = (direction: "left" | "right") => ({
    hidden: { opacity: 0, x: direction === "left" ? -60 : 60 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 18,
        delay: custom * 0.15,
      },
    }),
  });

  return (
    <section id="experience" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-label mb-4"
      >
        History & Roadmap
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-grotesk text-3xl md:text-5xl font-black tracking-tight mb-16 text-white"
      >
        Education & <span className="text-cyan text-glow">Journey</span>
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left Column: Education */}
        <div>
          <div className="flex items-center gap-3.5 mb-8 relative z-10">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-cyan/10 border border-cyan/25 text-cyan shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-grotesk text-2xl font-bold tracking-tight text-white">Education</h3>
          </div>

          <div className="relative pl-8 flex flex-col gap-8">
            {/* Animated SVG Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px">
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <motion.line
                  x1="0" y1="0" x2="0" y2="100%"
                  stroke="url(#cyan-grad)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="cyan-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0, 229, 255, 0.5)" />
                    <stop offset="100%" stopColor="rgba(0, 229, 255, 0)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {educationItems.map((item, idx) => (
              <motion.div
                key={item.title}
                custom={idx}
                variants={getCardVariants("left")}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="relative"
              >
                {/* Sonar Ping Node */}
                <div className="absolute -left-[36.5px] top-1.5 flex items-center justify-center">
                  <div className="absolute w-3.5 h-3.5 rounded-full bg-cyan/40 animate-sonar" />
                  <div className="relative w-3.5 h-3.5 rounded-full border-2 border-cyan/40 bg-deep z-10" />
                </div>

                <div className="glass p-6 rounded-xl border border-white/5 hover:border-cyan/25 duration-300 hover:bg-surface-mid">
                  <span className="font-mono text-[10px] text-on-muted tracking-wider block mb-2">
                    {item.year}
                  </span>
                  <h4 className="font-grotesk text-lg font-bold text-white mb-1 leading-tight">
                    {item.title}
                  </h4>
                  <div className="text-xs text-cyan font-semibold mb-3 tracking-wide uppercase select-none">
                    {item.institution}
                  </div>
                  <p className="text-xs md:text-sm text-on-muted leading-relaxed">
                    {item.description}
                  </p>
                  {item.bullet && (
                    <div className="mt-3.5 font-mono text-[10px] md:text-xs text-cyan font-semibold flex items-center gap-1.5 select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                      {item.bullet}
                      {item.isCgpa && <DecimalCounter from={0.00} to={3.82} duration={2} suffix=" / 4.00" />}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Experience */}
        <div>
          <div className="flex items-center gap-3.5 mb-8 relative z-10">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-violet/10 border border-violet/25 text-violet shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-grotesk text-2xl font-bold tracking-tight text-white">Experience</h3>
          </div>

          <div className="relative pl-8 flex flex-col gap-8">
            {/* Animated SVG Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px">
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <motion.line
                  x1="0" y1="0" x2="0" y2="100%"
                  stroke="url(#violet-grad)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                />
                <defs>
                  <linearGradient id="violet-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(168, 85, 247, 0.5)" />
                    <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {experienceItems.map((item, idx) => (
              <motion.div
                key={item.title}
                custom={idx}
                variants={getCardVariants("right")}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="relative"
              >
                {/* Sonar Ping Node */}
                <div className="absolute -left-[36.5px] top-1.5 flex items-center justify-center">
                  <div className="absolute w-3.5 h-3.5 rounded-full bg-violet/40 animate-sonar" />
                  <div className="relative w-3.5 h-3.5 rounded-full border-2 border-violet/40 bg-deep z-10" />
                </div>

                <div className="glass p-6 rounded-xl border border-white/5 hover:border-violet/25 duration-300 hover:bg-surface-mid">
                  <span className="font-mono text-[10px] text-on-muted tracking-wider block mb-2">
                    {item.year}
                  </span>
                  <h4 className="font-grotesk text-lg font-bold text-white mb-1 leading-tight">
                    {item.title}
                  </h4>
                  <div className="text-xs text-violet font-semibold mb-3 tracking-wide uppercase select-none">
                    {item.institution}
                  </div>
                  <p className="text-xs md:text-sm text-on-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
