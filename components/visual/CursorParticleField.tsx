"use client";

import { useEffect, useRef } from "react";

const REACH = 110;
const PARTICLE_COUNT = 1120;
const SPRING = 0.09;
const DAMPING = 0.76;
const COLORS = {
  orbit: ["#9aeaf4", "#a9b8ff", "#b399f3"],
  ribbon: ["#8bdde9", "#8db0eb", "#c0aef4"],
  horizon: ["#f9d4a2", "#f7b985", "#9ab5e5"],
};
type Shape = keyof typeof COLORS;

type Particle = {
  position: number;
  angle: number;
  spread: number;
  size: number;
  alpha: number;
  tint: number;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function CursorParticleField({ shape }: { shape: Shape }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const updateShapeRef = useRef<((next: Shape) => void) | null>(null);

  useEffect(() => {
    const element = canvasRef.current;
    const parent = element?.parentElement;
    const ctx = element?.getContext("2d");
    if (!element || !parent || !ctx) return;
    const canvas = element;
    const stage = parent;
    const context = ctx;

    const enabled = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
      position: (index + Math.random()) / PARTICLE_COUNT,
      angle: ((index + Math.random()) / PARTICLE_COUNT) * Math.PI * 2,
      spread: Math.random() + Math.random() - 1,
      size: 0.65 + Math.random() ** 2 * 1.5,
      alpha: 0.25 + Math.random() ** 2 * 0.62,
      tint: index % 3,
      homeX: 0,
      homeY: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    }));

    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    let sweepStarted = 0;
    let currentShape: Shape = "orbit";
    let hasArrangedParticles = false;
    let pointer: { x: number; y: number } | undefined;

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    }

    function draw(now: number) {
      frame = 0;
      const step = previousTime ? Math.min((now - previousTime) / 16.67, 2) : 1;
      previousTime = now;
      const damping = DAMPING ** step;
      const palette = COLORS[currentShape];
      const sweepProgress = (now - sweepStarted) / 1150;
      const isSweeping = sweepStarted > 0 && sweepProgress < 1;
      let moving = false;

      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        let forceX = 0;
        let forceY = 0;
        let proximity = 0;
        if (pointer) {
          // Use the resting point so particles settle around a stationary pointer.
          const dx = particle.homeX - pointer.x;
          const dy = particle.homeY - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < REACH) {
            proximity = 1 - distance / REACH;
            const force = (proximity ** 2 * 4.4) / distance;
            forceX = dx * force;
            forceY = dy * force;
          }
        }

        const ax = (particle.homeX - particle.x) * SPRING + forceX;
        const ay = (particle.homeY - particle.y) * SPRING + forceY;
        particle.vx = (particle.vx + ax * step) * damping;
        particle.vy = (particle.vy + ay * step) * damping;
        particle.x += particle.vx * step;
        particle.y += particle.vy * step;
        if (forceX === 0 && forceY === 0
          && Math.abs(particle.homeX - particle.x) + Math.abs(particle.homeY - particle.y) < 0.12
          && Math.abs(particle.vx) + Math.abs(particle.vy) < 0.04) {
          particle.x = particle.homeX;
          particle.y = particle.homeY;
          particle.vx = particle.vy = 0;
        }
        moving ||= Math.abs(particle.vx) + Math.abs(particle.vy) > 0.02
          || Math.abs(ax) + Math.abs(ay) > 0.006;

        const glint = isSweeping ? Math.max(0, 1 - Math.abs(particle.position - sweepProgress) * 13) : 0;
        const light = Math.max(glint, proximity);
        const size = particle.size * (1 + light * 0.75);
        context.fillStyle = palette[particle.tint];
        context.globalAlpha = Math.min(1, particle.alpha * (0.8 + light * 0.58));
        context.fillRect(particle.x, particle.y, size, size);
      }
      context.globalAlpha = 1;
      if (moving || isSweeping) queueDraw();
      else previousTime = 0;
    }

    function queueDraw() {
      if (!frame && enabled.matches && !document.hidden) {
        frame = requestAnimationFrame(draw);
      }
    }

    function arrangeParticles(snap: boolean) {
      const radiusX = Math.min(width * 0.41, 610);
      const radiusY = Math.min(height * 0.30, 245);
      for (const particle of particles) {
        const offset = particle.spread * 26;
        const lane = (particle.tint - 1) * 12;
        const along = particle.position * 2 - 1;

        if (currentShape === "orbit") {
          const strand = lane * (0.5 + 0.5 * Math.cos(particle.angle));
          const x = Math.cos(particle.angle) * (radiusX + offset + strand);
          const y = Math.sin(particle.angle) * (radiusY + offset + strand);
          particle.homeX = width * 0.5 + x;
          particle.homeY = height * 0.53 + y - x * 0.14;
        } else if (currentShape === "ribbon") {
          particle.homeX = width * (0.05 + particle.position * 0.9);
          particle.homeY = height * 0.76 + Math.sin(along * Math.PI * 1.65) * height * 0.075 + offset + lane;
        } else {
          particle.homeX = width * (0.08 + particle.position * 0.84);
          particle.homeY = height * 0.81 - (1 - along ** 2) * height * 0.12 + offset * 0.6 + lane;
        }

        if (snap) {
          const entrance = hasArrangedParticles ? 0 : 1;
          particle.x = particle.homeX + Math.cos(particle.angle) * entrance * 85;
          particle.y = particle.homeY + Math.sin(particle.angle) * entrance * 44;
          particle.vx = particle.vy = 0;
        }
      }
      hasArrangedParticles = true;
    }

    function reset() {
      stop();
      pointer = undefined;
      canvas.hidden = !enabled.matches;
      if (!enabled.matches || document.hidden) return;

      width = stage.clientWidth;
      height = stage.clientHeight;
      if (!width || !height) return;

      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      if (!hasArrangedParticles) sweepStarted = performance.now();
      arrangeParticles(true);
      queueDraw();
    }

    function onPointerMove(event: PointerEvent) {
      if (!enabled.matches || event.pointerType === "touch") return;
      const rect = stage.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      queueDraw();
    }

    function onPointerLeave() {
      if (!pointer) return;
      pointer = undefined;
      queueDraw();
    }

    const resizeObserver = new ResizeObserver(reset);
    resizeObserver.observe(stage);
    stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave);
    stage.addEventListener("pointercancel", onPointerLeave);
    enabled.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    updateShapeRef.current = next => {
      if (currentShape === next) return;
      currentShape = next;
      if (width && height && enabled.matches) {
        sweepStarted = performance.now();
        arrangeParticles(false);
        queueDraw();
      }
    };
    reset();

    return () => {
      updateShapeRef.current = null;
      stop();
      resizeObserver.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("pointercancel", onPointerLeave);
      enabled.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, []);

  useEffect(() => updateShapeRef.current?.(shape), [shape]);

  return (
    <canvas
      ref={canvasRef}
      data-cursor-particles
      data-particle-shape={shape}
      aria-hidden="true"
      hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
