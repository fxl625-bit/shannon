"use client";

import { useEffect } from "react";

import { AmbientBackground } from "@/components/AmbientBackground";
import { BrandCapabilitySection } from "@/components/BrandCapabilitySection";
import { HomeGatewaySection } from "@/components/HomeGatewaySection";
import { Navigation } from "@/components/Navigation";
import { ScrollSequenceHero } from "@/components/ScrollSequenceHero";
import { CursorRippleLayer } from "@/components/visual/CursorRippleLayer";
import { WorkflowSection } from "@/components/WorkflowSection";

export default function HomePage() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash || window.location.hash.length <= 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  return (
    <>
      <AmbientBackground />
      <CursorRippleLayer />
      <Navigation />

      <main className="relative z-10">
        <div data-ripple-zone>
          <ScrollSequenceHero />
        </div>
        <HomeGatewaySection />
        <BrandCapabilitySection />
        <WorkflowSection />

        <footer className="border-t border-[color:var(--border)] py-10">
          <div className="mx-auto flex max-w-[var(--max-width)] flex-col items-center justify-between gap-5 px-5 text-sm text-[color:var(--text-muted)] sm:flex-row sm:px-8">
            <p>© 2026 Shannon Fu</p>
            <div className="flex gap-6">
              <a
                href="mailto:fxl625@gmail.com"
                className="transition-colors hover:text-[color:var(--text-primary)]"
              >
                E-Mail
              </a>
              <a
                href="https://github.com/fxl625-bit"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[color:var(--text-primary)]"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
