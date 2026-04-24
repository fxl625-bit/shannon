"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { useLanguage } from "@/components/language-provider";
import { site, type Localized } from "@/data/site";

export function SiteShell({
  children,
  title,
  eyebrow,
}: {
  children: ReactNode;
  title?: Localized;
  eyebrow?: Localized;
}) {
  const { locale, setLocale } = useLanguage();
  const navItems = [
    { href: "/", label: site.nav.home[locale] },
    { href: "/projects", label: site.nav.projects[locale] },
    { href: "/thoughts", label: site.nav.thoughts[locale] },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="grain" />
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-16 pt-6 sm:px-10 lg:px-12">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-xl tracking-[0.18em] text-white"
          >
            SF
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-5 text-sm text-[color:var(--muted)]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors duration-150 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-full px-3 py-1 text-xs transition-colors duration-150 ${
                  locale === "en"
                    ? "bg-white text-black"
                    : "text-[color:var(--muted)] hover:text-white"
                }`}
                aria-label="Switch language to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLocale("zh")}
                className={`rounded-full px-3 py-1 text-xs transition-colors duration-150 ${
                  locale === "zh"
                    ? "bg-white text-black"
                    : "text-[color:var(--muted)] hover:text-white"
                }`}
                aria-label="切换到中文"
              >
                中
              </button>
            </div>
          </div>
        </header>

        {(title || eyebrow) ? (
          <div className="pt-16 sm:pt-24">
            {eyebrow ? (
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--accent)]">
                {eyebrow[locale]}
              </p>
            ) : null}
            {title ? (
              <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-5xl leading-none tracking-tight text-white sm:text-6xl">
                {title[locale]}
              </h1>
            ) : null}
          </div>
        ) : null}

        {children}
      </main>
    </div>
  );
}
