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
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[var(--max-width)] flex-col px-5 pb-24 pt-5 sm:px-8">
        <header className="sticky top-3 z-40">
          <div className="relative rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-3 sm:px-5">
            <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] text-sm font-semibold tracking-[0.08em] text-[color:var(--text-primary)]"
              >
                SF
              </Link>

              <nav className="flex items-center justify-center gap-4 text-xs text-[color:var(--text-muted)] sm:gap-5 sm:text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition-colors duration-150 hover:text-[color:var(--text-primary)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="hidden justify-self-end rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-1 sm:inline-flex">
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={`rounded-full px-2.5 py-1 text-[11px] transition-colors duration-150 sm:px-3 ${
                    locale === "en"
                      ? "bg-[color:var(--text-primary)] text-black"
                      : "text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
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
                      ? "bg-[color:var(--text-primary)] text-black"
                      : "text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
                  }`}
                  aria-label="Switch language to Chinese"
                >
                  {site.languageSwitch.zh.current}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "zh" : "en")}
              className="absolute right-3 top-3 rounded-full border border-transparent bg-[color:var(--text-primary)] px-3 py-1 text-[11px] text-black sm:hidden"
              aria-label="Toggle language"
            >
              {locale === "en" ? "\u4e2d" : "EN"}
            </button>
          </div>
        </header>

        {(title || eyebrow) ? (
          <div className="pt-16 sm:pt-24">
            {eyebrow ? (
              <p className="inline-flex rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
                {eyebrow[locale]}
              </p>
            ) : null}
            {title ? (
              <h1 className="mt-7 max-w-4xl text-[44px] leading-[1.02] tracking-tight text-[color:var(--text-primary)] sm:text-[62px] lg:text-[76px]">
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
