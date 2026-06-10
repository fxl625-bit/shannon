"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// useIsMobile – co-located hook, identical pattern to HeroScene.tsx
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// MouseParallax – smooth lerp-based rotation following the cursor
// Matches the pattern from HeroScene.tsx exactly, with an `enabled` toggle.
// ---------------------------------------------------------------------------
function MouseParallax({
  children,
  enabled,
}: {
  children: React.ReactNode;
  enabled: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / size.width - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [size, enabled]);

  useFrame(() => {
    if (!enabled || !groupRef.current) return;
    groupRef.current.rotation.y +=
      (mouseRef.current.x * 0.15 - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x +=
      (mouseRef.current.y * 0.1 - groupRef.current.rotation.x) * 0.03;
  });

  if (!enabled) return <>{children}</>;

  return <group ref={groupRef}>{children}</group>;
}

// ---------------------------------------------------------------------------
// LoadedModel – inner component that calls useGLTF (suspends while fetching)
// Owns the animation group ref and runs the per-frame effects.
// ---------------------------------------------------------------------------
function LoadedModel({
  url,
  scale,
  position,
  rotation,
  isMobile,
  onLoad,
}: {
  url: string;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
  isMobile: boolean;
  onLoad?: () => void;
}) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!loadedRef.current) {
      loadedRef.current = true;
      onLoad?.();
    }
  }, [onLoad]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Slow Y-axis rotation
    groupRef.current.rotation.y += 0.002;

    // Slight tilt based on sine of elapsed time
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.05;

    // Breathing scale effect: 1 ± 0.02
    const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
    groupRef.current.scale.setScalar(breathe);
  });

  const effectiveScale = isMobile ? scale * 0.8 : scale;

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive object={scene} scale={effectiveScale} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Public props
// ---------------------------------------------------------------------------
export type ModelViewerProps = {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  onLoad?: () => void;
  onError?: () => void;
  parallax?: boolean;
};

// ---------------------------------------------------------------------------
// ModelViewer
// ---------------------------------------------------------------------------
export function ModelViewer({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onLoad,
  onError,
  parallax = true,
}: ModelViewerProps) {
  const isMobile = useIsMobile();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  // HEAD-check the model URL before rendering (same pattern as HeroScene.tsx)
  useEffect(() => {
    let cancelled = false;

    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        if (res.ok) {
          setReady(true);
        } else {
          setError(true);
          onError?.();
        }
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        onError?.();
      });

    return () => {
      cancelled = true;
    };
  }, [url, onError]);

  // Error state → return null (caller provides fallback)
  if (error) return null;

  // Loading state → return null (caller wraps in <Suspense> for fallback)
  if (!ready) return null;

  return (
    <MouseParallax enabled={parallax}>
      <LoadedModel
        url={url}
        scale={scale}
        position={position}
        rotation={rotation}
        isMobile={isMobile}
        onLoad={onLoad}
      />
    </MouseParallax>
  );
}
