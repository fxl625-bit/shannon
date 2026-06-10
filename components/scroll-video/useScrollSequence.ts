/**
 * useScrollSequence.ts — GSAP ScrollTrigger hook
 *
 * Manages:
 * - Pinned scroll section with ScrollTrigger
 * - Scrub-based progress → frame index mapping
 * - Timeline phases tracking
 * - Particle intensity based on progress
 * - Cleanup on unmount / route change
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollSequenceState {
  /** Normalised scroll progress 0..1 */
  progress: number;
  /** Current frame index (0-based) */
  frameIndex: number;
  /** Total frame count */
  totalFrames: number;
  /** Phase key of the current timeline segment */
  activePhase: string | null;
  /** Local progress within the current phase 0..1 */
  phaseProgress: number;
  /** GSAP timeline progress for particle intensity */
  gsapProgress: number;
}

export interface PhaseDef {
  key: string;
  start: number;
  end: number;
}

export interface UseScrollSequenceOptions {
  /** DOM ref for the scroll-trigger element */
  triggerRef: React.RefObject<HTMLDivElement | null>;
  /** DOM ref for the pinned container */
  pinRef: React.RefObject<HTMLDivElement | null>;
  /** Total number of frames */
  totalFrames: number;
  /** Scroll height multiplier (e.g. 5 = 500vh) */
  scrollHeightMultiplier?: number;
  /** Timeline phases for active phase detection */
  phases?: PhaseDef[];
  /** Whether reduced motion is preferred */
  reducedMotion?: boolean;
}

export function useScrollSequence({
  triggerRef,
  pinRef,
  totalFrames,
  scrollHeightMultiplier = 5,
  phases = [],
  reducedMotion = false,
}: UseScrollSequenceOptions): ScrollSequenceState {
  const [state, setState] = useState<ScrollSequenceState>({
    progress: 0,
    frameIndex: 0,
    totalFrames,
    activePhase: null,
    phaseProgress: 0,
    gsapProgress: 0,
  });

  const stateRef = useRef({ progress: 0, currentPhase: null as string | null });
  const animationIdRef = useRef(0);
  const triggerRefInner = useRef<ScrollTrigger | null>(null);

  const updateState = useCallback(() => {
    const { progress, currentPhase } = stateRef.current;
    const frameIdx = Math.min(
      Math.max(0, Math.round(progress * (totalFrames - 1))),
      totalFrames - 1
    );

    // Find active phase
    let activePhase: string | null = null;
    let phaseProgress = 0;
    for (const p of phases) {
      if (progress >= p.start && progress < p.end) {
        activePhase = p.key;
        phaseProgress = (progress - p.start) / (p.end - p.start);
        break;
      }
    }
    // Edge: if progress === 1, assign last phase
    if (!activePhase && progress >= 1 && phases.length > 0) {
      const last = phases[phases.length - 1];
      activePhase = last.key;
      phaseProgress = 1;
    }

    setState({
      progress,
      frameIndex: frameIdx,
      totalFrames,
      activePhase,
      phaseProgress,
      gsapProgress: progress,
    });
  }, [totalFrames, phases]);

  useEffect(() => {
    if (reducedMotion) {
      setState({
        progress: 0,
        frameIndex: 0,
        totalFrames,
        activePhase: phases[0]?.key ?? null,
        phaseProgress: 0,
        gsapProgress: 0,
      });
      return;
    }

    const trigger = triggerRef.current;
    const pin = pinRef.current;
    if (!trigger || !pin) return;

    // Set pin container height via GSAP
    gsap.set(pin, { clearProps: 'all' });

    // Create the GSAP ScrollTrigger with scrub
    const st = ScrollTrigger.create({
      trigger,
      pin,
      start: 'top top',
      end: `+=${(scrollHeightMultiplier - 1) * 100}vh`,
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        stateRef.current.progress = self.progress;
        // Use rAF to batch React state updates
        if (!animationIdRef.current) {
          animationIdRef.current = requestAnimationFrame(() => {
            animationIdRef.current = 0;
            updateState();
          });
        }
      },
    });

    triggerRefInner.current = st;

    // Manual initial update
    stateRef.current.progress = 0;
    updateState();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = 0;
      }
      if (triggerRefInner.current) {
        triggerRefInner.current.kill();
        triggerRefInner.current = null;
      }
    };
  }, [
    triggerRef,
    pinRef,
    totalFrames,
    scrollHeightMultiplier,
    phases,
    reducedMotion,
    updateState,
  ]);

  return state;
}
