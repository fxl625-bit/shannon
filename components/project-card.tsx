import Link from "next/link";

import type { Project } from "@/data/site";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex min-h-64 flex-col justify-between rounded-[2rem] border border-white/10 bg-[color:var(--panel)] p-8">
      <div className="space-y-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent)]">
          Project
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-white">
          {project.name}
        </h2>
        <p className="max-w-sm text-base leading-7 text-[color:var(--muted)]">
          {project.summary}
        </p>
      </div>

      <div className="pt-10">
        <Link
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition-colors duration-150 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
        >
          Live Demo
        </Link>
      </div>
    </article>
  );
}
