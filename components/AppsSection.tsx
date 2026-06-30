"use client";

import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";
import { ProductMotionPreview } from "@/components/products/ProductMotionPreview";
import { site } from "@/data/site";

export function AppsSection() {
  const { locale } = useLanguage();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[var(--max-width)] px-5 sm:px-8">
        <Reveal>
          <div className="mb-14 max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
              {locale === "zh" ? "\u4ea7\u54c1\u6837\u672c" : "Product Samples"}
            </span>
            <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[42px]">
              {locale === "zh" ? "\u4e0d\u662f\u9879\u76ee\u5217\u8868\uff0c\u800c\u662f\u771f\u5b9e\u88ab\u505a\u51fa\u6765\u7684\u4ea7\u54c1\u7247\u6bb5" : "Not a project list. Real product slices."}
            </h2>
            <p className="mt-5 max-w-[62ch] text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
              {site.appsPage.intro[locale]}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal delay={0.06}>
            <div className="rounded-[30px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 sm:p-5">
              <ProductMotionPreview app={site.apps[1]} locale={locale} active priority />
              <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                    {site.apps[1].typeLabel[locale]}
                  </p>
                  <h3 className="mt-2 text-2xl text-[color:var(--text-primary)]">
                    {site.apps[1].name[locale]}
                  </h3>
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-cyan-100">
                  {site.apps[1].status[locale]}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">
                {site.apps[1].spotlight[locale]}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {site.apps.filter((_, index) => index !== 1).map((app, index) => (
              <Reveal key={app.slug} delay={0.1 + index * 0.06}>
                <div className="rounded-[26px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-4">
                  <div className="grid items-center gap-4 sm:grid-cols-[220px_1fr]">
                    <ProductMotionPreview app={app} locale={locale} />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-[color:var(--text-primary)]">
                          {app.name[locale]}
                        </p>
                        <span className="rounded-full border border-[color:var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
                          {app.status[locale]}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">
                        {app.spotlight[locale]}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.28}>
          <div className="mt-10 text-center">
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-3 text-sm text-[color:var(--text-secondary)] transition-all hover:border-[color:var(--border-strong)] hover:text-[color:var(--text-primary)]"
            >
              {locale === "zh" ? "\u8fdb\u5165\u5168\u90e8 Product Showcase" : "View the full showcase"}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
