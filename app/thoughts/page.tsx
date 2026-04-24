import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function ThoughtsPage() {
  return (
    <SiteShell title="Thoughts" eyebrow="Short Notes">
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-base leading-8 text-[color:var(--muted)]">
            Not essays. Just compact ideas, product instincts, and small observations worth
            keeping visible.
          </p>

          <ul className="mt-14 space-y-6">
            {site.thoughts.map((thought) => (
              <li
                key={thought}
                className="rounded-[1.75rem] border border-white/10 bg-[color:var(--panel)] px-6 py-6 text-lg leading-8 text-white sm:px-8"
              >
                {thought}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
