"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function generateNodePositions(count: number, radius: number): [number, number, number][] {
  const positions: [number, number, number][] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    positions.push([
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    ]);
  }
  return positions;
}

const DEFAULT_COLORS = {
  primary: "#F5A623",
  secondary: "#A78BFA",
  connection: "#67E8F9",
} as const;

const IMPORTANT_INDICES = [0, 4, 8, 13, 17];

// ---------------------------------------------------------------------------
// FloatingNode – a single tiny sphere that bobs gently
// ---------------------------------------------------------------------------
function FloatingNode({
  position,
  size,
  color,
  speed,
}: {
  position: [number, number, number];
  size: number;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed;
      meshRef.current.position.x = position[0] + Math.sin(t) * 0.1;
      meshRef.current.position.y = position[1] + Math.cos(t * 0.7) * 0.1;
      meshRef.current.position.z = position[2] + Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// ConnectionLines – line segments between nearby "important" nodes
// ---------------------------------------------------------------------------
function ConnectionLines({
  nodes,
  threshold,
  color,
}: {
  nodes: [number, number, number][];
  threshold: number;
  color: string;
}) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];

    for (let i = 0; i < IMPORTANT_INDICES.length; i++) {
      for (let j = i + 1; j < IMPORTANT_INDICES.length; j++) {
        const a = nodes[IMPORTANT_INDICES[i]];
        const b = nodes[IMPORTANT_INDICES[j]];
        if (!a || !b) continue;
        const dist = Math.sqrt(
          (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
        );
        if (dist < threshold) {
          positions.push(...a, ...b);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes, threshold]);

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.15} />
    </lineSegments>
  );
}

// ---------------------------------------------------------------------------
// FloatingNodes – main component
// ---------------------------------------------------------------------------
export function FloatingNodes({
  count = 20,
  radius = 2.8,
  connectionThreshold = 4.5,
  nodeSize = { big: 0.1, small: 0.055 },
  colors = DEFAULT_COLORS,
}: {
  count?: number;
  radius?: number;
  connectionThreshold?: number;
  nodeSize?: { big: number; small: number };
  colors?: { primary: string; secondary: string; connection: string };
}) {
  const groupRef = useRef<THREE.Group>(null);

  const nodePositions = useMemo(() => generateNodePositions(count, radius), [count, radius]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => {
        const isImportant = IMPORTANT_INDICES.includes(i);
        return (
          <FloatingNode
            key={i}
            position={pos}
            size={isImportant ? nodeSize.big : nodeSize.small}
            color={isImportant ? colors.primary : colors.secondary}
            speed={0.3 + (i % 5) * 0.15}
          />
        );
      })}

      <ConnectionLines nodes={nodePositions} threshold={connectionThreshold} color={colors.connection} />
    </group>
  );
}
