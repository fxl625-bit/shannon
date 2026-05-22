"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site, type AppTool, type Locale } from "@/data/site";
import { cases } from "@/data/cases";

type DiagramGroup = {
  label: string;
  items: string[];
};

const diagramGroups: DiagramGroup[] = [
  {
    label: "Input",
    items: ["Xiaohongshu", "Douyin", "Notes", "Ideas"],
  },
  {
    label: "Core",
    items: ["Obsidian Knowledge Base", "Skills", "Rules", "Memory"],
  },
  {
    label: "Output",
    items: ["Apps", "Workflows", "Reports", "Tools"],
  },
];

export default function HomePage() {
  const { locale } = useLanguage();
  const featuredCases = cases.filter((c) => ["content-ops", "feishu-mobile-dev", "research-report"].includes(c.slug));

  return (
    <SiteShell>
      <section className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        <div className="hero-enter">
          <p className="text-sm font-medium text-[color:var(--text-primary)] sm:text-base">{site.name}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">
            {site.home.badge[locale]}
          </p>
          <h1
            className={`mt-5 max-w-[12ch] leading-[1.02] tracking-tight text-[color:var(--text-primary)] ${
              locale === "zh" ? "text-[40px] sm:text-[52px] lg:text-[58px]" : "text-[43px] sm:text-[64px] lg:text-[74px]"
            }`}
          >
            {site.home.title[locale]}
          </h1>
          <p className="mt-7 max-w-[34ch] text-base leading-8 text-[color:var(--text-secondary)] sm:text-lg">
            {site.home.description[locale]}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/cases"
              className="cta-button inline-flex items-center rounded-full border border-[color:var(--text-primary)] bg-[color:var(--text-primary)] px-6 py-3 text-sm font-medium !text-[#050505]"
            >
              {locale === "zh" ? "查看案例" : "View Cases"}
            </Link>
            <Link
              href="/skills"
              className="cta-button inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-3 text-sm font-medium text-[color:var(--text-primary)]"
            >
              {site.home.ctaSecondary[locale]}
            </Link>
          </div>
        </div>

        <div className="hero-enter">
          <SystemDiagram locale={locale} />
        </div>
      </section>

      {/* Featured cases strip */}
      <section className="border-t border-[color:var(--border)] py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div className="max-w-xl">
            <h2 className="text-[28px] leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[36px]">
              {locale === "zh" ? "AI-Native 工作流案例" : "AI-Native Workflow Cases"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
              {locale === "zh"
                ? "把重复劳动、经验判断和跨工具操作沉淀成可复用 Agent。"
                : "Turning repetitive labor, judgment, and cross-tool operations into reusable Agent workflows."}
            </p>
          </div>
          <Link
            href="/cases"
            className="cta-button shrink-0 inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-2.5 text-sm text-[color:var(--text-primary)]"
          >
            {locale === "zh" ? "全部 9 个案例 →" : "All 9 Cases →"}
          </Link>
        </div>
        <div className="home-case-showcase">
          {featuredCases.map((c) => (
            <Link key={c.slug} href={`/cases/${c.slug}`} className="case-wall-card">
              <span className="num">{c.number}</span>
              <h2>{c.title[locale]}</h2>
              <p>{c.valueStatement[locale].slice(0, locale === "zh" ? 60 : 100)}…</p>
              <span className="output-type">{c.metrics[2].value[locale]}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="skills" className="border-t border-[color:var(--border)] py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-[28px] leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[36px]">
            {site.skillsSection.title[locale]}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
            {site.skillsSection.subtitle[locale]}
          </p>
        </div>
        <ul className="mt-8 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
          {site.skills.map((skill) => (
            <li key={skill.name.en} className="grid gap-3 py-6 md:grid-cols-[0.78fr_1.22fr] md:gap-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{skill.label[locale]}</p>
                <h3 className="mt-2 text-[22px] leading-tight text-[color:var(--text-primary)]">{skill.name[locale]}</h3>
              </div>
              <p className="max-w-[56ch] text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
                {skill.summary[locale]}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="apps" className="py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-[28px] leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[36px]">
            {site.appsSection.title[locale]}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
            {site.appsSection.subtitle[locale]}
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {site.apps.map((app) => (
            <AppCard key={app.name.en} app={app} locale={locale} />
          ))}
        </div>
      </section>

      <section id="obsidian" className="border-t border-[color:var(--border)] py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-[28px] leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[36px]">
            {site.obsidianPage.title[locale]}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
            {site.obsidianPage.intro[locale]}
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.obsidianPage.cards.map((card, index) => (
            <article
              key={card.title.en}
              className="rounded-[20px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6"
            >
              <div className="mb-6 flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border)] text-[11px] text-[color:var(--text-muted)]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg leading-tight text-[color:var(--text-primary)]">{card.title[locale]}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{card.body[locale]}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

function SystemDiagram({ locale }: { locale: Locale }) {
  return (
    <div className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between border-b border-[color:var(--border)] pb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
          {locale === "zh" ? "AI 系统结构" : "AI System Map"}
        </p>
        <div className="h-2 w-2 rounded-full bg-[color:var(--text-secondary)]" />
      </div>

      <div className="space-y-4">
        {diagramGroups.map((group, index) => (
          <div key={group.label}>
            <div className="rounded-[20px] border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--border-strong)] text-[11px] text-[color:var(--text-secondary)]">
                  {index + 1}
                </span>
                <p className="text-sm font-medium text-[color:var(--text-primary)]">{group.label}</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="truncate rounded-full border border-[color:var(--border)] px-3 py-2 text-xs text-[color:var(--text-secondary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            {index < diagramGroups.length - 1 ? <div className="mx-auto h-7 w-px bg-[color:var(--border-strong)]" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function AppCard({ app, locale }: { app: AppTool; locale: Locale }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <article className="focus-card overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="border-b border-[color:var(--border)] bg-[color:var(--surface-soft)] p-3">
        <div className="overflow-hidden rounded-[18px] border border-[color:var(--border)] bg-[#080808] p-3">
          {app.previewImage ? (
            <div className="flex h-[220px] items-center justify-center overflow-hidden rounded-[14px] border border-[color:var(--border)] bg-black/60">
              <img
                src={`${basePath}${app.previewImage}`}
                alt={app.name[locale]}
                className="max-h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex h-[220px] items-center justify-center rounded-[14px] border border-[color:var(--border)] bg-black/60">
              <DeviceMock />
            </div>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{app.typeLabel[locale]}</p>
        <h3 className="mt-3 text-[28px] leading-tight text-[color:var(--text-primary)]">{app.name[locale]}</h3>
        <p className="mt-4 max-w-[34ch] text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
          {app.summary[locale]}
        </p>
      </div>
    </article>
  );
}

function DeviceMock() {
  return (
    <div className="w-full max-w-[240px] rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/16" />
      <div className="rounded-[18px] border border-[color:var(--border)] bg-black/60 p-4">
        <div className="mb-4 h-14 rounded-[14px] bg-white/8" />
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-white/16" />
          <div className="h-2 w-4/5 rounded-full bg-white/12" />
          <div className="h-2 w-3/5 rounded-full bg-white/10" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="h-16 rounded-[14px] border border-[color:var(--border)] bg-white/5" />
          <div className="h-16 rounded-[14px] border border-[color:var(--border)] bg-white/5" />
        </div>
      </div>
    </div>
  );
}
