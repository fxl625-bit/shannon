/**
 * HomeHero.tsx — Static background image Hero matching 首页UI.png reference.
 *
 * Uses public/images/homepage-bg.png as fullscreen cover background.
 * Designed as a drop-in replacement: the HeroBackground layer is abstracted
 * so it can later be swapped for video or frame-sequence.
 *
 * Modes (prop `bgMode`):
 *   "image"    → <div> with CSS background-image
 *   "video"    → <video> element (future)
 *   "sequence" → CanvasSequence from scroll-video/ (future)
 */

"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export type HeroBgMode = "image" | "video" | "sequence";

export interface HomeHeroProps {
  bgMode?: HeroBgMode;
  className?: string;
}

/**
 * HeroBackground — renders the appropriate background layer.
 * Currently only "image" mode is implemented.
 */
function HeroBackground({ mode }: { mode: HeroBgMode }) {
  switch (mode) {
    case "image":
      return (
        <div
          className="hero-bg-image absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/homepage-bg.png')" }}
          aria-hidden
        />
      );
    case "video":
      return (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/homepage-bg.png"
          aria-hidden
        >
          <source src="/videos/homepage-bg.web.mp4" type="video/mp4" />
        </video>
      );
    case "sequence":
      // Placeholder for future frame-sequence background
      // Will import CanvasSequence from ./scroll-video/CanvasSequence
      return (
        <div className="absolute inset-0 bg-black" aria-hidden>
          <div className="flex items-center justify-center h-full text-[color:var(--text-muted)] text-sm">
            Frame sequence background (not yet connected)
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function HomeHero({ bgMode = "image", className = "" }: HomeHeroProps) {
  const { locale } = useLanguage();

  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden ${className}`}
    >
      {/* ── Background Layer ── */}
      <HeroBackground mode={bgMode} />

      {/* ── Gradient Overlay ── */}
      {/* Left-side dark overlay ensures text readability;
          right side stays brighter so the tech ellipse remains visible. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,6,15,0.86) 0%, rgba(2,6,15,0.48) 42%, rgba(2,6,15,0.18) 100%)",
        }}
      />

      {/* ── Bottom vignette ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(2,6,15,0.6) 0%, transparent 100%)",
        }}
      />

      {/* ── Content Layer ── */}
      <div className="relative z-10 flex min-h-screen items-center px-6 sm:px-12 lg:px-20">
        <div className="w-full max-w-[520px] pt-20 pb-24">
          {/* Tag */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-black/30 backdrop-blur-sm px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--cyan)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)]" />
            AI × HUMAN POTENTIAL
          </div>

          {/* Main Title */}
          <h1 className="text-[48px] leading-[1.02] font-semibold tracking-tight text-white sm:text-[64px] lg:text-[80px]">
            AI ×
            <br />
            <span className="bg-gradient-to-r from-[color:var(--cyan)] via-cyan-300 to-[color:var(--violet)] bg-clip-text text-transparent">
              HUMAN
              <br />
              POTENTIAL
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-base leading-relaxed text-[color:var(--text-secondary)] sm:text-lg max-w-[44ch]">
            Exploring how AI expands memory, expression, judgment, and creativity.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/lab"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[color:var(--border)] bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-medium text-[color:var(--text-primary)] transition-all hover:bg-white/10 hover:border-[color:var(--border-strong)]"
            >
              Explore the System
              <span className="text-[color:var(--cyan)]">→</span>
            </Link>
            <Link
              href="/apps"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-transparent px-6 py-3 text-sm font-medium text-[color:var(--text-muted)] transition-all hover:text-[color:var(--text-secondary)]"
            >
              View Experiments
              <span className="text-[color:var(--violet)]">→</span>
            </Link>
          </div>

          {/* Scroll Hint */}
          <div className="mt-16 flex items-center gap-3">
            <div className="h-px w-8 bg-[color:var(--text-muted)]/40" />
            <span className="text-[10px] tracking-[0.25em] text-[color:var(--text-muted)]/60">
              SCROLL TO EXPLORE
            </span>
            <div className="h-px flex-1 bg-[color:var(--text-muted)]/20" />
          </div>
        </div>
      </div>

      <style>{`
        .hero-bg-image {
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        @media (max-width: 768px) {
          .hero-bg-image {
            background-position: 62% center;
          }
        }
      `}</style>
    </section>
  );
}
