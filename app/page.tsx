"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function HomePage() {
  const { locale } = useLanguage();

  return (
    <SiteShell>
      <section className="flex flex-1 items-center py-20 sm:py-28">
        <div className="grid w-full gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent)]">
              {site.home.eyebrow[locale]}
            </p>
            <h1 className="mt-8 font-[family-name:var(--font-display)] text-6xl leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-[6.5rem]">
              {site.name}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-[color:var(--muted)] sm:text-2xl">
              {site.home.tagline[locale]}
            </p>
            <p className="mt-10 max-w-xl text-base leading-8 text-[color:var(--muted)]">
              {site.home.intro[locale]}
            </p>
            <div className="mt-14">
              <Link
                href="/projects"
                className="inline-flex items-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-6 py-3 text-sm font-medium text-[#1f170f] shadow-[0_8px_24px_rgba(215,195,161,0.22)] transition-colors duration-150 hover:bg-[#e8cfac]"
              >
                {site.home.cta[locale]}
              </Link>
            </div>
          </div>

          <div className="border-l border-white/10 pl-0 lg:pl-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">
              {site.home.focusLabel[locale]}
            </p>
            <div className="mt-8 space-y-10">
              {site.home.focusItems.map((item) => (
                <div key={item.title.en}>
                  <p className="font-[family-name:var(--font-display)] text-2xl text-white">
                    {item.title[locale]}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                    {item.body[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
