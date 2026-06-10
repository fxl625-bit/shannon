"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/animation/Reveal";

export function ClosingSection() {
  const { locale } = useLanguage();

  return (
    <section className="relative py-32 sm:py-40">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--cyan)] opacity-[0.03] blur-[120px]" />
        <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--violet)] opacity-[0.02] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[var(--max-width)] px-5 text-center sm:px-8">
        <Reveal>
          <h2
            className={`mx-auto max-w-[16ch] font-semibold tracking-tight text-[color:var(--text-primary)] ${
              locale === "zh"
                ? "text-[36px] leading-[1.15] sm:text-[52px] lg:text-[64px]"
                : "text-[40px] leading-[1.05] sm:text-[56px] lg:text-[68px]"
            }`}
          >
            {locale === "zh" ? (
              <>
                未来不只是
                <br />
                <span className="bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)] bg-clip-text text-transparent">
                  人工智能
                </span>
                ，
                <br />
                也是被增强的
                <span className="bg-gradient-to-r from-[color:var(--warm)] to-[color:var(--cyan)] bg-clip-text text-transparent">
                  人
                </span>
                。
              </>
            ) : (
              <>
                The future is not
                <br />
                only{" "}
                <span className="bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)] bg-clip-text text-transparent">
                  artificial intelligence
                </span>
                .
                <br />
                It is{" "}
                <span className="bg-gradient-to-r from-[color:var(--warm)] to-[color:var(--cyan)] bg-clip-text text-transparent">
                  augmented humanity
                </span>
                .
              </>
            )}
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-3 text-sm text-[color:var(--text-secondary)] transition-all hover:border-[color:var(--border-strong)] hover:text-[color:var(--text-primary)]"
            >
              {locale === "zh" ? "探索案例" : "Explore Cases"}
            </Link>
            <a
              href="https://github.com/fxl625-bit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-3 text-sm text-[color:var(--text-secondary)] transition-all hover:border-[color:var(--border-strong)] hover:text-[color:var(--text-primary)]"
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
