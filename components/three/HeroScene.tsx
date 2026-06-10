"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { FallbackOrb } from "./FallbackOrb";
import { ModelViewer } from "./ModelViewer";

export function HeroScene() {
  const [glbExists, setGlbExists] = useState<boolean | null>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const modelUrl = `${basePath}/models/hero-orb.glb`;

  useEffect(() => {
    fetch(modelUrl, { method: "HEAD" })
      .then((res) => setGlbExists(res.ok))
      .catch(() => setGlbExists(false));
  }, [modelUrl]);

  return (
    <>
      {/* Bright ambient + hemisphere for natural fill */}
      <ambientLight intensity={1.0} />
      <hemisphereLight args={["#67E8F9", "#A78BFA", 0.8]} />
      {/* Key light - bright cyan */}
      <pointLight position={[8, 6, 5]} intensity={8.0} color="#67E8F9" distance={20} />
      {/* Fill light - violet */}
      <pointLight position={[-6, -3, 4]} intensity={4.0} color="#A78BFA" distance={20} />
      {/* Back rim */}
      <pointLight position={[0, 8, -6]} intensity={6.0} color="#60A5FA" distance={20} />
      {/* Bottom glow */}
      <pointLight position={[0, -5, 3]} intensity={3.0} color="#F5D7A1" distance={20} />

      {glbExists === true ? (
        <ModelViewer url={modelUrl} scale={0.65} position={[0, 0, 0]} />
      ) : glbExists === false ? (
        <FallbackOrb />
      ) : null}

      {/* Dawn for warm, bright reflections */}
      <Environment preset="dawn" />
    </>
  );
}
