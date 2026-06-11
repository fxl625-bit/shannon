"use client";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { Reveal } from "@/components/animation/Reveal";
import type { Localized } from "@/data/site";

const pageTitle: Localized = { en: "Workflows", zh: "工作流" };

const pageEyebrow: Localized = {
  en: "How I work",
  zh: "我的工作方式",
};

const pageIntro: Localized = {
  en: "Most of these routines came from everyday work. The ones I kept using gradually turned into reusable skills.",
  zh: "这些流程都是从日常工作里长出来的。用得多了，就慢慢沉淀成可以复用的 Skill。",
};

type SkillCategory = {
  count: string;
  label: Localized;
  desc: Localized;
  badges: { en: string[]; zh: string[] };
};

const skillCounts: SkillCategory[] = [
  {
    count: "12",
    label: { en: "Workflows", zh: "工作流" },
    desc: { en: "End-to-end routines for research, writing, video processing, meeting review, and reports.", zh: "从资料收集到写作、视频处理、会议整理和报告生成的完整流程。" },
    badges: { en: ["Research Reports", "Viral Breakdown", "Video Localization", "Brand Content Ops", "Meeting Replay", "Weekly Reports"], zh: ["深度研报", "爆款拆解", "本地视频翻译", "品牌内容运营", "会议回放整理", "周报生成"] },
  },
  {
    count: "16",
    label: { en: "Atomic Skills", zh: "原子能力" },
    desc: { en: "Small focused tools for verification, scraping, documents, testing, and cleanup.", zh: "小而具体的能力，用来处理核验、抓取、文档、测试和清理任务。" },
    badges: { en: ["Fact Checking", "Evidence Grading", "Multi-platform Scraping", "Web E2E Testing", "Document Handling", "Privacy Audit"], zh: ["事实核查", "证据分级", "多平台抓取", "网页 E2E 测试", "文档处理", "隐私审计"] },
  },
  {
    count: "12",
    label: { en: "Bridges", zh: "桥接能力" },
    desc: { en: "Connectors between AI, Obsidian, local tools, status hardware, and publishing channels.", zh: "把 AI、Obsidian、本地工具、硬件状态灯和发布渠道连接起来。" },
    badges: { en: ["Status Light", "Obsidian Archive", "Knowledge Routing", "Social Sync", "Local Proxy", "Publish Tracking"], zh: ["状态灯联动", "Obsidian 自动归档", "知识库路由", "社交平台同步", "本地代理桥接", "发布状态追踪"] },
  },
  {
    count: "1",
    label: { en: "Orchestrator", zh: "编排器" },
    desc: { en: "Coordinates multiple skills and routes work across longer tasks.", zh: "负责把多个步骤串起来，决定任务应该交给哪个 Skill 处理。" },
    badges: { en: ["Content Ops Orchestrator", "Task Routing", "Step Coordination", "Archive Review"], zh: ["内容运营编排器", "任务路由", "步骤协调", "归档复盘"] },
  },
];

const workflows: { title: Localized; body: Localized }[] = [
  {
    title: { en: "Content Production", zh: "内容生产" },
    body: { en: "From gathering information, organizing materials, writing drafts, publishing, and archiving — a continuous pipeline for content creation.", zh: "从信息收集开始，到整理资料、写稿、发布和归档。" },
  },
  {
    title: { en: "Research & Analysis", zh: "研究与分析" },
    body: { en: "Collecting materials on a topic, verifying sources, structuring findings, and producing reports.", zh: "对一个主题做资料收集、来源验证、结构整理和报告产出。" },
  },
  {
    title: { en: "Monitoring & Intelligence", zh: "监测与情报" },
    body: { en: "Multi-platform scraping, competitive analysis, public opinion tracking, and trend discovery.", zh: "多平台抓取、竞品分析、舆情监测和热点发现。" },
  },
  {
    title: { en: "Knowledge Management", zh: "知识管理" },
    body: { en: "Sinking content into Obsidian for future retrieval and reuse, with automated archiving and review loops.", zh: "把内容沉淀进 Obsidian，方便以后检索和复用，配合自动归档和回顾机制。" },
  },
];

export default function WorkflowsPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={pageTitle} eyebrow={pageEyebrow}>
      <section className="py-12 sm:py-16">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-base leading-8 text-[color:var(--text-secondary)] sm:text-lg">
              {pageIntro[locale]}
            </p>
          </div>
        </Reveal>

        {/* Skills overview with badges */}
        <Reveal delay={0.1}>
          <div className="mt-14">
            <p className="text-[28px] font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-[36px]">
              41 Active Skills
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {skillCounts.map((item) => (
                <div key={item.label.en} className="section-block flex flex-col">
                  <p className="text-[32px] font-semibold tracking-tight text-[color:var(--cyan)]">
                    {item.count}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[color:var(--text-primary)]">
                    {item.label[locale]}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[color:var(--text-muted)]">
                    {item.desc[locale]}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(locale === "zh" ? item.badges.zh : item.badges.en).map((badge) => (
                      <span
                        key={badge}
                        className="inline-block rounded-full border border-[color:var(--border)] px-2.5 py-0.5 text-[10px] text-[color:var(--text-muted)]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Workflow descriptions */}
        <div className="mt-16 space-y-8">
          {workflows.map((wf, i) => (
            <Reveal key={wf.title.en} delay={i * 0.08}>
              <div className="section-block transition-all duration-300 hover:border-[color:var(--border-strong)]">
                <h3 className="text-[20px] leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[24px]">
                  {wf.title[locale]}
                </h3>
                <p className="mt-3 text-base leading-7 text-[color:var(--text-secondary)]">
                  {wf.body[locale]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
