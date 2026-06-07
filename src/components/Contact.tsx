"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import MagneticButton from "./MagneticButton";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    if (formData._honey) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    // Simulate sending for the spinner animation
    setTimeout(async () => {
      try {
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

        if (response.ok) {
          setStatus("success");
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#00e5ff", "#a855f7", "#ffb873"],
          });

          if (data.message && data.message.includes("Simulation mode")) {
            const mailtoUrl = `mailto:gebregebey@gmail.com?subject=${encodeURIComponent(
              formData.subject || "Message from Portfolio"
            )}&body=${encodeURIComponent(
              `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;
            window.location.href = mailtoUrl;
          }

          setFormData({ name: "", email: "", subject: "", message: "", _honey: "" });
        } else {
          setStatus("error");
          setErrorMsg(data.message || "Failed to send message. Please try again.");
        }
      } catch (err) {
        console.error(err);
        const mailtoUrl = `mailto:gebregebey@gmail.com?subject=${encodeURIComponent(
          formData.subject || "Message from Portfolio"
        )}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        window.location.href = mailtoUrl;

        setStatus("success");
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#00e5ff", "#a855f7", "#ffb873"],
        });
        setFormData({ name: "", email: "", subject: "", message: "", _honey: "" });
      }
    }, 1200); // 1.2s minimum spinner time
  };

  const titleLines = [
    { text: "Let's build", class: "text-white" },
    { text: "something", class: "text-transparent bg-clip-text bg-[linear-gradient(90deg,#00e5ff,#a855f7)] bg-[length:200%_auto] animate-[shimmer_3s_infinite_linear]" },
    { text: "together.", class: "text-white" }
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative">
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
          <div className="flex flex-col">
            <h2 className="font-grotesk text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 flex flex-col gap-1 overflow-hidden">
              {titleLines.map((line, idx) => (
                <motion.span
                  key={line.text}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
                  className={line.class}
                >
                  {line.text}
                </motion.span>
              ))}
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-base leading-relaxed text-on-muted mb-12"
            >
              I am actively seeking software engineering internship opportunities. If you are looking
              for a dedicated student who writes clean, documented code and is excited to contribute
              to real-world projects — get in touch.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col gap-6"
            >
              <a href="mailto:gebregebey@gmail.com" className="flex items-center gap-4 group transition-transform duration-300 hover:translate-x-2">
                <div className="w-12 h-12 rounded-xl bg-cyan/5 border border-cyan/15 group-hover:border-cyan/50 flex items-center justify-center text-cyan transition-all duration-300">
                  <Mail className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
                </div>
                <span className="font-mono text-sm md:text-base text-on-muted group-hover:text-cyan transition-colors duration-300">
                  gebregebey@gmail.com
                </span>
              </a>

              <a href="https://github.com/gebregebey" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group transition-transform duration-300 hover:translate-x-2">
                <div className="w-12 h-12 rounded-xl bg-cyan/5 border border-cyan/15 group-hover:border-cyan/50 flex items-center justify-center text-cyan transition-all duration-300">
                  <GithubIcon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
                </div>
                <span className="font-mono text-sm md:text-base text-on-muted group-hover:text-cyan transition-colors duration-300">
                  github.com/gebregebey
                </span>
              </a>

              <a href="https://linkedin.com/in/gebregebey" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group transition-transform duration-300 hover:translate-x-2">
                <div className="w-12 h-12 rounded-xl bg-cyan/5 border border-cyan/15 group-hover:border-cyan/50 flex items-center justify-center text-cyan transition-all duration-300">
                  <LinkedinIcon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
                </div>
                <span className="font-mono text-sm md:text-base text-on-muted group-hover:text-cyan transition-colors duration-300">
                  linkedin.com/in/gebregebey
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 90, damping: 18, delay: 0.2 }}
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
                  <div className="form-field">
                    <input type="text" id="f-name" name="name" value={formData.name} onChange={handleChange} placeholder=" " required />
                    <label htmlFor="f-name">NAME</label>
                  </div>
                  <div className="form-field">
                    <input type="email" id="f-email" name="email" value={formData.email} onChange={handleChange} placeholder=" " required />
                    <label htmlFor="f-email">EMAIL</label>
                  </div>
                </div>

                <div className="form-field">
                  <input type="text" id="f-subject" name="subject" value={formData.subject} onChange={handleChange} placeholder=" " />
                  <label htmlFor="f-subject">SUBJECT (OPTIONAL)</label>
                </div>

                <div className="form-field">
                  <textarea id="f-msg" name="message" value={formData.message} onChange={handleChange} placeholder=" " rows={5} required />
                  <label htmlFor="f-msg">MESSAGE</label>
                </div>

                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <MagneticButton type="submit" className="w-full relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-cyan px-8 font-mono text-sm font-bold text-deep transition-all hover:bg-cyan/90 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] group mt-2">
                        SEND MESSAGE
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </MagneticButton>
                    </motion.div>
                  )}

                  {status === "sending" && (
                    <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 w-full h-12 flex items-center justify-center bg-cyan/20 border border-cyan/40 rounded-md">
                      <Loader2 className="w-5 h-5 text-cyan animate-spin" />
                    </motion.div>
                  )}

                  {status === "success" && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-2 w-full h-12 flex items-center justify-center gap-2 bg-green-500/20 border border-green-500/50 rounded-md text-green-400 font-mono text-sm shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                      <CheckCircle className="w-5 h-5 animate-[ping_1s_ease-out_1]" />
                      MESSAGE SENT!
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 w-full flex items-center gap-2 text-danger font-mono text-xs">
                      <AlertCircle className="w-4 h-4" />
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
