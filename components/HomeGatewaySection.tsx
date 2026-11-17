/**
 * HomeGatewaySection — 滚动动画结束后展示的个人工作台入口区。
 *
 * 三个入口：Apps / AI-Agent Knowledge Base / Workflows
 * 无 Experiments，无 Notes，无 Cases。
 */

"use client";

import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";

type EntryKey = "apps" | "ai-agent-knowledge-base" | "workflows";

const ENTRIES: { href: string; icon: string; key: EntryKey }[] = [
  { href: "/apps", icon: "◈", key: "apps" },
  { href: "/second-brain", icon: "◎", key: "ai-agent-knowledge-base" },
  { href: "/skills", icon: "○", key: "workflows" },
];

const COPY = {
  en: {
    title: "Things I work on",
    subtitle: "Projects, knowledge, and ways of working I keep coming back to.",
    apps: {
      name: "Apps",
      desc: "Tools I made for math practice, health logging, and listening to music.",
    },
    "ai-agent-knowledge-base": {
      name: "AI-Agent Knowledge Base",
      desc: "Project notes, version history, and verification records organized in Obsidian.",
    },
    workflows: {
      name: "Workflows",
      desc: "Repeatable ways I use AI for research, writing, and software development.",
    },
  },
  zh: {
    title: "我在做的事",
    subtitle: "项目、知识库，以及我经常使用的工作方式。",
    apps: {
      name: "应用",
      desc: "自己做来自己用的小工具，用来练数学推理、记健康数据、听音乐。",
    },
    "ai-agent-knowledge-base": {
      name: "AI-Agent 知识库",
      desc: "用 Obsidian 整理项目笔记、版本和验证记录，方便回溯与接手。",
    },
    workflows: {
      name: "工作流",
      desc: "把日常研究、写作和开发中反复做的事，整理成可复用的 AI 工作流。",
    },
  },
};

export function HomeGatewaySection() {
  const { locale } = useLanguage();
  const copy = locale === "zh" ? COPY.zh : COPY.en;

  return (
    <section
      id="home-work"
      className="relative z-10 scroll-mt-20 px-6 py-24 md:py-28 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-1/4 top-1/2 h-[500px] w-[500px] rounded-full bg-[color:var(--violet)] opacity-[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute -left-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-[color:var(--cyan)] opacity-[0.02] blur-[100px]" />

      <div className="mx-auto max-w-5xl">
        {/* Title */}
        <div className="text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[color:var(--text-primary)]">
              {copy.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[color:var(--text-muted)] max-w-[48ch] mx-auto">
              {copy.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Cards grid — 3 columns */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {ENTRIES.map((entry, i) => {
            const item = copy[entry.key] as { name: string; desc: string };
            return (
            <Reveal key={entry.key} delay={i * 0.14} className="h-full">
              <Link
                  href={entry.href}
                className="group block h-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 motion-safe:transition motion-safe:duration-300 hover:border-cyan-200/35 hover:bg-[color:var(--surface-hover)] motion-safe:hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                >
                  <div
                    className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] text-lg transition-colors group-hover:border-[color:var(--cyan)] group-hover:text-[color:var(--cyan)]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {entry.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[color:var(--text-primary)] group-hover:text-[color:var(--cyan)] transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)] group-hover:text-[color:var(--text-secondary)] transition-colors">
                    {item.desc}
                  </p>
              </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-14 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[color:var(--cyan)]" />
            <div className="h-1.5 w-1.5 rotate-45 border border-[color:var(--cyan)]" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[color:var(--violet)]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
