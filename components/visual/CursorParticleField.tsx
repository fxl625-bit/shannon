"use client";

import { useEffect, useRef } from "react";

const REACH = 110;
const PARTICLE_COUNT = 1440;
const SPRING = 0.09;
const DAMPING = 0.76;
const COLORS = ["#9aeaf4", "#a9b8ff", "#b399f3"];

type Particle = {
  angle: number;
  spread: number;
  size: number;
  alpha: number;
  color: string;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function CursorParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvasRef.current;
    const parent = element?.parentElement;
    const ctx = element?.getContext("2d");
    if (!element || !parent || !ctx) return;
    const canvas = element;
    const stage = parent;
    const context = ctx;

    const enabled = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
      angle: ((index + Math.random()) / PARTICLE_COUNT) * Math.PI * 2,
      spread: Math.random() + Math.random() - 1,
      size: 0.65 + Math.random() ** 2 * 1.5,
      alpha: 0.25 + Math.random() ** 2 * 0.62,
      color: COLORS[index % COLORS.length],
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
      let moving = false;

      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        let forceX = 0;
        let forceY = 0;
        if (pointer) {
          // Use the resting point so particles settle around a stationary pointer.
          const dx = particle.homeX - pointer.x;
          const dy = particle.homeY - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < REACH) {
            const force = ((1 - distance / REACH) ** 2 * 4.4) / distance;
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
        moving ||= Math.abs(particle.vx) + Math.abs(particle.vy) > 0.02
          || Math.abs(ax) + Math.abs(ay) > 0.006;

        context.fillStyle = particle.color;
        context.globalAlpha = particle.alpha;
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
      }
      context.globalAlpha = 1;
      if (moving) queueDraw();
      else previousTime = 0;
    }

    function queueDraw() {
      if (!frame && enabled.matches && !document.hidden) {
        frame = requestAnimationFrame(draw);
      }
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
      const radiusX = width * 0.255;
      const radiusY = Math.min(height * 0.33, 220);
      for (const particle of particles) {
        const spread = particle.spread * (12 + 17 * Math.abs(Math.sin(particle.angle)));
        const x = Math.cos(particle.angle) * (radiusX + spread);
        const y = Math.sin(particle.angle) * (radiusY + spread);
        particle.x = particle.homeX = width * 0.295 + x;
        particle.y = particle.homeY = height * 0.5 + y - x * 0.14;
        particle.vx = particle.vy = 0;
      }
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
    reset();

    return () => {
      stop();
      resizeObserver.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("pointercancel", onPointerLeave);
      enabled.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-cursor-particles
      aria-hidden="true"
      hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  );
}
