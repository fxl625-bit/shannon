/**
 * ParticleOverlay.tsx — Canvas 2D particle system
 *
 * Particle density and intensity driven by GSAP scroll progress.
 * Particles react to mouse position with subtle offset.
 */

'use client';

import { useRef, useEffect, useMemo, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  life: number;
}

export interface ParticleOverlayProps {
  gsapProgress: number;
  mouseX?: number;
  mouseY?: number;
  className?: string;
  simplified?: boolean;
}

const COUNT = 80;
const COUNT_MOBILE = 30;
const CONNECTION_DIST = 140;

export function ParticleOverlay({
  gsapProgress,
  mouseX = 0,
  mouseY = 0,
  className = '',
  simplified = false,
}: ParticleOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: mouseX, y: mouseY });

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  // Intensity curve: peaks in the 0.3-0.7 range, fades at edges
  const intensity = useMemo(() => {
    const p = gsapProgress;
    if (p < 0.1) return p / 0.1;          // 0→1 ramp up
    if (p < 0.7) return 0.8 + (p - 0.1) / 0.6 * 0.2; // 0.8→1
    if (p < 0.85) return 1 - (p - 0.7) / 0.15 * 0.6; // 1→0.4
    return Math.max(0.05, 1 - (p - 0.85) / 0.15);    // 0.4→0
  }, [gsapProgress]);

  const count = simplified ? COUNT_MOBILE : COUNT;
  const activeCount = Math.round(count * intensity);

  const initParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
          baseAlpha: Math.random() * 0.4 + 0.1,
          life: Math.random(),
        });
      }
      particlesRef.current = particles;
    },
    [count]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (particlesRef.current.length === 0) initParticles(canvas);

    function animate() {
      if (!running || !canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mx = mouseRef.current.x * 20;
      const my = mouseRef.current.y * 20;

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        if (i < activeCount) {
          p.x += p.vx + mx * 0.002;
          p.y += p.vy + my * 0.002;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
          p.life = Math.min(1, p.life + 0.003);
        }

        if (i < activeCount) {
          const alpha = p.baseAlpha * (0.3 + 0.7 * intensity);
          ctx.beginPath();
          ctx.arc(p.x * dpr, p.y * dpr, p.size * dpr, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(103, 232, 249, ${alpha * 0.6})`;
          ctx.fill();

          // Glow
          ctx.beginPath();
          ctx.arc(p.x * dpr, p.y * dpr, p.size * 2.5 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(103, 232, 249, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      // Connection lines
      if (activeCount > 1 && !simplified) {
        for (let i = 0; i < activeCount; i++) {
          for (let j = i + 1; j < activeCount; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = (a.x - b.x) * dpr;
            const dy = (a.y - b.y) * dpr;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_DIST * dpr) {
              const alpha =
                (1 - dist / (CONNECTION_DIST * dpr)) * 0.15 * intensity;
              ctx.beginPath();
              ctx.moveTo(a.x * dpr, a.y * dpr);
              ctx.lineTo(b.x * dpr, b.y * dpr);
              ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
              ctx.lineWidth = 0.5 * dpr;
              ctx.stroke();
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      ro.disconnect();
    };
  }, [activeCount, intensity, simplified, count, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden
    />
  );
}
