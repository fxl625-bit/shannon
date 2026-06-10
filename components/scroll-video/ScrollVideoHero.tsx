/**
 * ScrollVideoHero.tsx — GSAP ScrollTrigger-driven video hero
 *
 * Orchestrates:
 * - GSAP ScrollTrigger pinned section with scrub
 * - CanvasSequence for frame rendering
 * - TimelineCopy for phase text
 * - ParticleOverlay for ambient particles
 *
 * This is the main orchestrator. All scroll logic is in useScrollSequence.
 */

'use client';

import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  FRAME_CONFIG,
  TIMELINE_PHASES,
  getFrameUrls,
} from './sequenceConfig';
import { useScrollSequence } from './useScrollSequence';
import type { PhaseDef } from './useScrollSequence';

const CanvasSequence = dynamic(
  () => import('./CanvasSequence').then((m) => m.CanvasSequence),
  { ssr: false }
);
const TimelineCopy = dynamic(
  () => import('./TimelineCopy').then((m) => m.TimelineCopy),
  { ssr: false }
);
const ParticleOverlay = dynamic(
  () => import('./ParticleOverlay').then((m) => m.ParticleOverlay),
  { ssr: false }
);

export interface ScrollVideoHeroProps {
  locale?: 'en' | 'zh';
  enableParticles?: boolean;
  className?: string;
}

export function ScrollVideoHero({
  locale = 'en',
  enableParticles = true,
  className = '',
}: ScrollVideoHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Detect mobile / reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(rmq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    rmq.addEventListener('change', handler);
    return () => rmq.removeEventListener('change', handler);
  }, []);

  // Mouse tracking for particles
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Frames
  const cfg = isMobile ? FRAME_CONFIG.mobile : FRAME_CONFIG.desktop;
  const totalFrames = cfg.totalFrames;
  const frames = useMemo(
    () => getFrameUrls(totalFrames, cfg.basePath, cfg.prefix, cfg.format),
    [totalFrames, cfg.basePath, cfg.prefix, cfg.format]
  );

  // Phases for active phase detection
  const phases = useMemo(
    () =>
      TIMELINE_PHASES.map(
        (p): PhaseDef => ({ key: p.key, start: p.start, end: p.end })
      ),
    []
  );

  // GSAP ScrollTrigger hook
  const scrollState = useScrollSequence({
    triggerRef: sectionRef,
    pinRef,
    totalFrames,
    scrollHeightMultiplier: reducedMotion ? 3 : FRAME_CONFIG.scrollHeightMultiplier,
    phases,
    reducedMotion,
  });

  const handleReady = useCallback(() => {
    setCanvasReady(true);
  }, []);

  const scrollHeight = reducedMotion
    ? '300vh'
    : `${FRAME_CONFIG.scrollHeightMultiplier * 100}vh`;

  // Debug overlay in dev
  const showDebug = process.env.NODE_ENV === 'development';

  // In reduced motion, show just the first frame
  const effectiveFrameIndex = reducedMotion ? 0 : scrollState.frameIndex;

  return (
    <section
      ref={sectionRef}
      className={`relative ${className}`}
      style={{ height: canvasReady ? scrollHeight : '100vh' }}
    >
      {/* Pinned container */}
      <div
        ref={pinRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Frame canvas */}
        <CanvasSequence
          frames={frames}
          frameIndex={effectiveFrameIndex}
          className="z-0"
          onReady={handleReady}
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />

        {/* Particles */}
        {enableParticles && !reducedMotion && (
          <ParticleOverlay
            gsapProgress={scrollState.gsapProgress}
            mouseX={mousePos.x}
            mouseY={mousePos.y}
            className="z-[2]"
            simplified={isMobile}
          />
        )}

        {/* Timeline text */}
        <div className="absolute inset-0 z-[3] flex items-center justify-center">
          <TimelineCopy
            phases={TIMELINE_PHASES}
            activePhase={scrollState.activePhase}
            phaseProgress={scrollState.phaseProgress}
            gsapProgress={scrollState.gsapProgress}
            locale={locale}
          />
        </div>

        {/* Debug overlay */}
        {showDebug && (
          <div className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-[11px] font-mono text-[color:var(--text-muted)] pointer-events-none">
            frame {scrollState.frameIndex + 1}/{scrollState.totalFrames} ·{' '}
            {(scrollState.progress * 100).toFixed(1)}% ·{' '}
            {scrollState.activePhase ?? '—'} ·{' '}
            GSAP:{scrollState.gsapProgress.toFixed(3)}
          </div>
        )}

        {/* ScrollTrigger status indicator */}
        {showDebug && (
          <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-[11px] font-mono text-[color:var(--cyan)] pointer-events-none">
            GSAP ScrollTrigger · scrub: 0.5
          </div>
        )}
      </div>
    </section>
  );
}
