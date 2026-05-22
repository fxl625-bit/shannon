"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";
import { cases } from "@/data/cases";

export default function CasesPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={site.casesPage.title} eyebrow={site.casesPage.eyebrow}>
      <section className="py-12 sm:py-16">
        <div className="hero-enter max-w-3xl">
          <p className="text-base leading-8 text-[color:var(--text-secondary)] sm:text-lg">
            {site.casesPage.intro[locale]}
          </p>
        </div>

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
