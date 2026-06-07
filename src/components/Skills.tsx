"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  name: string;
  percentage: number;
  category: "language" | "web" | "cs" | "tools";
  emoji: string;
  details: string;
}

const skills: Skill[] = [
  {
    name: "C++",
    percentage: 85,
    category: "language",
    emoji: "⚙️",
    details: "OOP • Pointers • STL • Design Patterns",
  },
  {
    name: "Java",
    percentage: 80,
    category: "language",
    emoji: "☕",
    details: "OOP • Collections • Swing • JVM Basics",
  },
  {
    name: "JavaScript",
    percentage: 78,
    category: "web",
    emoji: "🌐",
    details: "DOM • Fetch API • ES6+ • Async/Await",
  },
  {
    name: "PHP",
    percentage: 75,
    category: "web",
    emoji: "🐘",
    details: "MVC Structures • PDO • Sessions • REST APIs",
  },
  {
    name: "HTML & CSS",
    percentage: 90,
    category: "web",
    emoji: "🎨",
    details: "Flexbox • Grid • Custom Animations • Tailwind",
  },
  {
    name: "Data Structures",
    percentage: 82,
    category: "cs",
    emoji: "📊",
    details: "Linked Lists • Trees • Graphs • Hash Maps",
  },
  {
    name: "Algorithms",
    percentage: 75,
    category: "cs",
    emoji: "🧮",
    details: "Complexity Analysis • Sorting • Searching • Recursion",
  },
  {
    name: "OOP",
    percentage: 85,
    category: "cs",
    emoji: "📦",
    details: "Inheritance • Encapsulation • Polymorphism • Abstraction",
  },
  {
    name: "SQL & MySQL",
    percentage: 78,
    category: "cs",
    emoji: "🗄️",
    details: "Queries • Joins • Indexing • Schema Architecture",
  },
  {
    name: "Git & GitHub",
    percentage: 85,
    category: "tools",
    emoji: "🐙",
    details: "Version Control • Branches • PR Workflows • Conflicts",
  },
  {
    name: "IDEs & Editors",
    percentage: 88,
    category: "tools",
    emoji: "💻",
    details: "VS Code • NetBeans • Debugging Configs",
  },
  {
    name: "Linux Basics",
    percentage: 70,
    category: "tools",
    emoji: "🐧",
    details: "Bash Terminal • File Permissions • Process Management",
  },
];

const categories = [
  { id: "all", label: "ALL" },
  { id: "language", label: "LANGUAGES" },
  { id: "web", label: "WEB" },
  { id: "cs", label: "CS FUNDAMENTALS" },
  { id: "tools", label: "TOOLS" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills =
    activeCategory === "all" ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-label mb-4"
      >
        Technical Skills
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-white/5 pb-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black tracking-tight"
        >
          My <span className="text-cyan text-glow">Toolbox</span>
        </motion.h2>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-mono text-[9px] md:text-xs text-cyan tracking-wider uppercase select-none animate-pulse mb-1"
        >
          ⚡ interactive: drag any card to test physics
        </motion.span>
      </div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-2.5 mb-12"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2 font-mono text-[10px] md:text-xs tracking-wider rounded-full cursor-pointer transition-all duration-200 border ${activeCategory === cat.id
                ? "bg-cyan/10 border-cyan text-cyan"
                : "bg-transparent border-white/10 text-on-muted hover:border-white/20 hover:text-on-surface"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.5}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
              whileDrag={{
                scale: 1.05,
                rotate: 2,
                zIndex: 50,
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)",
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.1, scale: 0.9, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              key={skill.name}
              className="skill-item glass p-5 rounded-xl border border-white/5 flex flex-col justify-between cursor-grab active:cursor-grabbing hover:border-cyan/25 duration-300 transition-colors select-none"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl select-none">{skill.emoji}</span>
                    <span className="font-bold text-sm text-on-surface leading-none">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-cyan font-bold">{skill.percentage}%</span>
                </div>

                {/* Progress bar container */}
                <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    className="h-full bg-gradient-to-r from-cyan to-violet rounded-full"
                  />
                </div>
              </div>

              <div className="font-mono text-[10px] text-on-muted leading-tight mt-1 select-none">
                {skill.details}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
