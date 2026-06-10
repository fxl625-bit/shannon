/**
 * HomeGatewaySection — 滚动动画结束后展示的个人系统入口区。
 *
 * 紧凑设计，包含一句话定位 + 四个内容入口卡片。
 */

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";

const ENTRIES = [
  { href: "/apps", icon: "◈", key: "apps" },
  { href: "/lab", icon: "◇", key: "experiments" },
  { href: "/obsidian", icon: "◎", key: "notes" },
  { href: "/second-brain", icon: "○", key: "second-brain" },
];

const COPY = {
  en: {
    title: "A personal system for thinking, building, and expressing with AI.",
    apps: { name: "Apps", desc: "Local-first tools and personal products, including a family health app published on Google Play." },
    experiments: { name: "Experiments", desc: "Small AI-native workflows, prototypes, and interface experiments." },
    notes: { name: "Notes", desc: "Selected thinking, writing, and structured knowledge." },
    "second-brain": { name: "Second Brain", desc: "An Obsidian-based knowledge system kept consistent through cloud sync." },
  },
  zh: {
    title: "一个围绕 AI 进行思考、创造与表达的个人系统。",
    apps: { name: "应用", desc: "本地优先的工具和个人产品，包括已上架 Google Play 的家庭健康 App。" },
    experiments: { name: "实验", desc: "围绕 AI 原生工作流、原型和界面的实验。" },
    notes: { name: "笔记", desc: "经过整理的思考、写作与结构化知识。" },
    "second-brain": { name: "第二大脑", desc: "以 Obsidian 为核心、通过云同步保持一致的知识系统。" },
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

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <p className="text-xl sm:text-2xl leading-relaxed text-[color:var(--text-primary)] max-w-[40ch] mx-auto font-medium">
              {copy.title}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ENTRIES.map((entry, i) => {
            const item = copy[entry.key as keyof typeof copy] as { name: string; desc: string };
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
