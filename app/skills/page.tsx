"use client";

import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { SkillOS, type SkillOsItem, type SkillOsStat } from "@/components/skills/SkillOS";
import type { Localized } from "@/data/site";

const pageTitle: Localized = { en: "Workflows", zh: "\u5de5\u4f5c\u6d41" };

const pageEyebrow: Localized = {
  en: "How I work",
  zh: "\u6211\u7684\u5de5\u4f5c\u65b9\u5f0f",
};

const pageIntro: Localized = {
  en: "Most of these routines came from everyday work. The ones I kept using gradually turned into reusable skills.",
  zh: "\u8fd9\u4e9b\u6d41\u7a0b\u591a\u534a\u662f\u4ece\u65e5\u5e38\u5de5\u4f5c\u91cc\u957f\u51fa\u6765\u7684\u3002\u7528\u5f97\u8db3\u591f\u591a\uff0c\u5c31\u6162\u6162\u6c89\u6dc0\u6210\u53ef\u590d\u7528\u7684 Skill\u3002",
};

// Verified against the canonical Obsidian package registry and directories.
const inventoryDate = "2026-11-17";
const skillStats: SkillOsStat[] = [
  {
    count: 39,
    label: { en: "Workflows", zh: "\u5de5\u4f5c\u6d41" },
    description: {
      en: "End-to-end routines for research, writing, video processing, meeting review, and reports.",
      zh: "\u4ece\u8d44\u6599\u6536\u96c6\u5230\u5199\u4f5c\u3001\u89c6\u9891\u5904\u7406\u3001\u4f1a\u8bae\u6574\u7406\u548c\u62a5\u544a\u751f\u6210\u7684\u5b8c\u6574\u6d41\u7a0b\u3002",
    },
    category: "workflow",
  },
  {
    count: 30,
    label: { en: "Atomic Skills", zh: "\u539f\u5b50\u80fd\u529b" },
    description: {
      en: "Focused capabilities for verification, scraping, documents, testing, and cleanup.",
      zh: "\u7528\u4e8e\u6838\u9a8c\u3001\u6293\u53d6\u3001\u6587\u6863\u3001\u6d4b\u8bd5\u548c\u6e05\u7406\u7684\u805a\u7126\u80fd\u529b\u5355\u5143\u3002",
    },
    category: "atomic",
  },
  {
    count: 14,
    label: { en: "Bridges", zh: "\u6865\u63a5\u80fd\u529b" },
    description: {
      en: "The connectors between AI, local tools, hardware signals, archives, and publishing.",
      zh: "\u628a AI\u3001\u672c\u5730\u5de5\u5177\u3001\u786c\u4ef6\u4fe1\u53f7\u3001\u5f52\u6863\u4e0e\u53d1\u5e03\u6e20\u9053\u4e32\u8d77\u6765\u7684\u8fde\u63a5\u5c42\u3002",
    },
    category: "bridge",
  },
  {
    count: 3,
    label: { en: "Orchestrator", zh: "\u7f16\u6392\u5668" },
    description: {
      en: "The routing layer that coordinates longer tasks across multiple skills.",
      zh: "\u8d1f\u8d23\u5728\u591a\u4e2a Skill \u4e4b\u95f4\u8def\u7531\u3001\u8c03\u5ea6\u548c\u4e32\u8054\u7684\u6838\u5fc3\u5c42\u3002",
    },
    category: "orchestrator",
  },
];

const skillItems: SkillOsItem[] = [
  {
    id: "content-production",
    name: { en: "Content Production", zh: "\u5185\u5bb9\u751f\u4ea7" },
    category: "workflow",
    description: {
      en: "From gathering information to drafting, publishing, and archiving in one continuous content pipeline.",
      zh: "\u4ece\u4fe1\u606f\u6536\u96c6\u5230\u5199\u7a3f\u3001\u53d1\u5e03\u548c\u5f52\u6863\uff0c\u7ec4\u6210\u4e00\u6761\u8fde\u7eed\u8fd0\u884c\u7684\u5185\u5bb9\u751f\u4ea7\u7ebf\u3002",
    },
    outputs: {
      en: ["Reports", "Published Content"],
      zh: ["\u62a5\u544a", "\u53d1\u5e03\u5185\u5bb9"],
    },
  },
  {
    id: "research-analysis",
    name: { en: "Research & Analysis", zh: "\u7814\u7a76\u4e0e\u5206\u6790" },
    category: "workflow",
    description: {
      en: "A workflow for collecting sources, verifying them, structuring findings, and producing reports.",
      zh: "\u7528\u4e8e\u6536\u96c6\u6765\u6e90\u3001\u9a8c\u8bc1\u3001\u6574\u7406\u4e0e\u751f\u6210\u62a5\u544a\u7684\u5b8c\u6574\u6d41\u7a0b\u3002",
    },
    outputs: {
      en: ["Research Memos", "Evidence Maps"],
      zh: ["\u7814\u62a5", "\u8bc1\u636e\u5730\u56fe"],
    },
  },
  {
    id: "monitoring-intelligence",
    name: { en: "Monitoring & Intelligence", zh: "\u76d1\u6d4b\u4e0e\u60c5\u62a5" },
    category: "workflow",
    description: {
      en: "Multi-platform tracking, competitive scanning, and public-signal collection for ongoing situational awareness.",
      zh: "\u7528\u4e8e\u591a\u5e73\u53f0\u76d1\u6d4b\u3001\u7ade\u54c1\u626b\u63cf\u4e0e\u516c\u5f00\u4fe1\u53f7\u6536\u96c6\u7684\u6301\u7eed\u6027\u60c5\u62a5\u6d41\u3002",
    },
    outputs: {
      en: ["Trend Notes", "Competitive Snapshots"],
      zh: ["\u8d8b\u52bf\u7b14\u8bb0", "\u7ade\u54c1\u5feb\u7167"],
    },
  },
  {
    id: "knowledge-management",
    name: { en: "Knowledge Management", zh: "\u77e5\u8bc6\u7ba1\u7406" },
    category: "workflow",
    description: {
      en: "Archive-first routines that sink content into Obsidian for future retrieval, reuse, and review.",
      zh: "\u4ee5\u5f52\u6863\u4e3a\u5148\u7684\u77e5\u8bc6\u6d41\u7a0b\uff0c\u628a\u5185\u5bb9\u6c89\u6dc0\u5230 Obsidian \u4ee5\u4fbf\u540e\u7eed\u68c0\u7d22\u548c\u590d\u7528\u3002",
    },
    outputs: {
      en: ["Archive Pages", "Review Loops"],
      zh: ["\u5f52\u6863\u9875", "\u590d\u76d8\u95ed\u73af"],
    },
  },
  {
    id: "geo-retest",
    name: { en: "GEO Retesting", zh: "GEO 复测" },
    category: "workflow",
    description: {
      en: "Keep the questions, model, and response mode fixed, then compare only valid answers across runs.",
      zh: "固定题集、模型和回答模式，逐题核对原答，再比较同口径的有效结果。",
    },
  },
  {
    id: "news-video",
    name: { en: "News Video Production", zh: "新闻短片制作" },
    category: "workflow",
    description: {
      en: "Carry a source brief through script, visual selection, narration, subtitles, and final review.",
      zh: "从一份原始材料出发，完成脚本、画面、配音、字幕和成片复核。",
    },
  },
  {
    id: "app-release",
    name: { en: "Android Release Verification", zh: "Android 发布核验" },
    category: "workflow",
    description: {
      en: "Check the version and signature, verify the release track, and recheck the public listing.",
      zh: "核对版本和签名，查看发布轨道，并回到公开商店检查实际展示。",
    },
  },
  {
    id: "fact-checking",
    name: { en: "Fact Checking", zh: "\u4e8b\u5b9e\u6838\u67e5" },
    category: "atomic",
    description: {
      en: "A focused verification unit for validating claims before they move downstream.",
      zh: "\u5728\u4fe1\u606f\u7ee7\u7eed\u5f80\u4e0b\u6e38\u6d41\u52a8\u4e4b\u524d\uff0c\u5148\u5bf9\u5173\u952e\u65ad\u8a00\u8fdb\u884c\u6838\u67e5\u3002",
    },
  },
  {
    id: "evidence-grading",
    name: { en: "Evidence Grading", zh: "\u8bc1\u636e\u5206\u7ea7" },
    category: "atomic",
    description: {
      en: "Separates strong sources from weak ones so downstream outputs inherit confidence, not noise.",
      zh: "\u628a\u5f3a\u8bc1\u636e\u548c\u5f31\u8bc1\u636e\u5206\u5f00\uff0c\u8ba9\u540e\u7eed\u8f93\u51fa\u627f\u63a5\u7684\u662f\u786e\u4fe1\u5ea6\uff0c\u800c\u4e0d\u662f\u566a\u97f3\u3002",
    },
  },
  {
    id: "multi-platform-scraping",
    name: { en: "Multi-platform Scraping", zh: "\u591a\u5e73\u53f0\u6293\u53d6" },
    category: "atomic",
    description: {
      en: "A small but reusable ingestion unit for gathering material from multiple public sources.",
      zh: "\u4e00\u4e2a\u7528\u4e8e\u4ece\u591a\u4e2a\u516c\u5f00\u5e73\u53f0\u6536\u6750\u7684\u53ef\u590d\u7528\u8f93\u5165\u5355\u5143\u3002",
    },
  },
  {
    id: "web-e2e",
    name: { en: "Web E2E Testing", zh: "\u7f51\u9875 E2E \u6d4b\u8bd5" },
    category: "atomic",
    description: {
      en: "Verification steps for making sure flows work end to end instead of only in isolated states.",
      zh: "\u7528\u4e8e\u786e\u8ba4\u6574\u6761\u4ea4\u4e92\u94fe\u8def\u662f\u5426\u771f\u6b63\u901a\u987a\uff0c\u800c\u4e0d\u53ea\u662f\u5c40\u90e8\u72b6\u6001\u53ef\u7528\u3002",
    },
  },
  {
    id: "document-handling",
    name: { en: "Document Handling", zh: "\u6587\u6863\u5904\u7406" },
    category: "atomic",
    description: {
      en: "Reusable handling for structured documents, formatting, and extraction work.",
      zh: "\u56f4\u7ed5\u7ed3\u6784\u5316\u6587\u6863\u3001\u683c\u5f0f\u5316\u548c\u62bd\u53d6\u4efb\u52a1\u7684\u901a\u7528\u80fd\u529b\u3002",
    },
  },
  {
    id: "privacy-audit",
    name: { en: "Privacy Audit", zh: "\u9690\u79c1\u5ba1\u8ba1" },
    category: "atomic",
    description: {
      en: "A cleanup and inspection unit for spotting sensitive material before publishing or sharing.",
      zh: "\u5728\u53d1\u5e03\u548c\u5171\u4eab\u4e4b\u524d\uff0c\u7528\u6765\u68c0\u67e5\u654f\u611f\u5185\u5bb9\u7684\u6e05\u7406\u5ba1\u8ba1\u5355\u5143\u3002",
    },
  },
  {
    id: "status-light",
    name: { en: "Status Light", zh: "\u72b6\u6001\u706f" },
    category: "bridge",
    description: {
      en: "Connects system state to physical status signals so workflows stay legible at a glance.",
      zh: "\u628a\u7cfb\u7edf\u72b6\u6001\u4e0e\u7269\u7406\u706f\u53f7\u8fde\u63a5\u8d77\u6765\uff0c\u8ba9\u5de5\u4f5c\u6d41\u7684\u8fd0\u884c\u72b6\u6001\u53ef\u4ee5\u88ab\u4e00\u773c\u770b\u61c2\u3002",
    },
  },
  {
    id: "obsidian-archive",
    name: { en: "Obsidian Archive", zh: "Obsidian \u5f52\u6863" },
    category: "bridge",
    description: {
      en: "Moves outputs back into the knowledge base so future work starts from memory, not from zero.",
      zh: "\u628a\u8f93\u51fa\u56de\u6d41\u5230\u77e5\u8bc6\u5e93\uff0c\u8ba9\u540e\u7eed\u5de5\u4f5c\u4ece\u8bb0\u5fc6\u51fa\u53d1\uff0c\u800c\u4e0d\u662f\u6bcf\u6b21\u91cd\u5934\u5f00\u59cb\u3002",
    },
  },
  {
    id: "knowledge-routing",
    name: { en: "Knowledge Routing", zh: "\u77e5\u8bc6\u8def\u7531" },
    category: "bridge",
    description: {
      en: "Directs new material to the right archive, review, or execution surface.",
      zh: "\u628a\u65b0\u5185\u5bb9\u8def\u7531\u5230\u6b63\u786e\u7684\u5f52\u6863\u3001\u590d\u76d8\u6216\u6267\u884c\u754c\u9762\u3002",
    },
  },
  {
    id: "social-sync",
    name: { en: "Social Sync", zh: "\u793e\u4ea4\u540c\u6b65" },
    category: "bridge",
    description: {
      en: "Keeps public-platform inputs and derived outputs connected instead of fragmenting across tools.",
      zh: "\u8ba9\u516c\u5f00\u5e73\u53f0\u8f93\u5165\u4e0e\u540e\u7eed\u8f93\u51fa\u4fdd\u6301\u8fde\u63a5\uff0c\u800c\u4e0d\u662f\u6563\u5728\u4e0d\u540c\u5de5\u5177\u91cc\u3002",
    },
  },
  {
    id: "local-proxy",
    name: { en: "Local Proxy", zh: "\u672c\u5730\u4ee3\u7406" },
    category: "bridge",
    description: {
      en: "A bridge layer for keeping local tools, scripts, and workflows coordinated.",
      zh: "\u7528\u4e8e\u534f\u8c03\u672c\u5730\u5de5\u5177\u3001\u811a\u672c\u548c\u6d41\u7a0b\u7684\u6865\u63a5\u5c42\u3002",
    },
  },
  {
    id: "publish-tracking",
    name: { en: "Publish Tracking", zh: "\u53d1\u5e03\u8ddf\u8e2a" },
    category: "bridge",
    description: {
      en: "Tracks where outputs went and what still needs review after publishing.",
      zh: "\u5728\u53d1\u5e03\u4e4b\u540e\u8ddf\u8e2a\u8f93\u51fa\u53bb\u5411\u4e0e\u4ecd\u5f85\u590d\u76d8\u7684\u73af\u8282\u3002",
    },
  },
  {
    id: "content-ops-orchestrator",
    name: { en: "Content Ops Orchestrator", zh: "\u5185\u5bb9\u8fd0\u8425\u7f16\u6392\u5668" },
    category: "orchestrator",
    description: {
      en: "The coordination layer that decides which workflow, bridge, or atomic skill should take over next.",
      zh: "\u51b3\u5b9a\u63a5\u4e0b\u6765\u7531\u54ea\u4e2a workflow\u3001bridge \u6216 atomic skill \u63a5\u624b\u7684\u8c03\u5ea6\u5c42\u3002",
    },
    outputs: {
      en: ["Task Routing", "Step Coordination", "Archive Review"],
      zh: ["\u4efb\u52a1\u8def\u7531", "\u6b65\u9aa4\u534f\u8c03", "\u5f52\u6863\u590d\u76d8"],
    },
  },
];

export default function WorkflowsPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={pageTitle} eyebrow={pageEyebrow} lead={pageIntro}>
      <section className="py-8 sm:py-10">
        <SkillOS items={skillItems} stats={skillStats} inventoryDate={inventoryDate} locale={locale} />
        <Reveal>
          <section className="editorial-panel mt-10 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">{locale === "zh" ? "把一次迭代跑到上线" : "Taking an iteration to release"}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--text-secondary)]">
              {locale === "zh" ? "用数学侦探的一次上线，看看任务定义、逐题核验和正式站复测是怎么衔接的。" : "One Math Detective release traces the work from a precise task to individual checks and a live-site retest."}
            </p>
            <Link href="/cases/math-detective-iteration" className="editorial-link mt-4 inline-flex">
              {locale === "zh" ? "阅读数学侦探迭代案例 →" : "Read the Math Detective case →"}
            </Link>
          </section>
        </Reveal>

      </section>
    </SiteShell>
  );
}
