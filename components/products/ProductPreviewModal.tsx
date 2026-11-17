"use client";

import { useEffect, useRef } from "react";

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
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!app || !dialog) return;

    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [app]);

  if (!app) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto h-fit w-[calc(100%_-_2rem)] max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#060a12] text-[color:var(--text-primary)] shadow-[0_30px_120px_-60px_rgba(96,165,250,0.45)] backdrop:bg-black/75 backdrop:backdrop-blur"
      aria-labelledby={`product-modal-${app.slug}`}
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="max-h-[calc(100dvh_-_2rem)] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-sm text-white/80 transition-colors hover:text-white"
          aria-label={locale === "zh" ? "关闭预览" : "Close preview"}
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
                {locale === "zh" ? "主要功能" : "Features"}
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
              {app.storeUrl ? (
                <a href={app.storeUrl} target="_blank" rel="noreferrer" className="editorial-link px-3 py-2.5">Google Play ↗</a>
              ) : null}
              {app.demoUrl ? (
                <a
                  href={app.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--text-primary)] px-5 py-2.5 text-sm text-black transition-transform hover:-translate-y-0.5"
                >
                  {locale === "zh" ? "打开应用" : "Open app"}
                </a>
              ) : null}
              {app.githubUrl ? (
                <a
                  href={app.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-white/[0.03] px-5 py-2.5 text-sm text-[color:var(--text-primary)] transition-colors hover:border-[color:var(--border-strong)]"
                >
                  GitHub
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
