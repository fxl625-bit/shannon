"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";

const steps = [
  {
    en: "Signal",
    zh: "信号",
    detail: {
      en: "Public information, questions, material, and inspiration.",
      zh: "公开信息、问题、素材和灵感。",
    },
  },
  {
    en: "Understanding",
    zh: "理解",
    detail: {
      en: "Identify priorities, relationships, and risks.",
      zh: "判断重点、关系和风险。",
    },
  },
  {
    en: "Knowledge",
    zh: "知识",
    detail: {
      en: "Keep the useful parts ready for reuse.",
      zh: "沉淀成可复用的资料。",
    },
  },
  {
    en: "Workflow",
    zh: "流程",
    detail: {
      en: "Turn the steps into a stable routine.",
      zh: "把步骤整理成稳定做法。",
    },
  },
  {
    en: "Output",
    zh: "成果",
    detail: {
      en: "Create an article, report, page, tool, or decision.",
      zh: "形成文章、报告、页面、工具或决策。",
    },
  },
  {
    en: "Review",
    zh: "复盘",
    detail: {
      en: "Return the result to the system.",
      zh: "把结果再放回系统里。",
    },
  },
];

export function WorkflowSection() {
  const { locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-22% 0px -22% 0px" });
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const timer = window.setTimeout(() => setActiveIndex(steps.length - 1), 0);
      return () => window.clearTimeout(timer);
    }

    const startTimer = window.setTimeout(() => setActiveIndex(0), 0);
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current >= steps.length - 1 ? 0 : current + 1));
    }, 1050);
    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(timer);
    };
  }, [isInView]);

  const displayIndex = hoveredIndex ?? activeIndex;

  return (
    <section
      ref={sectionRef}
      data-ripple-zone
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.08),transparent_38%)]" />
      <div className="relative mx-auto max-w-[var(--max-width)] px-5 sm:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
            From Signal to Output
          </p>
          <h2 className="mt-4 text-[32px] font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-[42px]">
            {locale === "zh" ? "信息如何变成成果" : "From Signal to Output"}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="mt-12 rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.016))] p-5 sm:p-8"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative grid gap-3 md:grid-cols-6 md:gap-0">
              <div className="pointer-events-none absolute top-8 left-[calc(8.333333%+34px)] right-[calc(8.333333%+34px)] z-0 hidden h-px bg-white/8 md:block">
                <div
                  className="h-full origin-left bg-gradient-to-r from-cyan-200 to-blue-400 transition-transform duration-700"
                  style={{
                    transform: `scaleX(${Math.max(activeIndex, 0) / (steps.length - 1)})`,
                  }}
                />
              </div>

              {steps.map((step, index) => {
                const reached = activeIndex >= index;
                const selected = displayIndex === index;
                const muted = hoveredIndex !== null && !selected;

                return (
                  <div key={step.en} className="relative flex min-w-0 md:block">
                    {index < steps.length - 1 ? (
                      <div className="absolute left-5 top-12 z-0 h-[calc(100%-2rem)] w-px bg-white/8 md:hidden">
                        <div
                          className={`h-full origin-top bg-gradient-to-b from-cyan-200 to-blue-400 transition-transform duration-700 ${
                            reached ? "scale-100" : "scale-0"
                          }`}
                        />
                      </div>
                    ) : null}

                    <button
                      type="button"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onFocus={() => setHoveredIndex(index)}
                      onBlur={() => setHoveredIndex(null)}
                      className={`relative z-10 flex w-full items-start gap-4 rounded-[22px] px-3 py-3 text-left transition-opacity duration-300 md:flex-col md:items-center md:px-2 md:text-center ${
                        muted ? "opacity-35" : "opacity-100"
                      }`}
                    >
                      <span
                        className={`relative z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs ring-8 ring-[#07101d] transition-all duration-500 ${
                          selected
                            ? "border-cyan-100/70 bg-[#0b3143] text-white shadow-[0_0_32px_rgba(34,211,238,0.5)]"
                            : reached
                              ? "border-cyan-200/35 bg-[#092431] text-cyan-100"
                              : "border-white/10 bg-[#07101d] text-white/35"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                        {selected ? (
                          <span className="absolute inset-[-5px] animate-ping rounded-full border border-cyan-200/25" />
                        ) : null}
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-[color:var(--text-primary)]">
                          {step[locale]}
                        </span>
                        <span
                          className={`mt-1 block text-xs leading-5 text-[color:var(--text-muted)] transition-all duration-300 md:min-h-10 ${
                            selected ? "opacity-100" : "md:opacity-0"
                          }`}
                        >
                          {step.detail[locale]}
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
