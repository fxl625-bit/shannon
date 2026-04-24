"use client";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function SkillsPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={site.skillsPage.title} eyebrow={site.skillsPage.eyebrow}>
      <section className="py-12 sm:py-16">
        <div className="hero-enter max-w-4xl">
          <p className="text-base leading-8 text-[color:var(--text-secondary)] sm:text-lg">
            {site.skillsPage.intro[locale]}
          </p>

          <ul className="mt-10 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
            {site.skills.map((skill) => (
              <li key={skill.name.en} className="py-5 sm:py-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div>
                    <p className="text-xl text-[color:var(--text-primary)]">{skill.name[locale]}</p>
                    <p className="mt-1 text-sm leading-7 text-[color:var(--text-secondary)]">
                      {skill.summary[locale]}
                    </p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                    {skill.label[locale]}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
