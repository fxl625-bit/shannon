"use client";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { Reveal } from "@/components/animation/Reveal";
import type { Localized } from "@/data/site";

type LabCard = {
  title: Localized;
  description: Localized;
  status: { label: Localized; color: string };
};

const pageTitle: Localized = { en: "Experiments", zh: "实验" };

const pageEyebrow: Localized = {
  en: "Experimental / Prototyping",
  zh: "实验 / 原型开发",
};

const pageIntro: Localized = {
  en: "Experimental playground for AI workflows, agents, and tools.",
  zh: "AI 工作流、智能体与工具的试验场。",
};

const labCards: LabCard[] = [
  {
    title: { en: "Prompt Engineering Lab", zh: "提示词工程实验室" },
    description: {
      en: "Systematic experiments with few-shot, chain-of-thought, and structured output strategies across LLM providers.",
      zh: "跨 LLM 提供商的少样本、思维链和结构化输出策略的系统性实验。",
    },
    status: { label: { en: "Active", zh: "进行中" }, color: "var(--green)" },
  },
  {
    title: { en: "Agent Workflows Lab", zh: "智能体工作流实验室" },
    description: {
      en: "Building and evaluating multi-step agent pipelines with tool use, memory, and human-in-the-loop patterns.",
      zh: "构建和评估包含工具使用、记忆和人在回路模式的多步骤智能体流水线。",
    },
    status: { label: { en: "Active", zh: "进行中" }, color: "var(--green)" },
  },
  {
    title: { en: "Knowledge Graph Lab", zh: "知识图谱实验室" },
    description: {
      en: "Exploring graph-based RAG, entity extraction, and semantic linking for personal knowledge bases.",
      zh: "探索基于图谱的 RAG、实体提取和语义链接在个人知识库中的应用。",
    },
    status: {
      label: { en: "Prototyping", zh: "原型阶段" },
      color: "var(--cyan)",
    },
  },
  {
    title: { en: "Tool Building Lab", zh: "工具构建实验室" },
    description: {
      en: "Rapid prototyping of lightweight AI tools — from CLI utilities to browser-based interfaces.",
      zh: "轻量 AI 工具的快速原型开发——从命令行工具到浏览器界面。",
    },
    status: {
      label: { en: "Exploring", zh: "探索中" },
      color: "var(--violet)",
    },
  },
];

export default function LabPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={pageTitle} eyebrow={pageEyebrow}>
      <section className="py-12 sm:py-16">
        <Reveal>
          <div className="hero-enter max-w-3xl">
            <p className="text-base leading-8 text-[color:var(--text-secondary)] sm:text-lg">
              {pageIntro[locale]}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {labCards.map((card, index) => (
            <Reveal key={card.title.en} delay={index * 0.08}>
              <div className="methodology-card group transition-all duration-300 hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-hover)] hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[20px] leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[22px]">
                    {card.title[locale]}
                  </h3>
                  <span
                    className="inline-flex shrink-0 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em]"
                    style={{
                      borderColor: card.status.color,
                      color: card.status.color,
                      background: `color-mix(in srgb, ${card.status.color} 10%, transparent)`,
                    }}
                  >
                    {card.status.label[locale]}
                  </span>
                </div>
                <p className="mt-4 text-[14px] leading-[1.7] text-[color:var(--text-secondary)]">
                  {card.description[locale]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
