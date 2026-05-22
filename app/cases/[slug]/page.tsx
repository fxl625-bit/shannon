import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { cases, getCaseBySlug } from "@/data/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) return {};
  return { title: `${c.number} ${c.title.en}` };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) notFound();

  // Default to zh for case content since these are zh-native
  const locale = "zh" as const;
  const en = "en" as const;

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="ambient-layer" />
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[var(--max-width)] flex-col px-5 pb-24 pt-5 sm:px-8">
        <header className="mb-8">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-sm text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors"
          >
            <span>&larr;</span> {locale === "zh" ? "返回案例列表" : "Back to Cases"}
          </Link>
        </header>

        {/* Hero */}
        <header className="case-hero-section">
          <div>
            <p className="eyebrow">AI-Native {locale === "zh" ? "案例" : "Case"} {c.number}</p>
            <h1>{c.title[locale]}</h1>
            <p className="hero-sub">{c.heroSubtitle[locale]}</p>
          </div>
          <div className="case-metrics-grid">
            {c.metrics.map((m) => (
              <div key={m.label.en}>
                <small>{m.label[locale]}</small>
                <strong>{m.value[locale]}</strong>
              </div>
            ))}
          </div>
        </header>

        {/* Value Statement */}
        <section className="value-statement-block">
          <span>{locale === "zh" ? "一句话价值" : "Value in One Sentence"}</span>
          <p>{c.valueStatement[locale]}</p>
        </section>

        {/* Before / After */}
        <section className="before-after-grid">
          <div className="before-panel">
            <h3>{locale === "zh" ? "原来怎么做" : "Before"}</h3>
            <ul>
              {c.before[locale].map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="after-panel">
            <h3>{locale === "zh" ? "现在怎么做" : "After"}</h3>
            <ul>
              {c.after[locale].map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Agent Card */}
        <section className="agent-card-section">
          <div className="agent-card-left">
            <h3>{c.agent.name[locale]}</h3>
            <p className="role-tag">{c.agent.role[locale]}</p>
            <div className="agent-tags">
              {c.agent.tags[locale].map((t: string) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="agent-card-right">
            <p className="agent-role-line">{c.agent.jobTitle[locale]}</p>
            <p className="agent-claim">{c.agent.oneLiner[locale]}</p>
            <div className="agent-habits-grid">
              <div>
                <h4>{locale === "zh" ? "判断习惯" : "Judgment Habits"}</h4>
                <ul>
                  {c.agent.habits[locale].map((h: string) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>{locale === "zh" ? "边界" : "Boundaries"}</h4>
                <ul>
                  {c.agent.boundaries[locale].map((b: string) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
            <blockquote className="agent-quote">{c.agent.quote[locale]}</blockquote>
          </div>
        </section>

        {/* Workflow */}
        <section className="section-block">
          <h3>{locale === "zh" ? "工作流" : "Workflow"}</h3>
          <p className="section-sub">{c.workflow.sectionSub[locale]}</p>
          <div className="timeline-row">
            {c.workflow.steps[locale].map((step: string, i: number) => (
              <div key={step} className="timeline-step">
                <b>{String(i + 1).padStart(2, "0")}</b>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* Result Showcase */}
        <section className="section-block">
          <h3>{locale === "zh" ? "案例成果展示" : "Result Showcase"}</h3>
          <p className="section-sub">{c.result.sectionSub[locale]}</p>
          <div className="result-showcase-grid">
            <div className="showcase-main">
              {locale === "zh" ? "成果截图" : "Result Screenshot"}
            </div>
            <div className="result-cards">
              <div>
                <small>{locale === "zh" ? "输入" : "Input"}</small>
                <strong>{c.result.input[locale]}</strong>
              </div>
              <div>
                <small>{locale === "zh" ? "处理" : "Process"}</small>
                <strong>{c.result.process[locale]}</strong>
              </div>
              <div>
                <small>{locale === "zh" ? "输出" : "Output"}</small>
                <strong>{c.result.output[locale]}</strong>
              </div>
            </div>
          </div>
          <div className="asset-strip-row">
            <span className="asset-label">{locale === "zh" ? "可复用资产" : "Reusable Assets"}</span>
            {c.result.assets[locale].map((a: string) => (
              <b key={a}>{a}</b>
            ))}
          </div>
        </section>

        {/* Rule Section */}
        <section className="section-block">
          <h3>{locale === "zh" ? "核心规则片段" : "Core Rule Snippet"}</h3>
          <p className="section-sub">{locale === "zh" ? "这张卡展示 Agent 背后的规则沉淀。" : "The rule behind this agent."}</p>
          <div className="rule-code-block">
            <div className="rule-code-panel">
              <div className="rule-code-header">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span style={{ marginLeft: 8 }}>{c.rule.path}</span>
              </div>
              <div className="rule-code-body">
                {c.rule.codeLines.map((cl, i) => (
                  <div key={i} className="code-line">
                    <span className="ln">{cl.line}</span>
                    <code className={cl.classes?.split(" ").map((cls) => {
                      if (cls === "token-key") return "tk";
                      if (cls === "token-string") return "ts";
                      if (cls === "token-comment") return "tc";
                      return "";
                    }).join(" ") || ""}>
                      {cl.text}
                    </code>
                  </div>
                ))}
              </div>
            </div>
            <div className="rule-tags-col">
              {c.rule.tags.map((t: string) => (
                <b key={t}>{t}</b>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
