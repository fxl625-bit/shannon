"use client";

import { useLanguage } from "@/components/language-provider";
import { ProjectCard } from "@/components/project-card";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function ProjectsPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={site.appsPage.title} eyebrow={site.appsPage.eyebrow}>
      <section className="py-12 sm:py-16">
        <div className="hero-enter">
          <div className="max-w-2xl">
            <p className="text-base leading-8 text-[color:var(--text-secondary)] sm:text-lg">
              {site.appsPage.intro[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {site.apps.map((app) => (
              <ProjectCard key={app.name.en} app={app} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
