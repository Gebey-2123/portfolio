"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Play, Pause, TrendingUp, Camera, X,
  ChevronRight, ChevronLeft, Sparkles, Award
} from "lucide-react";

type SkillTab = "video" | "marketing" | "content";

interface SampleWork {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  metrics: { label: string; value: string }[];
  software: string[];
  brief: string;
  approach: string;
}

const SKILL_TABS: { id: SkillTab; label: string; icon: React.ReactNode }[] = [
  { id: "video", label: "Video Editing", icon: <Play className="w-4 h-4" /> },
  { id: "marketing", label: "Digital Marketing", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "content", label: "Content Creator", icon: <Camera className="w-4 h-4" /> },
];

const SAMPLES: Record<SkillTab, SampleWork[]> = {
  video: [
    {
      id: "video_editing1",
      title: "Aether Glasses: Global Product Launch Teaser",
      description: "Cinematic commercial spot for a premium smart eyewear brand. Features complex 3D tracking, neon color matching, advanced audio soundscapes, and tight rhythmic pacing.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/gebregebey",
      metrics: [
        { label: "Avg. Watch Time", value: "89%" },
        { label: "Render Time", value: "14 hrs" },
        { label: "VFX Layers", value: "120+" }
      ],
      software: ["After Effects", "Premiere Pro", "DaVinci Resolve", "CapCut"],
      brief: "Deliver a high-conversion 30-second cinematic product teaser for a revolutionary AR eyewear brand, aligning with a dark cyberpunk aesthetic.",
      approach: "Synchronized dynamic speed ramps with custom-designed impact sounds. Engineered a multi-layered color grade to convert raw Log-C flat footage to deep, high-contrast neon tones."
    },
    {
      id: "video_editing2",
      title: "Horology: The Art of Swiss Timepieces",
      description: "A luxury micro-documentary focused on close-up macro cinematography. Showcases immersive foley sound design, multi-track audio sweetening, and color grading.",
      image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/gebregebey",
      metrics: [
        { label: "Audio Tracks", value: "32 channels" },
        { label: "Foley Samples", value: "150+" },
        { label: "Noise Reduction", value: "-24dB floor" }
      ],
      software: ["Premiere Pro", "Adobe Audition", "iZotope RX"],
      brief: "Build a brand story highlighting the precision engineering of a Swiss timepiece maker, using audio as the primary narrative engine.",
      approach: "Recorded organic mechanical gears clinks and human breathing using field microphones, layering them in post-production with micro-foley sync, spatial panning, and clean dialogue compression."
    },
    {
      id: "video_editing3",
      title: "DevSpace: Cyberpunk Co-Working Launch Campaign",
      description: "A dynamic kinetic typography promo for a modern tech workspace. Syncs abstract graphic overlays, glitch textures, and bold type animations to a punchy soundtrack.",
      image: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/gebregebey",
      metrics: [
        { label: "Frame Rate", value: "60 FPS" },
        { label: "Text Layers", value: "85 count" },
        { label: "Ease Smoothness", value: "98%" }
      ],
      software: ["After Effects", "Cinema 4D", "Illustrator"],
      brief: "Announce the launch of a high-tech developer hub through a kinetic typo teaser, driving organic social engagements.",
      approach: "Warped text vectors in real-time, matching movement curves to the audio beats. Implemented a subtle dark-mode scanline filter to match the developer-focused theme."
    },
    {
      id: "video_editing4",
      title: "Echo Stage: Neon Nights Live Performance Sync",
      description: "Live music session multi-cam edit. Synchronizes four separate camera angles, color-matches disparate camera sensors, and masters high-fidelity audio stems.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/gebregebey",
      metrics: [
        { label: "Camera Feeds", value: "4 Sync-Angles" },
        { label: "Color Match", value: "ΔE < 1.2 accuracy" },
        { label: "Social Reach", value: "2.1M Views" }
      ],
      software: ["DaVinci Resolve", "Premiere Pro", "PluralEyes"],
      brief: "Create an energetic live concert edit maintaining perfect continuity and capturing the crowd's energy.",
      approach: "Synchronized multi-cam feeds via audio waveform analysis. Balanced Canon, Sony, and Blackmagic color sensors using customized LUTs and cuts synced to musical downbeats."
    }
  ],
  marketing: [
    {
      id: "Digital_Marketing",
      title: "VaporScale: SaaS Organic Traffic Engine",
      description: "An SEO growth project targeting high-intent developer keywords. Engineered topic clusters and core web vitals upgrades to boost signups.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/gebregebey",
      metrics: [
        { label: "Organic Growth", value: "+180%" },
        { label: "Keywords in Top 3", value: "45" },
        { label: "CTR Improvement", value: "+3.2%" }
      ],
      software: ["Ahrefs", "Google Search Console", "Semrush"],
      brief: "Drive organic search traffic and trial signups for a developer-oriented infrastructure platform without using paid ads.",
      approach: "Conducted keyword gap analysis. Designed technical hub structures and optimized meta-tags and site architectures for faster search crawls."
    },
    {
      id: "marketing-2",
      title: "AuraPay: Fintech Paid Ads Growth Funnel",
      description: "Structured Google Search and Meta Ads campaigns. Designed custom ad creatives, audience targeting vectors, and optimized cost-per-acquisition (CPA).",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/gebregebey",
      metrics: [
        { label: "CPA Reduction", value: "-35%" },
        { label: "Lead-to-Demo Conv.", value: "24%" },
        { label: "Total ROAS", value: "4.2x" }
      ],
      software: ["Google Ads Manager", "Meta Ads Manager", "Google Analytics 4"],
      brief: "Build and scale a paid lead generation pipeline to acquire business users for a corporate payment solutions dashboard.",
      approach: "Built a multi-tiered funnel: Search ads captured active intent while retargeting video ads on Meta drove demo signups using customized lookalike audiences."
    },
    {
      id: "marketing-3",
      title: "NexusCRM: User Lifecycle Onboarding Funnel",
      description: "Automated onboarding and email campaigns designed to reduce product churn. Optimizes user onboarding and feature activation paths.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/gebregebey",
      metrics: [
        { label: "Email Open Rate", value: "48%" },
        { label: "Trial Conversion", value: "12%" },
        { label: "Active Churn", value: "-8.5%" }
      ],
      software: ["Customer.io", "Figma", "HTML/CSS (Email)"],
      brief: "Increase active trial conversions and drop churn rates by sending behavioral trigger-based tutorials.",
      approach: "Designed automated flows mapped to API triggers (e.g. creating first workspace). Written concise copy showing concrete developer outcomes."
    },
    {
      id: "marketing-4",
      title: "ClerkDB: Viral Developer Tool Launch Campaign",
      description: "A synchronized marketing campaign that secured Product of the Day on Product Hunt. Managed social promotions, community building, and press kits.",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/gebregebey",
      metrics: [
        { label: "Social Impressions", value: "1.4M" },
        { label: "Sign-ups generated", value: "8.5k" },
        { label: "Product Hunt Rank", value: "#1 Day" }
      ],
      software: ["Notion", "Twitter API", "Figma"],
      brief: "Launch an open-source database client, maximizing social footprint across tech Twitter and LinkedIn.",
      approach: "Orchestrated social posts from 15 key technical influencers. Coordinated timing, media packages, and PR kits to trigger high-engagement threads."
    }
  ],
  content: [
    {
      id: "content-1",
      title: "SyntaxStack: Curated Tech Weekly Newsletter",
      description: "A weekly editorial publication reaching 12k+ developers and software engineers. Delivers deep dives into web performance and system architecture.",
      image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/gebregebey",
      metrics: [
        { label: "Subscribers", value: "12,400+" },
        { label: "Avg. Open Rate", value: "45%" },
        { label: "Growth Rate", value: "+800 / mo" }
      ],
      software: ["Substack", "Markdown", "Figma"],
      brief: "Build a high-authority newsletter publication establishing domain expertise in modern software engineering.",
      approach: "Researched and wrote technical content on rendering paths, garbage collection, and database designs, sharing clean interactive code blocks."
    },
    {
      id: "content-2",
      title: "SystemArchitect: Visual Systems Design Carousels",
      description: "Highly popular educational carousels explaining Redis patterns, DNS routing, and security protocols. Reached 250k+ views on LinkedIn.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/gebregebey",
      metrics: [
        { label: "Post Impressions", value: "250k+" },
        { label: "Saved / Bookmarks", value: "4,800+" },
        { label: "Profile Visits", value: "+12,000" }
      ],
      software: ["Figma", "Illustrator", "Canva"],
      brief: "Deconstruct complex system designs into clean, readable infographics optimized for engagement on professional social platforms.",
      approach: "Created standardized visual styles combining custom drawings with simplified block diagrams. Highlights key concepts in a clear, dark-mode theme."
    },
    {
      id: "content-3",
      title: "Antigravity Devs: Audio Podcast & Video Snippets",
      description: "Weekly tech podcast focusing on software architecture, developer careers, and AI tools. Distributed across Spotify, Apple, and YouTube.",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/gebregebey",
      metrics: [
        { label: "Monthly Listeners", value: "5,200+" },
        { label: "Episodes Released", value: "45" },
        { label: "Rating score", value: "4.9 / 5.0" }
      ],
      software: ["Audacity", "Descript", "Riverside.fm"],
      brief: "Deliver clear audio episodes hosting conversations with industry experts, adapting snippets for short-form visual platforms.",
      approach: "Mastered multi-channel audio tracks, removed background noise, and edited vocal pacing. Created audiograms with subtitles for social media marketing."
    },
    {
      id: "content-4",
      title: "Handbook: Interactive Frontend Architecture",
      description: "An open-source handbook teaching Next.js, React, and CSS performance. Features live playgrounds and interactive syntax highlights.",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/gebregebey",
      metrics: [
        { label: "GitHub Stars", value: "450+ stars" },
        { label: "Unique visitors", value: "25k+" },
        { label: "Quiz Completion", value: "76%" }
      ],
      software: ["Next.js", "MDX", "Tailwind CSS"],
      brief: "Develop an interactive documentation framework to teach frontend architecture, utilizing practical code exercises.",
      approach: "Built a handbook site using MDX. Integrated live react sandboxes allowing users to alter parameters and see live results directly in-browser."
    }
  ]
};

// INTERACTIVE WIDGET COMPONENTS FOR THE POPUP

function ColorGradingDemo() {
  const [sliderVal, setSliderVal] = useState(50);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const v2Ref = useRef<HTMLVideoElement>(null);

  // Sync play/pause
  useEffect(() => {
    const v1 = v1Ref.current;
    const v2 = v2Ref.current;
    if (!v1 || !v2) return;
    if (isPlaying) {
      v1.play().catch(() => { });
      v2.play().catch(() => { });
    } else {
      v1.pause();
      v2.pause();
    }
  }, [isPlaying]);

  // Sync seek points
  const handleTimeUpdate = () => {
    const v1 = v1Ref.current;
    const v2 = v2Ref.current;
    if (!v1 || !v2) return;
    if (Math.abs(v1.currentTime - v2.currentTime) > 0.15) {
      v2.currentTime = v1.currentTime;
    }
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderVal((x / rect.width) * 100);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 select-none cursor-ew-resize bg-black"
      >
        {/* RAW Flat video (bottom) */}
        <video
          ref={v1Ref}
          src="https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-a-virtual-reality-headset-41311-large.mp4"
          muted
          loop
          playsInline
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-[0.7] brightness-[1.05]"
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-white/70 uppercase z-10">
          RAW Log
        </div>

        {/* Graded video (top - clipped) */}
        <video
          ref={v2Ref}
          src="https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-a-virtual-reality-headset-41311-large.mp4"
          muted
          loop
          playsInline
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            clipPath: `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)`,
            filter: "contrast(1.25) saturate(1.5) hue-rotate(-5deg) brightness(0.95)"
          }}
        />

        {/* Glow hue tint */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge bg-gradient-to-tr from-cyan/20 via-transparent to-violet/20 z-10"
          style={{
            clipPath: `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)`
          }}
        />

        <div className="absolute top-3 right-3 bg-cyan-dark/80 backdrop-blur-sm border border-cyan/30 px-2 py-1 rounded text-[10px] font-mono text-cyan uppercase z-10">
          Graded Commercial Look
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-cyan shadow-[0_0_10px_#00e5ff] z-20"
          style={{ left: `${sliderVal}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan border border-white flex items-center justify-center shadow-lg text-[#070d1a]">
            <span className="text-[10px] font-bold font-mono">↔</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 bg-white/5 border border-white/10 hover:border-cyan/40 text-[10px] font-mono font-bold tracking-widest text-white uppercase rounded-lg flex items-center justify-center gap-1.5 shrink-0"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="flex-1 bg-black/40 border border-white/5 rounded-lg flex items-center justify-center text-[9px] font-mono text-white/50 text-center px-2 py-1 leading-tight">
          Drag slider horizontally to preview color grade correction
        </div>
      </div>
    </div>
  );
}

function FoleyMixerDemo() {
  const [tracks, setTracks] = useState({
    ambient: true,
    synth: true,
    voice: true,
    foley: true
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [waveSeed, setWaveSeed] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setWaveSeed(s => s + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleTrack = (key: keyof typeof tracks) => {
    setTracks(t => ({ ...t, [key]: !t[key] }));
  };

  const generateWavePath = () => {
    let amplitude = 0;
    if (tracks.ambient) amplitude += 4;
    if (tracks.synth) amplitude += 15;
    if (tracks.voice) amplitude += 8;
    if (tracks.foley) amplitude += 12;
    if (!isPlaying) amplitude = 0;

    let points = [];
    for (let i = 0; i <= 100; i++) {
      const x = i * 2.8;
      const y = 50 +
        Math.sin(i * 0.15 + waveSeed * 0.2) * amplitude * 0.7 +
        Math.sin(i * 0.35 - waveSeed * 0.4) * amplitude * 0.3;
      points.push(`${x},${y}`);
    }
    return `M 0 50 L ${points.join(" L ")} L 280 50`;
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Video playing container */}
      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
        <video
          ref={videoRef}
          src="https://assets.mixkit.co/videos/preview/mixkit-mechanical-watch-gears-spinning-close-up-39967-large.mp4"
          muted
          loop
          playsInline
          autoPlay
          className="w-full h-full object-cover filter brightness-70 contrast-125"
        />
        <div className="absolute top-2 left-2 text-[8px] font-mono text-white/50 tracking-wider bg-black/40 px-1.5 py-0.5 rounded">
          SCENE: WATCHMAKING DETAIL
        </div>
      </div>

      <div className="relative h-16 w-full rounded-lg bg-black border border-white/5 flex items-center justify-center overflow-hidden">
        <div className="absolute top-2 left-2 text-[8px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1.5 z-10">
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-red-500 animate-pulse" : "bg-white/20"}`} />
          Audio Oscilloscope
        </div>

        <svg viewBox="0 0 280 100" className="w-full h-full">
          <line x1="0" y1="50" x2="280" y2="50" stroke="#ffffff" strokeOpacity="0.1" strokeDasharray="2,4" />
          <path
            d={generateWavePath()}
            fill="none"
            stroke={isPlaying ? "#00e5ff" : "#3d494c"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        {(Object.keys(tracks) as Array<keyof typeof tracks>).map((trackName) => (
          <button
            key={trackName}
            onClick={() => toggleTrack(trackName)}
            className={`flex items-center justify-between p-2 rounded-lg border transition-all ${tracks[trackName]
              ? "bg-cyan/5 border-cyan/40 text-cyan font-bold"
              : "bg-white/5 border-white/10 text-on-muted"
              }`}
          >
            <span className="capitalize">{trackName}</span>
            <span className="text-[10px] opacity-75">{tracks[trackName] ? "ON" : "MUTED"}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-full py-2 bg-white/5 border border-white/10 hover:border-cyan/40 text-xs font-mono font-bold tracking-widest text-white uppercase rounded-lg flex items-center justify-center gap-2"
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5" /> STOP MIX MONITOR
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5" /> START MIX MONITOR
          </>
        )}
      </button>
    </div>
  );
}

function KineticTypographyDemo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [cycle, setCycle] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const words = ["CREATIVE", "DYNAMICS", "VISION", "ENGINEERING"];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCycle(c => (c + 1) % words.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPlaying, words.length]);

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Video with typography overlay */}
      <div className="relative aspect-video rounded-xl bg-black border border-white/10 flex flex-col items-center justify-center overflow-hidden p-6 select-none animate-glow">
        <video
          ref={videoRef}
          src="https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-laptops-keyboard-in-a-dark-room-42325-large.mp4"
          muted
          loop
          playsInline
          autoPlay
          className="absolute inset-0 w-full h-full object-cover opacity-40 filter contrast-125"
        />

        <div className="absolute top-3 left-3 text-[8px] font-mono text-white/30 tracking-widest uppercase z-10">
          Kinetic Overlay engine
        </div>

        <div className="h-24 flex items-center justify-center text-center relative z-10">
          <AnimatePresence mode="wait">
            {isPlaying && (
              <motion.div
                key={cycle}
                initial={{
                  opacity: 0,
                  scale: cycle === 0 ? 0.3 : 1,
                  rotateX: cycle === 1 ? -90 : 0,
                  letterSpacing: cycle === 3 ? "0.05em" : "0.15em",
                  y: cycle === 1 ? 50 : 0
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  letterSpacing: cycle === 3 ? "0.3em" : "0.15em",
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  scale: cycle === 0 ? 1.5 : 1,
                  rotateX: cycle === 1 ? 90 : 0,
                  y: cycle === 1 ? -50 : 0
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-grotesk text-3xl md:text-4xl font-black text-glow text-white"
                style={{
                  textShadow: cycle === 2 ? "2px 0 #ff4d6d, -2px 0 #00e5ff" : "0 0 20px rgba(255,255,255,0.2)"
                }}
              >
                {words[cycle]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full flex items-center gap-4 mt-1">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-cyan/40 text-[10px] font-mono text-white uppercase rounded-lg flex items-center gap-1.5"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 bottom-0 left-0 bg-cyan"
            initial={{ width: "0%" }}
            animate={isPlaying ? {
              width: ["0%", "100%"]
            } : { width: `${(cycle / words.length) * 100}%` }}
            transition={isPlaying ? {
              duration: 1.8 * words.length,
              ease: "linear",
              repeat: Infinity
            } : { duration: 0.1 }}
            key={isPlaying ? "running" : "paused"}
          />
        </div>
        <div className="text-[10px] font-mono text-white/50">
          0{cycle + 1} / 04
        </div>
      </div>
    </div>
  );
}

function MultiCamDemo() {
  const [activeAngle, setActiveAngle] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState("00:12:04");
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (isPlaying) {
      videoRefs.current.forEach(v => v?.play().catch(() => { }));
    } else {
      videoRefs.current.forEach(v => v?.pause());
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const s = String(date.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(date.getMilliseconds() / 10)).padStart(2, '0');
      setTime(`00:12:${s}:${ms}`);
    }, 33);
    return () => clearInterval(interval);
  }, []);

  const angles = [
    { id: 1, name: "Cam A (Wide Feed)", filter: "none", icon: "🎥" },
    { id: 2, name: "Cam B (Grade Match)", filter: "contrast(1.6) grayscale(100%)", icon: "🔍" },
    { id: 3, name: "Cam C (Warm Sensor)", filter: "sepia(0.6) saturate(1.3)", icon: "📸" },
    { id: 4, name: "Cam D (Fretboard Feed)", filter: "hue-rotate(90deg) brightness(0.8)", icon: "🎸" },
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Active screen monitor */}
      <div className="relative aspect-video rounded-lg border border-cyan/40 bg-black flex items-center justify-center overflow-hidden">
        <video
          ref={el => { videoRefs.current[0] = el; }}
          src="https://assets.mixkit.co/videos/preview/mixkit-rock-band-performing-on-stage-at-a-concert-40245-large.mp4"
          muted
          loop
          playsInline
          autoPlay
          className="absolute inset-0 w-full h-full object-cover transition-all"
          style={{ filter: angles[activeAngle - 1].filter }}
        />

        <div className="absolute top-2 left-2 bg-red-500/20 text-red-400 border border-red-500/30 text-[8px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          REC MONITOR
        </div>

        <div className="absolute top-2 right-2 text-[10px] font-mono text-white/70 z-10">
          {time}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded text-[10px] text-white font-mono font-bold z-10 border border-white/10">
          {angles[activeAngle - 1].name}
        </div>

        <div className="absolute bottom-2 left-2 right-2 h-2 bg-black/40 border border-white/5 rounded overflow-hidden flex gap-0.5 p-0.5 z-10">
          <div className="h-full bg-green-500 rounded-sm w-3/5 animate-pulse" />
          <div className="h-full bg-yellow-500 rounded-sm w-1/5 animate-pulse" />
          <div className="h-full bg-red-500 rounded-sm w-[10%] animate-pulse" />
        </div>
      </div>

      {/* Grid of angles switcher */}
      <div className="grid grid-cols-2 gap-2">
        {angles.map((ang, i) => (
          <button
            key={ang.id}
            onClick={() => setActiveAngle(ang.id)}
            className={`relative rounded-lg border text-left transition-all overflow-hidden aspect-video ${activeAngle === ang.id
              ? "border-cyan shadow-[0_0_15px_rgba(0,229,255,0.1)]"
              : "border-white/5 hover:border-white/20"
              }`}
          >
            <video
              ref={el => { videoRefs.current[i + 1] = el; }}
              src="https://assets.mixkit.co/videos/preview/mixkit-rock-band-performing-on-stage-at-a-concert-40245-large.mp4"
              muted
              loop
              playsInline
              autoPlay
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              style={{ filter: ang.filter }}
            />
            <div className="absolute inset-0 bg-black/30 hover:bg-transparent transition-colors" />

            <div className="absolute top-1 left-2 text-[7px] font-mono text-white/50 uppercase">ANGLE 0{ang.id}</div>
            <div className="absolute bottom-1 left-2 text-[9px] font-bold text-white font-mono flex items-center gap-1">
              <span>{ang.icon}</span>
              <span>{ang.name.split(" ")[2]}</span>
            </div>
            {activeAngle === ang.id && (
              <span className="absolute bottom-1 right-2 text-[7px] font-mono bg-cyan text-deep px-1 rounded tracking-wider font-bold">LIVE</span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-full py-1.5 bg-white/5 border border-white/10 hover:border-cyan/40 text-[10px] font-mono font-bold tracking-widest text-white uppercase rounded-lg flex items-center justify-center gap-2"
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        {isPlaying ? "PAUSE SWITCHER" : "RESUME SWITCHER"}
      </button>
    </div>
  );
}

function SearchConsoleDemo() {
  const [activeKeyword, setActiveKeyword] = useState("nextjs performance guide");

  const keywords = [
    { name: "nextjs performance guide", clicks: 1205, ctr: "6.4%", position: 1.2, graph: [12, 10, 8, 5, 3, 2.1, 1.2] },
    { name: "creative physics canvas", clicks: 843, ctr: "4.8%", position: 2.3, graph: [15, 14, 11, 9, 6, 3.5, 2.3] },
    { name: "typescript micro-framer", clicks: 654, ctr: "5.1%", position: 1.8, graph: [8, 8, 6, 4, 3, 2.0, 1.8] },
    { name: "react state visualizer", clicks: 420, ctr: "3.2%", position: 3.1, graph: [20, 18, 15, 11, 8, 4.2, 3.1] },
  ];

  const curr = keywords.find(k => k.name === activeKeyword) || keywords[0];

  const points = curr.graph.map((val, idx) => {
    const x = idx * 40 + 20;
    const y = 15 + ((val - 1) / 19) * 50;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="w-full flex flex-col gap-4 p-4 rounded-xl border border-white/10 bg-[#0c1324]/90 font-mono text-xs text-on-surface">
      <div className="h-28 bg-black border border-white/5 rounded-lg relative overflow-hidden p-2">
        <div className="absolute top-2 left-2 text-[8px] opacity-40 uppercase tracking-wider">Google Search Rank Journey</div>
        <div className="absolute top-2 right-2 text-[9px] text-cyan font-bold">AVG POSITION: {curr.position}</div>

        <svg viewBox="0 0 280 80" className="w-full h-full pt-4">
          <line x1="20" y1="15" x2="260" y2="15" stroke="#ffffff" strokeOpacity="0.05" />
          <line x1="20" y1="40" x2="260" y2="40" stroke="#ffffff" strokeOpacity="0.05" />
          <line x1="20" y1="65" x2="260" y2="65" stroke="#ffffff" strokeOpacity="0.05" />

          <polyline
            fill="none"
            stroke="#00e5ff"
            strokeWidth="2.5"
            points={points}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {curr.graph.map((val, idx) => (
            <circle
              key={idx}
              cx={idx * 40 + 20}
              cy={15 + ((val - 1) / 19) * 50}
              r="3.5"
              fill="#070d1a"
              stroke="#00e5ff"
              strokeWidth="1.5"
            />
          ))}
        </svg>
        <div className="absolute bottom-1 right-2 text-[7px] text-white/30">PAST 90 DAYS</div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-12 px-2 py-1 text-[8px] text-white/40 uppercase font-bold border-b border-white/5">
          <span className="col-span-6">Keyword Query</span>
          <span className="col-span-3 text-right">Clicks</span>
          <span className="col-span-3 text-right">Pos</span>
        </div>
        <div className="flex flex-col gap-0.5 max-h-36 overflow-y-auto pr-1">
          {keywords.map((k) => (
            <button
              key={k.name}
              onClick={() => setActiveKeyword(k.name)}
              className={`grid grid-cols-12 px-2 py-1.5 rounded text-[10px] text-left transition-all ${activeKeyword === k.name
                ? "bg-cyan/10 text-cyan border-l-2 border-cyan font-bold"
                : "bg-white/5 hover:bg-white/10 text-on-muted"
                }`}
            >
              <span className="col-span-6 truncate">{k.name}</span>
              <span className="col-span-3 text-right">{k.clicks}</span>
              <span className="col-span-3 text-right">{k.position}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FunnelSimulatorDemo() {
  const [budget, setBudget] = useState(5000);

  const cpc = 1.25;
  const clicks = Math.round(budget / cpc);
  const conversionRate = 0.045;
  const conversions = Math.round(clicks * conversionRate);
  const avgContractValue = 850;
  const revenue = conversions * avgContractValue;
  const roas = (revenue / budget).toFixed(1);

  return (
    <div className="w-full flex flex-col gap-4 p-4 rounded-xl border border-white/10 bg-[#0c1324]/90 font-mono text-xs">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-white/40 uppercase">Ad Budget:</span>
        <span className="text-sm font-bold text-white">${budget.toLocaleString()} / mo</span>
      </div>

      <input
        type="range"
        min="1000"
        max="30000"
        step="1000"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        className="w-full accent-cyan cursor-pointer bg-white/10 h-1 rounded-full appearance-none mb-2"
      />

      <div className="flex flex-col gap-2.5 mt-2">
        <div>
          <div className="flex justify-between text-[9px] text-on-muted mb-1">
            <span>Impressions (~2% CTR)</span>
            <span className="font-bold text-white">{(clicks * 50).toLocaleString()}</span>
          </div>
          <div className="w-full h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#1e293b] w-full" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[9px] text-cyan mb-1">
            <span>Clicks ($1.25 Avg CPC)</span>
            <span className="font-bold text-white">{clicks.toLocaleString()}</span>
          </div>
          <div className="w-full h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-cyan/80 w-[45%]" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[9px] text-violet mb-1">
            <span>Product Demos (4.5% Conv.)</span>
            <span className="font-bold text-white">{conversions}</span>
          </div>
          <div className="w-full h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-violet/85 w-[15%]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-white/5 text-center">
        <div className="bg-black/30 p-2 rounded border border-white/5">
          <div className="text-[8px] text-white/40 uppercase">Est. Revenue</div>
          <div className="text-xs font-bold text-green-400">${revenue.toLocaleString()}</div>
        </div>
        <div className="bg-black/30 p-2 rounded border border-white/5">
          <div className="text-[8px] text-white/40 uppercase">Expected ROAS</div>
          <div className="text-xs font-bold text-cyan">{roas}x return</div>
        </div>
      </div>
    </div>
  );
}

function EmailAutomationDemo() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const steps = [
    { id: 1, type: "trigger", title: "User Signup Action", desc: "Activates when user starts free trial.", stat: "Active" },
    { id: 2, type: "delay", title: "Wait 18 Hours", desc: "Allows initial platform exploration.", stat: "Delay" },
    { id: 3, type: "email", title: "Send: Onboarding Guide", desc: "Subject: 'Deploy your first app in 5 minutes'. Trigger content.", stat: "52% Open" },
    { id: 4, type: "condition", title: "Did User Create Project?", desc: "Splits path based on user engagement.", stat: "Decide" },
  ];

  return (
    <div className="w-full flex flex-col gap-4 p-4 rounded-xl border border-white/10 bg-[#0c1324]/90 font-mono text-xs">
      <div className="text-[8px] text-white/40 uppercase tracking-wider mb-1">Interactive Campaign Tree</div>

      <div className="flex flex-col gap-2 relative">
        {steps.map((s, idx) => (
          <div key={s.id} className="relative flex flex-col items-center">
            {idx > 0 && (
              <div className="h-3.5 w-[1.5px] bg-cyan/30 mb-2" />
            )}

            <button
              onClick={() => setActiveNode(activeNode === s.id ? null : s.id)}
              className={`w-full p-2.5 rounded-lg border text-left transition-all ${activeNode === s.id
                ? "bg-cyan/10 border-cyan text-white shadow-[0_0_12px_rgba(0,229,255,0.08)]"
                : "bg-black/40 border-white/5 hover:border-white/20 text-on-muted"
                }`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-[8px] uppercase px-1.5 py-0.5 rounded font-bold ${s.type === "trigger" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                  s.type === "delay" ? "bg-slate-500/10 text-slate-400 border border-slate-500/20" :
                    s.type === "email" ? "bg-cyan/10 text-cyan border border-cyan/20" :
                      "bg-violet/10 text-violet border border-violet/20"
                  }`}>
                  {s.type}
                </span>
                <span className="text-[9px] opacity-75">{s.stat}</span>
              </div>
              <div className="text-xs font-bold text-white mt-1.5">{s.title}</div>

              {activeNode === s.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-[10px] text-on-muted leading-relaxed mt-2 pt-2 border-t border-white/5"
                >
                  {s.desc}
                </motion.p>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfluencerRosterDemo() {
  const [selectedInfluencers, setSelectedInfluencers] = useState<number[]>([1, 3]);

  const roster = [
    { id: 1, handle: "@tech_architect", followers: "85k", platform: "Twitter/X", rate: "$450", reach: 24000 },
    { id: 2, handle: "CodeVlog Daily", followers: "120k", platform: "YouTube", rate: "$800", reach: 45000 },
    { id: 3, handle: "@jessie_dev", followers: "42k", platform: "LinkedIn", rate: "$300", reach: 18000 },
    { id: 4, handle: "SyntaxBytes", followers: "95k", platform: "LinkedIn/Twitter", rate: "$600", reach: 30000 }
  ];

  const handleToggle = (id: number) => {
    setSelectedInfluencers(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const totalCost = roster.filter(x => selectedInfluencers.includes(x.id)).reduce((acc, curr) => acc + Number(curr.rate.slice(1)), 0);
  const totalReach = roster.filter(x => selectedInfluencers.includes(x.id)).reduce((acc, curr) => acc + curr.reach, 0);

  return (
    <div className="w-full flex flex-col gap-3 p-4 rounded-xl border border-white/10 bg-[#0c1324]/90 font-mono text-xs">
      <div className="text-[8px] text-white/40 uppercase tracking-wider">Select Roster to Estimate ROI</div>

      <div className="flex flex-col gap-1.5">
        {roster.map((inf) => {
          const isSelected = selectedInfluencers.includes(inf.id);
          return (
            <button
              key={inf.id}
              onClick={() => handleToggle(inf.id)}
              className={`flex items-center justify-between p-2 rounded-lg border text-left transition-all ${isSelected
                ? "bg-cyan/10 border-cyan/60 text-white"
                : "bg-black/30 border-white/5 hover:border-white/15 text-on-muted"
                }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center border text-[8px] ${isSelected ? "bg-cyan border-cyan text-deep font-bold" : "border-white/20"
                  }`}>
                  {isSelected && "✓"}
                </span>
                <div>
                  <div className="text-[10px] font-bold text-white">{inf.handle}</div>
                  <div className="text-[8px] text-white/50">{inf.platform} • {inf.followers}</div>
                </div>
              </div>
              <div className="text-[10px] text-right font-bold text-white">{inf.rate}</div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-white/5 text-center text-[10px]">
        <div className="bg-black/40 p-2 rounded border border-white/5">
          <div className="text-[8px] text-white/40 uppercase">Total Budget</div>
          <div className="text-white font-bold">${totalCost}</div>
        </div>
        <div className="bg-black/40 p-2 rounded border border-white/5">
          <div className="text-[8px] text-white/40 uppercase">Est. Engagements</div>
          <div className="text-cyan font-bold">{totalReach.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

function NewsletterReaderDemo() {
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState({ nextjs: 42, react: 28, solid: 14 });

  const handleVote = (framework: keyof typeof votes) => {
    if (hasVoted) return;
    setVotes(prev => ({
      ...prev,
      [framework]: prev[framework] + 1
    }));
    setHasVoted(true);
  };

  const totalVotes = votes.nextjs + votes.react + votes.solid;
  const pct = (val: number) => Math.round((val / totalVotes) * 100);

  return (
    <div className="w-full flex flex-col gap-3 p-4 rounded-xl border border-white/10 bg-[#0c1324]/90 font-sans text-xs">
      <div className="h-44 bg-black/50 border border-white/5 rounded-lg overflow-y-auto p-4 font-mono text-[9px] leading-relaxed text-on-surface">
        <div className="border-b border-white/10 pb-2 mb-3">
          <div className="text-[8px] text-white/40 font-bold uppercase mb-1">Newsletter Preview</div>
          <div className="text-white font-bold">Issue #34: Speeding Up Tailwind Render Loops</div>
          <div className="text-white/40">From: DevJournal Weekly • 12.4k subs</div>
        </div>

        <p className="mb-2 text-white/80">
          Tailwind CSS uses PurgeCSS techniques under the hood, but dynamic template compilation at runtime is a common performance pitfall. Let's optimize it.
        </p>

        <pre className="bg-[#070d1a] border border-white/10 p-2 rounded text-[8px] leading-tight my-2 text-glow text-cyan-dim overflow-x-auto">
          {`// Avoid dynamic class names at runtime:
const color = 'cyan';
// INCORRECT: \`bg-\${color}-500\`
// CORRECT:   color === 'cyan' ? 'bg-cyan-500' : 'bg-red-500'`}
        </pre>

        <p className="mb-3 text-white/80">
          What is your primary web stack for performance-sensitive projects? Vote below:
        </p>

        <div className="flex flex-col gap-1.5 mt-2 bg-[#070d1a] p-3 rounded-lg border border-white/5 font-sans">
          <div className="text-[8px] text-white/50 uppercase font-mono mb-1.5 font-bold">Live Subscriber Poll</div>

          {(Object.keys(votes) as Array<keyof typeof votes>).map((opt) => {
            const val = votes[opt];
            const p = pct(val);
            return (
              <button
                key={opt}
                disabled={hasVoted}
                onClick={() => handleVote(opt)}
                className={`relative w-full p-2 rounded text-left border text-[10px] overflow-hidden transition-all ${hasVoted ? "cursor-default border-white/5" : "hover:border-cyan/40 bg-white/5 border-white/10"
                  }`}
              >
                {hasVoted && (
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-cyan/10 transition-all duration-500"
                    style={{ width: `${p}%` }}
                  />
                )}
                <div className="relative z-10 flex justify-between font-mono font-bold">
                  <span className="uppercase">{opt === "nextjs" ? "Next.js" : opt === "react" ? "Vite + React" : "SolidJS"}</span>
                  <span>{hasVoted ? `${p}%` : ""}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SlideDeckDemo() {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "HOW REDIS CACHING WORKS",
      concept: "Client requests data. Instead of hitting the DB directly, the app checks Redis first.",
      visual: "DB Server 🗄️ ←─── [Check Cache] ───⚡ Redis Mem"
    },
    {
      title: "CACHE HIT VS CACHE MISS",
      concept: "If data exists in Redis (Hit), it returns in 2ms. If not (Miss), query DB, write to Redis, then return.",
      visual: "CACHE MISS: App ──▶ DB 🗄️ ──▶ Save Cache ──▶ Redis ⚡"
    },
    {
      title: "CACHE EXPIRATION (TTL)",
      concept: "Set Time-To-Live (TTL) on cache keys. Prevents memory overflow and keeps data fresh automatically.",
      visual: "Key 'user_12' TTL: 3600s ⏰ (Ticks down to eviction)"
    },
    {
      title: "WRITE-THROUGH CACHING",
      concept: "Write to cache and database concurrently. Ensures data integrity and eliminates stale cache entries.",
      visual: "Write Action ──▶ Cache ⚡ AND DB 🗄️ (Atomic transaction)"
    }
  ];

  const nextSlide = () => setSlide(s => (s + 1) % slides.length);
  const prevSlide = () => setSlide(s => (s - 1 + slides.length) % slides.length);

  return (
    <div className="w-full flex flex-col gap-3 p-4 rounded-xl border border-white/10 bg-[#0c1324]/90 font-mono text-xs">
      <div className="text-[8px] text-white/40 uppercase tracking-wider flex justify-between">
        <span>Slide Deck Explainer Mockup</span>
        <span>Slide 0{slide + 1} / 04</span>
      </div>

      <div className="h-40 bg-[#070d1a] border border-white/5 rounded-lg flex flex-col justify-between p-4 relative overflow-hidden text-glow">
        <div className="text-[10px] text-cyan font-bold uppercase tracking-widest border-b border-cyan/20 pb-1.5">
          {slides[slide].title}
        </div>

        <p className="text-[10px] text-on-muted leading-relaxed my-2 font-sans">
          {slides[slide].concept}
        </p>

        <div className="bg-white/5 border border-white/10 rounded p-2 text-[9px] text-center text-white/90 truncate">
          {slides[slide].visual}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={prevSlide}
          className="flex-1 py-2 bg-white/5 border border-white/10 hover:border-cyan/40 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 uppercase"
        >
          <ChevronLeft className="w-3 h-3" /> Back
        </button>
        <button
          onClick={nextSlide}
          className="flex-1 py-2 bg-white/5 border border-white/10 hover:border-cyan/40 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 uppercase text-cyan"
        >
          Next <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function PodcastPlayerDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [activeBars, setActiveBars] = useState<number[]>([]);

  useEffect(() => {
    if (!isPlaying) {
      setActiveBars([]);
      return;
    }
    const interval = setInterval(() => {
      const newBars = Array.from({ length: 24 }, () => Math.floor(Math.random() * 25) + 5);
      setActiveBars(newBars);
      setProgress(p => (p >= 100 ? 0 : p + 0.5));
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full flex flex-col gap-3 p-4 rounded-xl border border-white/10 bg-[#0c1324]/90 font-mono text-xs">
      <div className="text-[8px] text-white/40 uppercase tracking-wider">Episode Player Monitor</div>

      <div className="bg-black/50 border border-white/5 rounded-lg p-3 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded bg-gradient-to-tr from-violet-900 to-cyan-900 flex items-center justify-center text-lg ${isPlaying ? "animate-spin" : ""}`}>
            🎙️
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-white font-bold truncate">EP #12: Future of Web Assembly</div>
            <div className="text-[8px] text-white/50 truncate">Antigravity Devs Podcast</div>
          </div>
        </div>

        <div className="h-10 flex items-end justify-between px-2 gap-[2px]">
          {Array.from({ length: 24 }).map((_, idx) => {
            const h = isPlaying ? (activeBars[idx] || 5) : 5;
            return (
              <div
                key={idx}
                className="w-1 bg-cyan rounded-full transition-all duration-150"
                style={{ height: `${h}px`, opacity: isPlaying ? 0.8 : 0.3 }}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-cyan flex items-center justify-center text-[#070d1a]"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 bg-cyan" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[8px] text-white/40">
            {Math.floor((progress * 1.8) / 60)}:{(Math.floor(progress * 1.8) % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}

function SandboxDemo() {
  const [text, setText] = useState("Antigravity Devs");
  const [glowColor, setGlowColor] = useState("#00e5ff");

  return (
    <div className="w-full flex flex-col gap-3 p-4 rounded-xl border border-white/10 bg-[#0c1324]/90 font-mono text-xs">
      <div className="text-[8px] text-white/40 uppercase tracking-wider">Interactive Playground Sandbox</div>

      <div className="flex flex-col gap-2 bg-black/40 p-2.5 rounded border border-white/5">
        <div>
          <label className="text-[8px] text-white/50 block mb-1">Edit Display Title:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-[#070d1a] border border-white/10 rounded px-2 py-1 text-[10px] text-white outline-none focus:border-cyan"
          />
        </div>
        <div>
          <label className="text-[8px] text-white/50 block mb-1">Select Glow Accent:</label>
          <div className="flex gap-1.5">
            {["#00e5ff", "#a855f7", "#ffb873", "#ff4d6d"].map((c) => (
              <button
                key={c}
                onClick={() => setGlowColor(c)}
                className="w-4 h-4 rounded-full border transition-all"
                style={{
                  backgroundColor: c,
                  borderColor: glowColor === c ? "#ffffff" : "transparent",
                  transform: glowColor === c ? "scale(1.2)" : "scale(1)"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="h-24 bg-black border border-white/5 rounded-lg flex items-center justify-center p-3 relative overflow-hidden">
        <div className="absolute top-1 right-2 text-[7px] text-white/20">LIVE PREVIEW</div>

        <div
          className="text-sm font-bold font-grotesk tracking-widest text-white transition-all duration-300 text-center px-2 truncate"
          style={{ textShadow: `0 0 15px ${glowColor}` }}
        >
          {text || "EMPTY"}
        </div>
      </div>
    </div>
  );
}

function InteractiveDemoWidget({ id }: { id: string }) {
  switch (id) {
    case "video-1":
      return <ColorGradingDemo />;
    case "video-2":
      return <FoleyMixerDemo />;
    case "video-3":
      return <KineticTypographyDemo />;
    case "video-4":
      return <MultiCamDemo />;
    case "marketing-1":
      return <SearchConsoleDemo />;
    case "marketing-2":
      return <FunnelSimulatorDemo />;
    case "marketing-3":
      return <EmailAutomationDemo />;
    case "marketing-4":
      return <InfluencerRosterDemo />;
    case "content-1":
      return <NewsletterReaderDemo />;
    case "content-2":
      return <SlideDeckDemo />;
    case "content-3":
      return <PodcastPlayerDemo />;
    case "content-4":
      return <SandboxDemo />;
    default:
      return (
        <div className="w-full aspect-video rounded-xl bg-black border border-white/10 flex items-center justify-center">
          <span className="text-xs text-on-muted">No Widget Mockup Available</span>
        </div>
      );
  }
}

export default function OtherSkills() {
  const [activeTab, setActiveTab] = useState<SkillTab>("video");
  const [selectedSample, setSelectedSample] = useState<SampleWork | null>(null);

  // Close modal when pressing Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSample(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="other-skills" className="py-24 md:py-32 relative bg-[#070d1a]">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-cyan/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label mb-4"
        >
          Creative Ventures
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-grotesk text-3xl md:text-5xl font-black tracking-tight mb-8 text-white"
        >
          Other <span className="text-violet text-glow">Expertise</span>
        </motion.h2>

        {/* Custom Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {SKILL_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs md:text-sm tracking-wider uppercase transition-all duration-300 overflow-hidden ${activeTab === tab.id
                ? "text-deep font-bold"
                : "text-on-muted hover:text-white bg-white/5 border border-white/10 hover:border-white/20"
                }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-gradient-to-r from-cyan to-violet z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {SAMPLES[activeTab].map((sample, idx) => (
                <motion.div
                  onClick={() => setSelectedSample(sample)}
                  key={sample.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group relative flex flex-col h-full rounded-2xl overflow-hidden glass border border-white/10 hover:border-cyan/40 transition-all duration-500 cursor-pointer"
                >
                  {/* Image container */}
                  <div className="relative h-48 overflow-hidden bg-[#0c1324]">
                    <img
                      src={sample.image}
                      alt={sample.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1324] to-transparent opacity-80" />

                    {/* Hover overlay icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-cyan/20 backdrop-blur-md flex items-center justify-center border border-cyan/40 text-cyan transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Sparkles className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col relative z-10 bg-[#0c1324]/80 backdrop-blur-sm">
                    <h3 className="font-grotesk text-lg font-bold text-white mb-2 tracking-tight group-hover:text-cyan transition-colors">
                      {sample.title}
                    </h3>
                    <p className="text-xs text-on-muted leading-relaxed line-clamp-3 mb-4">
                      {sample.description}
                    </p>
                    <div className="mt-auto inline-flex items-center gap-1.5 font-mono text-[10px] text-cyan font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Live Case <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* POPUP DETAIL MODAL */}
      <AnimatePresence>
        {selectedSample && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep/85 backdrop-blur-md cursor-default"
            onClick={() => setSelectedSample(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl h-[85vh] md:h-[75vh] flex flex-col md:flex-row bg-[#0c1324] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-glow"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSample(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-on-muted hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Interactive widget preview (48% width) */}
              <div className="w-full md:w-[48%] bg-[#070d1a] border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center justify-center p-6 relative overflow-hidden shrink-0">
                {/* Circuit lines decorative background */}
                <div className="absolute inset-0 circuit-pattern pointer-events-none opacity-40" />

                <div className="relative w-full z-10 flex flex-col items-center gap-3">
                  <div className="text-[10px] font-mono text-cyan tracking-wider font-bold mb-1 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Interactive Creation Demo
                  </div>

                  <InteractiveDemoWidget id={selectedSample.id} />
                </div>
              </div>

              {/* Right Column: Case study / copy details (52% width, scrollable) */}
              <div className="w-full md:w-[52%] p-8 flex flex-col justify-between overflow-y-auto h-full relative z-10">
                <div>
                  <span className="font-mono text-[10px] text-cyan uppercase tracking-widest font-bold">
                    {activeTab === "video" ? "Video Production" : activeTab === "marketing" ? "Digital Strategy" : "Content Creation"}
                  </span>
                  <h2 className="font-grotesk text-2xl font-black text-white mt-1 mb-6 tracking-tight">
                    {selectedSample.title}
                  </h2>

                  {/* Summary Grid info */}
                  <div className="grid grid-cols-3 gap-2.5 mb-6">
                    {selectedSample.metrics.map((m) => (
                      <div key={m.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                        <div className="text-[16px] font-grotesk font-black text-cyan">{m.value}</div>
                        <div className="text-[9px] font-mono text-white/50 uppercase mt-0.5 leading-tight">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Brief Section */}
                  <div className="mb-6">
                    <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-violet" /> Project Brief
                    </h4>
                    <p className="text-xs text-on-muted leading-relaxed">
                      {selectedSample.brief}
                    </p>
                  </div>

                  {/* Approach Section */}
                  <div className="mb-6">
                    <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-violet" /> Creative Strategy & Execution
                    </h4>
                    <p className="text-xs text-on-muted leading-relaxed">
                      {selectedSample.approach}
                    </p>
                  </div>

                  {/* Stack */}
                  <div className="mb-4">
                    <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-wider mb-2 font-bold">
                      Tools & Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSample.software.map((sw) => (
                        <span key={sw} className="chip py-0.5 px-2 text-[9px] font-mono border-white/10 hover:border-violet/40 hover:text-violet">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer action button */}
                <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-white/35">Press ESC to dismiss</span>
                  <a
                    href={selectedSample.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-[10px] px-4 py-2 flex items-center gap-1.5 font-mono uppercase tracking-wider"
                  >
                    View Git Repo <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
