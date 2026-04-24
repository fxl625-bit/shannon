import { ProjectCard } from "@/components/project-card";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function ProjectsPage() {
  return (
    <SiteShell title="Projects" eyebrow="Selected Work">
      <section className="py-16 sm:py-20">
        <div className="mb-14 max-w-2xl">
          <p className="text-base leading-8 text-[color:var(--muted)]">
            A short list of AI product experiments with simple interfaces, narrow scope, and
            a bias toward usefulness over noise.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {site.projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
