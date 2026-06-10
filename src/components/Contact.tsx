"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { ALL_SOCIAL_LINKS } from "./SocialIcons"; // Import from new file
import confetti from "canvas-confetti";
import MagneticButton from "./MagneticButton";

// --- Background Connection Nodes ---
const ContactBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const mouse = useRef({ x: -1000, y: -1000 }); // Removed as it was unused

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const wRef = useRef(0);
    const hRef = useRef(0);
    const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
    const count = 20;

    const resize = () => {
      wRef.current = canvas.width = canvas.offsetWidth;
      hRef.current = canvas.height = canvas.offsetHeight;
    };
    resize();

    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: Math.random() * wRef.current,
        y: Math.random() * hRef.current,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, wRef.current, hRef.current);
      particlesRef.current.forEach((p, i) => {
        p.x = (p.x + p.vx + wRef.current) % wRef.current;
        p.y = (p.y + p.vy + hRef.current) % hRef.current;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 229, 255, 0.15)";
        ctx.fill();

        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

// --- Social Link Data (for easier mapping) ---
const socialLinks = ALL_SOCIAL_LINKS; // Use the centralized social links

// CircuitBorder component for form inputs
const CircuitBorder = ({ isFocused }: { isFocused: boolean }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
    <motion.rect
      x="0.5" y="0.5" width="100%" height="100%" rx="8"
      stroke="#00e5ff" strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: isFocused ? 1 : 0, opacity: isFocused ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    />
  </svg>
);

const SocialRow = ({ link, idx }: { link: typeof socialLinks[0], idx: number }) => {
  const mouseY = useMotionValue(0);
  const springY = useSpring(mouseY, { stiffness: 100, damping: 15 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    mouseY.set((e.clientY - centerY) * 0.12);
  };

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 + idx * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); mouseY.set(0); }}
      style={{ y: springY }}
      className="flex items-center gap-4 group relative py-2"
    >
      {/* Signal Wave */}
      <motion.div
        className="absolute left-12 right-0 h-[1px] bg-cyan/30 shadow-[0_0_8px_#00e5ff]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? [0, 1, 0] : 0 }}
        transition={{ duration: 0.5 }}
        style={{ originX: 0 }}
      />

      <div className={`w-12 h-12 rounded-xl bg-cyan/5 border border-cyan/15 group-hover:border-cyan/50 flex items-center justify-center text-cyan transition-all duration-300 relative`}>
        <link.icon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg] z-10" />
        <div className="absolute inset-0 rounded-xl animate-pulse bg-cyan/5 opacity-50" style={{ animationDelay: `${idx * 0.5}s` }} />
      </div>
      <span className="font-mono text-sm md:text-base text-on-muted group-hover:text-cyan group-hover:translate-x-1.5 transition-all duration-300">
        {link.label}
      </span>
    </motion.a>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _honey: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [sendButtonPhase, setSendButtonPhase] = useState<"idle" | "countdown" | "launch" | "processing" | "success">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetPhase = () => {
    setTimeout(() => {
      setSendButtonPhase("idle");
      setStatus("idle");
    }, 3000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendButtonPhase !== "idle") return;

    if (formData._honey) {
      setStatus("success");
      return;
    }

    setSendButtonPhase("countdown");
    setStatus("sending");

    // Phase 1: Countdown (0-300ms)
    setTimeout(() => {
      setSendButtonPhase("launch");

      // Phase 2: Launch & API Call (300-800ms)
      setTimeout(async () => {
        setSendButtonPhase("processing");

        try {
          const startTime = Date.now();
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              subject: formData.subject,
              message: formData.message,
            }),
          });

          const data = await response.json();

          // Ensure at least 2s total interaction time for the sequence
          const elapsed = Date.now() - startTime;
          if (elapsed < 1200) await new Promise(resolve => setTimeout(resolve, 1200 - elapsed));

          if (response.ok) {
            setSendButtonPhase("success");
            setStatus("success");
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.8 },
              colors: ["#00e5ff", "#a855f7", "#ffb873"],
            });
            setFormData({ name: "", email: "", subject: "", message: "", _honey: "" });
            resetPhase();
          } else {
            setSendButtonPhase("idle");
            setStatus("error");
            setErrorMsg(data.message || "Failed to send message. Please try again.");
          }
        } catch {
          setStatus("success");
          resetPhase();
        }
      }, 500);
    }, 300);
  };

  const titleLines = [
    { text: "Let's build", class: "text-white" },
    { text: "something", class: "text-cyan text-glow" },
    { text: "together.", class: "text-white" }
  ];

  const particles = Array.from({ length: 6 });

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <ContactBackground />

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label mb-4"
        >
          Get In Touch
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: Contact Info */}
          <div className="flex flex-col relative">
            {/* System Scan Line */}
            <motion.div
              className="absolute left-0 right-0 h-[1px] bg-cyan/60 shadow-[0_0_8px_#00e5ff] z-20 pointer-events-none"
              initial={{ top: -20, opacity: 0 }}
              whileInView={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: "linear" }}
            />

            <h2 className="font-grotesk text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 flex flex-col gap-1 overflow-hidden">
              {titleLines.map((line, idx) => {
                const words = line.text.split(" ");
                return (
                  <div key={idx} className="overflow-hidden flex flex-wrap gap-[0.3em]">
                    {words.map((word, wIdx) => (
                      <motion.span
                        key={wIdx}
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 + wIdx * 0.08, ease: "easeOut" }}
                        className={line.class}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                );
              })}
            </h2>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-sm md:text-base leading-relaxed text-on-muted mb-12"
            >
              I am actively seeking software engineering internship opportunities. If you are looking
              for a dedicated student who writes clean, documented code and is excited to contribute
              to real-world projects — get in touch.
            </motion.p>

            <div className="flex flex-col gap-4 mt-4">
              {socialLinks.map((link, i) => (
                <SocialRow key={link.id} link={link} idx={i} />
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="glass-strong p-8 md:p-10 rounded-2xl border border-white/5 shadow-[0_0_40px_rgba(0,229,255,0.05)] relative overflow-hidden">
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-5 relative z-10">
                <input
                  type="text"
                  name="_honey"
                  value={formData._honey}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-field relative">
                    <input
                      type="text"
                      id="f-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="f-name">NAME</label>
                    <CircuitBorder isFocused={focusedField === "name"} />
                    <AnimatePresence>
                      {focusedField === "name" && particles.map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{
                            x: (Math.random() - 0.5) * 60,
                            y: -Math.random() * 40 - 20,
                            opacity: 0,
                            scale: 0
                          }}
                          className="absolute top-0 left-0 w-1 h-1 bg-cyan rounded-full"
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      ))}
                    </AnimatePresence>
                    {formData.name && focusedField !== "name" && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="form-field relative">
                    <input
                      type="email"
                      id="f-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="f-email">EMAIL</label>
                    <CircuitBorder isFocused={focusedField === "email"} />
                    {formData.email && focusedField !== "email" && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>

                <div className="form-field relative">
                  <input
                    type="text"
                    id="f-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                  />
                  <label htmlFor="f-subject">SUBJECT (OPTIONAL)</label>
                  <CircuitBorder isFocused={focusedField === "subject"} />
                  {formData.subject && focusedField !== "subject" && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                  )}
                </div>

                <div className="form-field relative">
                  <textarea
                    id="f-msg"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    rows={5}
                    required
                  />
                  <label htmlFor="f-msg">MESSAGE</label>
                  <CircuitBorder isFocused={focusedField === "message"} />
                  {formData.message && focusedField !== "message" && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {sendButtonPhase === "idle" ? (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ scaleX: 0.95, opacity: 0 }}>
                      <MagneticButton type="submit" className="w-full relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-cyan px-8 font-mono text-sm font-bold text-deep transition-all hover:bg-cyan/90 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] group mt-2">
                        <span className="flex items-center gap-2">
                          SEND MESSAGE
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                      </MagneticButton>
                    </motion.div>
                  ) : sendButtonPhase === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 w-full h-12 flex items-center justify-center gap-2 bg-green-500/20 border border-green-500/50 rounded-md text-green-400 font-mono text-sm shadow-[0_0_20px_rgba(34,197,94,0.3)] relative overflow-hidden"
                    >
                      <CheckCircle className="w-5 h-5" />
                      MESSAGE SENT
                      <motion.div
                        initial={{ scale: 0, opacity: 0.4 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-cyan/20 rounded-full"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="launching"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 w-full h-12 flex flex-col items-center justify-center bg-cyan/20 border border-cyan/40 rounded-md overflow-hidden relative"
                    >
                      <span className="font-mono text-xs text-cyan font-bold tracking-widest relative z-10">
                        {sendButtonPhase === "countdown" ? "LAUNCHING..." : "SENDING..."}
                      </span>

                      {/* Progress Scanline */}
                      <motion.div
                        className="absolute inset-0 bg-cyan/10"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />

                      {sendButtonPhase === "launch" && (
                        <motion.div
                          initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
                          animate={{ x: 120, y: -60, scale: 0, rotate: -30 }}
                          transition={{ duration: 0.5, ease: "easeIn" }}
                          className="absolute z-20"
                        >
                          <Send className="w-5 h-5 text-cyan" />
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {status === "error" && (
                  <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 w-full flex items-center gap-2 text-[#ff4d6d] font-mono text-xs">
                    <AlertCircle className="w-4 h-4" />
                    {errorMsg}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
