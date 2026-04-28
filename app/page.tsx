"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site, type AppTool, type Locale } from "@/data/site";

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
              href="#skills"
              className="cta-button inline-flex items-center rounded-full border border-[color:var(--text-primary)] bg-[color:var(--text-primary)] px-6 py-3 text-sm font-medium !text-[#050505]"
            >
              {site.home.ctaPrimary[locale]}
            </Link>
            <Link
              href="#apps"
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

      <section id="skills" className="border-t border-[color:var(--border)] py-18 sm:py-24">
        <SectionHeader
          title={site.skillsSection.title[locale]}
          description={site.skillsSection.subtitle[locale]}
        />
        <ul className="mt-9 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
          {site.skills.map((skill) => (
            <li key={skill.name.en} className="grid gap-3 py-6 md:grid-cols-[0.78fr_1.22fr] md:gap-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{skill.label[locale]}</p>
                <h2 className="mt-2 text-[24px] leading-tight text-[color:var(--text-primary)]">{skill.name[locale]}</h2>
              </div>
              <p className="max-w-[56ch] text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
                {skill.summary[locale]}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="apps" className="py-18 sm:py-24">
        <SectionHeader
          title={site.appsSection.title[locale]}
          description={site.appsSection.subtitle[locale]}
        />
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          {site.apps.map((app) => (
            <AppCard key={app.name.en} app={app} locale={locale} />
          ))}
        </div>
      </section>

      <section id="obsidian" className="border-t border-[color:var(--border)] py-18 sm:py-24">
        <SectionHeader
          title={site.obsidianPage.title[locale]}
          description={site.obsidianPage.intro[locale]}
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.obsidianPage.cards.map((card, index) => (
            <article
              key={card.title.en}
              className="rounded-[20px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6"
            >
              <div className="mb-6 flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border)] text-[11px] text-[color:var(--text-muted)]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h2 className="text-lg leading-tight text-[color:var(--text-primary)]">{card.title[locale]}</h2>
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
              <Image
                src={`${basePath}${app.previewImage}`}
                alt={app.name[locale]}
                width={1536}
                height={864}
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
        <h2 className="mt-3 text-[28px] leading-tight text-[color:var(--text-primary)]">{app.name[locale]}</h2>
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

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-[30px] leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[40px]">
        {title}
      </h2>
      {description ? <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">{description}</p> : null}
    </div>
  );
}
