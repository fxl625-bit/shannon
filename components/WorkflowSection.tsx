"use client";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/animation/Reveal";
import { motion } from "framer-motion";

const steps = [
  {
    id: "capture",
    label: { en: "Capture", zh: "捕获" },
    description: { en: "Collect raw signals", zh: "收集原始信号" },
    icon: "○",
    color: "var(--cyan)",
  },
  {
    id: "organize",
    label: { en: "Organize", zh: "组织" },
    description: { en: "Structure into knowledge", zh: "结构化为知识" },
    icon: "◎",
    color: "var(--blue)",
  },
  {
    id: "retrieve",
    label: { en: "Retrieve", zh: "检索" },
    description: { en: "Context-aware search", zh: "上下文感知搜索" },
    icon: "◉",
    color: "var(--violet)",
  },
  {
    id: "generate",
    label: { en: "Generate", zh: "生成" },
    description: { en: "AI-powered creation", zh: "AI 驱动的创造" },
    icon: "◈",
    color: "var(--warm)",
  },
  {
    id: "reflect",
    label: { en: "Reflect", zh: "反思" },
    description: { en: "Learn and improve", zh: "学习与改进" },
    icon: "◇",
    color: "var(--green)",
  },
];

function FlowStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const { locale } = useLanguage();

  return (
    <Reveal delay={index * 0.12}>
      <div className="group relative flex flex-col items-center text-center">
        {/* Step module */}
        <div className="relative rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition-all duration-300 hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-hover)] sm:p-7">
          {/* Glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow: `0 0 40px -15px ${step.color}30`,
            }}
          />

          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[color:var(--border)] text-xl"
            style={{ color: step.color }}
          >
            {step.icon}
          </div>

          <h3 className="text-base font-semibold text-[color:var(--text-primary)]">
            {step.label[locale]}
          </h3>
          <p className="mt-2 text-xs text-[color:var(--text-muted)]">
            {step.description[locale]}
          </p>
        </div>

        {/* Flow connector */}
        {index < steps.length - 1 && (
          <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2">
            <motion.div
              className="h-px w-8"
              style={{
                background: `linear-gradient(to right, ${step.color}40, ${steps[index + 1].color}40)`,
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
            />
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function WorkflowSection() {
  const { locale } = useLanguage();

  return (
    <section className="relative py-24 sm:py-32">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--bg-alt)] to-transparent opacity-50" />

      <div className="relative mx-auto max-w-[var(--max-width)] px-5 sm:px-8">
        <Reveal>
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
              {locale === "zh" ? "工作流" : "Workflow"}
            </span>
            <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[42px]">
              {locale === "zh"
                ? "从输入到输出的流动"
                : "The Flow from Input to Output"}
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <FlowStep key={step.id} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
