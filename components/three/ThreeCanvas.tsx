"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef, type ReactNode } from "react";
import * as THREE from "three";

type ThreeCanvasProps = {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function ThreeCanvas({ children, className = "", fallback }: ThreeCanvasProps) {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const dpr = isMobile ? 1 : Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 2, 2);

  const cameraPos: [number, number, number] = isMobile ? [0, 0, 7] : [0, 0.5, 7];

  return (
    <div className={className}>
      <Canvas
        dpr={dpr}
        camera={{ position: cameraPos, fov: 35 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5,
        }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
