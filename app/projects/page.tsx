"use client";

import { useLanguage } from "@/components/language-provider";
import { ProjectCard } from "@/components/project-card";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function ProjectsPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={site.projectsSection.title} eyebrow={site.projectsSection.eyebrow}>
      <section className="py-16 sm:py-20">
        <div className="mb-14 max-w-2xl">
          <p className="text-base leading-8 text-[color:var(--muted)]">
            {site.projectsSection.intro[locale]}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {site.projects.map((project) => (
            <ProjectCard key={project.name.en} project={project} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
