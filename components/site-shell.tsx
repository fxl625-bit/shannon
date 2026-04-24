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
    { href: "/skills", label: site.nav.skills[locale] },
    { href: "/apps", label: site.nav.apps[locale] },
    { href: "/obsidian", label: site.nav.obsidian[locale] },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="ambient-layer" />
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1100px] flex-col px-5 pb-20 pt-4 sm:px-8 lg:px-10">
        <header className="sticky top-3 z-40">
          <div className="glass-surface flex items-center justify-between gap-3 rounded-2xl px-3 py-3 sm:px-5">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] text-sm font-semibold tracking-[0.08em] text-white"
            >
              SF
            </Link>

            <nav className="flex items-center gap-3 text-xs text-[color:var(--muted)] sm:gap-5 sm:text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors duration-150 hover:text-[color:var(--accent-strong)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="inline-flex rounded-full border border-white/12 bg-white/[0.03] p-1">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-full px-2.5 py-1 text-[11px] transition-colors duration-150 sm:px-3 ${
                  locale === "en"
                    ? "bg-white text-black"
                    : "text-[color:var(--muted)] hover:text-white"
                }`}
                aria-label="Switch language to English"
              >
                {site.languageSwitch.en.current}
              </button>
              <button
                type="button"
                onClick={() => setLocale("zh")}
                className={`rounded-full px-2.5 py-1 text-[11px] transition-colors duration-150 sm:px-3 ${
                  locale === "zh"
                    ? "bg-white text-black"
                    : "text-[color:var(--muted)] hover:text-white"
                }`}
                aria-label="Switch language to Chinese"
              >
                {site.languageSwitch.zh.current}
              </button>
            </div>
          </div>
        </header>

        {(title || eyebrow) ? (
          <div className="pt-14 sm:pt-20">
            {eyebrow ? (
              <p className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
                {eyebrow[locale]}
              </p>
            ) : null}
            {title ? (
              <h1 className="mt-6 max-w-3xl text-[42px] leading-[1.03] tracking-tight text-white sm:text-[56px] lg:text-[64px]">
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
