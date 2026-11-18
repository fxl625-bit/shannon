"use client";

import { useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { Reveal } from "@/components/animation/Reveal";
import type { Localized } from "@/data/site";

const pageTitle: Localized = { en: "AI-Agent Knowledge Base", zh: "AI-Agent 知识库" };

const pageEyebrow: Localized = {
  en: "How I organize information",
  zh: "我的信息组织方式",
};

type Section = {
  key: string;
  title: Localized;
  body: Localized;
};

const sections: Section[] = [
  {
    key: "sources",
    title: { en: "Keep the Source", zh: "保留来源" },
    body: {
      en: "Original captures stay available alongside their summaries. Topic notes connect related sources so I can return to the original context when I need to check a detail.",
      zh: "原始资料和摘要一起保留。主题笔记把相关来源连起来，需要确认细节时，可以回到原文和当时的上下文。",
    },
  },
  {
    key: "ai-collaboration",
    title: {
      en: "Working with AI",
      zh: "与 AI 协作",
    },
    body: {
      en: "The vault uses consistent tags and internal links, so both I and AI agents can find things quickly. Rules in config/ tell AI how to classify entries, summarize without copying full text, and where to log conflicting information. The AI helps with processing, but I keep the decisions.",
      zh: "知识库使用一致的标签和内部链接，人和 AI 都能快速找到内容。config/ 里的规则告诉 AI 如何分类、如何做摘要、来源冲突时记录到哪里。AI 帮我处理，判断还是我来做。",
    },
  },
  {
    key: "review-loop",
    title: {
      en: "Keeping It Clean",
      zh: "保持整洁",
    },
    body: {
      en: "I review the vault regularly. raw/ items get sorted. Old wiki entries get reviewed or archived. Orphan notes and broken links are detected through full scans. A recurring summary shows what's new and what needs attention.",
      zh: "定期回顾知识库。raw/ 里的内容会被归类。过时的 wiki 条目会被审查或归档。孤立笔记和断链通过全库扫描发现。定期总结告诉我都新增了什么、哪些需要处理。",
    },
  },
  {
    key: "sync",
    title: {
      en: "Sync",
      zh: "同步",
    },
    body: {
      en: "The vault stays consistent across devices through cloud sync. Files, rules, and outputs follow the same structure, so the work can continue from different machines.",
      zh: "知识库通过云同步在多台设备之间保持一致。文件、规则和输出结果保持同一套结构，方便在不同设备上继续工作。",
    },
  },
];

export default function AiAgentKnowledgeBasePage() {
  const { locale } = useLanguage();
  const [activeVaultNode, setActiveVaultNode] = useState<string | null>(null);
  const relatedVaultNodes: Record<string, string[]> = {
    raw: ["raw", "wiki", "scripts"],
    wiki: ["raw", "wiki", "config", "skills", "outputs"],
    config: ["config", "wiki", "skills"],
    skills: ["skills", "config", "scripts", "wiki"],
    scripts: ["scripts", "raw", "skills", "outputs"],
    outputs: ["outputs", "scripts", "wiki"],
  };
  const highlightedVaultNodes = activeVaultNode
    ? new Set(relatedVaultNodes[activeVaultNode])
    : null;

  return (
    <SiteShell title={pageTitle} eyebrow={pageEyebrow}>
      <section className="py-12 sm:py-16">
        <div className="space-y-12">
          <Reveal>
            <div
              data-ripple-zone
              className="editorial-panel p-5 sm:p-8"
              onMouseLeave={() => setActiveVaultNode(null)}
            >
              <h2 className="text-[24px] leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[30px]">
                {locale === "zh" ? "AI-Agent 知识库结构图" : "AI-Agent Knowledge Base Diagram"}
              </h2>
              <div className="mt-6">
                {/* Flow diagram */}
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  {/* Raw -> Wiki (main flow) */}
                  <button
                    type="button"
                    onMouseEnter={() => setActiveVaultNode("raw")}
                    onFocus={() => setActiveVaultNode("raw")}
                    onClick={() => setActiveVaultNode("raw")}
                    onBlur={() => setActiveVaultNode(null)}
                    className={`w-full max-w-xs rounded-xl border p-4 text-center transition-all duration-300 ${
                      highlightedVaultNodes && !highlightedVaultNodes.has("raw")
                        ? "border-[color:var(--border)] bg-[color:var(--surface)] opacity-35"
                        : "border-cyan-300/25 bg-cyan-300/[0.06] shadow-[0_18px_60px_-48px_rgba(34,211,238,0.7)]"
                    }`}
                  >
                    <p className="text-sm font-semibold text-[color:var(--cyan)]">raw/</p>
                    <p className="mt-1 text-[11px] text-[color:var(--text-muted)]">
                      {locale === "zh" ? "来自 Douyin、微信、小红书等平台的原始内容" : "Raw captures from Douyin, WeChat, Xiaohongshu, and more"}
                    </p>
                  </button>
                  <div className="vault-connector" data-active={Boolean(activeVaultNode)} aria-hidden />
                  <button
                    type="button"
                    onMouseEnter={() => setActiveVaultNode("wiki")}
                    onFocus={() => setActiveVaultNode("wiki")}
                    onClick={() => setActiveVaultNode("wiki")}
                    onBlur={() => setActiveVaultNode(null)}
                    className={`w-full max-w-xs rounded-xl border p-4 text-center transition-all duration-300 ${
                      highlightedVaultNodes && !highlightedVaultNodes.has("wiki")
                        ? "border-[color:var(--border)] bg-[color:var(--surface)] opacity-35"
                        : "border-violet-300/25 bg-violet-300/[0.06] shadow-[0_18px_60px_-48px_rgba(167,139,250,0.7)]"
                    }`}
                  >
                    <p className="text-sm font-semibold text-[color:var(--violet)]">wiki/</p>
                    <p className="mt-1 text-[11px] text-[color:var(--text-muted)]">
                      {locale === "zh" ? "按集合、来源、主题整理的策展条目" : "Curated entries in collections, sources, and topics"}
                    </p>
                  </button>
                </div>

                {/* Support layers */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveVaultNode("config")}
                    onFocus={() => setActiveVaultNode("config")}
                    onClick={() => setActiveVaultNode("config")}
                    onBlur={() => setActiveVaultNode(null)}
                    className={`rounded-xl border p-3 text-center transition-all duration-300 ${
                      highlightedVaultNodes && !highlightedVaultNodes.has("config")
                        ? "border-[color:var(--border)] bg-[color:var(--surface-soft)] opacity-35"
                        : "border-blue-300/25 bg-blue-300/[0.06]"
                    }`}
                  >
                    <p className="text-xs font-semibold text-[color:var(--blue)]">config/</p>
                    <p className="mt-1 text-[10px] text-[color:var(--text-muted)]">
                      {locale === "zh" ? "规则与分类标准" : "Rules and classification"}
                    </p>
                  </button>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveVaultNode("skills")}
                    onFocus={() => setActiveVaultNode("skills")}
                    onClick={() => setActiveVaultNode("skills")}
                    onBlur={() => setActiveVaultNode(null)}
                    className={`rounded-xl border p-3 text-center transition-all duration-300 ${
                      highlightedVaultNodes && !highlightedVaultNodes.has("skills")
                        ? "border-[color:var(--border)] bg-[color:var(--surface-soft)] opacity-35"
                        : "border-amber-300/25 bg-amber-300/[0.06]"
                    }`}
                  >
                    <p className="text-xs font-semibold text-[color:var(--warm)]">skills/</p>
                    <p className="mt-1 text-[10px] text-[color:var(--text-muted)]">
                      {locale === "zh" ? "Workflows · Atomic · Bridge · Orchestrator" : "Workflows · Atomic · Bridge · Orchestrator"}
                    </p>
                  </button>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveVaultNode("scripts")}
                    onFocus={() => setActiveVaultNode("scripts")}
                    onClick={() => setActiveVaultNode("scripts")}
                    onBlur={() => setActiveVaultNode(null)}
                    className={`rounded-xl border p-3 text-center transition-all duration-300 ${
                      highlightedVaultNodes &&
                      !highlightedVaultNodes.has("scripts") &&
                      !highlightedVaultNodes.has("outputs")
                        ? "border-[color:var(--border)] bg-[color:var(--surface-soft)] opacity-35"
                        : "border-emerald-300/25 bg-emerald-300/[0.06]"
                    }`}
                  >
                    <p className="text-xs font-semibold text-[color:var(--green)]">
                      scripts/ + outputs/
                    </p>
                    <p className="mt-1 text-[10px] text-[color:var(--text-muted)]">
                      {locale === "zh" ? "自动化脚本与生成结果" : "Automation scripts and generated outputs"}
                    </p>
                  </button>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-[color:var(--text-muted)] text-center max-w-2xl mx-auto">
                  {locale === "zh"
                    ? "内容从多个平台流入 raw/，整理后进入 wiki/。config/ 和 skills/ 提供规则和可复用能力，scripts/ 负责自动化处理，outputs/ 存放最终结果。"
                    : "Content flows in from various platforms into raw/, then into wiki/ after processing. config/ and skills/ provide rules and reusable capabilities, scripts/ handle automation, and outputs/ store the results."}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((section, index) => (
              <Reveal key={section.key} delay={(index % 2) * 0.08} className="h-full">
                <section className="editorial-panel h-full p-5 sm:p-7">
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{section.title[locale]}</h2>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">{section.body[locale]}</p>
                </section>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </SiteShell>
  );
}
