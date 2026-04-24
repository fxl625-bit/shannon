"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function HomePage() {
  const { locale } = useLanguage();

  return (
    <SiteShell>
      <section className="flex flex-1 items-center py-12 sm:py-16 lg:py-20">
        <div className="hero-enter w-full">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
              {site.home.badge[locale]}
            </p>

            <p className="mt-7 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
              {site.name}
            </p>

            <h1 className="mt-7 max-w-4xl text-[42px] leading-[1.02] tracking-tight text-white sm:text-[56px] lg:text-[64px]">
              {site.home.title[locale]}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              {site.home.description[locale]}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/skills"
                className="cta-button inline-flex items-center rounded-full border border-[color:var(--accent)] bg-[rgba(143,167,255,0.2)] px-6 py-3 text-sm font-medium text-[#eef1ff]"
              >
                {site.home.ctaPrimary[locale]}
              </Link>
              <Link
                href="/apps"
                className="cta-button inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white"
              >
                {site.home.ctaSecondary[locale]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl text-white sm:text-3xl">{site.skillsSection.title[locale]}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {site.skillsSection.subtitle[locale]}
            </p>
          </div>
          <Link
            href="/skills"
            className="hidden rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm text-white transition-colors duration-150 hover:border-[color:var(--accent)] sm:inline-flex"
          >
            {site.skillsSection.cta[locale]}
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {site.skills.map((skill) => (
            <article key={skill.name.en} className="glass-surface focus-card rounded-2xl p-6 sm:p-7">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                {skill.label[locale]}
              </p>
              <h3 className="mt-3 text-2xl leading-tight text-white">{skill.name[locale]}</h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                {skill.summary[locale]}
              </p>
              {skill.githubUrl ? (
                <div className="mt-6">
                  <Link
                    href={skill.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="cta-button inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm text-white hover:border-[color:var(--accent)]"
                  >
                    {site.skillsPage.githubLabel[locale]}
                  </Link>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl text-white sm:text-3xl">{site.appsSection.title[locale]}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {site.appsSection.subtitle[locale]}
            </p>
          </div>
          <Link
            href="/apps"
            className="hidden rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm text-white transition-colors duration-150 hover:border-[color:var(--accent)] sm:inline-flex"
          >
            {site.appsSection.cta[locale]}
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {site.apps.map((app) => (
            <article key={app.name.en} className="glass-surface focus-card rounded-2xl p-6 sm:p-7">
              <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                    {app.typeLabel[locale]}
                  </p>
                  <h3 className="mt-3 text-2xl leading-tight text-white">{app.name[locale]}</h3>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                    {app.summary[locale]}
                  </p>
                  {app.demoUrl || app.githubUrl ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {app.demoUrl ? (
                        <Link
                          href={app.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="cta-button inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm text-white hover:border-[color:var(--accent)]"
                        >
                          Demo
                        </Link>
                      ) : null}
                      {app.githubUrl ? (
                        <Link
                          href={app.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="cta-button inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm text-white hover:border-[color:var(--accent)]"
                        >
                          GitHub
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                {app.previewImage ? (
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                    <Image
                      src={app.previewImage}
                      alt={app.name[locale]}
                      width={1536}
                      height={864}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-white/10 bg-[linear-gradient(145deg,rgba(143,167,255,0.18),rgba(78,112,180,0.06)_50%,rgba(255,255,255,0.02))] px-4 text-center text-xs uppercase tracking-[0.16em] text-white/70 sm:min-h-[160px]">
                    {app.previewLabel[locale]}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl text-white sm:text-3xl">{site.obsidianSection.title[locale]}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {site.obsidianSection.subtitle[locale]}
            </p>
          </div>
          <Link
            href="/obsidian"
            className="hidden rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm text-white transition-colors duration-150 hover:border-[color:var(--accent)] sm:inline-flex"
          >
            {site.obsidianSection.cta[locale]}
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {site.obsidianSection.cards.map((card) => (
            <article key={card.title.en} className="glass-surface focus-card rounded-2xl p-6 sm:p-7">
              <h3 className="text-xl leading-tight text-white sm:text-2xl">{card.title[locale]}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                {card.body[locale]}
              </p>
            </article>
          ))}
        </div>

        <h3 className="mt-9 text-lg text-white sm:text-xl">{site.obsidianPage.sourceListTitle[locale]}</h3>
        <ul className="mt-4 space-y-3">
          {site.obsidianSources.map((source) => (
            <li
              key={source.name.en}
              className="glass-surface focus-card rounded-xl px-5 py-4 text-sm leading-7 text-[color:var(--muted)] sm:px-6 sm:text-base"
            >
              <span className="text-white">{source.name[locale]}:</span> {source.detail[locale]}
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <Link
            href="/obsidian"
            className="cta-button inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white"
          >
            {site.obsidianSection.cta[locale]}
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
