"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const ThreeCanvas = dynamic(
  () => import("@/components/three/ThreeCanvas").then((m) => m.ThreeCanvas),
  { ssr: false }
);

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <motion.div
        className="flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--text-muted)]">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-[color:var(--text-muted)] to-transparent" />
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const { locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100vh] items-center overflow-hidden"
    >
      {/* 3D Canvas Background — positioned to the right */}
        <div className="absolute inset-y-0 right-0 z-0 w-[60%] md:left-[50%] md:w-auto">
          <ThreeCanvas className="h-full w-full">
            <HeroScene />
          </ThreeCanvas>
        </div>

      {/* Gradient overlay for text readability — extends further right */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/60 via-40% to-transparent" />

      {/* Subtle ambient radial accent */}
      <div className="pointer-events-none absolute -left-1/4 top-1/3 z-[1] h-[600px] w-[600px] rounded-full bg-[color:var(--cyan)] opacity-[0.03] blur-[120px]" />

      {/* Content */}
      <motion.div
        className="relative z-[2] mx-auto w-full max-w-[var(--max-width)] px-5 pb-32 pt-28 sm:px-8 sm:pt-36"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--cyan)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)] animate-pulse" />
            AI x Human Potential
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[48px] leading-[1.02] font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-[68px] lg:text-[80px]">
            {locale === "zh" ? (
              <>
                AI ×
                <br />
                <span className="bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)] bg-clip-text text-transparent">
                  人的潜能
                </span>
              </>
            ) : (
              <>
                AI ×
                <br />
                <span className="bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)] bg-clip-text text-transparent">
                  Human Potential
                </span>
              </>
            )}
          </h1>
        </motion.div>

        <motion.p
          className="mt-7 max-w-[42ch] text-lg leading-8 text-[color:var(--text-secondary)] sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {locale === "zh"
            ? "一个探索 AI 如何扩展记忆、表达、判断与创造力的个人界面。"
            : "A personal interface for exploring how AI expands memory, expression, judgment, and creativity."}
        </motion.p>

        {/* Chinese subtitle hint — subtle, smaller */}
        {locale === "en" && (
          <motion.p
            className="mt-3 max-w-[42ch] text-sm leading-6 text-[color:var(--text-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            探索 AI 如何扩展人的记忆、表达、判断与创造力。
          </motion.p>
        )}

        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <a
            href="#experiments"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-7 py-3.5 text-sm font-semibold text-[#05070D] transition-all hover:shadow-[0_0_30px_-5px_rgba(103,232,249,0.5)] hover:scale-[1.02]"
          >
            {locale === "zh" ? "探索系统" : "Explore the System"}
          </a>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-7 py-3.5 text-sm font-medium text-[color:var(--text-primary)] transition-all hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-hover)] hover:scale-[1.02]"
          >
            {locale === "zh" ? "查看实验" : "View Experiments"}
          </Link>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
