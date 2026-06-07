"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  text: string;
  isHtml?: boolean;
}

const commands: Record<string, string> = {
  help: `<div style="color:var(--cyan);margin-bottom:4px;font-weight:600">Available commands:</div>
<div style="color:var(--on-muted);margin-left:16px"><span style="color:white;font-weight:bold">about</span>        — Who am I</div>
<div style="color:var(--on-muted);margin-left:16px"><span style="color:white;font-weight:bold">skills</span>       — Technical expertise</div>
<div style="color:var(--on-muted);margin-left:16px"><span style="color:white;font-weight:bold">projects</span>     — Code portfolio highlights</div>
<div style="color:var(--on-muted);margin-left:16px"><span style="color:white;font-weight:bold">contact</span>      — Connect details</div>
<div style="color:var(--on-muted);margin-left:16px"><span style="color:white;font-weight:bold">internship</span>   — Why you should hire me</div>
<div style="color:var(--on-muted);margin-left:16px"><span style="color:white;font-weight:bold">clear</span>        — Reset screen</div>`,
  about: `<div style="color:var(--violet);font-weight:bold">Gebey Gebre</div>
<div style="color:var(--on-muted)">Software Engineering Student @ Woldia University</div>
<div style="color:var(--on-muted)">Passionate about structural algorithm design, scalable backends, and full-stack software optimization.</div>`,
  skills: `<div style="color:var(--amber);font-weight:600;margin-bottom:2px">Languages:</div>
<div style="color:var(--on-muted);margin-left:16px">C++ · Java · JavaScript · PHP · SQL · HTML · CSS</div>
<div style="color:var(--amber);font-weight:600;margin-bottom:2px;margin-top:4px">CS Fundamentals:</div>
<div style="color:var(--on-muted);margin-left:16px">Data Structures · Algorithms · Object-Oriented Design · DBMS</div>
<div style="color:var(--amber);font-weight:600;margin-bottom:2px;margin-top:4px">Tools & Systems:</div>
<div style="color:var(--on-muted);margin-left:16px">Git · GitHub · MySQL · VS Code · Linux Terminal</div>`,
  projects: `<div style="color:var(--cyan);font-weight:600">1. Student Management System</div>
<div style="color:var(--on-muted);margin-left:16px;margin-bottom:4px">PHP · MySQL · JavaScript (Relational DB & portals)</div>
<div style="color:var(--cyan);font-weight:600">2. DSA Visualizer</div>
<div style="color:var(--on-muted);margin-left:16px;margin-bottom:4px">C++ · JavaScript · HTML Canvas (Algorithm animation)</div>
<div style="color:var(--cyan);font-weight:600">3. E-Commerce Web App</div>
<div style="color:var(--on-muted);margin-left:16px;margin-bottom:4px">PHP · MySQL · Bootstrap (Cart, checkout, and admin tools)</div>
<div style="color:var(--cyan);font-weight:600">4. Bank Management CLI</div>
<div style="color:var(--on-muted);margin-left:16px">C++ · OOP · File IO (C++ structures & persistence)</div>`,
  contact: `<div style="color:var(--cyan)">📧 <a href="mailto:gebregebey@gmail.com" class="hover:text-violet underline duration-300">gebregebey@gmail.com</a></div>
<div style="color:var(--cyan)">🐙 <a href="https://github.com/gebregebey" target="_blank" rel="noopener noreferrer" class="hover:text-violet underline duration-300">github.com/gebregebey</a></div>
<div style="color:var(--cyan)">💼 <a href="https://linkedin.com/in/gebregebey" target="_blank" rel="noopener noreferrer" class="hover:text-violet underline duration-300">linkedin.com/in/gebregebey</a></div>`,
  internship: `<div style="color:var(--cyan);font-weight:bold;margin-bottom:4px">Why hire Gebey as an intern?</div>
<div style="color:var(--on-surface)">✓ Strong computer science foundations (DSA, OOP, Algorithms)</div>
<div style="color:var(--on-surface)">✓ Practical coding experience across multiple systems (C++, Java, PHP, JS)</div>
<div style="color:var(--on-surface)">✓ Quick learner with analytical capabilities (CGPA 3.82)</div>
<div style="color:var(--on-surface)">✓ Collaborative lead experience (led capstone engineering teams)</div>
<div style="color:var(--on-surface)">✓ Highly motivated to solve complex engineering bugs and write clean, scalable code</div>`,
};

// Custom Typewriter component that parses HTML and types only text nodes
const TypewriterOutput = ({ htmlString, onComplete }: { htmlString: string, onComplete?: () => void }) => {
  const [displayedHtml, setDisplayedHtml] = useState("");
  
  useEffect(() => {
    // Split by HTML tags
    const tokens = htmlString.split(/(<[^>]*>)/g);
    let currentHtml = "";
    let tokenIndex = 0;
    let charIndex = 0;
    let timer: NodeJS.Timeout;

    const typeNext = () => {
      if (tokenIndex >= tokens.length) {
        if (onComplete) onComplete();
        return;
      }

      const token = tokens[tokenIndex];

      if (token.startsWith("<")) {
        // Instant append HTML tag
        currentHtml += token;
        setDisplayedHtml(currentHtml);
        tokenIndex++;
        timer = setTimeout(typeNext, 0);
      } else {
        // Type text characters one by one
        if (charIndex < token.length) {
          currentHtml += token[charIndex];
          setDisplayedHtml(currentHtml);
          charIndex++;
          timer = setTimeout(typeNext, 18); // 18ms per char
        } else {
          tokenIndex++;
          charIndex = 0;
          timer = setTimeout(typeNext, 0);
        }
      }
    };

    timer = setTimeout(typeNext, 0);
    return () => clearTimeout(timer);
  }, [htmlString, onComplete]);

  return <div dangerouslySetInnerHTML={{ __html: displayedHtml }} className="leading-relaxed" />;
};

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "init",
      type: "system",
      text: "Welcome to Gebey's interactive terminal. Type <span style='color:var(--cyan)'>help</span> to see available commands.",
      isHtml: true,
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const outputEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, easterEggActive]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim().toLowerCase();
    
    if (!cleanCmd) return;

    const newId = Date.now().toString();
    const newHistory = [...history, { id: `in-${newId}`, type: "input", text: cleanCmd } as TerminalLine];

    if (cleanCmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    if (cleanCmd === "sudo hire gebey") {
      setHistory(newHistory);
      setInputVal("");
      triggerEasterEgg();
      return;
    }

    if (cleanCmd in commands) {
      newHistory.push({
        id: `out-${newId}`,
        type: "output",
        text: commands[cleanCmd],
        isHtml: true,
      });
    } else {
      newHistory.push({
        id: `err-${newId}`,
        type: "error",
        text: `command not found: ${cleanCmd}. Type 'help' for available commands.`,
      });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const triggerEasterEgg = () => {
    setEasterEggActive(true);
    
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        setEasterEggActive(false);
      }, 1000);
    }, 2500); // Wait for the animation before scrolling
  };

  const handleWindowClick = () => {
    if (!easterEggActive) {
      inputRef.current?.focus();
    }
  };

  if (isClosed) return null;

  return (
    <section className="py-16 md:py-24 max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-label mb-4"
      >
        Interactive Terminal
      </motion.div>

      <AnimatePresence>
        {!isClosed && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            onClick={handleWindowClick}
            className={`terminal-window glass-strong border ${
              easterEggActive ? "border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.3)] bg-green-500/10" : "border-white/10"
            } w-full overflow-hidden shadow-2xl cursor-text transition-all duration-500`}
          >
            {/* Terminal Header */}
            <div className={`terminal-bar flex items-center px-4 py-3 select-none ${easterEggActive ? "bg-green-900/30" : "bg-[#191f31]/60"}`}>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsClosed(true)}
                  className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-red-600 transition-colors cursor-pointer"
                  title="Close Terminal"
                />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[10px] md:text-xs text-[#869397] ml-4 font-semibold">
                gebey@portfolio:~$
              </span>
              <span className="font-mono text-[9px] md:text-[10px] text-[#3d494c] ml-auto font-medium hidden sm:inline">
                type &apos;help&apos; for commands
              </span>
            </div>

            {/* Terminal Console Output */}
            <div className="p-6 font-mono text-xs md:text-sm leading-relaxed min-h-[220px] max-h-[360px] overflow-y-auto flex flex-col gap-2.5">
              {history.map((line) => {
                if (line.type === "input") {
                  return (
                    <div key={line.id} className="flex gap-2 text-on-surface">
                      <span className="text-cyan font-bold select-none">➜</span>
                      <span className="text-violet font-semibold select-none">~</span>
                      <span className="text-[#dce1fb] font-semibold">{line.text}</span>
                    </div>
                  );
                }
                if (line.type === "error") {
                  return (
                    <div key={line.id} className="text-[#ff4d6d] pl-6 text-xs md:text-sm select-none">
                      <TypewriterOutput htmlString={line.text} />
                    </div>
                  );
                }
                
                // For output or system
                return (
                  <div key={line.id} className="text-on-muted pl-6 text-xs md:text-sm">
                    {line.isHtml ? <TypewriterOutput htmlString={line.text} /> : <TypewriterOutput htmlString={line.text} />}
                  </div>
                );
              })}
              
              {easterEggActive && (
                <div className="pl-6 text-green-400 font-bold mt-4">
                  <TypewriterOutput htmlString={`<pre style="line-height:1.2;font-size:10px">
      /\\
     /  \\
    /    \\
   /      \\
  /        \\
  \\        /
   \\      /
    \\    /
     \\  /
      \\/
</pre>
<br/>
ACCESS GRANTED. Redirecting to contact...`} />
                </div>
              )}
              
              <div ref={outputEndRef} />
            </div>

            {/* Terminal Input Bar */}
            {!easterEggActive && (
              <form
                onSubmit={handleTerminalSubmit}
                className="flex items-center gap-2 px-6 py-3 border-t border-white/5 bg-[#0a0f1e]/60"
              >
                <span className="font-mono text-xs md:text-sm text-cyan font-bold select-none">➜</span>
                <span className="font-mono text-xs md:text-sm text-violet font-semibold select-none">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Enter command..."
                  autoComplete="off"
                  spellCheck={false}
                  className="flex-1 bg-transparent border-0 outline-none text-[#dce1fb] font-mono text-xs md:text-sm focus:ring-0 p-0"
                />
                <span className="blink text-cyan font-mono text-sm select-none">█</span>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
