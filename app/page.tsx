"use client";

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

            <h1 className="mt-7 max-w-4xl text-[42px] leading-[1.02] tracking-tight text-white sm:text-[56px] lg:text-[64px]">
              {site.home.title[locale]}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              {site.home.description[locale]}
            </p>

            <p className="mt-4 text-sm text-white/75">{site.home.subline[locale]}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="cta-button inline-flex items-center rounded-full border border-[color:var(--accent)] bg-[rgba(143,167,255,0.2)] px-6 py-3 text-sm font-medium text-[#eef1ff]"
              >
                {site.home.ctaPrimary[locale]}
              </Link>
              <Link
                href="/thoughts"
                className="cta-button inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white"
              >
                {site.home.ctaSecondary[locale]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-10">
        <h2 className="text-2xl text-white sm:text-3xl">{site.exploreSection.title[locale]}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.exploreSection.cards.map((item) => (
            <article key={item.title.en} className="glass-surface focus-card rounded-2xl p-6 sm:p-7">
              <h3 className="text-2xl leading-tight text-white">{item.title[locale]}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                {item.body[locale]}
              </p>
            </article>
          ))}
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
            {site.nav.skills[locale]}
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
        <h2 className="text-2xl text-white sm:text-3xl">{site.appsSection.title[locale]}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
          {site.appsSection.subtitle[locale]}
        </p>

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

                <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-white/10 bg-[linear-gradient(145deg,rgba(143,167,255,0.18),rgba(78,112,180,0.06)_50%,rgba(255,255,255,0.02))] px-4 text-center text-xs uppercase tracking-[0.16em] text-white/70 sm:min-h-[160px]">
                  {app.previewLabel[locale]}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <h2 className="text-2xl text-white sm:text-3xl">{site.notesSection.title[locale]}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
          {site.notesSection.subtitle[locale]}
        </p>

        <ul className="mt-6 space-y-4">
          {site.notes[locale].slice(0, 3).map((note) => (
            <li
              key={note}
              className="glass-surface focus-card rounded-2xl px-6 py-5 text-base leading-8 text-white sm:px-7"
            >
              {note}
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <Link
            href="/thoughts"
            className="cta-button inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white"
          >
            {site.notesSection.cta[locale]}
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
