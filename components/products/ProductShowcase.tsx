"use client";

import { useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/animation/Reveal";
import { site, type AppTool } from "@/data/site";

import { ProductCard } from "./ProductCard";
import { ProductPreviewModal } from "./ProductPreviewModal";
import { ProductMotionPreview } from "./ProductMotionPreview";

export function ProductShowcase() {
  const { locale } = useLanguage();
  const [selectedApp, setSelectedApp] = useState<AppTool | null>(null);

  return (
    <section data-ripple-zone className="py-12 sm:py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                Product Showcase
              </p>
              <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[44px]">
                {locale === "zh" ? "\u57fa\u4e8e\u771f\u5b9e\u95ee\u9898\u957f\u51fa\u6765\u7684\u5c0f\u4ea7\u54c1" : "Small products, built from real problems."}
              </h2>
              <p className="mt-4 max-w-[56ch] text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
                {site.appsPage.intro[locale]}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {site.apps.slice(0, 4).map((app, index) => (
                <div
                  key={app.slug}
                  className={`transition-transform duration-700 ${index % 2 === 0 ? "lg:translate-y-6" : "lg:-translate-y-2"}`}
                >
                  <ProductMotionPreview
                    app={app}
                    locale={locale}
                    priority={index < 2}
                    active
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {site.apps.map((app, index) => (
            <ProductCard
              key={app.slug}
              app={app}
              locale={locale}
              onOpen={setSelectedApp}
              priority={index < 2}
            />
          ))}
        </div>
      </Reveal>

      <ProductPreviewModal
        app={selectedApp}
        locale={locale}
        onClose={() => setSelectedApp(null)}
      />
    </section>
  );
}
