"use client";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/animation/Reveal";

export function ManifestoSection() {
  const { locale } = useLanguage();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[var(--max-width)] px-5 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Main text */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                Manifesto
              </span>
            </Reveal>

            <Reveal delay={0.15}>
              <h2
                className={`mt-6 font-semibold tracking-tight text-[color:var(--text-primary)] ${
                  locale === "zh"
                    ? "text-[36px] leading-[1.15] sm:text-[48px] lg:text-[56px]"
                    : "text-[40px] leading-[1.05] sm:text-[52px] lg:text-[64px]"
                }`}
              >
                {locale === "zh" ? (
                  <>
                    技术不该让人
                    <br />
                    <span className="bg-gradient-to-r from-[color:var(--warm)] to-[color:var(--cyan)] bg-clip-text text-transparent">
                      变小
                    </span>
                    ，而应让人
                    <span className="bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)] bg-clip-text text-transparent">
                      变大
                    </span>
                    。
                  </>
                ) : (
                  <>
                    Technology should
                    <br />
                    make humans{" "}
                    <span className="bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--violet)] bg-clip-text text-transparent">
                      larger
                    </span>
                    .
                  </>
                )}
              </h2>
            </Reveal>
          </div>

          {/* Supporting text */}
          <div className="space-y-8">
            <Reveal delay={0.3}>
              <p className="text-lg leading-8 text-[color:var(--text-secondary)] sm:text-xl">
                {locale === "zh"
                  ? "AI 不光是自动化工具，也可以在记忆、表达、判断和创造这些方面帮上忙。"
                  : "AI is more than automation. It can also help with memory, expression, judgment, and creativity."}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
