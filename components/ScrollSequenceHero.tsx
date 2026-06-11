/**
 * ScrollSequenceHero.tsx — Canvas frame sequence + GSAP ScrollTrigger
 *
 * Renders pre-rendered WebP frames onto a <canvas>.
 * Scroll progress 0→1 maps to frame 0→(total-1).
 * - Text visible at initial state (progress=0)
 * - lastDrawnFrameRef prevents flashing when target frame not yet loaded
 * - Poster never reappears after first successful draw
 */

"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/language-provider";

gsap.registerPlugin(ScrollTrigger);

// ── Phase copy ──
interface PhaseDef {
  name: string;
  start: number;
  end: number;
  en: React.ReactNode;
  zh: React.ReactNode;
}

const PHASES: PhaseDef[] = [
  {
    name: "hero", start: 0, end: 0.22,
    en: (
      <div className="text-center max-w-[640px]">
        <h1 className="text-[52px] leading-[1.08] font-semibold tracking-tight text-white sm:text-[72px] lg:text-[90px]">
          Shannon Fu
        </h1>
        <p className="mt-3 text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.15] font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--cyan)] via-cyan-200 to-[color:var(--violet)]">
          AI × Human Potential
        </p>
        <p className="mt-6 text-base leading-relaxed text-[color:var(--text-secondary)] sm:text-lg max-w-[44ch] mx-auto">
          I use this space to collect the systems, apps, knowledge structures, and workflows behind my AI-native work.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-[color:var(--text-muted)]/40" />
          <span className="text-[10px] tracking-[0.25em] text-[color:var(--text-muted)]/50">
            SCROLL TO EXPLORE
          </span>
          <div className="h-px flex-1 bg-[color:var(--text-muted)]/20" />
        </div>
      </div>
    ),
    zh: (
      <div className="text-center max-w-[640px]">
        <h1 className="text-[52px] leading-[1.08] font-semibold tracking-tight text-white sm:text-[72px] lg:text-[90px]">
          Shannon Fu
        </h1>
        <p className="mt-3 text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.15] font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--cyan)] via-cyan-200 to-[color:var(--violet)]">
          AI × 人类潜能
        </p>
        <p className="mt-6 text-base leading-relaxed text-[color:var(--text-secondary)] sm:text-lg max-w-[44ch] mx-auto">
          我把这里当作一个公开空间，记录自己如何把 AI 用进工作流、知识系统和个人应用。
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-[color:var(--text-muted)]/40" />
          <span className="text-[10px] tracking-[0.25em] text-[color:var(--text-muted)]/50">
            向下探索
          </span>
          <div className="h-px flex-1 bg-[color:var(--text-muted)]/20" />
        </div>
      </div>
    ),
  },
  {
    name: "pillars", start: 0.22, end: 0.42,
    en: (
      <div className="grid grid-cols-2 gap-10 sm:gap-16">
        {[
          { label: "Memory", color: "var(--cyan)" },
          { label: "Expression", color: "var(--violet)" },
          { label: "Judgment", color: "var(--blue)" },
          { label: "Creativity", color: "var(--warm)" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: item.color }}>{item.label}</div>
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
            <div className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: item.color }}>{item.label}</div>
            <div className="mt-1 text-sm text-[color:var(--text-muted)] uppercase tracking-widest">{item.sub}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "cognition", start: 0.42, end: 0.62,
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
    name: "io", start: 0.62, end: 0.82,
    en: (
      <div className="flex flex-col items-center gap-5 sm:gap-7">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--cyan)" }}>Human Inputs</div>
        <div className="text-xl text-[color:var(--text-muted)]">↕</div>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--violet)" }}>AI Systems</div>
        <div className="text-xl text-[color:var(--text-muted)]">↕</div>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--blue)" }}>Human Outputs</div>
      </div>
    ),
    zh: (
      <div className="flex flex-col items-center gap-5 sm:gap-7">
        <div><div className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--cyan)" }}>人的输入</div><div className="text-[11px] text-[color:var(--text-muted)] uppercase tracking-widest mt-0.5">Human Inputs</div></div>
        <div className="text-xl text-[color:var(--text-muted)]">↕</div>
        <div><div className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--violet)" }}>AI 系统</div><div className="text-[11px] text-[color:var(--text-muted)] uppercase tracking-widest mt-0.5">AI Systems</div></div>
        <div className="text-xl text-[color:var(--text-muted)]">↕</div>
        <div><div className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--blue)" }}>人的输出</div><div className="text-[11px] text-[color:var(--text-muted)] uppercase tracking-widest mt-0.5">Human Outputs</div></div>
      </div>
    ),
  },
  {
    name: "closing", start: 0.82, end: 1.0,
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
          未来不只是人工智能，<br />
          <span className="bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)] bg-clip-text text-transparent">
            也是被增强的人。
          </span>
        </p>
      </div>
    ),
  },
];

const BASE_PATH = "/sequences/homepage-final";
const FRAME_COUNT = 121;
const FORMAT = "webp";
const PREFIX = "frame_";

function makeFrameUrls(): string[] {
  return Array.from({ length: FRAME_COUNT }, (_, i) =>
    `${BASE_PATH}/${PREFIX}${String(i + 1).padStart(4, "0")}.${FORMAT}`
  );
}

export function ScrollSequenceHero() {
  const { locale } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const lastDrawnFrameRef = useRef<number | null>(null);
  const hasDrawnFrameRef = useRef(false);
  const rafRef = useRef<number>(0);
  const loadedCountRef = useRef(0);
  const activePhaseRef = useRef(0);
  // posterVisible: true until first frame is successfully drawn on canvas
  const [posterVisible, setPosterVisible] = useState(true);
  const [activePhase, setActivePhase] = useState(0);
  const [phasePct, setPhasePct] = useState(0);
  // Refs for ScrollTrigger lifecycle — avoids state-driven re-init
  const ctxRef = useRef<gsap.Context | null>(null);
  const triggerInitRef = useRef(false);

  const frameUrls = makeFrameUrls();

  // ── Draw function with last-drawn-frame fallback ──
  const drawImageCover = useCallback((
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvas: HTMLCanvasElement
  ) => {
    const dpr = window.devicePixelRatio || 1;
    const scale = Math.max(
      canvas.width / dpr / img.naturalWidth,
      canvas.height / dpr / img.naturalHeight
    );
    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;
    const sx = (canvas.width / dpr - sw) / 2;
    const sy = (canvas.height / dpr - sh) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  const draw = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas background to dark to never show white/transparent
    ctx.fillStyle = "#02060f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Try to draw the target frame
    const img = imagesRef.current.get(idx);
    if (img && img.complete && img.naturalWidth > 0) {
      drawImageCover(ctx, img, canvas);
      lastDrawnFrameRef.current = idx;
      if (!hasDrawnFrameRef.current) {
        hasDrawnFrameRef.current = true;
        setPosterVisible(false);
      }
      return;
    }

    // 2. Fallback: draw the last successfully drawn frame
    if (lastDrawnFrameRef.current !== null) {
      const lastImg = imagesRef.current.get(lastDrawnFrameRef.current);
      if (lastImg && lastImg.complete && lastImg.naturalWidth > 0) {
        drawImageCover(ctx, lastImg, canvas);
        return;
      }
    }

    // 3. If we never drew any frame, keep the dark bg + poster (posterVisible stays true)
  }, [drawImageCover]);

  // ── Preload frames ──
  useEffect(() => {
    const loaded = imagesRef.current;
    loaded.clear();
    lastDrawnFrameRef.current = null;
    hasDrawnFrameRef.current = false;
    loadedCountRef.current = 0;
    setPosterVisible(true);

    let cancelled = false;
    const EAGER = 30;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        loadedCountRef.current++;
        // Once frame 0 loads, try drawing it immediately
        if (i === 0 && canvasRef.current) {
          draw(0);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedCountRef.current++;
      };
      if (i < EAGER) {
        img.src = frameUrls[i];
        loaded.set(i, img);
      } else {
        const timer = setTimeout(() => {
          if (!cancelled) { img.src = frameUrls[i]; loaded.set(i, img); }
        }, 1500 + i * 40);
        (img as any)._timer = timer;
      }
    }

    return () => {
      cancelled = true;
      loaded.forEach((img) => { if ((img as any)._timer) clearTimeout((img as any)._timer); });
      loaded.clear();
    };
  }, []);

  // ── Resize ──
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ro = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        // Redraw whatever we had
        if (lastDrawnFrameRef.current !== null) {
          draw(lastDrawnFrameRef.current);
        } else {
          draw(0);
        }
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [draw]);

  // ── GSAP ScrollTrigger (single init, gsap.context lifecycle) ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || triggerInitRef.current) return;
    triggerInitRef.current = true;

    // Set initial phase state: phase 0, progress=0
    setActivePhase(0);
    setPhasePct(0);

    // Initial draw: try frame 0
    draw(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=600%",
        scrub: 1.0,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const target = Math.round(p * (FRAME_COUNT - 1));
          const clamped = Math.min(Math.max(0, target), FRAME_COUNT - 1);

          // Draw if frame changed
          if (clamped !== lastDrawnFrameRef.current) {
            if (!rafRef.current) {
              rafRef.current = requestAnimationFrame(() => {
                rafRef.current = 0;
                draw(clamped);
                // Preload nearby frames
                const loaded = imagesRef.current;
                for (let i = Math.max(0, clamped - 10); i <= Math.min(FRAME_COUNT - 1, clamped + 10); i++) {
                  if (!loaded.has(i)) {
                    const img = new Image();
                    img.src = frameUrls[i];
                    loaded.set(i, img);
                  }
                }
              });
            }
          }

          // Phase detection — only setState on actual phase change
          let phaseFound = false;
          for (let i = 0; i < PHASES.length; i++) {
            if (p >= PHASES[i].start && p < PHASES[i].end) {
              if (i !== activePhaseRef.current) {
                activePhaseRef.current = i;
                setActivePhase(i);
              }
              const localPct = (p - PHASES[i].start) / (PHASES[i].end - PHASES[i].start);
              setPhasePct(localPct);
              phaseFound = true;
              break;
            }
          }
          if (!phaseFound) {
            const lastIdx = p >= 1 ? PHASES.length - 1 : 0;
            if (lastIdx !== activePhaseRef.current) {
              activePhaseRef.current = lastIdx;
              setActivePhase(lastIdx);
            }
            setPhasePct(p >= 1 ? 1 : 0);
          }
        },
      });
    }, section);

    ctxRef.current = ctx;

    return () => {
      triggerInitRef.current = false;
      ctx.revert();
      ctxRef.current = null;
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0; }
    };
  }, []); // Intentionally empty — runs once

  // ── Render ──
  // Phase 0 (hero): starts perfectly crisp (opacity=1, blur=0, y=0)
  // Stays crisp through most of the phase, only blurs/fades when exiting
  // Other phases: fade in at entrance, stay crisp in middle, fade out at exit
  let textOpacity: number;
  let textBlur: number;
  let yOffset: number;

  if (activePhase === 0) {
    // Hero phase: stays perfectly crisp from start, only fades at very end
    textOpacity = phasePct < 0.6 ? 1 : Math.max(0, 1 - (phasePct - 0.6) / 0.4);
    textBlur = phasePct < 0.6 ? 0 : Math.max(0, (phasePct - 0.6) * 12);
    yOffset = 0;
  } else {
    // Other phases: fade in (0→0.3), stay crisp (0.3→0.7), fade out (0.7→1)
    if (phasePct < 0.3) {
      textOpacity = phasePct / 0.3;
      textBlur = (1 - phasePct / 0.3) * 8;
      yOffset = (1 - phasePct / 0.3) * 15;
    } else if (phasePct > 0.7) {
      const t = (phasePct - 0.7) / 0.3;
      textOpacity = 1 - t;
      textBlur = t * 8;
      yOffset = t * 15;
    } else {
      textOpacity = 1;
      textBlur = 0;
      yOffset = 0;
    }
  }

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      <div ref={containerRef} className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#02060f]">
        {/* Canvas — always present, always with dark fill */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

        {/* Poster — only shown until first frame is successfully drawn on canvas */}
        {posterVisible && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/homepage-bg.png')" }}
            aria-hidden
          />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(90deg, rgba(2,6,15,0.86) 0%, rgba(2,6,15,0.48) 42%, rgba(2,6,15,0.18) 100%)",
        }} />
        <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none" style={{
          background: "linear-gradient(0deg, rgba(2,6,15,0.6) 0%, transparent 100%)",
        }} />

        {/* Text overlay — z-index 10, visible at progress=0 */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none">
          <div style={{
            opacity: textOpacity,
            filter: `blur(${textBlur}px)`,
            transform: `translateY(${yOffset}px)`,
            transition: "opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease",
          }}>
            {PHASES[activePhase][locale as "en" | "zh"]}
          </div>
        </div>

        {/* Dev debug */}
        {process.env.NODE_ENV === "development" && (
          <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-[11px] font-mono text-[color:var(--text-muted)] pointer-events-none">
            frame {lastDrawnFrameRef.current !== null ? lastDrawnFrameRef.current + 1 : 0}/{FRAME_COUNT} ·
            phase {activePhase + 1}/{PHASES.length} ·
            loaded: {loadedCountRef.current} ·
            poster: {posterVisible ? "yes" : "no"}
          </div>
        )}
      </div>
    </section>
  );
}
