"use client";

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
          {locale === "zh" ? (
            <div className="space-y-3">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[color:var(--text-primary)] leading-relaxed">
                还在继续搭建。
              </p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[color:var(--text-primary)] leading-relaxed">
                还在继续记录。
              </p>
              <p className="mt-4 text-lg sm:text-xl leading-relaxed text-[color:var(--text-secondary)] max-w-[32ch] mx-auto">
                也还在继续测试 AI 如何改变我的思考和工作方式。
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[color:var(--text-primary)] leading-relaxed">
                Still building.
              </p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[color:var(--text-primary)] leading-relaxed">
                Still taking notes.
              </p>
              <p className="mt-4 text-lg sm:text-xl leading-relaxed text-[color:var(--text-secondary)] max-w-[36ch] mx-auto">
                Still testing how AI changes the way I think and work.
              </p>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
            <a
              href="mailto:fxl625@gmail.com"
              className="text-sm text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-primary)] tracking-wider"
            >
              {locale === "zh" ? "E-Mail" : "E-Mail"}
            </a>
            <span className="text-[color:var(--text-muted)]/30">·</span>
            <a
              href="https://github.com/fxl625-bit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-primary)] tracking-wider"
            >
              GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[color:var(--text-muted)]/30" />
            <div className="h-1.5 w-1.5 rotate-45 border border-[color:var(--text-muted)]/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[color:var(--text-muted)]/30" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
