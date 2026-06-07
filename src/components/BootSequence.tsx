"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState(0);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("booted") === "true") {
      setSkip(true);
      onComplete();
      return;
    }

    // Sequence timings
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => setPhase(3), 2400);
    const t4 = setTimeout(() => setPhase(4), 2800);
    const t5 = setTimeout(() => {
      sessionStorage.setItem("booted", "true");
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem("booted", "true");
    setSkip(true);
    onComplete();
  };

  if (skip) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-[100000] bg-black text-white font-mono flex flex-col p-8 md:p-16 select-none ${phase === 3 ? "animate-flicker" : ""}`}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeOut" } }}
      >
        <button 
          onClick={handleSkip}
          className="absolute top-6 right-6 text-xs text-white/40 hover:text-cyan border border-white/10 hover:border-cyan px-3 py-1 rounded transition-colors"
        >
          [SKIP]
        </button>

        <div className="flex-1 flex flex-col justify-end max-w-3xl">
          {/* Phase 0: Initializing */}
          <div className="mb-6">
            <span className="text-cyan font-bold">GEBEY_OS</span> v2.0 ... initializing
            <span className="blink">_</span>
          </div>

          {/* Phase 1: Hardware Checks */}
          {phase >= 1 && (
            <div className="flex flex-col gap-2 mb-6 text-sm text-on-muted">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0 }}>
                [<span className="text-green-400">OK</span>] Memory check
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                [<span className="text-green-400">OK</span>] Loading assets
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                [<span className="text-green-400">OK</span>] Compiling personality.exe
              </motion.div>
            </div>
          )}

          {/* Phase 2: Progress Bar */}
          {phase >= 2 && (
            <div className="w-full max-w-md h-1.5 bg-white/10 rounded overflow-hidden mt-4 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              <motion.div
                className="h-full bg-cyan shadow-[0_0_10px_#00e5ff]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
          )}
          
          {/* Phase 3 & 4 handled by wrapper classes and timeouts */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
