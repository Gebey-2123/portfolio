"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const [hovered, setHovered] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = "none";

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instantly move the dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
      }
    };

    const render = () => {
      // Lerp smoothing for the ring
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(calc(${ringX}px - 50%), calc(${ringY}px - 50%), 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(render);

    const updateHoverState = () => {
      const hoverTargets = document.querySelectorAll(
        "a, button, input, textarea, [role='button'], .project-card, .tilt-card"
      );
      hoverTargets.forEach((target) => {
        target.addEventListener("mouseenter", () => setHovered(true));
        target.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    updateHoverState();
    const interval = setInterval(updateHoverState, 1000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      clearInterval(interval);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* 12px Cyan Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-cyan rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: "transform" }}
      />
      {/* Lagging Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block transition-all duration-300 ease-out border ${
          hovered 
            ? "w-12 h-12 bg-cyan/10 border-cyan" 
            : "w-8 h-8 bg-transparent border-cyan/40"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}
