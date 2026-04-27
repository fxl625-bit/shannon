"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site, type Locale } from "@/data/site";

type LocalizedText = Record<Locale, string>;

const buildingCards = [
  {
    title: { en: "AI Skills", zh: "AI Skills" },
    body: {
      en: "Short, reusable workflows for writing, planning, and automation.",
      zh: "用于写作、规划和自动化的可复用流程。",
    },
  },
  {
    title: { en: "Lightweight Apps", zh: "轻量应用" },
    body: {
      en: "Small tools that turn ideas into usable interfaces.",
      zh: "把想法做成可使用的小工具。",
    },
  },
  {
    title: { en: "Obsidian Knowledge Base", zh: "Obsidian 知识库" },
    body: {
      en: "A structured system for collecting, cleaning, and reusing knowledge.",
      zh: "收集、清洗和复用知识的结构化系统。",
    },
  },
] satisfies Array<{ title: LocalizedText; body: LocalizedText }>;

const featuredWork = [
  {
    name: { en: "一世圆满", zh: "一世圆满" },
    type: { en: "Health Record App", zh: "健康记录 App" },
    summary: {
      en: "Track blood pressure, glucose, history, and trends.",
      zh: "记录血压、血糖、历史数据和趋势。",
    },
    variant: "health",
  },
  {
    name: { en: "FlowMate 乐伴", zh: "FlowMate 乐伴" },
    type: { en: "Music Companion", zh: "音乐陪伴工具" },
    summary: {
      en: "A listening-first companion for daily flow.",
      zh: "围绕日常收听节奏设计的轻量工具。",
    },
    variant: "music",
  },
  {
    name: { en: "AI BOSS", zh: "AI BOSS" },
    type: { en: "Personal System", zh: "个人系统" },
    summary: {
      en: "Manage goals, tasks, memory, and decisions.",
      zh: "管理目标、任务、记忆和决策。",
    },
    variant: "boss",
  },
  {
    name: { en: "Novel", zh: "小说" },
    type: { en: "Writing Workflow", zh: "写作流程" },
    summary: {
      en: "A structured workflow for long-form writing.",
      zh: "用于长篇写作的结构化流程。",
    },
    variant: "novel",
  },
  {
    name: { en: "Video Translation", zh: "视频翻译" },
    type: { en: "Local Workflow", zh: "本地流程" },
    summary: {
      en: "Translate subtitles, prepare audio, and remux output.",
      zh: "处理字幕翻译、音频和重新封装。",
    },
    variant: "video",
  },
] satisfies Array<{
  name: LocalizedText;
  type: LocalizedText;
  summary: LocalizedText;
  variant: "health" | "music" | "boss" | "novel" | "video";
}>;

const obsidianCards = [
  {
    mark: "01",
    title: { en: "Content Collection", zh: "内容收集" },
    body: {
      en: "Collect Xiaohongshu and Douyin content.",
      zh: "收集小红书和抖音内容。",
    },
  },
  {
    mark: "02",
    title: { en: "Cleaning & Classification", zh: "清洗与分类" },
    body: {
      en: "Organize and clean raw information.",
      zh: "整理和清洗原始资料。",
    },
  },
  {
    mark: "03",
    title: { en: "Skills Archive", zh: "Skills 归档" },
    body: {
      en: "Store AI skills and workflows.",
      zh: "存放 AI skills 和工作流。",
    },
  },
  {
    mark: "04",
    title: { en: "Rules & Memory", zh: "规则与记忆" },
    body: {
      en: "Store rules, templates, and long-term context.",
      zh: "存放规则、模板和长期上下文。",
    },
  },
] satisfies Array<{ mark: string; title: LocalizedText; body: LocalizedText }>;

const skillRows = [
  {
    name: { en: "AI BOSS", zh: "AI BOSS" },
    body: {
      en: "A system for goals, tasks, memory, and decisions.",
      zh: "用于目标、任务、记忆和决策的系统。",
    },
    tags: ["Workflow", "Agent", "Decision"],
  },
  {
    name: { en: "Novel", zh: "小说" },
    body: {
      en: "A structured workflow for long-form writing.",
      zh: "用于长篇写作的结构化流程。",
    },
    tags: ["Writing", "Planning"],
  },
  {
    name: { en: "Video Translation", zh: "视频翻译" },
    body: {
      en: "A local workflow for subtitles, audio, and remux.",
      zh: "用于字幕、音频和封装的本地流程。",
    },
    tags: ["Translation", "Local"],
  },
  {
    name: { en: "Weekly Report", zh: "周报" },
    body: {
      en: "Turn task exports into structured weekly reports.",
      zh: "把任务导出整理成结构化周报。",
    },
    tags: ["Report", "Work"],
  },
] satisfies Array<{ name: LocalizedText; body: LocalizedText; tags: string[] }>;

const nowItems = {
  en: [
    "Building an AI knowledge base in Obsidian",
    "Designing reusable AI workflows",
    "Testing lightweight apps for daily use",
    "Exploring AI and human capability",
  ],
  zh: [
    "搭建 Obsidian AI 知识库",
    "设计可复用 AI 工作流",
    "测试日常可用的轻量应用",
    "探索 AI 与人的能力提升",
  ],
} satisfies Record<Locale, string[]>;

function SystemDiagram({ locale }: { locale: Locale }) {
  const groups = [
    {
      label: "Input",
      items: ["Xiaohongshu", "Douyin", "Notes", "Ideas"],
    },
    {
      label: "Core",
      items: ["Obsidian Knowledge Base", "Skills", "Rules", "Memory"],
    },
    {
      label: "Output",
      items: ["Apps", "Workflows", "Reports", "Tools"],
    },
  ];

  return (
    <div className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between border-b border-[color:var(--border)] pb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
          {locale === "zh" ? "AI 系统结构" : "AI System Map"}
        </p>
        <div className="h-2 w-2 rounded-full bg-[color:var(--text-secondary)]" />
      </div>

      <div className="space-y-4">
        {groups.map((group, index) => (
          <div key={group.label}>
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--border-strong)] text-[11px] text-[color:var(--text-secondary)]">
                  {index + 1}
                </span>
                <p className="text-sm font-medium text-[color:var(--text-primary)]">{group.label}</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="min-w-0 truncate rounded-full border border-[color:var(--border)] px-3 py-2 text-xs text-[color:var(--text-secondary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            {index < groups.length - 1 ? (
              <div className="mx-auto h-7 w-px bg-[color:var(--border-strong)]" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function InterfaceMock({ variant }: { variant: (typeof featuredWork)[number]["variant"] }) {
  const rows = variant === "music" ? 14 : variant === "video" ? 5 : 6;
  const panels = variant === "boss" ? 4 : variant === "novel" ? 3 : 2;

  return (
    <div className="flex h-[220px] items-center justify-center rounded-[20px] border border-[color:var(--border)] bg-[#080808] p-4">
      <div className="relative h-full w-full max-w-[260px] overflow-hidden rounded-[18px] border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-2 w-16 rounded-full bg-white/18" />
          <div className="h-2 w-8 rounded-full bg-white/10" />
        </div>

        {variant === "music" ? (
          <div className="space-y-4">
            <div className="mx-auto h-14 w-14 rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.35),rgba(255,255,255,0.04)_52%,rgba(255,255,255,0.02))]" />
            <div className="flex h-20 items-end gap-1 rounded-2xl border border-[color:var(--border)] bg-[#0b0b0b] p-3">
              {Array.from({ length: rows }).map((_, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-full bg-white/55"
                  style={{ height: `${24 + ((index * 17) % 58)}%` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: panels }).map((_, index) => (
                <div key={index} className="h-14 rounded-xl border border-[color:var(--border)] bg-[#0b0b0b] p-2">
                  <div className="mb-2 h-2 w-7 rounded-full bg-white/20" />
                  <div className="h-5 rounded-lg bg-white/8" />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {Array.from({ length: rows }).map((_, index) => (
                <div
                  key={index}
                  className="h-2 rounded-full bg-white/12"
                  style={{ width: `${92 - ((index * 11) % 36)}%` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { locale } = useLanguage();

  return (
    <SiteShell>
      <section className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hero-enter">
          <p className="text-sm font-medium text-[color:var(--text-primary)] sm:text-base">{site.name}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">
            {site.home.badge[locale]}
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-[43px] leading-[1.02] tracking-normal text-[color:var(--text-primary)] sm:text-[64px] lg:text-[74px]">
            {site.home.title[locale]}
          </h1>
          <p className="mt-7 max-w-[36ch] text-base leading-8 text-[color:var(--text-secondary)] sm:max-w-2xl sm:text-lg">
            {site.home.description[locale]}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/skills"
              className="cta-button inline-flex items-center rounded-full border border-[color:var(--text-primary)] bg-[color:var(--text-primary)] px-6 py-3 text-sm font-medium !text-[#050505]"
            >
              {locale === "zh" ? "查看 Skills" : "View Skills"}
            </Link>
            <Link
              href="/apps"
              className="cta-button inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-3 text-sm font-medium text-[color:var(--text-primary)]"
            >
              {locale === "zh" ? "查看 Apps" : "View Apps"}
            </Link>
          </div>
        </div>

        <div className="hero-enter">
          <SystemDiagram locale={locale} />
        </div>
      </section>

      <section className="border-t border-[color:var(--border)] py-18 sm:py-24">
        <SectionHeader
          title={locale === "zh" ? "What I’m Building" : "What I’m Building"}
          kicker={locale === "zh" ? "三个方向" : "Three directions"}
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {buildingCards.map((card) => (
            <article
              key={card.title.en}
              className="focus-card rounded-[20px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
            >
              <h3 className="text-xl text-[color:var(--text-primary)]">{card.title[locale]}</h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">{card.body[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <SectionHeader
          title={locale === "zh" ? "Featured Work" : "Featured Work"}
          kicker={locale === "zh" ? "代表内容" : "Selected systems"}
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {featuredWork.map((work) => (
            <article
              key={work.name.en}
              className="focus-card grid gap-6 rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:grid-cols-[0.95fr_1.05fr]"
            >
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-muted)]">{work.type[locale]}</p>
                  <h3 className="mt-3 text-2xl tracking-normal text-[color:var(--text-primary)]">{work.name[locale]}</h3>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">{work.summary[locale]}</p>
                </div>
              </div>
              <InterfaceMock variant={work.variant} />
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[color:var(--border)] py-18 sm:py-24">
        <SectionHeader
          title={locale === "zh" ? "Obsidian Knowledge Base" : "Obsidian Knowledge Base"}
          kicker={locale === "zh" ? "个人知识系统" : "Personal knowledge system"}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {obsidianCards.map((card) => (
            <article key={card.title.en} className="rounded-[20px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
              <div className="mb-8 flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border)] text-[11px] text-[color:var(--text-muted)]">
                {card.mark}
              </div>
              <h3 className="text-lg text-[color:var(--text-primary)]">{card.title[locale]}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{card.body[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <SectionHeader title={locale === "zh" ? "Skills" : "Skills"} kicker={locale === "zh" ? "轻量列表" : "Lightweight list"} />
        <ul className="mt-8 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
          {skillRows.map((skill) => (
            <li key={skill.name.en} className="grid gap-4 py-6 md:grid-cols-[0.8fr_1.2fr_auto] md:items-center">
              <h3 className="text-xl text-[color:var(--text-primary)]">{skill.name[locale]}</h3>
              <p className="text-sm leading-7 text-[color:var(--text-secondary)]">{skill.body[locale]}</p>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[11px] text-[color:var(--text-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-8 sm:pb-16">
        <div className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:p-8">
          <SectionHeader title={locale === "zh" ? "Now" : "Now"} kicker={locale === "zh" ? "当前关注" : "Current focus"} />
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {nowItems[locale].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[color:var(--text-secondary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--text-primary)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}

function SectionHeader({ title, kicker }: { title: string; kicker: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{kicker}</p>
      <h2 className="mt-3 text-[32px] leading-tight tracking-normal text-[color:var(--text-primary)] sm:text-[44px]">
        {title}
      </h2>
    </div>
  );
}
