"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { site } from "@/data/site";
import { useState } from "react";

export function Navigation() {
  const { locale, setLocale } = useLanguage();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Use React state for style values to avoid SSR hydration mismatch
  // caused by MotionValue objects in inline styles.
  const [headerBg, setHeaderBg] = useState("rgba(5, 7, 13, 0)");
  const [headerBorder, setHeaderBorder] = useState("rgba(255, 255, 255, 0)");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const opacity = Math.min(latest / 100, 1);
    setHeaderBg(`rgba(5, 7, 13, ${opacity * 0.85})`);
    setHeaderBorder(`rgba(255, 255, 255, ${opacity * 0.1})`);
  });

  const navItems = [
    { href: "/", label: site.nav.home[locale] },
    { href: "/cases", label: site.nav.cases[locale] },
    { href: "/skills", label: site.nav.skills[locale] },
    { href: "/apps", label: site.nav.apps[locale] },
    { href: "/lab", label: locale === "zh" ? "实验" : "Experiments" },
    { href: "/second-brain", label: locale === "zh" ? "第二大脑" : "Second Brain" },
    { href: "/obsidian", label: site.nav.obsidian[locale] },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: headerBg,
        borderBottomColor: headerBorder,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[var(--max-width)] items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-sm font-semibold tracking-[0.08em] text-[color:var(--text-primary)] transition-colors hover:border-[color:var(--border-strong)]"
        >
          SF
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm transition-colors ${
                  isActive
                    ? "text-[color:var(--text-primary)]"
                    : "text-[color:var(--text-muted)] hover:text-[color:var(--text-secondary)]"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[color:var(--cyan)]"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Language Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] p-1 sm:inline-flex">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-full px-2.5 py-1 text-[11px] transition-colors duration-150 sm:px-3 ${
                locale === "en"
                  ? "bg-[color:var(--text-primary)] text-black"
                  : "text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("zh")}
              className={`rounded-full px-2.5 py-1 text-[11px] transition-colors duration-150 sm:px-3 ${
                locale === "zh"
                  ? "bg-[color:var(--text-primary)] text-black"
                  : "text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
              }`}
            >
              中
            </button>
          </div>

          {/* Mobile language toggle */}
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "zh" : "en")}
            className="rounded-full border border-transparent bg-[color:var(--text-primary)] px-3 py-1 text-[11px] text-black sm:hidden"
          >
            {locale === "en" ? "中" : "EN"}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
