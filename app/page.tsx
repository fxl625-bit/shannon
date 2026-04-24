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
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
              {site.home.eyebrow[locale]}
            </p>

            <h1 className="mt-7 text-[42px] leading-[1.02] tracking-tight text-white sm:text-[56px] lg:text-[64px]">
              {site.name}
            </h1>

            <p className="mt-5 max-w-2xl text-[20px] leading-8 text-white/92 sm:text-[26px] sm:leading-9">
              {site.home.tagline[locale]}
            </p>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              {site.home.intro[locale]}
            </p>

            <div className="mt-10">
              <Link
                href="/projects"
                className="cta-button inline-flex items-center rounded-full border border-[color:var(--accent)] bg-[rgba(143,167,255,0.2)] px-6 py-3 text-sm font-medium text-[#eef1ff]"
              >
                {site.home.cta[locale]}
              </Link>
            </div>
          </div>

          <div className="mt-14">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
              {site.home.focusLabel[locale]}
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {site.home.focusItems.map((item) => (
                <article
                  key={item.title.en}
                  className="glass-surface focus-card rounded-2xl p-6 sm:p-7"
                >
                  <h2 className="text-2xl leading-tight text-white">{item.title[locale]}</h2>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                    {item.body[locale]}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
