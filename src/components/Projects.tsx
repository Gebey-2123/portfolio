"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Database, Globe, Layers, BookOpen } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
  githubUrl: string;
  liveUrl?: string;
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    title: "Student Management System",
    description: "A full-stack web application for managing student records, grades, attendance, and academic reports. Features administrative and student portals with role-based access control.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    category: "FEATURED PROJECT",
    githubUrl: "https://github.com/Gebey-2123",
    liveUrl: "#",
    icon: <Database className="w-5 h-5 text-cyan" />,
  },
  {
    title: "Online Voting System",
    description: "A secure digital voting platform designed with role-based administrative dashboards, encrypted ballot recording, and real-time result tabulation.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    category: "WEB APPLICATION",
    githubUrl: "https://github.com/Gebey-2123",
    liveUrl: "#",
    icon: <Globe className="w-5 h-5 text-violet" />,
  },
  {
    title: "E-Commerce Web App",
    description: "A complete online storefront with product listings, dynamic cart management, database synchronization, checkout pipeline, and a dedicated store manager dashboard.",
    tags: ["PHP", "MySQL", "Bootstrap", "JS"],
    category: "WEB APPLICATION",
    githubUrl: "https://github.com/Gebey-2123",
    liveUrl: "#",
    icon: <Globe className="w-5 h-5 text-amber" />,
  },
  {
    title: "Internship Management System",
    description: "A comprehensive portal for university students and coordinators to manage internship placements, track progress, and submit final evaluations.",
    tags: ["Java", "MySQL", "JavaScript", "HTML/CSS"],
    category: "FULL-STACK PROJECT",
    githubUrl: "https://github.com/Gebey-2123",
    icon: <Layers className="w-5 h-5 text-cyan" />,
  },
  {
    title: "Library Management System",
    description: "A Java Swing application enabling catalog lookups, book check-outs, and transaction audits. Implements efficient search algorithms and data structures.",
    tags: ["Java", "OOP", "Data Structures", "Swing UI"],
    category: "JAVA PROJECT",
    githubUrl: "https://github.com/Gebey-2123",
    icon: <BookOpen className="w-5 h-5 text-violet" />,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-gradient-to-b from-transparent via-surface-mid/10 to-transparent relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label mb-4"
        >
          Featured Work
        </motion.div>
        
        {/* Clip-path reveal for Title */}
        <div className="relative inline-block mb-4 overflow-hidden py-2">
          <motion.div 
            initial={{ left: 0, right: "100%" }}
            whileInView={{ left: "100%", right: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 bottom-0 bg-cyan z-20"
            style={{ width: "100%" }}
          />
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1, delay: 0.3 }}
            className="font-grotesk text-3xl md:text-5xl font-black tracking-tight"
          >
            Projects
          </motion.h2>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-on-muted text-sm md:text-base max-w-xl mb-16 mt-2"
        >
          Real-world applications built to solve problems and explore architectural patterns. Each project represents a step forward in software engineering.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <ProjectCard key={proj.title} project={proj} idx={idx} />
          ))}

          {/* Github Card */}
          <motion.div
            initial={{ opacity: 0, rotateX: 8, y: 30 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.15 }}
            className="glass p-8 rounded-xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center gap-6 min-h-[280px] hover:border-cyan/50 transition-colors duration-300 group"
          >
            <div className="w-12 h-12 rounded-full border border-cyan/35 flex items-center justify-center text-cyan shadow-sm bg-cyan/5 transition-transform duration-700 group-hover:rotate-[360deg]">
              <GithubIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">More on GitHub</h3>
              <p className="text-xs text-on-muted leading-relaxed max-w-[220px]">
                Explore code implementations, algorithmic files, and additional student projects.
              </p>
            </div>
            <a
              href="https://github.com/Gebey-2123"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-[11px] px-5 py-2 flex items-center gap-1 font-mono uppercase"
            >
              github.com/gebregebey <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setRotate({ x: x * 12, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const badgeColorMap = (category: string) => {
    if (category.includes("FEATURED") || category.includes("SYSTEMS")) return "text-cyan";
    if (category.includes("EDUCATIONAL") || category.includes("JAVA")) return "text-violet";
    return "text-amber";
  };

  const dotColorMap = (category: string) => {
    if (category.includes("FEATURED") || category.includes("SYSTEMS")) return "bg-green-400";
    if (category.includes("EDUCATIONAL") || category.includes("JAVA")) return "bg-violet";
    return "bg-amber";
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 8, y: 30 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 80, damping: 20, delay: idx * 0.05 }}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(600px) rotateY(${rotate.x}deg) rotateX(${rotate.y}deg) scale(${rotate.x !== 0 ? 1.015 : 1})`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card group glass glow-cyan-hover p-8 rounded-xl border border-white/5 flex flex-col justify-between h-[360px] cursor-default hover:bg-surface-mid transition-colors duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 circuit-pattern z-0" />
      
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div className="flex justify-between items-start mb-6">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 shadow-inner group-hover:border-cyan/40 transition-colors">
            {project.icon}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-muted hover:text-cyan transition-colors"
            >
              <GithubIcon className="w-4 h-4 transition-transform duration-700 group-hover:rotate-[360deg]" />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="text-on-muted hover:text-cyan transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-grotesk text-xl font-bold mb-3 tracking-tight text-white">
          {project.title}
        </h3>
        <p className="text-xs md:text-sm text-on-muted leading-relaxed line-clamp-4">
          {project.description}
        </p>
      </div>

      <div className="relative z-10" style={{ transform: "translateZ(15px)" }}>
        <div className="flex flex-wrap gap-1.5 mb-5 mt-4">
          {project.tags.map((tag, tIdx) => (
            <span 
              key={tag} 
              className="chip py-0.5 px-2 text-[10px] transition-transform duration-300"
              style={{ transitionDelay: `${tIdx * 40}ms` }}
            >
              <span className="block group-hover:-translate-y-0.5 transition-transform duration-300">{tag}</span>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-wider">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColorMap(project.category)}`} />
          <span className={badgeColorMap(project.category)}>{project.category}</span>
        </div>
      </div>
    </motion.div>
  );
}
