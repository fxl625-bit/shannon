"use client";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function SkillsPage() {
  const { locale } = useLanguage();
  const m = site.skillsPage.methodology;
  const p = site.skillsPage.pipeline;

  return (
    <SiteShell title={site.skillsPage.title} eyebrow={site.skillsPage.eyebrow}>
      <section className="py-12 sm:py-16">
        <div className="hero-enter max-w-3xl">
          <p className="text-base leading-8 text-[color:var(--text-secondary)] sm:text-lg">
            {site.skillsPage.intro[locale]}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-[28px] leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[36px]">
            {m.title[locale]}
          </h2>

          <div className="methodology-grid mt-8">
            {m.items.map((item) => (
              <div key={item.title.en} className="methodology-card">
                <h3>{item.title[locale]}</h3>
                <p>{item.body[locale]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pipeline-block mt-12">
          <h3>{p.title[locale]}</h3>
          <p>{p.body[locale]}</p>
        </div>
      </section>
    </SiteShell>
  );
}
