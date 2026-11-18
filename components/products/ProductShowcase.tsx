"use client";

import { useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/animation/Reveal";
import { site, type AppTool } from "@/data/site";

import { ProductCard } from "./ProductCard";
import { ProductPreviewModal } from "./ProductPreviewModal";
import { LocalLogShowcase } from "./LocalLogShowcase";

const apps: AppTool[] = site.apps;
const publicApps = apps.filter(app => app.slug !== "yishiyuanman" && (app.demoUrl || app.storeUrl));
const internalApps = apps.filter(app => !app.demoUrl && !app.storeUrl);

export function ProductShowcase() {
  const { locale } = useLanguage();
  const [selectedApp, setSelectedApp] = useState<AppTool | null>(null);

  return (
    <div className="space-y-12 py-12 sm:py-16">
      <section data-ripple-zone aria-labelledby="public-apps">
        <h2 id="public-apps" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {locale === "zh" ? "已发布的应用" : "Published apps"}
        </h2>
        <div className="mt-6">
          <LocalLogShowcase />
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {publicApps.map((app, index) => (
            <Reveal key={app.slug} delay={index * 0.08} className="h-full min-w-0">
              <ProductCard app={app} locale={locale} onOpen={setSelectedApp} priority={index < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="internal-apps">
        <h2 id="internal-apps" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {locale === "zh" ? "内部工具" : "Internal tools"}
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {internalApps.map(app => (
            <Reveal key={app.slug} className="h-full min-w-0">
              <ProductCard app={app} locale={locale} onOpen={setSelectedApp} />
            </Reveal>
          ))}
        </div>
      </section>

      <ProductPreviewModal
        app={selectedApp}
        locale={locale}
        onClose={() => setSelectedApp(null)}
      />
    </div>
  );
}
