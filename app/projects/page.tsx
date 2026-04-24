"use client";

import { useLanguage } from "@/components/language-provider";
import { ProjectCard } from "@/components/project-card";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function ProjectsPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={site.projectsSection.title} eyebrow={site.projectsSection.eyebrow}>
      <section className="py-12 sm:py-16">
        <div className="hero-enter">
          <div className="max-w-2xl">
            <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              {site.projectsSection.intro[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {site.projects.map((project) => (
              <ProjectCard key={project.name.en} project={project} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
