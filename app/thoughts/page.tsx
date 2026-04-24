"use client";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function ThoughtsPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={site.thoughtsSection.title} eyebrow={site.thoughtsSection.eyebrow}>
      <section className="py-12 sm:py-16">
        <div className="hero-enter max-w-3xl">
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            {site.thoughtsSection.intro[locale]}
          </p>

          <ul className="mt-10 space-y-4">
            {site.thoughts[locale].map((thought) => (
              <li
                key={thought}
                className="glass-surface focus-card rounded-2xl px-6 py-5 text-base leading-8 text-white sm:px-7"
              >
                {thought}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
