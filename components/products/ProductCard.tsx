"use client";

import { useState } from "react";

import type { AppTool, Locale } from "@/data/site";

import { ProductMotionPreview } from "./ProductMotionPreview";

type ProductCardProps = {
  app: AppTool;
  locale: Locale;
  onOpen: (app: AppTool) => void;
  priority?: boolean;
};

const statusToneClasses: Record<string, string> = {
  live: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
  internal: "border-white/12 bg-white/[0.05] text-white/75",
  store: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  building: "border-amber-300/20 bg-amber-300/10 text-amber-100",
};

export function ProductCard({
  app,
  locale,
  onOpen,
  priority = false,
}: ProductCardProps) {
  const [active, setActive] = useState(false);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] p-4 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--border-strong)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] sm:p-5 ${
        active ? "shadow-[0_24px_100px_-70px_rgba(96,165,250,0.55)]" : ""
      }`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] opacity-60" />

      <ProductMotionPreview app={app} locale={locale} active={active} priority={priority} />
      {app.statusTone === "internal" ? (
        <p className="mt-2 text-xs text-[color:var(--text-muted)]">{app.previewLabel[locale]}</p>
      ) : null}

      <div className="mt-5 flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
              {app.typeLabel[locale]}
            </p>
            <h3 className="mt-2 text-2xl leading-tight text-[color:var(--text-primary)]">
              {app.name[locale]}
            </h3>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.14em] ${
              statusToneClasses[app.statusTone ?? "internal"]
            }`}
          >
            {app.status[locale]}
          </span>
        </div>

        <p className="text-sm leading-7 text-[color:var(--text-secondary)]">
          {app.summary[locale]}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/8 pt-4">
          <button
            type="button"
            onClick={() => onOpen(app)}
            className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-white/[0.03] px-4 py-2 text-sm text-[color:var(--text-primary)] transition-colors hover:border-[color:var(--border-strong)]"
            aria-label={locale === "zh" ? "查看" + app.name.zh + "详情" : "View details for " + app.name.en}
          >
            {locale === "zh" ? "查看详情" : "View details"}
          </button>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {app.storeUrl ? (
              <a href={app.storeUrl} target="_blank" rel="noreferrer" className="editorial-link">Google Play ↗</a>
            ) : null}
            {app.demoUrl ? (
              <a href={app.demoUrl} target="_blank" rel="noreferrer" className="editorial-link">
                {locale === "zh" ? "在线体验 ↗" : "Open app ↗"}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
