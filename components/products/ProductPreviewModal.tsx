"use client";

import Link from "next/link";
import { useEffect } from "react";

import type { AppTool, Locale } from "@/data/site";

import { ProductMotionPreview } from "./ProductMotionPreview";

type ProductPreviewModalProps = {
  app: AppTool | null;
  locale: Locale;
  onClose: () => void;
};

export function ProductPreviewModal({
  app,
  locale,
  onClose,
}: ProductPreviewModalProps) {
  useEffect(() => {
    if (!app) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [app, onClose]);

  if (!app) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/72 px-4 py-4 backdrop-blur md:items-center md:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`product-modal-${app.slug}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#060a12] shadow-[0_30px_120px_-60px_rgba(96,165,250,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-sm text-white/80 transition-colors hover:text-white"
          aria-label="Close preview"
        >
          ×
        </button>

        <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b border-white/8 p-5 md:border-b-0 md:border-r md:p-7">
            <ProductMotionPreview app={app} locale={locale} active className="h-full" />
          </div>

          <div className="flex flex-col gap-6 p-5 md:p-7">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                {app.typeLabel[locale]}
              </p>
              <h3
                id={`product-modal-${app.slug}`}
                className="mt-3 text-3xl leading-tight text-[color:var(--text-primary)]"
              >
                {app.name[locale]}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">
                {app.detail[locale]}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[color:var(--border)] bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
                {app.status[locale]}
              </span>
              {app.tags.map((tag) => (
                <span
                  key={tag.en}
                  className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[11px] text-[color:var(--text-muted)]"
                >
                  {tag[locale]}
                </span>
              ))}
            </div>

            <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                {locale === "zh" ? "Built from real problems." : "Built from real problems."}
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[color:var(--text-secondary)]">
                {app.detailBullets.map((bullet) => (
                  <li key={bullet.en} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--cyan)]" />
                    <span>{bullet[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              {app.demoUrl ? (
                <Link
                  href={app.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--text-primary)] px-5 py-2.5 text-sm text-black transition-transform hover:-translate-y-0.5"
                >
                  {locale === "zh" ? "\u5728\u7ebf\u6f14\u793a" : "Live Demo"}
                </Link>
              ) : null}
              {app.githubUrl ? (
                <Link
                  href={app.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-white/[0.03] px-5 py-2.5 text-sm text-[color:var(--text-primary)] transition-colors hover:border-[color:var(--border-strong)]"
                >
                  GitHub
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
