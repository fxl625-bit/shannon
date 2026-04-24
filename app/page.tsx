import Link from "next/link";

import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="flex flex-1 items-center py-20 sm:py-28">
        <div className="grid w-full gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent)]">
              AI Products • Small Bets • Fresh Thinking
            </p>
            <h1 className="mt-8 font-[family-name:var(--font-display)] text-6xl leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-[6.5rem]">
              {site.name}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-[color:var(--muted)] sm:text-2xl">
              {site.tagline}
            </p>
            <p className="mt-10 max-w-xl text-base leading-8 text-[color:var(--muted)]">
              {site.intro}
            </p>
            <div className="mt-14">
              <Link
                href="/projects"
                className="inline-flex items-center rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-150 hover:bg-[color:var(--accent)]"
              >
                Explore Projects
              </Link>
            </div>
          </div>

          <div className="border-l border-white/10 pl-0 lg:pl-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Focus
            </p>
            <div className="mt-8 space-y-10">
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl text-white">
                  Tiny products
                </p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                  Compact tools with one sharp use case.
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl text-white">
                  Useful demos
                </p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                  Working prototypes that explain themselves quickly.
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl text-white">
                  Clear thinking
                </p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                  Short opinions on where AI can be more human-scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
