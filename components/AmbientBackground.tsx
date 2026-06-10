"use client";

import { useReducedMotion } from "framer-motion";

/**
 * AmbientBackground — Full-page dynamic background layer.
 *
 * Renders a deep dark gradient, animated gradient orbs, a subtle grid,
 * and a CSS-only noise texture. All CSS animation classes are defined in
 * `app/globals.css`. The framer-motion `useReducedMotion` hook provides
 * an additional JS-side guard that disables orb animations when the user
 * prefers reduced motion (complementing the media query in globals.css).
 */
export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #05070D 0%, #0B1020 100%)",
      }}
    >
      {/* ── Subtle grid overlay ──────────────────────────── */}
      <div className="grid-bg" />

      {/* ── Animated gradient orbs ───────────────────────── */}
      <div className="ambient-layer">
        {/* Warm center orb (third orb) */}
        <div
          className="orb-warm"
          style={
            prefersReducedMotion ? { animationName: "none" } : undefined
          }
        />
      </div>

      {/* ── Noise texture overlay ────────────────────────── */}
      <div className="noise-overlay" />
    </div>
  );
}
