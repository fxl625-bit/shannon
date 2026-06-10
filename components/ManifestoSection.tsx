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
                  ? "AI 不只是自动化工具，它也可以成为记忆、感知、表达与判断的新层。"
                  : "AI is not only about automation. It can become a new layer of memory, perception, expression, and decision-making."}
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="h-px w-16 bg-gradient-to-r from-[color:var(--cyan)] to-transparent" />
            </Reveal>

            <Reveal delay={0.5}>
              <p className="text-sm leading-7 text-[color:var(--text-muted)]">
                {locale === "zh"
                  ? "这个网站是一个实验界面，记录我如何用 AI 扩展人的能力边界——不是展示技术本身，而是展示被技术增强后的人能做什么。"
                  : "This site is an experimental interface documenting how I use AI to expand human capability — not showcasing technology itself, but what augmented humans can do."}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
