"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FloatingNodes } from "./FloatingNodes";

function CenterSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <meshPhysicalMaterial
        ref={materialRef}
        color="#112244"
        transparent
        opacity={0.25}
        roughness={0.02}
        metalness={0.05}
        transmission={0.6}
        thickness={0.8}
        envMapIntensity={1.0}
      />
    </mesh>
  );
}

function CoreGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      meshRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshBasicMaterial color="#67E8F9" transparent opacity={0.8} />
    </mesh>
  );
}

function InnerCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 1.5 + 1) * 0.2;
      meshRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.3, 24, 24]} />
      <meshBasicMaterial color="#F8FAFC" transparent opacity={1.0} />
    </mesh>
  );
}

function OrbitRing({
  radius,
  tilt,
  color,
  speed = 0.2,
  thickness = 0.015,
  opacity = 0.6,
}: {
  radius: number;
  tilt: [number, number, number];
  color: string;
  speed?: number;
  thickness?: number;
  opacity?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += speed * 0.008;
    }
  });

  return (
    <group ref={groupRef} rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, thickness, 12, 128]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

export function FallbackOrb() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center sphere — transparent glass */}
      <CenterSphere />

      {/* Bright glowing core layers */}
      <CoreGlow />
      <InnerCore />

      {/* Orbit rings — thicker, brighter */}
      <OrbitRing radius={2.0} tilt={[1.2, 0.3, 0]} color="#67E8F9" speed={0.3} thickness={0.018} opacity={0.7} />
      <OrbitRing radius={2.5} tilt={[-0.6, 1.0, 0.2]} color="#A78BFA" speed={0.2} thickness={0.015} opacity={0.6} />
      <OrbitRing radius={3.0} tilt={[0.8, -0.5, 0.4]} color="#60A5FA" speed={0.15} thickness={0.012} opacity={0.5} />

      {/* Knowledge nodes with connections */}
      <FloatingNodes
        count={24}
        radius={2.6}
        connectionThreshold={4.5}
        nodeSize={{ big: 0.12, small: 0.06 }}
        colors={{
          primary: "#F5D7A1",
          secondary: "#A78BFA",
          connection: "#67E8F9",
        }}
      />
    </group>
  );
}
