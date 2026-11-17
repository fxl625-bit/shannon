"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";
import { cases } from "@/data/cases";

export default function CasesPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={site.casesPage.title} eyebrow={site.casesPage.eyebrow} lead={site.casesPage.intro}>
      <section className="py-12 sm:py-16">
        <Link href="/cases/math-detective-iteration" className="editorial-panel flex flex-wrap items-center justify-between gap-4 p-5 hover:border-cyan-200/40 sm:p-7">
          <div>
            <h2 className="text-2xl font-semibold">{locale === "zh" ? "数学侦探 v2.15.0" : "Math Detective v2.15.0"}</h2>
            <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{locale === "zh" ? "从 20 到 595 道经核验的同构变式。" : "From 20 to 595 verified follow-up exercises."}</p>
          </div>
          <span className="editorial-link">{locale === "zh" ? "阅读迭代案例 →" : "Read the release case →"}</span>
        </Link>

        <div className="case-wall mt-10">
          {cases.map((c) => (
            <Link key={c.slug} href={`/cases/${c.slug}`} className="case-wall-card">
              <span className="num">{c.number}</span>
              <h2>{c.title[locale]}</h2>
              <p>{c.valueStatement[locale].replace(/^[^——]*——/, "").trim()}</p>
              <span className="output-type">{c.metrics[2].value[locale]}</span>
              <span className="card-link">{locale === "zh" ? "进入案例" : "View Case"}</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
