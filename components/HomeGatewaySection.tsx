/**
 * HomeGatewaySection — 滚动动画结束后展示的个人工作台入口区。
 *
 * 应用、Agent 和探索为主入口，知识库与工作流为补充入口。
 */

"use client";

import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";

type EntryKey = "apps" | "agents" | "explorations";

const ENTRIES: { href: string; icon: string; key: EntryKey }[] = [
  { href: "/apps", icon: "◈", key: "apps" },
  { href: "/agents", icon: "◎", key: "agents" },
  { href: "/explorations", icon: "○", key: "explorations" },
];

const COPY = {
  en: {
    title: "Things I work on",
    subtitle: "What I build, what I delegate, and what I want to explore next.",
    apps: {
      name: "Apps",
      desc: "Tools I made for math practice, health logging, and listening to music.",
    },
    agents: {
      name: "Agents",
      desc: "My digital twin and agents that help carry work through to a result.",
    },
    explorations: {
      name: "Explorations",
      desc: "Questions and ideas about AI, knowledge, and how we work and live.",
    },
  },
  zh: {
    title: "我在做的事",
    subtitle: "做出的应用、交给 Agent 的工作，以及还想继续探索的问题。",
    apps: {
      name: "应用",
      desc: "自己做来自己用的小工具，用来练数学推理、记健康数据、听音乐。",
    },
    agents: {
      name: "Agent",
      desc: "我做的数字分身，以及能承接具体工作的 Agent。",
    },
    explorations: {
      name: "探索",
      desc: "关于 AI、知识和日常生活，值得继续追问和动手尝试的想法。",
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[color:var(--text-secondary)]">
            <Link href="/second-brain" className="editorial-link">{locale === "zh" ? "我的知识库 →" : "My knowledge base →"}</Link>
            <Link href="/skills" className="editorial-link">{locale === "zh" ? "Skill 与工作流 →" : "Skills & workflows →"}</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
