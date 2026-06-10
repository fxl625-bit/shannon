"use client";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/animation/Reveal";
import { experiments, type Experiment } from "@/data/experiments";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

function ExperimentCard({ experiment, index }: { experiment: Experiment; index: number }) {
  const { locale } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition-colors duration-500 sm:p-7"
        style={{
          transform: hovered
            ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.01,1.01,1.01)`
            : "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
          transition: hovered
            ? "transform 0.15s ease-out, border-color 0.4s ease"
            : "transform 0.4s ease-out, border-color 0.4s ease",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Border glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1px ${experiment.accentColor}40, 0 0 30px -10px ${experiment.accentColor}30`,
          }}
        />

        {/* Radial background glow */}
        <div
          className="pointer-events-none absolute -inset-2 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(500px circle at 50% 50%, ${experiment.accentColor}08, transparent 70%)`,
          }}
        />

        {/* Accent line — animated width on hover */}
        <motion.div
          className="mb-5 h-px"
          style={{ backgroundColor: experiment.accentColor, opacity: 0.6 }}
          animate={{ width: hovered ? "64px" : "48px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Status badge with subtle glow on hover */}
        <div className="mb-4 flex items-center gap-2">
          <motion.div
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: experiment.accentColor }}
            animate={{
              scale: hovered ? [1, 1.5, 1] : 1,
              boxShadow: hovered
                ? `0 0 8px ${experiment.accentColor}`
                : "none",
            }}
            transition={{ duration: 0.6, repeat: hovered ? Infinity : 0, repeatDelay: 1 }}
          />
          <span
            className="text-[11px] uppercase tracking-[0.15em] font-medium"
            style={{ color: experiment.accentColor }}
          >
            {experiment.status[locale]}
          </span>
        </div>

        <h3 className="text-xl font-semibold leading-tight text-[color:var(--text-primary)]">
          {experiment.title[locale]}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">
          {experiment.description[locale]}
        </p>

        {/* What it explores extra detail */}
        <p className="mt-2 text-xs leading-5 text-[color:var(--text-muted)]">
          {locale === "zh" ? "探索方向：" : "Explores: "}
          {experiment.capability[locale]}
        </p>

        {/* Capability tag */}
        <div className="mt-4 flex items-center gap-2">
          <motion.span
            className="inline-block rounded-full border px-3 py-1 text-[11px] font-medium"
            style={{
              borderColor: hovered ? `${experiment.accentColor}50` : "var(--border)",
              backgroundColor: hovered ? `${experiment.accentColor}12` : "var(--surface-soft)",
              color: hovered ? experiment.accentColor : "var(--text-muted)",
            }}
            animate={{
              borderColor: hovered ? `${experiment.accentColor}50` : "var(--border)",
            }}
            transition={{ duration: 0.3 }}
          >
            {experiment.capability[locale]}
          </motion.span>
        </div>

        {/* Bottom glow line sweep */}
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${experiment.accentColor}60, transparent)`,
          }}
          initial={{ opacity: 0, x: "-100%" }}
          animate={hovered ? { opacity: 1, x: "100%" } : { opacity: 0, x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>
    </Reveal>
  );
}

export function ExperimentsSection() {
  const { locale } = useLanguage();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[var(--max-width)] px-5 sm:px-8">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
              {locale === "zh" ? "实验档案" : "Featured Experiments"}
            </span>
            <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[42px]">
              {locale === "zh"
                ? "正在探索的可能性"
                : "Possibilities in Exploration"}
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((exp, i) => (
            <ExperimentCard key={exp.id} experiment={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
