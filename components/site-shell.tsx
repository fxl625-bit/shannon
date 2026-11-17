"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { useLanguage } from "@/components/language-provider";
import { CursorRippleLayer } from "@/components/visual/CursorRippleLayer";
import { site, type Localized } from "@/data/site";

export function SiteShell({
  children,
  title,
  eyebrow,
  lead,
}: {
  children: ReactNode;
  title?: Localized;
  eyebrow?: Localized;
  lead?: Localized;
}) {
  const { locale, setLocale } = useLanguage();
  const path = usePathname();
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const pathname = (base && path.startsWith(base + "/") ? path.slice(base.length) : path).replace(/\/$/, "") || "/";

  const navItems = [
    { href: "/", label: site.nav.home[locale] },
    { href: "/apps", label: site.nav.apps[locale] },
    { href: "/second-brain", label: locale === "zh" ? "AI-Agent 知识库" : "AI-Agent Knowledge Base" },
    { href: "/skills", label: locale === "zh" ? "工作流" : "Workflows" },
    { href: "/explorations", label: site.nav.explorations[locale] },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="ambient-layer" />
      <CursorRippleLayer />
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[var(--max-width)] flex-col px-5 pb-24 pt-5 sm:px-8">
        <header className="sticky top-3 z-40">
          <div className="relative rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[#0b1220]/95 px-3 py-3 backdrop-blur-md sm:px-5">
            <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] text-sm font-semibold tracking-[0.08em] text-[color:var(--text-primary)]"
              >
                SF
              </Link>

              <nav aria-label={locale === "zh" ? "主导航" : "Main navigation"} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[color:var(--text-secondary)] sm:gap-x-5 sm:text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={pathname === item.href ? "font-semibold text-cyan-200" : "transition-colors duration-150 hover:text-white"}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="hidden justify-self-end rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-1 md:inline-flex">
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
              className="absolute right-3 top-3 rounded-full border border-transparent bg-[color:var(--text-primary)] px-3 py-1 text-[11px] text-black md:hidden"
              aria-label="Toggle language"
            >
              {locale === "en" ? "\u4e2d" : "EN"}
            </button>
          </div>
        </header>

        {(title || eyebrow) ? (
          <div className="editorial-intro mt-8 px-6 py-10 sm:mt-12 sm:px-10 sm:py-14 md:py-16">
            {eyebrow ? (
              <p className="relative text-xs font-medium uppercase tracking-[0.16em] text-cyan-200/85">
                {eyebrow[locale]}
              </p>
            ) : null}
            {title ? (
              <h1 className="relative mt-4 max-w-4xl text-[clamp(2.35rem,6vw,4.65rem)] font-semibold leading-[1.08] tracking-tight text-[color:var(--text-primary)]">
                {title[locale]}
              </h1>
            ) : null}
            {lead ? (
              <p className="relative mt-5 max-w-2xl text-base leading-7 text-[color:var(--text-secondary)] sm:text-lg">{lead[locale]}</p>
            ) : null}
          </div>
        ) : null}

        {children}
      </main>
    </div>
  );
}
