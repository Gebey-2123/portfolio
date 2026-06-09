"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Sparkles, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  isTyping?: boolean;
}

const presetAnswers: Record<string, string> = {
  about: `**Gebey Gebre** is a Software Engineering student at **Woldia University**, Ethiopia .

He specializes in building clean-code applications, efficient algorithms, and full-stack solutions. He is highly driven to solve computational bugs.`,
  skills: `Gebey's technical toolbox is categorized into:
- **Languages**: C++, Java, PHP, JavaScript, SQL, HTML/CSS
- **CS Fundamentals**: Data Structures, Algorithms, Object-Oriented Design, DBMS (MySQL)
- **Tools & Systems**: Git & GitHub, Linux/Bash, VS Code

*Psst: You can go drag his skill cards around in the Technical Skills section!*`,
  projects: `Some of Gebey's top projects:
1. **Student Management System** (PHP & MySQL): Led a 4-person academic team. Completed ERD designs, relational schemas, and backend route logic.
2. **DSA Visualizer** (C++ & HTML Canvas): Creates animations of data structures to ease algorithmic learning.
3. **E-Commerce Web App** (PHP & MySQL): Responsive shopping portal with cart, session management, and admin CRUD dashboards.`,
  internship: `Why hire Gebey for your team?
1. **Strong Foundations**: High academic performer with deep conceptual knowledge of complex DSA and system design.
2. **Polyglot Developer**: Able to adapt quickly between system programming (C++/Java) and web architectures (PHP/Node.js).
3. **Leadership Experience**: Led team milestones and architecture blueprints during university engineering capstones.
4. **Relentless Learner**: Actively practices algorithmic problem solving and stays up to date with modern React & Next.js frameworks.`,
  contact: `You can connect with Gebey directly via:
- **Email**: [gebregebey@gmail.com](mailto:gebregebey@gmail.com)
 - **GitHub**: [github.com/Gebey-2123](https://github.com/Gebey-2123)
- **LinkedIn**: [linkedin.com/in/gebregebey](https://linkedin.com/in/gebregebey)

Feel free to fill out the contact form on this page to shoot him a direct message!`,
};

const presetQuestions = [
  { key: "about", label: "Who is Gebey?" },
  { key: "skills", label: "What are his technical skills?" },
  { key: "projects", label: "Show me his key projects" },
  { key: "internship", label: "Why hire him as an intern?" },
  { key: "contact", label: "How do I contact him?" },
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am Gebey's AI Co-pilot. Ask me anything about his skills, projects, education, or internship availability!",
    },
  ]);
  const [activeTypingId, setActiveTypingId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeTypingId]);

  const triggerAIResponse = (questionKey: string, questionLabel: string) => {
    if (activeTypingId) return; // Wait until current response finishes

    const userMessageId = Math.random().toString();
    const aiMessageId = Math.random().toString();

    // 1. Add user's question
    setMessages((prev) => [
      ...prev,
      { id: userMessageId, sender: "user", text: questionLabel },
    ]);

    // 2. Add temporary AI typing state
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: aiMessageId, sender: "ai", text: "", isTyping: true },
      ]);
      setActiveTypingId(aiMessageId);

      // 3. Replace typing state with typed response
      setTimeout(() => {
        const fullResponse = presetAnswers[questionKey] || "I'm sorry, I don't have information on that topic.";
        simulateTypewriter(aiMessageId, fullResponse);
      }, 1200); // simulated thinking time
    }, 400);
  };

  const simulateTypewriter = (messageId: string, fullText: string) => {
    let currentText = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        currentText += fullText[i];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, text: currentText, isTyping: false } : msg
          )
        );
        i++;
      } else {
        clearInterval(interval);
        setActiveTypingId(null);
      }
    }, 12); // speed of typing
  };

  const clearChat = () => {
    if (activeTypingId) return;
    setMessages([
      {
        id: "welcome",
        sender: "ai",
        text: "Hello! I am Gebey's AI Co-pilot. Ask me anything about his skills, projects, education, or internship availability!",
      },
    ]);
  };

  // Render text with markdown link and bold styling support
  const renderMessageText = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target={match[2].startsWith("mailto:") ? undefined : "_blank"}
          rel={match[2].startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="text-cyan underline hover:text-cyan/80 font-bold"
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    // Process bold text
    const boldTextParts = parts.flatMap((part) => {
      if (typeof part !== "string") return part;
      const boldRegex = /\*\*([^*]+)\*\*/g;
      const boldParts = [];
      let boldLastIndex = 0;
      let boldMatch;

      while ((boldMatch = boldRegex.exec(part)) !== null) {
        if (boldMatch.index > boldLastIndex) {
          boldParts.push(part.substring(boldLastIndex, boldMatch.index));
        }
        boldParts.push(
          <strong key={boldMatch.index} className="text-glow-cyan text-cyan font-bold">
            {boldMatch[1]}
          </strong>
        );
        boldLastIndex = boldRegex.lastIndex;
      }
      if (boldLastIndex < part.length) {
        boldParts.push(part.substring(boldLastIndex));
      }
      return boldParts;
    });

    return boldTextParts.map((part, i) => <span key={i} className="whitespace-pre-line">{part}</span>);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Expanded Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-[340px] sm:w-[380px] h-[480px] rounded-2xl glass-strong border border-white/10 flex flex-col overflow-hidden mb-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] glow-cyan"
          >
            {/* Header */}
            <div className="bg-[#191f31]/60 px-4 py-3.5 border-b border-white/5 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan/15 border border-cyan/35 flex items-center justify-center text-cyan shadow-sm">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold text-on-surface leading-none">
                    Gebey_AI
                  </h3>
                  <span className="font-mono text-[9px] text-green-400 font-semibold tracking-wider">
                    ● CO-PILOT ACTIVE
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  disabled={!!activeTypingId}
                  className="text-on-muted hover:text-cyan transition-colors disabled:opacity-30 disabled:pointer-events-none p-1"
                  title="Reset Chat"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-on-muted hover:text-cyan transition-colors p-1"
                  title="Close AI Panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-[#0a0f1e]/90 flex flex-col gap-4 font-sans text-xs md:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                >
                  <span className="font-mono text-[9px] text-outline mb-1 uppercase tracking-wider select-none">
                    {msg.sender === "user" ? "visitor" : "co-pilot"}
                  </span>
                  <div
                    className={`px-4 py-3 rounded-2xl border text-[12px] md:text-xs leading-relaxed ${msg.sender === "user"
                      ? "bg-cyan/10 border-cyan/25 text-[#dce1fb] rounded-tr-none"
                      : "bg-[#131b2e] border-white/5 text-[#c1c9e8] rounded-tl-none"
                      }`}
                  >
                    {msg.isTyping ? (
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce" />
                      </div>
                    ) : (
                      renderMessageText(msg.text)
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Bottom Actions: Preset Inputs */}
            <div className="p-3 border-t border-white/5 bg-[#0a0f1e]/40 flex flex-col gap-2">
              <span className="font-mono text-[9px] text-[#3d494c] tracking-widest uppercase select-none px-1">
                Suggested Queries
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto">
                {presetQuestions.map((q) => (
                  <button
                    key={q.key}
                    onClick={() => triggerAIResponse(q.key, q.label)}
                    disabled={!!activeTypingId}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-cyan/25 text-left text-[10px] text-[#b0b8db] hover:text-cyan hover:bg-cyan/5 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-tr from-cyan to-violet text-deep font-bold cursor-pointer relative shadow-lg shadow-cyan/20 group outline-none"
        title="Ask Gebey's AI Co-pilot"
      >
        {/* Glow effect */}
        <span className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan to-violet opacity-30 blur-md group-hover:opacity-50 transition-opacity animate-pulse" />

        {/* Border rotation animation */}
        <span className="absolute inset-0 rounded-full border border-dashed border-white/40 group-hover:rotate-90 duration-700 ease-out" />

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-[#070d1f]" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center relative"
            >
              <MessageSquare className="w-6 h-6 text-[#070d1f]" />
              <Sparkles className="w-3.5 h-3.5 text-cyan absolute -top-1.5 -right-1.5 bg-[#070d1f] rounded-full p-0.5 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
