/**
 * CanvasSequence.tsx — Pure canvas frame renderer
 *
 * Renders image frames onto a <canvas> element.
 * No scroll logic — just "draw this frame index".
 */

'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

export interface CanvasSequenceProps {
  /** Ordered list of frame URLs */
  frames: string[];
  /** Current frame index (0-based) to display */
  frameIndex: number;
  /** Poster image shown while loading */
  poster?: string;
  /** CSS class */
  className?: string;
  /** Called when the first frame is loaded and drawn */
  onReady?: () => void;
}

export function CanvasSequence({
  frames,
  frameIndex,
  poster,
  className = '',
  onReady,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const prevIdxRef = useRef(-1);
  const loadedRef = useRef(false);
  const [ready, setReady] = useState(false);

  const totalFrames = frames.length;

  // ── Preload frames ──
  useEffect(() => {
    const loaded = imagesRef.current;
    loaded.clear();
    loadedRef.current = false;
    setReady(false);

    let cancelled = false;
    let loadCount = 0;

    // Load first 5 frames eagerly, then rest lazily
    const eagerCount = Math.min(5, totalFrames);
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        loadCount++;
        if (!loadedRef.current && i === 0) {
          loadedRef.current = true;
          setReady(true);
          onReady?.();
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loadCount++;
      };

      if (i < eagerCount) {
        img.src = frames[i];
        loaded.set(i, img);
      } else {
        // Lazy load when index approaches
        const checkLoad = () => {
          if (cancelled) return;
          loaded.set(i, img);
          img.src = frames[i];
        };
        // Defer loading
        const timer = setTimeout(checkLoad, 2000 + i * 100);
        // Store timer for cleanup
        (img as any)._timer = timer;
      }
    }

    return () => {
      cancelled = true;
      loaded.forEach((img) => {
        if ((img as any)._timer) clearTimeout((img as any)._timer);
      });
      loaded.clear();
    };
  }, [frames, totalFrames, onReady]);

  // ── Image preload near current frame ──
  useEffect(() => {
    const loaded = imagesRef.current;
    const start = Math.max(0, frameIndex - 10);
    const end = Math.min(totalFrames - 1, frameIndex + 10);
    for (let i = start; i <= end; i++) {
      if (!loaded.has(i)) {
        const img = new Image();
        img.src = frames[i];
        loaded.set(i, img);
      }
    }
  }, [frameIndex, frames, totalFrames]);

  // ── Draw frame ──
  const draw = useCallback(
    (idx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = imagesRef.current.get(idx);
      if (!img || !img.complete || img.naturalWidth === 0) return;

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
    },
    []
  );

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
        draw(prevIdxRef.current >= 0 ? prevIdxRef.current : 0);
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [draw]);

  // ── Render loop ──
  useEffect(() => {
    const idx = Math.min(Math.max(0, frameIndex), totalFrames - 1);
    if (idx !== prevIdxRef.current) {
      draw(idx);
      prevIdxRef.current = idx;
    }
  }, [frameIndex, totalFrames, draw]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Poster / loading state */}
      {!ready && poster && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        />
      )}
      {!ready && !poster && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-[color:var(--cyan)] border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  );
}
