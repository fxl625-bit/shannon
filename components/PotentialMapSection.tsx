"use client";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/animation/Reveal";
import { potentialMap, connections, type MapNode } from "@/data/potential-map";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

function NodeItem({
  node,
  index,
  isActive,
  isHighlighted,
  onHover,
  onLeave,
  groupIndex,
}: {
  node: MapNode;
  index: number;
  isActive: boolean;
  isHighlighted: boolean;
  onHover: () => void;
  onLeave: () => void;
  groupIndex: number;
}) {
  const { locale } = useLanguage();
  const colors = ["var(--cyan)", "var(--violet)", "var(--blue)"];
  const color = colors[groupIndex] || colors[0];

  return (
    <motion.div
      className="group relative cursor-default"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.95 }}
      transition={{ duration: 0.5, delay: groupIndex * 0.3 + index * 0.08 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ${
          isHighlighted
            ? "border-[color:var(--border-strong)] bg-[color:var(--surface-hover)]"
            : "border-[color:var(--border)] bg-[color:var(--surface)]"
        }`}
      >
        <div
          className="h-2 w-2 shrink-0 rounded-full transition-all duration-300"
          style={{
            backgroundColor: isHighlighted ? color : "var(--text-muted)",
            boxShadow: isHighlighted ? `0 0 8px ${color}` : "none",
          }}
        />
        <div>
          <p className="text-sm font-medium text-[color:var(--text-primary)]">
            {node.label[locale]}
          </p>
          <p className="text-[11px] text-[color:var(--text-muted)] group-hover:text-[color:var(--text-secondary)] transition-colors">
            {node.description[locale]}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function GroupColumn({
  group,
  groupIndex,
  activeNodes,
  highlightedNodes,
  onNodeHover,
  onNodeLeave,
}: {
  group: (typeof potentialMap)[0];
  groupIndex: number;
  activeNodes: boolean;
  highlightedNodes: Set<string>;
  onNodeHover: (id: string) => void;
  onNodeLeave: () => void;
}) {
  const { locale } = useLanguage();
  const colors = ["var(--cyan)", "var(--violet)", "var(--blue)"];

  return (
    <div className="space-y-4" data-group-id={group.id}>
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -10 }}
        animate={activeNodes ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: groupIndex * 0.3 }}
      >
        <div
          className="h-6 w-1 rounded-full"
          style={{ backgroundColor: colors[groupIndex] }}
        />
        <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">
          {group.title[locale]}
        </h3>
      </motion.div>

      <div className="space-y-2">
        {group.nodes.map((node, i) => (
          <div key={node.id} data-node-id={node.id}>
            <NodeItem
              node={node}
              index={i}
              isActive={activeNodes}
              isHighlighted={highlightedNodes.has(node.id)}
              onHover={() => onNodeHover(node.id)}
              onLeave={onNodeLeave}
              groupIndex={groupIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SVGConnections({
  hoveredNode,
  containerRef,
}: {
  hoveredNode: string | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { locale } = useLanguage();
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [nodePositions, setNodePositions] = useState(new Map<string, { x: number; y: number }>());

  // Measure container dimensions via ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const update = () => {
      setDims({
        w: el.offsetWidth,
        h: el.offsetHeight,
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  // Compute node positions whenever dimensions change (in effect, not useMemo)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || dims.w === 0) {
      setNodePositions(new Map());
      return;
    }
    const map = new Map<string, { x: number; y: number }>();
    const groups = el.querySelectorAll("[data-group-id]");
    groups.forEach((groupEl) => {
      const nodes = groupEl.querySelectorAll("[data-node-id]");
      nodes.forEach((nodeEl) => {
        const id = nodeEl.getAttribute("data-node-id");
        if (!id) return;
        const rect = nodeEl.getBoundingClientRect();
        const containerRect = el.getBoundingClientRect();
        map.set(id, {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        });
      });
    });
    setNodePositions(map);
  }, [dims, containerRef]);

  const colors = ["#67E8F9", "#A78BFA", "#60A5FA"];
  const groupColors = ["#67E8F9", "#A78BFA", "#60A5FA"];

  // All connections to draw
  const visibleConnections = useMemo(() => {
    if (hoveredNode) {
      return connections.filter(
        (c) => c.from === hoveredNode || c.to === hoveredNode
      );
    }
    return connections;
  }, [hoveredNode]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
      width={dims.w}
      height={dims.h}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="lineGradCyan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="lineGradViolet" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="lineGradBlue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="lineGradHighlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.05" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {visibleConnections.map((conn, i) => {
        const fromPos = nodePositions.get(conn.from);
        const toPos = nodePositions.get(conn.to);
        if (!fromPos || !toPos) return null;

        const fromGroup = potentialMap.findIndex((g) =>
          g.nodes.some((n) => n.id === conn.from)
        );
        const toGroup = potentialMap.findIndex((g) =>
          g.nodes.some((n) => n.id === conn.to)
        );
        const groupIdx = Math.max(0, fromGroup, toGroup);
        const colorKey = groupIdx % 3;

        const isHighlighted =
          hoveredNode !== null &&
          (conn.from === hoveredNode || conn.to === hoveredNode);

        // Arced path for visual elegance
        const midX = (fromPos.x + toPos.x) / 2;
        const midY = (fromPos.y + toPos.y) / 2 - 20;
        const path = `M${fromPos.x},${fromPos.y} Q${midX},${midY} ${toPos.x},${toPos.y}`;

        return (
          <motion.path
            key={`${conn.from}-${conn.to}`}
            d={path}
            fill="none"
            stroke={
              isHighlighted
                ? "url(#lineGradHighlight)"
                : `url(#lineGrad${["Cyan", "Violet", "Blue"][colorKey]})`
            }
            strokeWidth={isHighlighted ? 2 : 1}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: isHighlighted ? 1 : 0.6,
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.03,
              ease: [0.22, 1, 0.36, 1],
            }}
            filter={isHighlighted ? "url(#glow)" : undefined}
          />
        );
      })}

      {/* Connection dots at end points when hovered */}
      {hoveredNode &&
        visibleConnections.map((conn) => {
          const toPos = nodePositions.get(conn.to);
          if (!toPos) return null;
          return (
            <motion.circle
              key={`dot-${conn.to}`}
              cx={toPos.x}
              cy={toPos.y}
              r={3}
              fill="#67E8F9"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              filter="url(#glow)"
            />
          );
        })}
    </svg>
  );
}

export function PotentialMapSection() {
  const { locale } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const highlightedNodes = useMemo(() => {
    const set = new Set<string>();
    if (hoveredNode) {
      set.add(hoveredNode);
      connections.forEach((c) => {
        if (c.from === hoveredNode) set.add(c.to);
        if (c.to === hoveredNode) set.add(c.from);
      });
    }
    return set;
  }, [hoveredNode]);

  return (
    <section id="experiments" className="relative py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-[var(--max-width)] px-5 sm:px-8">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
              {locale === "zh" ? "认知扩展图谱" : "Cognitive Extension Map"}
            </span>
            <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[42px]">
              {locale === "zh"
                ? "人输入，AI 处理，人输出"
                : "Human Input, AI Process, Human Output"}
            </h2>
            <p className="mt-4 text-base leading-7 text-[color:var(--text-secondary)]">
              {locale === "zh"
                ? "这不是一个系统架构图，而是一个认知被 AI 扩展后的结构图。"
                : "Not a system architecture diagram, but a map of cognition extended by AI."}
            </p>
          </div>
        </Reveal>

        <div className="relative" ref={containerRef}>
          <SVGConnections hoveredNode={hoveredNode} containerRef={containerRef} />

          <div className="grid gap-8 lg:grid-cols-3">
            {potentialMap.map((group, i) => (
              <GroupColumn
                key={group.id}
                group={group}
                groupIndex={i}
                activeNodes={inView}
                highlightedNodes={highlightedNodes}
                onNodeHover={setHoveredNode}
                onNodeLeave={() => setHoveredNode(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
