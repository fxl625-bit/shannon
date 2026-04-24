"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { site, type Experiment } from "@/data/site";

export function ProjectCard({ project }: { project: Experiment }) {
  const { locale } = useLanguage();

  return (
    <article className="glass-surface focus-card flex min-h-[320px] flex-col justify-between rounded-2xl p-6 sm:p-7">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
          {site.experimentsPage.cardLabel[locale]}
        </p>
        <h2 className="mt-3 text-3xl leading-tight text-white">{project.name[locale]}</h2>
        <p className="mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
          {project.summary[locale]}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags[locale].map((tag) => (
            <span
              key={`${project.name.en}-${tag}`}
              className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs text-[color:var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {project.demoUrl || project.githubUrl ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {project.demoUrl ? (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="cta-button inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm text-white hover:border-[color:var(--accent)]"
            >
              {site.experimentsPage.demoLabel[locale]}
            </Link>
          ) : null}
          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="cta-button inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm text-white hover:border-[color:var(--accent)]"
            >
              {site.experimentsPage.githubLabel[locale]}
            </Link>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
