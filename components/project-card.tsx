"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { site, type AppTool } from "@/data/site";

export function ProjectCard({ app }: { app: AppTool }) {
  const { locale } = useLanguage();

  return (
    <article className="glass-surface focus-card rounded-2xl p-6 sm:p-7">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
            {site.appsPage.cardLabel[locale]}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/65">
            {app.typeLabel[locale]}
          </p>
          <h2 className="mt-3 text-3xl leading-tight text-white">{app.name[locale]}</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            {app.summary[locale]}
          </p>

          {app.demoUrl || app.githubUrl ? (
            <div className="mt-7 flex flex-wrap gap-2">
              {app.demoUrl ? (
                <Link
                  href={app.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-button inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm text-white hover:border-[color:var(--accent)]"
                >
                  {site.appsPage.demoLabel[locale]}
                </Link>
              ) : null}
              {app.githubUrl ? (
                <Link
                  href={app.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-button inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm text-white hover:border-[color:var(--accent)]"
                >
                  {site.appsPage.githubLabel[locale]}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-white/10 bg-[linear-gradient(145deg,rgba(143,167,255,0.18),rgba(78,112,180,0.06)_50%,rgba(255,255,255,0.02))] px-4 text-center text-xs uppercase tracking-[0.16em] text-white/70 sm:min-h-[160px]">
          {app.previewLabel[locale]}
        </div>
      </div>
    </article>
  );
}
