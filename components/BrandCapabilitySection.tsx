"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";

type NodeId =
  | "intelligence"
  | "knowledge"
  | "narrative"
  | "visual"
  | "prototype"
  | "system";

type CapabilityNode = {
  id: NodeId;
  label: { en: string; zh: string };
  description: { en: string; zh: string };
  stage: 0 | 1 | 2;
};

const capabilityNodes: CapabilityNode[] = [
  {
    id: "intelligence",
    label: { en: "Intelligence", zh: "情报能力" },
    description: {
      en: "Track public information, industry shifts, media topics, and sentiment.",
      zh: "追踪公开信息、行业变化、媒体议题和舆情线索。",
    },
    stage: 0,
  },
  {
    id: "knowledge",
    label: { en: "Knowledge", zh: "知识能力" },
    description: {
      en: "Organize scattered material into references, answers, and cases.",
      zh: "把分散资料整理成口径、问答、案例和参考。",
    },
    stage: 0,
  },
  {
    id: "narrative",
    label: { en: "Narrative", zh: "叙事能力" },
    description: {
      en: "Shape communication for media, investors, social channels, and teams.",
      zh: "组织对媒体、投资者、社交平台和内部沟通的表达。",
    },
    stage: 1,
  },
  {
    id: "visual",
    label: { en: "Visual", zh: "视觉能力" },
    description: {
      en: "Turn ideas into articles, diagrams, pages, and video scripts.",
      zh: "把文章、图解、长图、页面和视频脚本做成更容易传播的形式。",
    },
    stage: 1,
  },
  {
    id: "prototype",
    label: { en: "Prototype", zh: "原型能力" },
    description: {
      en: "Move ideas into websites, dashboards, internal tools, and demos.",
      zh: "把想法推进成网站、仪表盘、内部工具和产品 Demo。",
    },
    stage: 1,
  },
  {
    id: "system",
    label: { en: "System", zh: "系统能力" },
    description: {
      en: "Connect monitoring, knowledge, content, publishing, and review.",
      zh: "把监测、知识、内容、发布和复盘串起来。",
    },
    stage: 2,
  },
];

const pathsByNode: Record<NodeId, NodeId[]> = {
  intelligence: ["intelligence", "narrative", "visual", "prototype", "system"],
  knowledge: ["knowledge", "narrative", "visual", "prototype", "system"],
  narrative: ["intelligence", "knowledge", "narrative", "system"],
  visual: ["intelligence", "knowledge", "visual", "system"],
  prototype: ["intelligence", "knowledge", "prototype", "system"],
  system: capabilityNodes.map((node) => node.id),
};

export function BrandCapabilitySection() {
  const { locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-18% 0px -18% 0px" });
  const [activeId, setActiveId] = useState<NodeId | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const timer = window.setTimeout(
        () => setRevealedCount(capabilityNodes.length),
        0,
      );
      return () => window.clearTimeout(timer);
    }

    const timers = capabilityNodes.map((_, index) =>
      window.setTimeout(() => setRevealedCount(index + 1), 140 + index * 150),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [isInView]);

  const highlighted = activeId ? new Set(pathsByNode[activeId]) : null;
  const stages = [
    {
      label: { en: "Input", zh: "输入" },
      nodes: capabilityNodes.filter((node) => node.stage === 0),
    },
    {
      label: { en: "Expression", zh: "表达" },
      nodes: capabilityNodes.filter((node) => node.stage === 1),
    },
    {
      label: { en: "Deposit", zh: "沉淀" },
      nodes: capabilityNodes.filter((node) => node.stage === 2),
    },
  ];

  return (
    <section
      ref={sectionRef}
      data-ripple-zone
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(34,211,238,0.08),transparent_38%)]" />
      <div className="relative mx-auto max-w-[var(--max-width)] px-5 sm:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
            {locale === "zh" ? "品牌能力" : "Brand Capability"}
          </p>
          <h2 className="mt-4 text-[32px] font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-[42px]">
            {locale === "zh" ? "输入 → 表达 → 沉淀" : "Input → Expression → Deposit"}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mt-12 rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.016))] p-5 sm:p-8">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[34px] opacity-35">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.045)_1px,transparent_1px)] bg-[size:36px_36px]" />
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-8 bottom-8 top-24 z-[1] hidden overflow-visible lg:block"
            >
              <defs>
                <marker
                  id="capability-arrow"
                  markerWidth="5"
                  markerHeight="5"
                  refX="4"
                  refY="2.5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M 0 0 L 5 2.5 L 0 5 z" fill="rgba(165,243,252,0.62)" />
                </marker>
              </defs>
              {[
                "M 26 25 C 31 25 33 20 38 20",
                "M 26 25 C 31 25 33 47 38 50",
                "M 26 25 C 31 25 33 74 38 80",
                "M 26 75 C 31 75 33 26 38 20",
                "M 26 75 C 31 75 33 53 38 50",
                "M 26 75 C 31 75 33 80 38 80",
                "M 62 20 C 66 20 67 44 71 50",
                "M 62 50 C 66 50 67 50 71 50",
                "M 62 80 C 66 80 67 56 71 50",
              ].map((path, index) => (
                <path
                  key={path}
                  d={path}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={revealedCount > (index < 6 ? 2 : 5) ? 0 : 1}
                  markerEnd="url(#capability-arrow)"
                  vectorEffect="non-scaling-stroke"
                  className="fill-none stroke-cyan-100/45 transition-[stroke-dashoffset,opacity] duration-700"
                  strokeWidth="0.38"
                  style={{
                    opacity: activeId ? 0.42 : 0.62,
                    transitionDelay: `${index * 45}ms`,
                  }}
                />
              ))}
            </svg>

            <div className="relative z-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr_0.8fr] lg:items-stretch lg:gap-16 xl:gap-20">
              {stages.map((stage, stageIndex) => (
                <div key={stage.label.en} className="relative flex min-w-0 flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-[10px] font-medium tracking-[0.2em] text-cyan-100/70">
                      0{stageIndex + 1}
                    </span>
                    <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                      {stage.label[locale]}
                    </p>
                    <div className="h-px flex-1 bg-white/8" />
                  </div>

                  <div
                    className={`grid flex-1 gap-3 ${
                      stageIndex === 1 ? "sm:grid-cols-3 lg:grid-cols-1" : ""
                    }`}
                  >
                    {stage.nodes.map((node) => {
                      const index = capabilityNodes.findIndex((item) => item.id === node.id);
                      const visible = index < revealedCount;
                      const isHighlighted = !highlighted || highlighted.has(node.id);
                      const isActive = activeId === node.id;

                      return (
                        <button
                          key={node.id}
                          type="button"
                          onMouseEnter={() => setActiveId(node.id)}
                          onFocus={() => setActiveId(node.id)}
                          onMouseLeave={() => setActiveId(null)}
                          onBlur={() => setActiveId(null)}
                          className={`group relative min-h-36 overflow-hidden rounded-[24px] border p-4 text-left transition-all duration-500 ${
                            node.id === "system"
                              ? "border-cyan-200/22 bg-cyan-200/[0.075]"
                              : "border-white/9 bg-[#07101d]/70"
                          } ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${
                            isHighlighted ? "" : "opacity-35"
                          } ${isActive ? "-translate-y-1 border-cyan-200/35 shadow-[0_22px_70px_-45px_rgba(34,211,238,0.7)]" : ""}`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-base font-medium text-[color:var(--text-primary)]">
                              {node.label[locale]}
                            </span>
                            <span
                              className={`h-2.5 w-2.5 rounded-full bg-cyan-200 transition-shadow duration-500 ${
                                visible ? "shadow-[0_0_18px_rgba(103,232,249,0.8)]" : ""
                              }`}
                            />
                          </div>
                          <p className="mt-4 text-sm leading-6 text-[color:var(--text-secondary)]">
                            {node.description[locale]}
                          </p>
                          <div className="absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan-200/70 to-blue-400/20 transition-transform duration-500 group-hover:scale-x-100" />
                        </button>
                      );
                    })}
                  </div>

                  {stageIndex < stages.length - 1 ? (
                    <div
                      className={`mx-auto my-2 h-8 w-px origin-top bg-gradient-to-b from-cyan-200/70 to-cyan-200/10 transition-transform duration-700 lg:hidden ${
                        revealedCount > (stageIndex === 0 ? 1 : 4) ? "scale-100" : "scale-0"
                      }`}
                    >
                      <span className="absolute -right-0.5 bottom-0 h-1.5 w-1.5 rotate-45 border-r border-t border-cyan-100/60" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
