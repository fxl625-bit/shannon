"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { AmbientBackground } from "@/components/AmbientBackground";
import { ScrollSequenceHero } from "@/components/ScrollSequenceHero";
import { HomeGatewaySection } from "@/components/HomeGatewaySection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { PotentialMapSection } from "@/components/PotentialMapSection";
import { WorkflowSection } from "@/components/WorkflowSection";
import { BrandCapabilitySection } from "@/components/BrandCapabilitySection";
import { AppsSection } from "@/components/AppsSection";
import { ClosingSection } from "@/components/ClosingSection";
import { MouseGlow } from "@/components/animation/MouseGlow";
import { useLanguage } from "@/components/language-provider";

export default function HomePage() {
  const { locale } = useLanguage();

  // ── Scroll reset: prevent browser scroll restoration ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Only scroll to top if no hash in URL
    if (!window.location.hash || window.location.hash.length <= 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  return (
    <>
      {/* Dynamic background layer */}
      <AmbientBackground />

      {/* Mouse glow effect */}
      <MouseGlow />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10">
        {/* ═══════════════════════════════════════════════
            Scroll-Driven Video Hero (replaces old HeroSection)
            ═══════════════════════════════════════════════ */}
        <ScrollSequenceHero />

        {/* ═══════════════════════════════════════════════
            Home Gateway — content entry after scroll video
            ═══════════════════════════════════════════════ */}
        <HomeGatewaySection />

        {/* ═══════════════════════════════════════════════
            Manifesto — vision statement
            ═══════════════════════════════════════════════ */}
        <ManifestoSection />

        {/* ═══════════════════════════════════════════════
            Potential Map — knowledge system
            ═══════════════════════════════════════════════ */}
        <PotentialMapSection />

        {/* ═══════════════════════════════════════════════
            Workflow — process showcase
            ═══════════════════════════════════════════════ */}
        <WorkflowSection />

        {/* ═══════════════════════════════════════════════
            Brand Capability Upgrade — capability showcase
            ═══════════════════════════════════════════════ */}
        <BrandCapabilitySection />

        {/* ═══════════════════════════════════════════════
            Apps — integrated tools
            ═══════════════════════════════════════════════ */}
        <AppsSection />

        {/* ═══════════════════════════════════════════════
            Closing — final CTA
            ═══════════════════════════════════════════════ */}
        <ClosingSection />

        {/* ═══════════════════════════════════════════════
            Footer
            ═══════════════════════════════════════════════ */}
        <footer className="border-t border-[color:var(--border)] py-12">
          <div className="mx-auto flex max-w-[var(--max-width)] flex-col items-center justify-between gap-4 px-5 text-sm text-[color:var(--text-muted)] sm:flex-row sm:px-8">
            <p>© 2026 Shannon Fu</p>
            <div className="flex gap-6">
              <a
                href="https://github.com/fxl625-bit"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[color:var(--text-secondary)]"
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
