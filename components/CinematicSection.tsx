/**
 * CinematicSection — 滚动视频结束后自然过渡区。
 *
 * 承接滚动序列 Hero，显示个人简介和简洁入口。
 */

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";

export function CinematicSection() {
  const { locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  const isZh = locale === "zh";

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ opacity, scale, y }}
    >
      <div className="pointer-events-none absolute -right-1/4 top-1/2 h-[600px] w-[600px] rounded-full bg-[color:var(--violet)] opacity-[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute -left-1/4 bottom-1/3 h-[500px] w-[500px] rounded-full bg-[color:var(--cyan)] opacity-[0.02] blur-[100px]" />

      <div className="mx-auto max-w-[var(--max-width)] px-5 sm:px-8 text-center">
        <Reveal>
          <p className="text-xl sm:text-2xl leading-relaxed text-[color:var(--text-primary)] max-w-[40ch] mx-auto font-medium">
            {isZh
              ? "一个围绕 AI 进行思考、创造与表达的个人系统。"
              : "A personal system for thinking, building, and expressing with AI."}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex items-center justify-center gap-8 text-sm text-[color:var(--text-muted)]">
            <a href="/apps" className="hover:text-[color:var(--text-secondary)] transition-colors">
              {isZh ? "应用" : "Apps"}
            </a>
            <a href="/lab" className="hover:text-[color:var(--text-secondary)] transition-colors">
              {isZh ? "实验" : "Experiments"}
            </a>
            <a href="/obsidian" className="hover:text-[color:var(--text-secondary)] transition-colors">
              {isZh ? "笔记" : "Notes"}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[color:var(--cyan)]" />
            <div className="h-1.5 w-1.5 rotate-45 border border-[color:var(--cyan)]" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[color:var(--violet)]" />
          </div>
        </Reveal>
      </div>
    </motion.section>
  );
}
