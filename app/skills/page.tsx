"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function SkillsPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={site.skillsPage.title} eyebrow={site.skillsPage.eyebrow}>
      <section className="py-12 sm:py-16">
        <div className="hero-enter">
          <div className="max-w-3xl">
            <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              {site.skillsPage.intro[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {site.skills.map((skill) => (
              <article
                key={skill.name.en}
                className="glass-surface focus-card rounded-2xl p-6 sm:p-7"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                  {skill.label[locale]}
                </p>
                <h2 className="mt-3 text-2xl leading-tight text-white">{skill.name[locale]}</h2>
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
        </div>
      </section>
    </SiteShell>
  );
}
