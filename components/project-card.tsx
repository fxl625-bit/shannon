"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { site, type AppTool } from "@/data/site";

export function ProjectCard({ app }: { app: AppTool }) {
  const { locale } = useLanguage();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <article className="focus-card rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:p-7">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            {site.appsPage.cardLabel[locale]}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            {app.typeLabel[locale]}
          </p>
          <h2 className="mt-3 text-3xl leading-tight text-[color:var(--text-primary)]">{app.name[locale]}</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
            {app.summary[locale]}
          </p>

          {app.demoUrl || app.githubUrl ? (
            <div className="mt-7 flex flex-wrap gap-2">
              {app.demoUrl ? (
                <Link
                  href={app.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-button inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-5 py-2.5 text-sm text-[color:var(--text-primary)]"
                >
                  {site.appsPage.demoLabel[locale]}
                </Link>
              ) : null}
              {app.githubUrl ? (
                <Link
                  href={app.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-button inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-5 py-2.5 text-sm text-[color:var(--text-primary)]"
                >
                  {site.appsPage.githubLabel[locale]}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        {app.previewImage ? (
          <div className="flex h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-3">
            <Image
              src={`${basePath}${app.previewImage}`}
              alt={app.name[locale]}
              width={1536}
              height={864}
              className="max-h-full w-full object-contain"
            />
          </div>
        ) : (
          <div className="flex min-h-[140px] items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-4 text-center text-xs uppercase tracking-[0.16em] text-[color:var(--text-muted)] sm:min-h-[160px]">
            {app.previewLabel[locale]}
          </div>
        )}
      </div>
    </article>
  );
}
