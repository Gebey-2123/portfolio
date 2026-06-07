"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FloatingParallax() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize values between -0.5 and 0.5
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Element 1: Glowing Purple Blob (Top Left/Mid) */}
      <motion.div
        animate={{
          x: mousePos.x * -40,
          y: mousePos.y * -40,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-[12%] left-[10%] w-[180px] h-[180px] rounded-full bg-violet/5 blur-[50px]"
      />

      {/* Element 2: Glowing Cyan Blob (Mid Right) */}
      <motion.div
        animate={{
          x: mousePos.x * 50,
          y: mousePos.y * 50,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 18 }}
        className="absolute top-[40%] right-[12%] w-[220px] h-[220px] rounded-full bg-cyan/5 blur-[60px]"
      />

      {/* Element 3: Floating curly brackets "{ }" (About section border area) */}
      <motion.div
        animate={{
          x: mousePos.x * -25,
          y: mousePos.y * -25,
          rotate: mousePos.x * 10,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 22 }}
        className="absolute top-[28%] left-[8%] font-mono text-cyan/15 text-5xl md:text-7xl font-bold select-none hidden md:block"
      >
        {"{ }"}
      </motion.div>

      {/* Element 4: Floating closing tags "</>" (Projects section border area) */}
      <motion.div
        animate={{
          x: mousePos.x * 30,
          y: mousePos.y * 30,
          rotate: mousePos.y * -15,
        }}
        transition={{ type: "spring", stiffness: 45, damping: 20 }}
        className="absolute top-[55%] right-[8%] font-mono text-violet/10 text-6xl md:text-8xl font-black select-none hidden md:block"
      >
        {"</>"}
      </motion.div>

      {/* Element 5: Floating C++ increment "++" (Skills section border area) */}
      <motion.div
        animate={{
          x: mousePos.x * -35,
          y: mousePos.y * -35,
        }}
        transition={{ type: "spring", stiffness: 55, damping: 25 }}
        className="absolute top-[72%] left-[15%] font-mono text-[#fcd34d]/10 text-5xl md:text-7xl font-semibold select-none hidden md:block"
      >
        {"++"}
      </motion.div>

      {/* Element 6: Floating Amber Blob (Bottom Left/Mid) */}
      <motion.div
        animate={{
          x: mousePos.x * -30,
          y: mousePos.y * -30,
        }}
        transition={{ type: "spring", stiffness: 48, damping: 22 }}
        className="absolute bottom-[10%] left-[8%] w-[200px] h-[200px] rounded-full bg-amber/5 blur-[55px]"
      />
    </div>
  );
}
