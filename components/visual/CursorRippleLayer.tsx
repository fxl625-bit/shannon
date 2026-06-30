"use client";

import { useEffect, useRef } from "react";

type Ripple = {
  x: number;
  y: number;
  bornAt: number;
  strength: number;
};

const MAX_RIPPLES = 10;
const RIPPLE_LIFETIME = 1050;

export function CursorRippleLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef(0);
  const lastSpawnRef = useRef({ x: -999, y: -999, at: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (reducedMotion.matches || coarsePointer.matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let visible = !document.hidden;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      ripplesRef.current = ripplesRef.current.filter(
        (ripple) => now - ripple.bornAt < RIPPLE_LIFETIME,
      );

      for (const ripple of ripplesRef.current) {
        const progress = (now - ripple.bornAt) / RIPPLE_LIFETIME;
        const eased = 1 - Math.pow(1 - progress, 3);
        const radius = 24 + eased * 128;
        const alpha = Math.sin(progress * Math.PI) * 0.16 * ripple.strength;

        const glow = context.createRadialGradient(
          ripple.x,
          ripple.y,
          Math.max(0, radius - 18),
          ripple.x,
          ripple.y,
          radius + 22,
        );
        glow.addColorStop(0, "rgba(34,211,238,0)");
        glow.addColorStop(0.42, `rgba(34,211,238,${alpha * 0.32})`);
        glow.addColorStop(0.58, `rgba(96,165,250,${alpha})`);
        glow.addColorStop(0.7, `rgba(167,139,250,${alpha * 0.42})`);
        glow.addColorStop(1, "rgba(167,139,250,0)");

        context.fillStyle = glow;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius + 22, 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = `rgba(165,243,252,${alpha * 0.52})`;
        context.lineWidth = 0.7;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        context.stroke();
      }

      if (visible) rafRef.current = requestAnimationFrame(draw);
    };

    const spawn = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest("[data-ripple-zone]")) return;

      const now = performance.now();
      const last = lastSpawnRef.current;
      const distance = Math.hypot(event.clientX - last.x, event.clientY - last.y);
      if (distance < 34 || now - last.at < 70) return;

      lastSpawnRef.current = { x: event.clientX, y: event.clientY, at: now };
      ripplesRef.current.push({
        x: event.clientX,
        y: event.clientY,
        bornAt: now,
        strength: event.pointerType === "mouse" ? 1 : 0.55,
      });
      if (ripplesRef.current.length > MAX_RIPPLES) ripplesRef.current.shift();
    };

    const onVisibilityChange = () => {
      visible = !document.hidden;
      if (visible && !rafRef.current) rafRef.current = requestAnimationFrame(draw);
      if (!visible && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", spawn, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", spawn);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20 hidden mix-blend-screen md:block"
    />
  );
}
