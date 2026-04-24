"use client";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function ThoughtsPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={site.obsidianPage.title} eyebrow={site.obsidianPage.eyebrow}>
      <section className="py-12 sm:py-16">
        <div className="hero-enter max-w-3xl">
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            {site.obsidianPage.intro[locale]}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {site.obsidianPage.cards.map((card) => (
              <article key={card.title.en} className="glass-surface focus-card rounded-2xl p-6 sm:p-7">
                <h2 className="text-xl leading-tight text-white sm:text-2xl">{card.title[locale]}</h2>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                  {card.body[locale]}
                </p>
              </article>
            ))}
          </div>

          <h3 className="mt-10 text-lg text-white sm:text-xl">{site.obsidianPage.sourceListTitle[locale]}</h3>
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
        </div>
      </section>
    </SiteShell>
  );
}
