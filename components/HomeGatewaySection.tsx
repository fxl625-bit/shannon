/**
 * HomeGatewaySection — 滚动动画结束后展示的个人工作台入口区。
 *
 * 三个入口：Apps / AI-Agent Knowledge Base / Workflows
 * 无 Experiments，无 Notes，无 Cases。
 */

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
      desc: "Small tools and personal projects I built and use, including a health app published on Google Play.",
    },
    "ai-agent-knowledge-base": {
      name: "AI-Agent Knowledge Base",
      desc: "An Obsidian-based knowledge base organized so I — and AI agents — can find and reuse information easily.",
    },
    workflows: {
      name: "Workflows",
      desc: "How I use AI in real work: research, writing, coding, tracking public opinion, and making decisions.",
    },
  },
  zh: {
    title: "我在做的事",
    subtitle: "项目、知识库，以及我经常使用的工作方式。",
    apps: {
      name: "应用",
      desc: "自己做来自己用的小工具和个人项目，包括已上架 Google Play 的健康记录 App。",
    },
    "ai-agent-knowledge-base": {
      name: "AI-Agent 知识库",
      desc: "以 Obsidian 整理的知识库，方便自己和 AI 快速找到和复用信息。",
    },
    workflows: {
      name: "工作流",
      desc: "我在真实工作中使用 AI 的方式：研究、写作、编程、舆情追踪与决策辅助。",
    },
  },
};

export function HomeGatewaySection() {
  const { locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  const copy = locale === "zh" ? COPY.zh : COPY.en;

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 px-6 py-24 md:py-28 overflow-hidden"
      style={{ opacity, y }}
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
              <Reveal key={entry.key} delay={i * 0.08}>
                <a
                  href={entry.href}
                  className="group block rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition-all duration-300 hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-hover)] hover:-translate-y-0.5"
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
                </a>
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
    </motion.section>
  );
}
