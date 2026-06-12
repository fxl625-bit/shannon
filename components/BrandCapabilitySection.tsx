/**
 * BrandCapabilitySection — 品牌能力升级
 *
 * Three-layer structure: Input → Expression → System
 * Intelligence + Knowledge → Narrative + Visual + Prototype → Operating System
 */

"use client";

import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";

// ── Types ──────────────────────────────────────────────

type CapabilityKey =
  | "intelligence"
  | "knowledge"
  | "narrative"
  | "visual"
  | "prototype"
  | "os";

type CapabilityDef = {
  key: CapabilityKey;
  icon: string;
  color: string;
  label: { en: string; zh: string };
  desc: { en: string; zh: string };
};

// ── Data ──────────────────────────────────────────────

const CAPABILITIES: CapabilityDef[] = [
  {
    key: "intelligence",
    icon: "◉",
    color: "var(--cyan)",
    label: { en: "Intelligence", zh: "情报能力" },
    desc: {
      en: "Tracking public information, industry changes, media topics, and opinion signals.",
      zh: "追踪公开信息、行业变化、媒体议题和舆情线索。",
    },
  },
  {
    key: "knowledge",
    icon: "◎",
    color: "var(--green)",
    label: { en: "Knowledge", zh: "知识能力" },
    desc: {
      en: "Turning scattered materials into reusable references, Q&A, cases, and talking points.",
      zh: "把分散资料整理成可引用的口径、问答、案例和参考资料。",
    },
  },
  {
    key: "narrative",
    icon: "◈",
    color: "var(--warm)",
    label: { en: "Narrative", zh: "叙事能力" },
    desc: {
      en: "Building consistent messages for media, investors, social platforms, and internal communication.",
      zh: "面向媒体、投资者、社交平台和内部沟通，组织一致的表达。",
    },
  },
  {
    key: "visual",
    icon: "◇",
    color: "var(--violet)",
    label: { en: "Visuals", zh: "视觉能力" },
    desc: {
      en: "Turning articles, diagrams, long-form graphics, pages, and video scripts into formats that travel better.",
      zh: "把文章、图解、长图、页面和视频脚本做成更容易传播的形式。",
    },
  },
  {
    key: "prototype",
    icon: "◆",
    color: "var(--blue)",
    label: { en: "Prototypes", zh: "原型能力" },
    desc: {
      en: "Moving ideas quickly into websites, dashboards, internal tools, publishing assistants, and product demos.",
      zh: "把想法快速推进成网站、仪表盘、内部工具、发稿助手和产品 Demo。",
    },
  },
  {
    key: "os",
    icon: "○",
    color: "var(--text-primary)",
    label: { en: "System", zh: "系统能力" },
    desc: {
      en: "Connecting monitoring, knowledge, content, publishing, and review into a repeatable way of working.",
      zh: "把监测、知识、内容、发布和复盘串起来，形成可以持续运行的工作方法。",
    },
  },
];

// Helper to get a capability by key
function cap(key: CapabilityKey): CapabilityDef {
  return CAPABILITIES.find((c) => c.key === key)!;
}

// ── Sub-components ────────────────────────────────────

function LayerLabel({
  label,
  delay,
}: {
  label: { en: string; zh: string };
  delay: number;
}) {
  const { locale } = useLanguage();
  return (
    <Reveal delay={delay}>
      <div className="flex items-center gap-3 pb-3">
        <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
          {label[locale]}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-[color:var(--border)] to-transparent" />
      </div>
    </Reveal>
  );
}

function CapabilityCard({
  item,
  delay,
  wide = false,
}: {
  item: CapabilityDef;
  delay: number;
  wide?: boolean;
}) {
  const { locale } = useLanguage();

  return (
    <Reveal delay={delay}>
      <div
        className={`group relative rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] transition-all duration-300 hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-hover)] ${
          wide
            ? "flex flex-col p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7"
            : "flex h-full min-h-[180px] flex-col p-6 sm:p-7"
        }`}
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `0 0 40px -15px ${item.color}30` }}
        />

        {/* Icon */}
        <div
          className={`flex items-center justify-center rounded-xl border border-[color:var(--border)] transition-colors group-hover:border-[color:var(--border-strong)] ${
            wide
              ? "mb-4 h-14 w-14 shrink-0 text-xl sm:mb-0"
              : "mb-4 h-11 w-11 shrink-0 text-lg"
          }`}
          style={{ color: item.color }}
        >
          {item.icon}
        </div>

        {/* Text area */}
        <div className={wide ? "flex-1" : "flex flex-1 flex-col"}>
          <h3
            className={`font-semibold text-[color:var(--text-primary)] transition-colors group-hover:text-[color:var(--text-secondary)] ${
              wide ? "text-lg" : "text-base"
            }`}
          >
            {item.label[locale]}
          </h3>
          <p
            className={`mt-2 leading-relaxed text-[color:var(--text-muted)] transition-colors group-hover:text-[color:var(--text-secondary)] ${
              wide ? "text-sm" : "text-sm"
            }`}
          >
            {item.desc[locale]}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function ArrowDown() {
  return (
    <div className="flex justify-center py-3">
      <div className="flex flex-col items-center gap-1">
        <div className="h-5 w-px bg-gradient-to-b from-[color:var(--border)] to-[color:var(--text-muted)]" />
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className="text-[color:var(--text-muted)]"
        >
          <path
            d="M5 0L5 8M5 8L1 4.5M5 8L9 4.5"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

// ── Main Section ───────────────────────────────────────

export function BrandCapabilitySection() {
  const { locale } = useLanguage();

  const COPY = {
    en: {
      title: "Brand Capability Upgrade",
      subtitle:
        "From content production to intelligence, knowledge, narrative, visuals, prototypes, and publishing coordination.",
      lead: [
        "These capabilities come from real work, not a list of tools. Combined, they form a brand workflow that can be used again and again.",
      ],
      layerInput: "Input",
      layerExpression: "Expression",
      layerSystem: "System",
    },
    zh: {
      title: "品牌能力升级",
      subtitle: "从内容生产，到舆情、知识、叙事、视觉和发布协同。",
      lead: [
        "这些能力来自真实工作，组合在一起后，形成了一套可以反复使用的品牌工作方法。",
      ],
      layerInput: "输入",
      layerExpression: "表达",
      layerSystem: "沉淀",
    },
  };

  const copy = locale === "zh" ? COPY.zh : COPY.en;

  return (
    <section className="relative py-24 sm:py-32">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--bg-alt)] to-transparent opacity-40" />

      <div className="relative mx-auto max-w-[var(--max-width)] px-5 sm:px-8">
        {/* ════════════ Title area ════════════ */}
        <Reveal>
          <div className="mb-5 text-center">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
              {locale === "zh" ? "能力" : "Capability"}
            </span>
            <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[42px]">
              {copy.title}
            </h2>
          </div>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.1}>
          <p className="mx-auto mb-6 max-w-[60ch] text-center text-sm leading-relaxed text-[color:var(--text-muted)] sm:text-base">
            {copy.subtitle}
          </p>
        </Reveal>

        {/* Lead */}
        <Reveal delay={0.15}>
          <div className="mx-auto mb-16 max-w-[55ch] space-y-3 text-center text-sm leading-relaxed text-[color:var(--text-secondary)] sm:text-[15px]">
            {copy.lead.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        {/* ════════════ Layer 1: Input ════════════ */}
        <LayerLabel label={{ en: "Input", zh: "输入" }} delay={0.2} />

        <div className="grid gap-4 sm:grid-cols-2">
          <CapabilityCard item={cap("intelligence")} delay={0.25} />
          <CapabilityCard item={cap("knowledge")} delay={0.3} />
        </div>

        {/* Connector */}
        <ArrowDown />

        {/* ════════════ Layer 2: Expression ════════════ */}
        <LayerLabel label={{ en: "Expression", zh: "表达" }} delay={0.35} />

        <div className="grid gap-4 sm:grid-cols-3">
          <CapabilityCard item={cap("narrative")} delay={0.4} />
          <CapabilityCard item={cap("visual")} delay={0.45} />
          <CapabilityCard item={cap("prototype")} delay={0.5} />
        </div>

        {/* Connector */}
        <ArrowDown />

        {/* ════════════ Layer 3: System ════════════ */}
        <LayerLabel label={{ en: "System", zh: "沉淀" }} delay={0.55} />

        <CapabilityCard item={cap("os")} delay={0.6} wide />

        {/* ════════════ Decorative divider ════════════ */}
        <Reveal delay={0.7}>
          <div className="mt-14 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[color:var(--violet)]" />
            <div className="h-1.5 w-1.5 rotate-45 border border-[color:var(--violet)]" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[color:var(--cyan)]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
