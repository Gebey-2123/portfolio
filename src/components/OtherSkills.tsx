import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, Megaphone, FileText } from "lucide-react";

type SkillTab = "video" | "marketing" | "content";

type Metric = { label: string; value: string };

type SampleWork = {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  accentColor?: string;
  icon?: React.ReactNode;
  link?: string;
  metrics?: Metric[];
  software?: string[];
  brief?: string;
  videoLocal?: string;
  approach?: string;
};

const TABS: { id: SkillTab; label: string; icon: React.ReactNode; color: string }[] = [
  { id: "video", label: "Video Editing", icon: <Film size={14} />, color: "#00e5ff" },
  { id: "marketing", label: "Digital Marketing", icon: <Megaphone size={14} />, color: "#7CFC00" },
  { id: "content", label: "Content Creation", icon: <FileText size={14} />, color: "#a78bfa" },
];

const SAMPLES: Record<SkillTab, SampleWork[]> = {
  video: [
    {
      id: "video-1",
      title: "Neon Teaser — Product Montage",
      description: "30s motion-cut montage with UI overlays and punch edits.",
      image:
        "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&q=80&w=1200",
      category: "Video",
      accentColor: "#00e5ff",
      icon: <Film size={28} />,
      link: "https://example.com/case/neon-teaser",
      // user-provided file: prefer the exact names they saved
      videoLocal: "/videos/video_editing1.mp4",
      brief: "Mobile-first montage crafted for high completion and CTR.",
    },
    {
      id: "video-2",
      title: "Silent City — Micro Doc",
      description: "Cinematic micro-doc with layered ambiences and subtle grading.",
      image:
        "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=1200",
      category: "Video",
      accentColor: "#00e5ff",
      icon: <Film size={28} />,
      link: "https://example.com/case/silent-city",
      videoLocal: "/videos/video_editing2.mp4",
      brief: "3-minute festival-ready short focusing on mood and sound design.",
    },
    {
      id: "video-3",
      title: "Pulse Promo — Kinetic Type",
      description: "15s kinetic-typography promo optimized for vertical socials.",
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=1200",
      category: "Video",
      accentColor: "#00e5ff",
      icon: <Film size={28} />,
      link: "https://example.com/case/pulse-promo",
      videoLocal: "/videos/video_editing3.mp4",
      brief: "Tempo-synced type animations for short attention spans.",
    },
    {
      id: "video-4",
      title: "Lumen City — Experimental",
      description: "Generative particles blended with live-action for an urban mood piece.",
      image:
        "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=1200",
      category: "Video",
      accentColor: "#00e5ff",
      icon: <Film size={28} />,
      link: "https://example.com/case/lumen-city",
      videoLocal: "/videos/video_editing4.mp4",
      brief: "Experimental short combining procedural FX and textured audio.",
    },
  ],
  marketing: [
    {
      id: "marketing-1",
      title: "Street-to-Stream Funnel",
      description: "Geo-targeted short ad series to drive event sign-ups.",
      image:
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200",
      category: "Marketing",
      accentColor: "#7CFC00",
      icon: <Megaphone size={28} />,
      link: "https://example.com/case/street-to-stream",
      brief: "Local-first creatives converted foot traffic into digital leads.",
    },
    {
      id: "marketing-2",
      title: "Phygital Launch — AR",
      description: "AR pop-up campaign plus short video follow-ups.",
      image:
        "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&q=80&w=1200",
      category: "Marketing",
      accentColor: "#7CFC00",
      icon: <Megaphone size={28} />,
      link: "https://example.com/case/phygital",
      brief: "Integrated AR + ads pipeline that drove installs and press.",
    },
    {
      id: "marketing-3",
      title: "Growth Loop — Referral",
      description: "Referral-driven acquisition with short-share clips.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
      category: "Marketing",
      accentColor: "#7CFC00",
      icon: <Megaphone size={28} />,
      link: "https://example.com/case/growth-loop",
      brief: "Viral-ready short formats fueling a referral engine.",
    },
    {
      id: "marketing-4",
      title: "MomentShare Engine",
      description: "Personalized short-video templates for micro-segments.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
      category: "Marketing",
      accentColor: "#7CFC00",
      icon: <Megaphone size={28} />,
      link: "https://example.com/case/momentshare",
      brief: "Automated variants to boost organic sharing and retention.",
    },
    // additional marketing 'best' sample with local video
    {
      id: "marketing-5",
      title: "Launch Amplify — Paid Social Series",
      description: "High-conversion creative with iterative A/B tested hooks.",
      image: "https://images.unsplash.com/photo-1520975910218-7c3d5d5f8f3e?auto=format&fit=crop&q=80&w=1200",
      category: "Marketing",
      accentColor: "#7CFC00",
      icon: <Megaphone size={28} />,
      link: "https://example.com/case/launch-amplify",
      // updated to match uploaded file in public/videos/
      videoLocal: "/videos/Digital_Marketing.mp4",
      brief: "Optimized creatives for high CTR and low CPA.",
    },
  ],
  content: [
    {
      id: "content-1",
      title: "MicroDocs — 60s Explainers",
      description: "60s technical explainers with clear visual callouts.",
      image:
        "https://images.unsplash.com/photo-1526378720210-3f2f9b5b6c3b?auto=format&fit=crop&q=80&w=1200",
      category: "Content",
      accentColor: "#a78bfa",
      icon: <FileText size={28} />,
      link: "https://example.com/case/microdocs",
      brief:
        "Snackable explainers designed for sharing and retention. Content idea: 60s 'how it works' with 3 visual steps and one surprising stat — finish with a clear CTA and a behind-the-scenes caption thread for deeper engagement.",
    },
    {
      id: "content-2",
      title: "Antigravity Podcast Clips",
      description: "Repurposed podcast clips into short social videos.",
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1200",
      category: "Content",
      accentColor: "#a78bfa",
      icon: <FileText size={28} />,
      link: "https://example.com/case/podcast-clips",
      brief: "High-engagement clips repurposed with captions and motion-subtitles.",
    },
    {
      id: "content-3",
      title: "Visual Essays — Mini Series",
      description: "4-part mini series mixing narration and motion graphics.",
      image:
        "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&q=80&w=1200",
      category: "Content",
      accentColor: "#a78bfa",
      icon: <FileText size={28} />,
      link: "https://example.com/case/visual-essays",
      brief: "Episodic short content that builds audience habit.",
    },
    {
      id: "content-4",
      title: "AR Zine Clips",
      description: "AR-enabled micro-zine slices with short audiovisual stories.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200",
      category: "Content",
      accentColor: "#a78bfa",
      icon: <FileText size={28} />,
      link: "https://example.com/case/ar-zine",
      brief: "Print-triggered clips that surface short stories on mobile.",
    },
    // extra content 'best' sample
    {
      id: "content-5",
      title: "Mini-Doc — Creator Story",
      description: "2-minute mini-doc repurposed into multiple short formats.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
      category: "Content",
      accentColor: "#a78bfa",
      icon: <FileText size={28} />,
      link: "https://example.com/case/mini-doc",
        videoLocal: "/videos/content-1.mp4",
        brief:
          "Repurposing long-form interviews into high-engagement shorts. Script idea: open on a candid moment, cut to a concise 30s narrative arc (problem → insight → call-to-action), and finish with a visual hook for sequel videos.",
    },
  ],
};

// small demo video player used in modal — supports multiple fallbacks and shows link if all fail
function DemoPlayer({ srcs }: { srcs: string[] }) {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const current = srcs[idx];

  useEffect(() => {
    // reset when src list changes
    setIdx(0);
    setFailed(false);
  }, [srcs.join("|")]);

  return (
    <div className="w-full bg-black rounded overflow-hidden flex flex-col items-stretch justify-center" style={{ minHeight: 280 }}>
      {!failed ? (
        <video
          key={current}
          controls
          playsInline
          preload="metadata"
          className="w-full h-full object-contain bg-black"
          src={current}
          onError={() => {
            // try next source if available
            if (idx + 1 < srcs.length) setIdx((i) => i + 1);
            else setFailed(true);
          }}
        />
      ) : (
        <div className="p-6 text-center text-sm text-slate-300">
          <div className="mb-2">Video unavailable in the player.</div>
          <div className="mb-4">Try opening the source directly:</div>
          <div className="flex flex-col gap-2 items-center">
            {srcs.map((u) => (
              <a key={u} href={u} target="_blank" rel="noreferrer" className="text-cyan-300 underline">
                {u}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CardThumbnail({ sample }: { sample: SampleWork }) {
  return (
    <div className="relative aspect-video bg-slate-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={sample.image} alt={sample.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">{sample.icon}</div>
      <div className="absolute top-2 right-2 bg-black/50 p-1 rounded">
        <Play size={16} color="white" />
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
        style={{ background: sample.accentColor || "#00e5ff", width: "0%" }}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.32 }}
      />
    </div>
  );
}

export default function OtherSkills() {
  const [active, setActive] = useState<SkillTab>("video");
  const [selected, setSelected] = useState<SampleWork | null>(null);
  const [availableUrl, setAvailableUrl] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const perPage = 8;

  const list = useMemo(() => SAMPLES[active], [active]);
  const pages = Math.max(1, Math.ceil(list.length / perPage));
  const visible = list.slice(page * perPage, page * perPage + perPage);

  // stagger variants
  const containerVariants = {
    hidden: {},
    show: (i = 1) => ({
      transition: { staggerChildren: 0.08, delayChildren: 0.06 * i },
    }),
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 1 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
    exit: { opacity: 0, scale: 0.92, transition: { duration: 0.18 } },
  };

  // map id -> video src list for modal playback (primary + fallbacks)
  // map id -> local video paths (serve from public/videos). Use fetch_videos.ps1 to populate.
  const videoMap: Record<string, string[]> = useMemo(() => ({
    // local-first candidates including exact filenames you provided (both root public and /videos folder)
    "video-1": ["/videos/video_editing1.mp4", "/video_editing1.mp4", "/videos/video_editing1.mp4"],
    "video-2": ["/videos/video_editing2.mp4", "/video_editing2.mp4"],
    "video-3": ["/videos/video_editing3.mp4", "/video_editing3.mp4"],
    "video-4": ["/videos/video_editing4.mp4", "/video_editing4.mp4"],
    // marketing: accept the exact "Digital Marketing" filename if placed in public or public/videos
    "marketing-5": ["/videos/Digital_Marketing.mp4", "/Digital_Marketing.mp4", "/videos/Digital_Marketing.mp4"],
    // content: keep existing content file mapping and also accept creative name
    "content-5": ["/videos/content-1.mp4", "/content-1.mp4", "/videos/Content_Creation.mp4", "/Content_Creation.mp4"],
  }), []);

  // remote fallbacks if local files are missing or blocked
  const remoteVideoMap: Record<string, string[]> = useMemo(() => ({
    "video-1": ["https://filesamples.com/samples/video/mp4/sample_640x360.mp4"],
    "video-2": ["https://filesamples.com/samples/video/mp4/sample_960x540.mp4"],
    "video-3": ["https://filesamples.com/samples/video/mp4/sample_640x360.mp4"],
    "video-4": ["https://filesamples.com/samples/video/mp4/sample_960x540.mp4"],
  }), []);

  // utility: check if a URL is reachable (HEAD with timeout)
  const checkUrlReachable = async (url: string, timeout = 3000) => {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const res = await fetch(url, { method: "HEAD", signal: controller.signal });
      clearTimeout(id);
      return res.ok;
    } catch {
        return false;
      }
  };

  // when a sample is selected, determine the best available URL to open (local preferred)
  useEffect(() => {
    let mounted = true;
    setAvailableUrl(null);
    if (!selected) return;

    (async () => {
      const id = selected.id;
      // prefer explicit per-sample local file if present
      if (selected.videoLocal) {
        const ok = await checkUrlReachable(selected.videoLocal, 1000);
        if (ok && mounted) {
          setAvailableUrl(selected.videoLocal);
          return;
        }
      }

      const localList = videoMap[id] || [];
      for (const u of localList) {
        const ok = await checkUrlReachable(u, 1200);
        if (ok && mounted) {
          setAvailableUrl(u);
          return;
        }
      }

      const remoteList = remoteVideoMap[id] || [];
      for (const u of remoteList) {
        const ok = await checkUrlReachable(u, 1600);
        if (ok && mounted) {
          setAvailableUrl(u);
          return;
        }
      }
      // if nothing reachable, leave null (DemoPlayer will show direct links)
    })();

    return () => {
      mounted = false;
    };
  }, [selected, videoMap, remoteVideoMap]);

  // sample skills for orbs
  const skillNames = ["Color Grading", "Sound Design", "Montage", "Kinetic Type", "AR", "Social"].slice(0, 6);

  useEffect(() => setPage(0), [active]);

  return (
    <section style={{ backgroundColor: "#0a0f1a" }} className="py-12 px-4 md:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-2 text-sm uppercase text-slate-400 tracking-wider">Other Expertise</div>
        <h2 className="text-4xl font-bold mb-2">Creative Ventures</h2>
        <p className="text-slate-300 mb-6">Selected sample work and interactive demos.</p>

        <SkillOrbsPlaceholder skills={skillNames} />

        <div className="relative mb-6">
          <div className="flex gap-3 items-center">
            {TABS.map((t) => (
              <div key={t.id} className="relative">
                <button
                  onClick={() => setActive(t.id)}
                  className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${active === t.id ? "text-black" : "text-white/90"}`}
                  style={{ background: active === t.id ? t.color : 'transparent', border: `1px solid ${t.color}` }}
                >
                  <span className="opacity-95">{t.icon}</span>
                  <span className="ml-2 font-medium">{t.label}</span>
                </button>
                {active === t.id && (
                  <motion.div
                    layoutId="active-chip"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${t.color}22`, border: `1px solid ${t.color}` }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {visible.map((s, idx) => (
              <motion.div
                key={s.id}
                custom={idx}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                whileHover={{ y: -6, scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
                className="bg-slate-900 rounded overflow-hidden cursor-pointer"
                onClick={() => setSelected(s)}
              >
                <CardThumbnail sample={s} />
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs rounded-full" style={{ background: `${s.accentColor || "#00e5ff"}22`, color: s.accentColor }}>
                      {s.category}
                    </span>
                  </div>
                  <h3 className="font-bold mt-2">{s.title}</h3>
                  <p className="text-sm text-slate-300 mt-1">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {Array.from({ length: pages }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setPage(i)}
              className="bg-slate-700 h-2 rounded-full"
              style={{ width: page === i ? 40 : 8 }}
              animate={{ width: page === i ? 40 : 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="bg-slate-900 rounded max-w-4xl w-full shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
              >
                <div className="p-4">
                  {/* combine local + remote fallbacks for the player */}
                  <DemoPlayer srcs={[...(selected.videoLocal ? [selected.videoLocal] : []), ...(videoMap[selected.id] || []), ...(remoteVideoMap[selected.id] || []), selected.image]} />
                </div>
                <div className="p-6 border-l border-slate-800">
                  <h3 className="text-xl font-bold">{selected.title}</h3>
                  <p className="text-sm mt-2 text-slate-300">{selected.brief || selected.description}</p>

                  <div className="text-xs text-slate-500 mt-3">Video: royalty-free sample (Blender Foundation / public samples)</div>

                  {selected.metrics && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {selected.metrics.map((m) => (
                        <div key={m.label} className="text-sm">
                          <div className="text-xs text-slate-400">{m.label}</div>
                          <div className="font-medium">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selected.software && (
                    <div className="mt-4 text-sm">
                      <div className="text-xs text-slate-400">Software</div>
                      <div className="font-medium">{selected.software.join(", ")}</div>
                    </div>
                  )}

                  <div className="mt-6 flex gap-3">
                    <a href={selected.link || "#"} target="_blank" rel="noreferrer" className="px-4 py-2 bg-cyan-400 text-black rounded">
                      View Case
                    </a>
                    {/* allow opening raw video in new tab for direct playback */}
                    {(availableUrl || videoMap[selected.id]?.[0] || selected.image) && (
                      <a
                        href={availableUrl || videoMap[selected.id]?.[0] || selected.image}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 border rounded"
                      >
                        Open Video
                      </a>
                    )}
                    <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded">
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// lightweight placeholder implementation of SkillOrbs to keep file focused; uses simple CSS and minor motion for now
function SkillOrbsPlaceholder({ skills }: { skills: string[] }) {
  return (
    <div className="flex gap-3 mb-6 flex-wrap">
      {skills.map((s) => (
        <div key={s} className="px-3 py-1 bg-slate-800/60 rounded-full text-xs text-slate-200">
          {s}
        </div>
      ))}
    </div>
  );
}
