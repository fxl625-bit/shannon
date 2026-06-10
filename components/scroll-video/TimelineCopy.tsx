/**
 * TimelineCopy.tsx — Scroll-driven timeline text overlay
 *
 * Shows phase-specific copy driven by scroll progress.
 * Uses GSAP timelines for entrance/exit animations.
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import type { TimelinePhase } from './sequenceConfig';

export interface TimelineCopyProps {
  phases: TimelinePhase[];
  activePhase: string | null;
  phaseProgress: number;
  gsapProgress: number;
  locale: 'en' | 'zh';
  className?: string;
}

export function TimelineCopy({
  phases,
  activePhase,
  phaseProgress,
  gsapProgress,
  locale,
  className = '',
}: TimelineCopyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentPhase = phases.find((p) => p.key === activePhase);

  if (!currentPhase) return null;

  const copy = locale === 'en' ? currentPhase.en : currentPhase.zh;
  const style = currentPhase.style;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 flex items-center justify-center px-6 ${className}`}
    >
      {style === 'hero' && (
        <div className="text-center max-w-[50ch]" data-phase="hero">
          <div
            className="gsap-text"
            style={{
              opacity: Math.min(1, (phaseProgress - 0.1) / 0.5),
              filter: `blur(${Math.max(0, (1 - phaseProgress) * 10)}px)`,
              transform: `translateY(${Math.max(0, 20 * (1 - phaseProgress / 0.4))}px)`,
              transition: 'opacity 0.6s ease, filter 0.6s ease, transform 0.6s ease',
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-black/30 backdrop-blur-sm px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--cyan)] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)]" />
              {copy.heading}
            </div>
            <h1 className="text-[56px] leading-[1.02] font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-[72px] lg:text-[88px]">
              {copy.heading}
            </h1>
            {copy.body && (
              <p className="mt-6 text-lg text-[color:var(--text-secondary)] sm:text-xl max-w-[42ch] mx-auto">
                {copy.body}
              </p>
            )}
          </div>
        </div>
      )}

      {style === 'grid' && copy.items && (
        <div
          className="gsap-text"
          style={{
            opacity: Math.min(1, (phaseProgress - 0.1) / 0.5),
            filter: `blur(${Math.max(0, (1 - phaseProgress) * 8)}px)`,
            transition: 'opacity 0.5s ease, filter 0.5s ease',
          }}
        >
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {copy.items.map((item) => (
              <div key={item.label} className="text-center">
                <div
                  className="text-4xl sm:text-5xl font-bold tracking-tight"
                  style={{ color: item.color }}
                >
                  {item.label}
                </div>
                {item.sub && (
                  <div className="mt-1 text-sm text-[color:var(--text-muted)] uppercase tracking-widest">
                    {item.sub}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {style === 'statement' && (
        <div
          className="text-center max-w-[50ch] mx-auto gsap-text"
          style={{
            opacity: Math.min(1, (phaseProgress - 0.1) / 0.5),
            filter: `blur(${Math.max(0, (1 - phaseProgress) * 8)}px)`,
            transition: 'opacity 0.5s ease, filter 0.5s ease',
          }}
        >
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-relaxed tracking-tight text-[color:var(--text-primary)]">
            {copy.heading}
          </p>
          <div className="mt-4 h-px w-16 mx-auto bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)]" />
          {copy.body && (
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[color:var(--text-secondary)]">
              {copy.body}
            </p>
          )}
        </div>
      )}

      {style === 'flow' && copy.items && (
        <div
          className="gsap-text"
          style={{
            opacity: Math.min(1, (phaseProgress - 0.1) / 0.5),
            filter: `blur(${Math.max(0, (1 - phaseProgress) * 6)}px)`,
            transition: 'opacity 0.5s ease, filter 0.5s ease',
          }}
        >
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            {copy.items.map((item) => (
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
        </div>
      )}

      {style === 'closing' && (
        <div
          className="text-center gsap-text"
          style={{
            opacity: Math.min(1, (phaseProgress - 0.1) / 0.4),
            filter: `blur(${Math.max(0, (1 - phaseProgress) * 8)}px)`,
            transform: `scale(${0.96 + Math.min(0.04, phaseProgress * 0.04)})`,
            transition: 'opacity 0.6s ease, filter 0.6s ease, transform 0.6s ease',
          }}
        >
          <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-[color:var(--text-primary)]">
            {copy.heading?.split('augmented').length === 2 ? (
              <>
                {copy.heading?.split('augmented')[0]}
                <span className="bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)] bg-clip-text text-transparent">
                  augmented humanity
                </span>
                .
              </>
            ) : (
              <span
                className="bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)] bg-clip-text text-transparent"
              >
                {copy.heading}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
