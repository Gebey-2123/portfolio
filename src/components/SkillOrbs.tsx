"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface OrbData {
  name: string;
  pct: number;
  cat: string;
  color: string;
  color2: string;
  emoji: string;
  tags: string[];
  sampleUrl?: string;
}

const SKILLS_DATA: OrbData[] = [
  { name: "C++", pct: 85, cat: "language", color: "#00d4ff", color2: "#0055ff", emoji: "⚙️", tags: ["OOP", "Pointers", "STL", "Big O"] },
  { name: "Java", pct: 80, cat: "language", color: "#ff7043", color2: "#e040fb", emoji: "☕", tags: ["OOP", "JVM", "Swing", "Collections"] },
  { name: "JavaScript", pct: 78, cat: "web", color: "#fbbf24", color2: "#f97316", emoji: "🌐", tags: ["ES6+", "DOM", "Fetch", "Async"] },
  { name: "PHP", pct: 75, cat: "web", color: "#818cf8", color2: "#6366f1", emoji: "🐘", tags: ["MVC", "PDO", "REST", "Sessions"] },
  { name: "HTML & CSS", pct: 90, cat: "web", color: "#f472b6", color2: "#f97316", emoji: "🎨", tags: ["Flexbox", "Grid", "Tailwind", "Animations"] },
  { name: "Data Structures", pct: 82, cat: "cs", color: "#06d0f5", color2: "#10b981", emoji: "📊", tags: ["Trees", "Graphs", "Hash Maps", "Stacks"] },
  { name: "Algorithms", pct: 75, cat: "cs", color: "#a78bfa", color2: "#06d0f5", emoji: "🧮", tags: ["Sorting", "Recursion", "Greedy", "DP"] },
  { name: "OOP", pct: 85, cat: "cs", color: "#34d399", color2: "#3b82f6", emoji: "📦", tags: ["Inheritance", "Polymorphism", "SOLID"] },
  { name: "SQL & MySQL", pct: 78, cat: "cs", color: "#06b6d4", color2: "#6366f1", emoji: "🗄️", tags: ["Joins", "Indexing", "Schema", "Queries"] },
  { name: "Git & GitHub", pct: 85, cat: "tools", color: "#e2e8f0", color2: "#94a3b8", emoji: "🐙", tags: ["Branches", "PRs", "Merge", "CI/CD"] },
  { name: "IDEs & Editors", pct: 88, cat: "tools", color: "#06d0f5", color2: "#a78bfa", emoji: "💻", tags: ["VS Code", "NetBeans", "Debug", "Snippets"] },
  { name: "Linux", pct: 70, cat: "tools", color: "#fbbf24", color2: "#10b981", emoji: "🐧", tags: ["Bash", "Permissions", "Pipes", "Cron"] },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "language", label: "Languages" },
  { id: "web", label: "Web" },
  { id: "cs", label: "CS Fundamentals" },
  { id: "tools", label: "Tools" },
];

function hexAlpha(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Constellation line state
interface ConstellationLine {
  a: number; // index of orb A
  b: number; // index of orb B
  dashProgress: number; // 0 → 1 (animation progress)
  dotT: number; // traveling dot position 0–1
  dotDir: number; // 1 or -1
}

type ClusterPhase = "none" | "scattering" | "clustering" | "clustered";

export default function SkillOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const activeFilterRef = useRef("all");
  const [panelData, setPanelData] = useState<OrbData | null>(null);

  useEffect(() => {
    activeFilterRef.current = activeFilter;
  }, [activeFilter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let animFrameId: number;
    let t = 0;

    const mouse = { x: -1000, y: -1000 };
    let dragOrb: Orb | null = null;
    let explodedOrb: Orb | null = null;

    // ── Black hole state ──
    let shiftHeld = false;
    let bhAngle = 0;
    let bhPulseT = 0; // 0→1 loop for pulse ring
    let shiftJustReleased = false;
    let bhReleasePos = { x: -1000, y: -1000 };

    // ── Constellation state ──
    let clusterPhase: ClusterPhase = "none";
    let clusterPhaseTimer = 0; // ms elapsed in current phase
    let clusterTargets: { x: number; y: number }[] = []; // target positions for matching orbs
    let constellationLines: ConstellationLine[] = [];
    let constellationAlpha = 0; // 0→1 fade in/out
    let constellationFadingOut = false;
    let lastFilter = activeFilterRef.current;
    let matchingOrbIndices: number[] = [];
    let nonMatchingOrbIndices: number[] = [];
    let nonMatchingEdgeTargets: { x: number; y: number }[] = [];
    let allArrivedAtCluster = false;

    function resize() {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      W = canvas.width = rect.width;
      H = canvas.height = rect.height;
    }
    resize();
    window.addEventListener("resize", resize);

    const STARS = Array.from({ length: 150 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.7 + 0.1,
      twinkleSpeed: 0.005 + Math.random() * 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // ═══════════════════════════════════════════════════════
    //  ORB CLASS
    // ═══════════════════════════════════════════════════════
    class Orb {
      data: OrbData;
      name: string; pct: number; cat: string;
      color: string; color2: string; emoji: string; tags: string[];

      baseR: number; mass: number;
      x: number; y: number; vx: number; vy: number;

      exploded: boolean; explodeScale: number; explodeTarget: number; tagAngle: number;
      pulseRipples: { r: number; alpha: number; color: string }[];
      opacity: number; targetOpacity: number; active: boolean;
      hovered: boolean; dragging: boolean;
      dragOffX: number; dragOffY: number; dragStartX: number; dragStartY: number;
      _repulse: { x: number; y: number } | null;

      // Upgrades
      trail: { x: number; y: number }[];
      scaleOverride: number; targetScaleOverride: number;
      clusterTarget: { x: number; y: number } | null;
      edgeTarget: { x: number; y: number } | null;
      physicsPaused: boolean;
      heartbeatT: number; // 0 = idle, > 0 = animating
      collisionFlash: { r: number; alpha: number; color: string }[];
      bhDesatAmt: number; // 0–1 black hole desaturation

      constructor(data: OrbData) {
        this.data = data;
        this.name = data.name; this.pct = data.pct; this.cat = data.cat;
        this.color = data.color; this.color2 = data.color2;
        this.emoji = data.emoji; this.tags = data.tags;

        this.baseR = 38 + Math.random() * 14;
        this.mass = this.baseR * this.baseR; // mass = r² for proper elastic collision

        this.x = Math.random() * (W - 200) + 100;
        this.y = Math.random() * (H - 200) + 140;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;

        this.exploded = false; this.explodeScale = 1; this.explodeTarget = 1; this.tagAngle = 0;
        this.pulseRipples = [];
        this.opacity = 1; this.targetOpacity = 1; this.active = true;
        this.hovered = false; this.dragging = false;
        this.dragOffX = 0; this.dragOffY = 0; this.dragStartX = 0; this.dragStartY = 0;
        this._repulse = null;

        this.trail = [];
        this.scaleOverride = 1; this.targetScaleOverride = 1;
        this.clusterTarget = null; this.edgeTarget = null;
        this.physicsPaused = false;
        this.heartbeatT = 0;
        this.collisionFlash = [];
        this.bhDesatAmt = 0;
      }

      get displayR() { return this.baseR * this.explodeScale * this.scaleOverride; }

      // effective color with possible BH desaturation
      get effectiveColor(): string {
        if (this.bhDesatAmt <= 0) return this.color;
        const [r, g, b] = hexToRgb(this.color);
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        const nr = r + (gray - r) * this.bhDesatAmt;
        const ng = g + (gray - g) * this.bhDesatAmt;
        const nb = b + (gray - b) * this.bhDesatAmt;
        return `rgb(${nr | 0},${ng | 0},${nb | 0})`;
      }

      update(mouse: { x: number; y: number }, orbs: Orb[]) {
        if (this.dragging) return;

        // ── Cluster/scatter lerp ──
        if (this.clusterTarget && clusterPhase === "clustering") {
          const dx = this.clusterTarget.x - this.x;
          const dy = this.clusterTarget.y - this.y;
          this.x += dx * 0.07;
          this.y += dy * 0.07;
          this.vx = 0; this.vy = 0;
          return;
        }
        if (this.edgeTarget && clusterPhase === "scattering") {
          const dx = this.edgeTarget.x - this.x;
          const dy = this.edgeTarget.y - this.y;
          this.x += dx * 0.04;
          this.y += dy * 0.04;
          this.vx = 0; this.vy = 0;
          return;
        }
        if (this.physicsPaused && clusterPhase === "clustered") return;

        // ── Black hole gravity ──
        if (shiftHeld && mouse.x > 0) {
          const bdx = mouse.x - this.x;
          const bdy = mouse.y - this.y;
          const bdist = Math.sqrt(bdx * bdx + bdy * bdy) || 1;
          const gforce = (0.8 * this.mass) / bdist;
          this.vx += (bdx / bdist) * gforce * 0.05;
          this.vy += (bdy / bdist) * gforce * 0.05;
          // Desaturation near BH
          this.bhDesatAmt = bdist < 60 ? Math.max(0, 1 - bdist / 60) * 0.7 : 0;
        } else {
          this.bhDesatAmt += (0 - this.bhDesatAmt) * 0.1;
        }

        // ── Cursor magnetic attraction ──
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const RANGE = 150;
        if (!shiftHeld && dist < RANGE && dist > 1 && !this.exploded) {
          const force = 0.18 / dist;
          this.vx += dx * force;
          this.vy += dy * force;
        }

        // ── Repulse burst ──
        if (this._repulse) {
          this.vx += this._repulse.x;
          this.vy += this._repulse.y;
          this._repulse = null;
        }

        // ── Physics integration ──
        this.vx *= 0.97;
        this.vy *= 0.97;

        // ── Record trail ──
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 1.5) {
          this.trail.push({ x: this.x, y: this.y });
          if (this.trail.length > 10) this.trail.shift();
        } else {
          if (this.trail.length > 0) this.trail.shift(); // dissolve trail
        }

        this.x += this.vx;
        this.y += this.vy;

        // ── Wall bounce ──
        const pad = this.displayR + 2;
        const topPad = 90 + pad;
        if (this.x < pad) { this.x = pad; this.vx *= -0.65; }
        if (this.x > W - pad) { this.x = W - pad; this.vx *= -0.65; }
        if (this.y < topPad) { this.y = topPad; this.vy *= -0.65; }
        if (this.y > H - pad) { this.y = H - pad; this.vy *= -0.65; }

        // ── Spring to scale ──
        this.explodeScale += (this.explodeTarget - this.explodeScale) * 0.12;
        this.scaleOverride += (this.targetScaleOverride - this.scaleOverride) * 0.08;

        // ── Filter opacity ──
        const currentFilter = activeFilterRef.current;
        if (clusterPhase === "none" || clusterPhase === "returning" as ClusterPhase) {
          this.targetOpacity = (currentFilter === "all" || this.cat === currentFilter) ? 1 : 0.18;
        }
        this.opacity += (this.targetOpacity - this.opacity) * 0.1;

        // ── Ripples ──
        this.pulseRipples = this.pulseRipples
          .map(p => ({ r: p.r + 1.6, alpha: p.alpha - 0.018, color: p.color }))
          .filter(p => p.alpha > 0);

        // ── Collision flash ──
        this.collisionFlash = this.collisionFlash
          .map(f => ({ r: f.r + 2.5, alpha: f.alpha - 0.025, color: f.color }))
          .filter(f => f.alpha > 0);

        // ── Heartbeat ──
        if (this.heartbeatT > 0) {
          this.heartbeatT -= 0.02;
          const hb = Math.sin(this.heartbeatT * Math.PI);
          this.scaleOverride = 1 + hb * 0.15;
          if (this.heartbeatT <= 0) { this.heartbeatT = 0; this.targetScaleOverride = 1; }
        }

        if (this.exploded) this.tagAngle += 0.006;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity < 0.02) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;

        const r = this.displayR;
        const cx = this.x, cy = this.y;
        const col = this.effectiveColor;

        // ── Comet trails ──
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 1.5 && this.trail.length > 1) {
          for (let i = 0; i < this.trail.length; i++) {
            const frac = i / this.trail.length;
            const tr = r * frac * 0.45;
            const ta = frac * 0.3;
            if (tr < 0.5) continue;
            ctx.beginPath();
            ctx.arc(this.trail[i].x, this.trail[i].y, tr, 0, Math.PI * 2);
            ctx.fillStyle = hexAlpha(this.color, ta);
            ctx.fill();
          }
        }

        // ── Collision flash rings ──
        for (const fl of this.collisionFlash) {
          ctx.beginPath();
          ctx.arc(cx, cy, r + fl.r, 0, Math.PI * 2);
          ctx.strokeStyle = hexAlpha(fl.color, fl.alpha);
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // ── Outer glow ──
        const bhNear = shiftHeld && Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - cy) ** 2) < 60;
        ctx.save();
        ctx.shadowBlur = bhNear ? 30 : (this.hovered ? 35 : 22);
        ctx.shadowColor = col;

        const grad = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, 0, cx, cy, r);
        grad.addColorStop(0, hexAlpha(col, 0.95));
        grad.addColorStop(0.6, hexAlpha(col, 0.6));
        grad.addColorStop(1, hexAlpha(this.color2, 0.8));

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        // ── Glassy highlight ──
        const hi = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.45, 0, cx, cy, r);
        hi.addColorStop(0, "rgba(255,255,255,0.25)");
        hi.addColorStop(0.5, "rgba(255,255,255,0.04)");
        hi.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = hi; ctx.fill();

        // ── Border ring ──
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = hexAlpha(col, 0.35);
        ctx.lineWidth = 1.5; ctx.stroke();

        // ── Progress arc ──
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (this.pct / 100) * Math.PI * 2;
        ctx.beginPath(); ctx.arc(cx, cy, r - 2, startAngle, endAngle);
        ctx.strokeStyle = col; ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.shadowBlur = 8; ctx.shadowColor = col;
        ctx.stroke(); ctx.shadowBlur = 0;

        // ── Name text ──
        const fontSize = Math.max(9, Math.floor(r * 0.35));
        ctx.fillStyle = "#fff";
        ctx.font = `700 ${fontSize}px 'Syne', sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        const words = this.name.split(" ");
        if (words.length > 1 && ctx.measureText(this.name).width > r * 1.5) {
          const midW = Math.ceil(words.length / 2);
          ctx.fillText(words.slice(0, midW).join(" "), cx, cy - fontSize * 0.6);
          ctx.fillText(words.slice(midW).join(" "), cx, cy + fontSize * 0.6);
        } else {
          ctx.fillText(this.name, cx, cy - fontSize * 0.3);
        }

        // ── Percentage ──
        const pctSize = Math.max(7, Math.floor(r * 0.22));
        ctx.font = `400 ${pctSize}px 'Space Mono', monospace`;
        ctx.fillStyle = hexAlpha(col, 0.9);
        ctx.textBaseline = "middle";
        ctx.fillText(`${this.pct}%`, cx, cy + fontSize * 0.65);

        // ── Ripple pulses ──
        for (const rp of this.pulseRipples) {
          ctx.beginPath(); ctx.arc(cx, cy, r + rp.r, 0, Math.PI * 2);
          ctx.strokeStyle = hexAlpha(rp.color || this.color, rp.alpha);
          ctx.lineWidth = 1.2; ctx.stroke();
        }

        // ── Explode: orbiting tags ──
        if (this.explodeScale > 1.3) {
          const orbitR = r * 1.7;
          this.tags.forEach((tag, i) => {
            const angle = this.tagAngle + (i / this.tags.length) * Math.PI * 2;
            const tx = cx + Math.cos(angle) * orbitR;
            const ty = cy + Math.sin(angle) * orbitR;
            const tw = ctx.measureText(tag).width + 20;
            const th = 18;
            ctx.save();
            ctx.translate(tx, ty); ctx.rotate(angle + Math.PI / 2);
            ctx.beginPath(); roundRect(ctx, -tw / 2, -th / 2, tw, th, 9);
            ctx.fillStyle = "rgba(5,11,24,0.85)"; ctx.fill();
            ctx.strokeStyle = hexAlpha(this.color, 0.55); ctx.lineWidth = 1; ctx.stroke();
            ctx.rotate(-(angle + Math.PI / 2));
            ctx.font = `700 8px 'Space Mono', monospace`;
            ctx.fillStyle = hexAlpha(this.color, 0.95);
            ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText(tag.toUpperCase(), 0, 0);
            ctx.restore();
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
            ctx.lineTo(tx - Math.cos(angle) * 14, ty - Math.sin(angle) * 14);
            ctx.strokeStyle = hexAlpha(this.color, 0.15);
            ctx.lineWidth = 1; ctx.setLineDash([3, 5]); ctx.stroke(); ctx.setLineDash([]);
          });
          ctx.beginPath(); ctx.arc(cx, cy, r * 1.7, 0, Math.PI * 2);
          ctx.strokeStyle = hexAlpha(this.color, 0.07);
          ctx.lineWidth = 1; ctx.stroke();
        }

        ctx.restore();
      }

      explode() {
        this.exploded = !this.exploded;
        this.explodeTarget = this.exploded ? 2 : 1;
        return this.exploded;
      }

      pulse(color?: string) {
        this.pulseRipples.push({ r: 0, alpha: 0.7, color: color || this.color });
      }

      hitTest(mx: number, my: number) {
        const dx = mx - this.x, dy = my - this.y;
        return Math.sqrt(dx * dx + dy * dy) < this.displayR + (this.exploded ? this.displayR * 0.7 : 0);
      }
    }

    const orbs = SKILLS_DATA.map((d) => new Orb(d));

    // ═══════════════════════════════════════
    //  UPGRADE 1: ELASTIC COLLISION ENGINE
    // ═══════════════════════════════════════
    function resolveElasticCollisions() {
      const RESTITUTION = 0.82;
      for (let i = 0; i < orbs.length; i++) {
        const a = orbs[i];
        if (a.dragging || a.physicsPaused) continue;
        for (let j = i + 1; j < orbs.length; j++) {
          const b = orbs[j];
          if (b.dragging || b.physicsPaused) continue;

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const minDist = a.displayR + b.displayR;

          if (dist < minDist) {
            // Collision normal
            const nx = dx / dist;
            const ny = dy / dist;

            // Separate orbs so they don't overlap
            const overlap = minDist - dist;
            const totalMass = a.mass + b.mass;
            a.x -= nx * overlap * (b.mass / totalMass);
            a.y -= ny * overlap * (b.mass / totalMass);
            b.x += nx * overlap * (a.mass / totalMass);
            b.y += ny * overlap * (a.mass / totalMass);

            // Velocity components along normal
            const v1n = a.vx * nx + a.vy * ny;
            const v2n = b.vx * nx + b.vy * ny;

            // Only resolve if moving toward each other
            if (v1n - v2n > 0) continue;

            // Elastic collision formula
            const v1n_new = ((a.mass - b.mass) * v1n + 2 * b.mass * v2n) / totalMass;
            const v2n_new = ((b.mass - a.mass) * v2n + 2 * a.mass * v1n) / totalMass;

            a.vx += (v1n_new - v1n) * nx * RESTITUTION;
            a.vy += (v1n_new - v1n) * ny * RESTITUTION;
            b.vx += (v2n_new - v2n) * nx * RESTITUTION;
            b.vy += (v2n_new - v2n) * ny * RESTITUTION;

            // Flash rings on both orbs
            a.collisionFlash.push({ r: 0, alpha: 0.6, color: a.color });
            b.collisionFlash.push({ r: 0, alpha: 0.6, color: b.color });
          }
        }
      }
    }

    // ═══════════════════════════════════════
    //  UPGRADE 2: BLACK HOLE CURSOR
    // ═══════════════════════════════════════
    function drawBlackHole(t: number) {
      if (!ctx || mouse.x < 0 || mouse.x > W) return;
      const cx = mouse.x, cy = mouse.y;
      bhAngle += 0.05;

      // Pulsing gravity field ring (loops every 72 frames ≈ 1.2s at 60fps)
      bhPulseT = (bhPulseT + 1 / 72) % 1;
      const pulseR = bhPulseT * 140;
      const pulseAlpha = (1 - bhPulseT) * 0.18;
      ctx.beginPath(); ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${pulseAlpha})`;
      ctx.lineWidth = 1; ctx.stroke();

      // Dark core
      ctx.save();
      ctx.shadowBlur = 20; ctx.shadowColor = "rgba(255,255,255,0.5)";
      ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#000"; ctx.fill();

      // Event horizon spinning ring
      ctx.translate(cx, cy); ctx.rotate(bhAngle);
      ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 1.5; ctx.stroke();

      // 6 distortion arc segments
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(0, 0, 30, a, a + 0.4);
        ctx.strokeStyle = `rgba(255,255,255,${0.3 + 0.2 * Math.sin(t * 0.08 + i)})`;
        ctx.lineWidth = 1.5; ctx.stroke();
      }
      ctx.restore();
    }

    function drawNormalMagnet(t: number) {
      if (!ctx || mouse.x < 0 || mouse.x > W) return;
      const alpha = 0.06 + 0.03 * Math.sin(t * 0.04);
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150);
      grad.addColorStop(0, `rgba(6,208,245,${alpha * 3})`);
      grad.addColorStop(0.6, `rgba(6,208,245,${alpha})`);
      grad.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(6,208,245,${0.1 + 0.05 * Math.sin(t * 0.05)})`;
      ctx.lineWidth = 1; ctx.setLineDash([4, 8]); ctx.stroke(); ctx.setLineDash([]);
    }

    // ═══════════════════════════════════════
    //  UPGRADE 3: CONSTELLATION CLUSTER
    // ═══════════════════════════════════════
    function startCluster(filter: string) {
      if (filter === "all") {
        // Return phase
        clusterPhase = "none" as ClusterPhase;
        constellationFadingOut = true;
        constellationLines = [];
        for (const o of orbs) {
          o.clusterTarget = null;
          o.edgeTarget = null;
          o.physicsPaused = false;
          o.targetOpacity = 1;
          o.targetScaleOverride = 1;
          o.vx = (Math.random() - 0.5) * 6;
          o.vy = (Math.random() - 0.5) * 6;
        }
        return;
      }

      constellationLines = [];
      constellationAlpha = 0;
      constellationFadingOut = false;
      allArrivedAtCluster = false;
      clusterPhase = "scattering";
      clusterPhaseTimer = 0;

      matchingOrbIndices = orbs.map((o, i) => o.cat === filter ? i : -1).filter(i => i >= 0);
      nonMatchingOrbIndices = orbs.map((o, i) => o.cat !== filter ? i : -1).filter(i => i >= 0);

      // Pre-calc cluster positions (circle at center)
      const count = matchingOrbIndices.length;
      const circleR = 80 + count * 18;
      clusterTargets = matchingOrbIndices.map((_, idx) => {
        const angle = (idx / count) * Math.PI * 2 - Math.PI / 2;
        return { x: W / 2 + Math.cos(angle) * circleR, y: H / 2 + Math.sin(angle) * circleR };
      });

      // Edge targets for non-matching
      nonMatchingEdgeTargets = nonMatchingOrbIndices.map(() => {
        const side = Math.floor(Math.random() * 4);
        if (side === 0) return { x: Math.random() * W * 0.3, y: Math.random() * 100 + 60 };
        if (side === 1) return { x: W - Math.random() * W * 0.3, y: Math.random() * 100 + 60 };
        if (side === 2) return { x: Math.random() * W * 0.2, y: H - Math.random() * 80 - 20 };
        return { x: W - Math.random() * W * 0.2, y: H - Math.random() * 80 - 20 };
      });

      // Scatter non-matching
      nonMatchingOrbIndices.forEach((oi, li) => {
        const o = orbs[oi];
        o.edgeTarget = nonMatchingEdgeTargets[li];
        o.clusterTarget = null;
        o.targetOpacity = 0.15;
        o.targetScaleOverride = 0.6;
        o.physicsPaused = true;
      });
    }

    function updateClusterPhase(dtMs: number) {
      if (clusterPhase === "none") return;

      clusterPhaseTimer += dtMs;

      if (clusterPhase === "scattering" && clusterPhaseTimer > 400) {
        // Transition to clustering
        clusterPhase = "clustering";
        clusterPhaseTimer = 0;
        matchingOrbIndices.forEach((oi, li) => {
          const o = orbs[oi];
          o.edgeTarget = null;
          o.clusterTarget = clusterTargets[li];
          o.targetOpacity = 1;
          o.targetScaleOverride = 1;
          o.physicsPaused = false; // allow the lerp in update()
        });
      }

      if (clusterPhase === "clustering" && !allArrivedAtCluster) {
        // Check if all matching orbs have arrived
        const allArrived = matchingOrbIndices.every((oi, li) => {
          const o = orbs[oi];
          const tgt = clusterTargets[li];
          const d = Math.sqrt((o.x - tgt.x) ** 2 + (o.y - tgt.y) ** 2);
          return d < 2;
        });

        if (allArrived) {
          allArrivedAtCluster = true;
          clusterPhase = "clustered";
          clusterPhaseTimer = 0;

          // Heartbeat pulse on each arrived orb
          matchingOrbIndices.forEach((oi, li) => {
            const o = orbs[oi];
            o.physicsPaused = true;
            o.heartbeatT = 1;
            // Stagger slightly
            setTimeout(() => { if (o) o.heartbeatT = 1; }, li * 60);
          });

          // Build constellation lines
          constellationLines = [];
          for (let i = 0; i < matchingOrbIndices.length; i++) {
            for (let j = i + 1; j < matchingOrbIndices.length; j++) {
              constellationLines.push({
                a: matchingOrbIndices[i],
                b: matchingOrbIndices[j],
                dashProgress: 0,
                dotT: 0,
                dotDir: 1,
              });
            }
          }
        }
      }
    }

    function drawConstellationLines(t: number) {
      if (!ctx) return;
      if (constellationLines.length === 0 && !constellationFadingOut) return;
      if (clusterPhase !== "clustered" && !constellationFadingOut) return;

      // Fade in/out
      if (clusterPhase === "clustered" && !constellationFadingOut) {
        constellationAlpha = Math.min(1, constellationAlpha + 0.015);
      } else if (constellationFadingOut) {
        constellationAlpha = Math.max(0, constellationAlpha - 0.02);
        if (constellationAlpha <= 0) { constellationFadingOut = false; constellationLines = []; return; }
      }

      constellationLines.forEach((line, idx) => {
        // Animate dash progress in staggered fashion (0.025/frame → ~40 frames)
        const staggerDelay = idx * 80; // ms
        if (clusterPhaseTimer > staggerDelay) {
          line.dashProgress = Math.min(1, line.dashProgress + 0.025);
        }
        const oa = orbs[line.a], ob = orbs[line.b];
        if (!oa || !ob) return;

        const x1 = oa.x, y1 = oa.y, x2 = ob.x, y2 = ob.y;
        const totalLen = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        ctx.save();
        ctx.globalAlpha = constellationAlpha;
        ctx.shadowBlur = 6; ctx.shadowColor = "#00e5ff";
        ctx.strokeStyle = "rgba(0,229,255,0.25)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([totalLen, totalLen]);
        ctx.lineDashOffset = totalLen * (1 - line.dashProgress);
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        ctx.setLineDash([]);

        // Traveling dot
        if (line.dashProgress > 0.5) {
          const dotTraw = (Math.sin(t * 0.018 + idx * 0.8) + 1) / 2;
          const tx = x1 + (x2 - x1) * dotTraw;
          const ty = y1 + (y2 - y1) * dotTraw;
          ctx.beginPath(); ctx.arc(tx, ty, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#00e5ff";
          ctx.shadowBlur = 8; ctx.shadowColor = "#00e5ff";
          ctx.fill();
        }
        ctx.restore();
      });
    }

    // ═══════════════════════════════════════
    //  MOUSE EVENTS
    // ═══════════════════════════════════════
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      let anyHover = false;
      for (const o of orbs) {
        o.hovered = o.hitTest(mouse.x, mouse.y);
        if (o.hovered) anyHover = true;
      }
      canvas.style.cursor = shiftHeld ? "none" : (anyHover ? "pointer" : "crosshair");

      if (dragOrb) {
        dragOrb.x = mouse.x + dragOrb.dragOffX;
        dragOrb.y = mouse.y + dragOrb.dragOffY;
        dragOrb.vx = 0; dragOrb.vy = 0;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      for (const o of orbs) {
        if (o.hitTest(mx, my)) {
          dragOrb = o; o.dragging = true;
          o.dragOffX = o.x - mx; o.dragOffY = o.y - my;
          o.dragStartX = o.x; o.dragStartY = o.y;
          break;
        }
      }
    };

    const handleMouseUp = () => {
      if (dragOrb) {
        const dx = Math.abs(dragOrb.x - dragOrb.dragStartX);
        const dy = Math.abs(dragOrb.y - dragOrb.dragStartY);
        if (dx < 5 && dy < 5) {
          if (explodedOrb && explodedOrb !== dragOrb) { explodedOrb.explode(); explodedOrb = null; }
          const nowExploded = dragOrb.explode();
          if (nowExploded) {
            explodedOrb = dragOrb;
            setPanelData(dragOrb.data);
            for (const o of orbs) {
              if (o === dragOrb) continue;
              const ox = o.x - dragOrb.x, oy = o.y - dragOrb.y;
              const d = Math.sqrt(ox * ox + oy * oy) || 1;
              if (d < 260) {
                const str = ((260 - d) / d) * 2.5;
                o._repulse = { x: (ox * str) / d * 10, y: (oy * str) / d * 10 };
              }
            }
          } else { setPanelData(null); explodedOrb = null; }
        } else {
          dragOrb.vx = (dragOrb.x - dragOrb.dragStartX) * 0.08;
          dragOrb.vy = (dragOrb.y - dragOrb.dragStartY) * 0.08;
        }
        dragOrb.dragging = false;
        dragOrb.pulse();
        dragOrb = null;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000; mouse.y = -1000;
      if (dragOrb) { dragOrb.dragging = false; dragOrb = null; }
    };

    // ── Shift (Black Hole) key handlers ──
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift" && !shiftHeld) {
        shiftHeld = true;
        bhPulseT = 0;
        if (canvas) canvas.style.cursor = "none";
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift" && shiftHeld) {
        shiftHeld = false;
        shiftJustReleased = true;
        bhReleasePos = { x: mouse.x, y: mouse.y };
        if (canvas) canvas.style.cursor = "crosshair";
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const rippleInterval = setInterval(() => {
      for (const o of orbs) {
        if (o.hovered && !o.exploded && Math.random() < 0.3) o.pulse();
      }
    }, 400);

    // ═══════════════════════════════════════
    //  MAIN LOOP
    // ═══════════════════════════════════════
    let lastTimestamp = 0;
    function loop(timestamp: number) {
      const dtMs = Math.min(timestamp - lastTimestamp, 50);
      lastTimestamp = timestamp;
      t++;
      if (!ctx) return;

      // ── Filter change detection ──
      if (lastFilter !== activeFilterRef.current) {
        const newFilter = activeFilterRef.current;
        lastFilter = newFilter;
        if (explodedOrb) { explodedOrb.explode(); explodedOrb = null; setPanelData(null); }
        startCluster(newFilter);
      }

      // ── Black hole shockwave on shift release ──
      if (shiftJustReleased) {
        shiftJustReleased = false;
        const bx = bhReleasePos.x, by = bhReleasePos.y;
        for (const o of orbs) {
          if (o.physicsPaused) continue;
          const ddx = o.x - bx, ddy = o.y - by;
          const ddist = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
          const nx = ddx / ddist, ny = ddy / ddist;
          o.vx += nx * 12;
          o.vy += ny * 12;
        }
      }

      ctx.clearRect(0, 0, W, H);

      // Stars
      for (const s of STARS) {
        const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinklePhase));
        ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fill();
      }

      // Cursor effect
      if (shiftHeld) { drawBlackHole(t); }
      else { drawNormalMagnet(t); }

      // Update cluster phase timer
      updateClusterPhase(dtMs);

      // Update orbs
      for (const o of orbs) o.update(mouse, orbs);

      // Elastic collisions
      resolveElasticCollisions();

      // Draw constellation lines (below orbs)
      drawConstellationLines(t);

      // Draw orbs
      const sorted = [...orbs].sort((a, b) => (a.exploded ? 1 : 0) - (b.exploded ? 1 : 0));
      for (const o of sorted) o.draw(ctx);

      animFrameId = requestAnimationFrame(loop);
    }
    animFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(rippleInterval);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <section id="skills" ref={containerRef} className="relative w-full h-[90vh] md:h-screen min-h-[600px] overflow-hidden bg-[#050b18]">
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 py-12 md:px-12 md:py-16 pointer-events-none bg-gradient-to-b from-[#050b18] to-transparent">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-cyan uppercase mb-2"
            >
              Technical Skills
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black tracking-tight"
            >
              Skill <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-violet drop-shadow-[0_0_15px_rgba(6,208,245,0.3)]">Orbs</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 pointer-events-auto"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-1.5 font-mono text-[9px] md:text-[10px] tracking-wider rounded-full cursor-pointer transition-all duration-300 border relative overflow-hidden ${
                  activeFilter === cat.id
                    ? "border-transparent text-[#050b18] font-bold"
                    : "bg-transparent border-white/10 text-on-muted hover:border-cyan/40 hover:text-white hover:-translate-y-0.5"
                }`}
              >
                {activeFilter === cat.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan to-violet" />
                )}
                <span className="relative z-10 uppercase">{cat.label}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" style={{ cursor: "crosshair" }} />

      {/* Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[8px] md:text-[9px] tracking-widest uppercase text-white/30 pointer-events-none animate-pulse whitespace-nowrap">
        Hover to attract • Click to explode • Drag to throw • Hold Shift for Black Hole
      </div>

      {/* Info Panel */}
      <div
        className={`absolute bottom-16 right-6 md:right-12 w-[240px] bg-[#050b18]/90 backdrop-blur-md border border-white/10 rounded-2xl p-5 pointer-events-auto transition-all duration-300 ease-out z-20 shadow-[0_0_40px_rgba(0,0,0,0.5)] ${
          panelData ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {panelData && (
          <>
            <div
              className="text-lg font-bold bg-clip-text text-transparent mb-1"
              style={{ backgroundImage: `linear-gradient(90deg, ${panelData.color}, ${panelData.color2})` }}
            >
              {panelData.emoji} {panelData.name}
            </div>
            <div className="font-mono text-[10px] text-white/60 mb-3">
              Proficiency: {panelData.pct}%
            </div>
            <div className={`flex flex-wrap gap-1.5 ${panelData.sampleUrl ? "mb-4" : ""}`}>
              {panelData.tags.map((tag: string, i: number) => (
                <span key={i} className="font-mono text-[8px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                  {tag}
                </span>
              ))}
            </div>
            {panelData.sampleUrl && (
              <a
                href={panelData.sampleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-[10px] font-mono font-bold bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors w-full justify-center border border-white/10 hover:border-white/30"
              >
                View Sample Work <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </>
        )}
      </div>
    </section>
  );
}
