"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/animation/Reveal";
import { site } from "@/data/site";
import { motion } from "framer-motion";

function AppPreviewCard({
  app,
  index,
}: {
  app: (typeof site.apps)[0];
  index: number;
}) {
  const { locale } = useLanguage();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <Reveal delay={index * 0.1}>
      <div className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] transition-all duration-300 hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-hover)]">
        {/* Preview area */}
        <div className="relative h-48 overflow-hidden border-b border-[color:var(--border)] bg-[color:var(--surface-soft)] sm:h-56">
          {app.previewImage ? (
            <Image
              src={`${basePath}${app.previewImage}`}
              alt={app.name[locale]}
              className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
              width={800}
              height={600}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="w-full max-w-[180px] rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
                <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/10" />
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-white/8" />
                  <div className="h-2 w-4/5 rounded-full bg-white/6" />
                  <div className="h-2 w-3/5 rounded-full bg-white/4" />
                </div>
              </div>
            </div>
          )}

          {/* Hover glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-60" />
        </div>

        {/* Info */}
        <div className="p-5 sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-muted)]">
            {app.typeLabel[locale]}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[color:var(--text-primary)]">
            {app.name[locale]}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">
            {app.summary[locale]}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function AppsSection() {
  const { locale } = useLanguage();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[var(--max-width)] px-5 sm:px-8">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
              {locale === "zh" ? "应用与工具" : "Apps & Tools"}
            </span>
            <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[42px]">
              {locale === "zh"
                ? "应用与实验"
                : "Apps & Experiments"}
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {site.apps.map((app, i) => (
            <AppPreviewCard key={app.name.en} app={app} index={i} />
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-3 text-sm text-[color:var(--text-secondary)] transition-all hover:border-[color:var(--border-strong)] hover:text-[color:var(--text-primary)]"
            >
              {locale === "zh" ? "查看全部" : "View All"} →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
