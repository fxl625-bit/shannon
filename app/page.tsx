"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function HomePage() {
  const { locale } = useLanguage();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <SiteShell>
      <section className="flex min-h-[calc(100vh-86px)] items-center py-12 sm:py-20">
        <div className="hero-enter w-full max-w-5xl">
          <p className="text-sm font-medium text-[color:var(--text-primary)] sm:text-base">
            {site.name}
          </p>
          <p className="mt-5 text-xs uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">
            {site.home.badge[locale]}
          </p>
          <h1
            className={`mt-5 max-w-4xl text-balance leading-[1.02] tracking-tight text-[color:var(--text-primary)] ${
              locale === "zh" ? "text-[40px] sm:text-[58px] lg:text-[72px]" : "text-[48px] sm:text-[72px] lg:text-[88px]"
            }`}
          >
            {locale === "zh" ? (
              <>
                <span className="block">探索 AI 如何提升</span>
                <span className="block whitespace-nowrap">人的能力</span>
              </>
            ) : (
              site.home.title[locale]
            )}
          </h1>
          <p className="mt-8 max-w-[34ch] text-base leading-8 text-[color:var(--text-secondary)] sm:max-w-3xl sm:text-lg">
            {site.home.description[locale]}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/skills"
              className="cta-button inline-flex items-center rounded-full border border-[color:var(--text-primary)] bg-[color:var(--text-primary)] px-6 py-3 text-sm font-medium !text-[#050505]"
            >
              {site.home.ctaPrimary[locale]}
            </Link>
            <Link
              href="/apps"
              className="cta-button inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-3 text-sm font-medium text-[color:var(--text-primary)]"
            >
              {site.home.ctaSecondary[locale]}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)] py-16 sm:py-20">
        <div className="max-w-4xl">
          <h2 className="text-[28px] tracking-tight text-[color:var(--text-primary)] sm:text-[34px]">
            {site.skillsSection.title[locale]}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
            {site.skillsSection.subtitle[locale]}
          </p>
        </div>

        <ul className="mt-8 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
          {site.skills.map((skill) => (
            <li key={skill.name.en} className="py-5 sm:py-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <div>
                  <p className="text-lg text-[color:var(--text-primary)] sm:text-xl">{skill.name[locale]}</p>
                  <p className="mt-1 text-sm leading-7 text-[color:var(--text-secondary)]">{skill.summary[locale]}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                  {skill.label[locale]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl">
          <h2 className="text-[28px] tracking-tight text-[color:var(--text-primary)] sm:text-[34px]">
            {site.appsSection.title[locale]}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
            {site.appsSection.subtitle[locale]}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {site.apps.map((app) => (
            <article
              key={app.name.en}
              className="focus-card rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                {app.typeLabel[locale]}
              </p>
              <h3 className="mt-2 text-2xl tracking-tight text-[color:var(--text-primary)]">{app.name[locale]}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{app.summary[locale]}</p>

              <div className="mt-5 flex h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-3">
                {app.previewImage ? (
                  <Image
                    src={`${basePath}${app.previewImage}`}
                    alt={app.name[locale]}
                    width={1536}
                    height={864}
                    className="max-h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex min-h-[140px] items-center justify-center px-4 text-center text-xs uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                    {app.previewLabel[locale]}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
