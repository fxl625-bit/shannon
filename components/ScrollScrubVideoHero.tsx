/**
 * ScrollScrubVideoHero.tsx — GSAP ScrollTrigger scrub video hero.
 *
 * Scroll progress controls video.currentTime.
 * Down = forward, Up = backward.
 * Text phases fade in/out along the timeline.
 */

"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/language-provider";

gsap.registerPlugin(ScrollTrigger);

// ── i18n copy ──
interface PhaseCopy {
  name: string;
  en: React.ReactNode;
  zh: React.ReactNode;
}

const PHASES: PhaseCopy[] = [
  {
    name: "hero",
    en: (
      <div className="text-center max-w-[580px]">
        <div className="text-[13px] tracking-[0.2em] text-[color:var(--text-muted)]/70 mb-3 font-mono">
          Shannon Fu
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-black/30 backdrop-blur-sm px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--cyan)] mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)]" />
          AI × HUMAN POTENTIAL
        </div>
        <h1 className="text-[48px] leading-[1.02] font-semibold tracking-tight text-white sm:text-[72px] lg:text-[88px]">
          AI ×
          <br />
          <span className="bg-gradient-to-r from-[color:var(--cyan)] via-cyan-300 to-[color:var(--violet)] bg-clip-text text-transparent">
            HUMAN
            <br />
            POTENTIAL
          </span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[color:var(--text-secondary)] sm:text-lg max-w-[44ch] mx-auto">
          Exploring how AI expands memory, expression, judgment, and creativity.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/lab"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[color:var(--border)] bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-medium text-[color:var(--text-primary)] transition-all hover:bg-white/10"
          >
            Explore the System
            <span className="text-[color:var(--cyan)]">→</span>
          </a>
          <a
            href="/apps"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-transparent px-6 py-3 text-sm font-medium text-[color:var(--text-muted)] transition-all hover:text-[color:var(--text-secondary)]"
          >
            View Experiments
            <span className="text-[color:var(--violet)]">→</span>
          </a>
        </div>
      </div>
    ),
    zh: (
      <div className="text-center max-w-[580px]">
        <div className="text-[13px] tracking-[0.2em] text-[color:var(--text-muted)]/70 mb-3 font-mono">
          Shannon Fu
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-black/30 backdrop-blur-sm px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--cyan)] mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)]" />
          AI × 人类潜能
        </div>
        <h1 className="text-[48px] leading-[1.02] font-semibold tracking-tight text-white sm:text-[64px] lg:text-[80px]">
          AI ×
          <br />
          <span className="bg-gradient-to-r from-[color:var(--cyan)] via-cyan-300 to-[color:var(--violet)] bg-clip-text text-transparent">
            人类
            <br />
            潜能
          </span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[color:var(--text-secondary)] sm:text-lg max-w-[44ch] mx-auto">
          探索 AI 如何扩展人的记忆、表达、判断与创造力。
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/lab"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[color:var(--border)] bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-medium text-[color:var(--text-primary)] transition-all hover:bg-white/10"
          >
            探索系统
            <span className="text-[color:var(--cyan)]">→</span>
          </a>
          <a
            href="/apps"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-transparent px-6 py-3 text-sm font-medium text-[color:var(--text-muted)] transition-all hover:text-[color:var(--text-secondary)]"
          >
            查看实验
            <span className="text-[color:var(--violet)]">→</span>
          </a>
        </div>
      </div>
    ),
  },
  {
    name: "pillars",
    en: (
      <div className="grid grid-cols-2 gap-10 sm:gap-16">
        {[
          { label: "Memory", color: "var(--cyan)" },
          { label: "Expression", color: "var(--violet)" },
          { label: "Judgment", color: "var(--blue)" },
          { label: "Creativity", color: "var(--warm)" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ color: item.color }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    ),
    zh: (
      <div className="grid grid-cols-2 gap-10 sm:gap-16">
        {[
          { label: "记忆", sub: "Memory", color: "var(--cyan)" },
          { label: "表达", sub: "Expression", color: "var(--violet)" },
          { label: "判断", sub: "Judgment", color: "var(--blue)" },
          { label: "创造", sub: "Creativity", color: "var(--warm)" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ color: item.color }}
            >
              {item.label}
            </div>
            <div className="mt-1 text-sm text-[color:var(--text-muted)] uppercase tracking-widest">
              {item.sub}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "cognition",
    en: (
      <div className="text-center max-w-[50ch] mx-auto">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-relaxed tracking-tight text-[color:var(--text-primary)]">
          AI is not only automation.
        </p>
        <div className="mt-4 h-px w-16 mx-auto bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)]" />
        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[color:var(--text-secondary)]">
          It is a new layer of cognition.
        </p>
      </div>
    ),
    zh: (
      <div className="text-center max-w-[50ch] mx-auto">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-relaxed tracking-tight text-[color:var(--text-primary)]">
          AI 不只是自动化。
        </p>
        <div className="mt-4 h-px w-16 mx-auto bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)]" />
        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[color:var(--text-secondary)]">
          它也可以成为一种新的认知层。
        </p>
      </div>
    ),
  },
  {
    name: "io-cycle",
    en: (
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        {[
          { label: "Human Inputs", color: "var(--cyan)" },
          { label: "↕", color: "var(--text-muted)" },
          { label: "AI Systems", color: "var(--violet)" },
          { label: "↕", color: "var(--text-muted)" },
          { label: "Human Outputs", color: "var(--blue)" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ color: item.color }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    ),
    zh: (
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        {[
          { label: "人的输入", sub: "Human Inputs", color: "var(--cyan)" },
          { label: "↕", color: "var(--text-muted)" },
          { label: "AI 系统", sub: "AI Systems", color: "var(--violet)" },
          { label: "↕", color: "var(--text-muted)" },
          { label: "人的输出", sub: "Human Outputs", color: "var(--blue)" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ color: item.color }}
            >
              {item.label}
            </div>
            {item.sub && (
              <div className="mt-0.5 text-[11px] text-[color:var(--text-muted)] uppercase tracking-widest">
                {item.sub}
              </div>
            )}
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "closing",
    en: (
      <div className="text-center">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-[color:var(--text-primary)]">
          The future is{" "}
          <span className="bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)] bg-clip-text text-transparent">
            augmented humanity
          </span>
          .
        </p>
      </div>
    ),
    zh: (
      <div className="text-center">
        <p className="text-3xl sm:text-4xl leading-tight font-semibold tracking-tight text-[color:var(--text-primary)]">
          未来不只是人工智能，
          <br />
          <span className="bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)] bg-clip-text text-transparent">
            也是被增强的人。
          </span>
        </p>
      </div>
    ),
  },
];

interface Phase {
  start: number;
  end: number;
  idx: number;
}

const PHASE_MAP: Phase[] = [
  { start: 0, end: 0.20, idx: 0 },
  { start: 0.20, end: 0.40, idx: 1 },
  { start: 0.40, end: 0.65, idx: 2 },
  { start: 0.65, end: 0.85, idx: 3 },
  { start: 0.85, end: 1.0, idx: 4 },
];

export function ScrollScrubVideoHero() {
  const { locale } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);

  // ── GSAP ScrollTrigger ──
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Wait for video metadata
    if (video.readyState < 1) {
      const onMeta = () => {
        setVideoReady(true);
      };
      video.addEventListener("loadedmetadata", onMeta);
      return () => video.removeEventListener("loadedmetadata", onMeta);
    }
    setVideoReady(true);

    // GSAP ScrollTrigger with scrub
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=350%",
      scrub: 0.5,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        // video scrub
        if (video.duration && isFinite(video.duration)) {
          video.currentTime = p * video.duration;
        }

        // phase detection
        for (const ph of PHASE_MAP) {
          if (p >= ph.start && p < ph.end) {
            setPhaseIdx(ph.idx);
            setPhaseProgress((p - ph.start) / (ph.end - ph.start));
            break;
          }
        }
        if (p >= 1) {
          setPhaseIdx(PHASE_MAP[PHASE_MAP.length - 1].idx);
          setPhaseProgress(1);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [videoReady]);

  // ── Phase text animation ──
  const visiblePhase = PHASE_MAP.find((ph) => progress >= ph.start && progress < ph.end)
    ?? (progress >= 1 ? PHASE_MAP[PHASE_MAP.length - 1] : PHASE_MAP[0]);

  const currentPhaseIdx = visiblePhase?.idx ?? 0;
  const localP = visiblePhase
    ? (progress - visiblePhase.start) / (visiblePhase.end - visiblePhase.start)
    : 0;

  const opacity = Math.min(1, Math.max(0, (localP - 0.05) / 0.4));
  const blur = Math.max(0, (1 - localP) * 6);
  const yOffset = Math.max(0, 20 * (1 - localP));

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: videoReady ? "450vh" : "100vh" }}
    >
      {/* Pinned container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Video background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          poster="/images/homepage-bg.png"
          aria-hidden
        >
          <source src="/videos/homepage-bg.web.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,6,15,0.86) 0%, rgba(2,6,15,0.48) 42%, rgba(2,6,15,0.18) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, rgba(2,6,15,0.6) 0%, transparent 100%)",
          }}
        />

        {/* Text layer */}
        <div
          ref={textLayerRef}
          className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none"
        >
          <div
            style={{
              opacity,
              filter: `blur(${blur}px)`,
              transform: `translateY(${yOffset}px)`,
              transition: "opacity 0.4s ease, filter 0.4s ease, transform 0.4s ease",
            }}
          >
            {PHASES[currentPhaseIdx][locale as "en" | "zh"]}
          </div>
        </div>

        {/* Progress indicator (dev only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-[11px] font-mono text-[color:var(--text-muted)] pointer-events-none">
            {Math.round(progress * 100)}% · phase {currentPhaseIdx + 1}/{PHASES.length}
          </div>
        )}
      </div>

      {/* Spacer for scroll height */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{ height: "350vh", visibility: "hidden" }}
      />
    </section>
  );
}
