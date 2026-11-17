"use client";

import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";
import { ProcessStory, type ProcessStep } from "@/components/ProcessStory";
import { SiteShell } from "@/components/site-shell";

const steps: ProcessStep[] = [
  {
    title: { en: "Define the exercise", zh: "定义变式" },
    detail: {
      en: "After the original explanation, offer a fresh problem with the same reasoning goal. Keep the grade, skill, difficulty, and input type aligned.",
      zh: "原题讲解完成后，再出现一道使用相同推理方法的新题。年级、知识点、难度和答题方式保持对应。",
    },
  },
  {
    title: { en: "Verify the answer", zh: "逐题核验" },
    detail: {
      en: "Check the math independently and enter the resulting answer in the actual grader. Record the reasons for each of the 30 source problems left without a variant.",
      zh: "独立核对数量关系和答案，再用实际判题器验证输入。对保留的 30 道缺口逐题记录原因。",
    },
  },
  {
    title: { en: "Preserve progress", zh: "保留学习记录" },
    detail: {
      en: "Save each variant separately. When a learner completes it, the original problem stays marked for review and the original reward is unchanged.",
      zh: "变式单独记录。做完变式后，原题仍保留待巩固状态，原题奖励按已有记录计算。",
    },
  },
  {
    title: { en: "Release and recheck", zh: "发布与复测" },
    detail: {
      en: "Run desktop and mobile checks against the release commit, then verify the public deployment and all six grade levels.",
      zh: "用同一提交完成桌面和手机验证，上线后再在正式站点复测一至六年级。",
    },
  },
];

const metrics = [
  { value: "20 → 595", label: { en: "Verified variants", zh: "经核验的变式" } },
  { value: "625", label: { en: "Grade 1–6 source problems reviewed", zh: "逐项审查的一至六年级源题" } },
  { value: "44 / 44", label: { en: "Public deployment browser checks", zh: "正式站浏览器复测通过" } },
];

export default function MathDetectiveIterationPage() {
  const { locale } = useLanguage();
  const zh = locale === "zh";

  return (
    <SiteShell
      eyebrow={{ en: "Release case · October 2026", zh: "迭代案例 · 2026 年 10 月" }}
      title={{ en: "Math Detective v2.15.0", zh: "数学侦探 v2.15.0" }}
      lead={{ en: "Could learners apply the same reasoning to a new problem after reading the explanation? This release expanded the follow-up exercises and verified every one against the grader.", zh: "看完讲解以后，能不能用同样的方法解一道新题？这次迭代扩充了讲解后的同构变式，并逐题核对答案和判题。" }}
    >
      <article className="space-y-7 py-10">
        <Reveal>
          <dl className="grid gap-3 sm:grid-cols-3">
            {metrics.map(metric => (
              <div key={metric.value} className="editorial-panel p-5 sm:p-6">
                <dt className="text-xs leading-5 text-[color:var(--text-secondary)]">{metric.label[locale]}</dt>
                <dd className="mt-2 text-3xl font-semibold tracking-tight text-cyan-100 sm:text-4xl">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal>
          <section data-ripple-zone className="editorial-panel p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{zh ? "这次迭代怎么做" : "How the iteration worked"}</h2>
            <ProcessStory steps={steps} locale={locale} />
          </section>
        </Reveal>
        <Reveal>
          <section className="editorial-panel p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">{zh ? "发布证据" : "Release evidence"}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
              {zh
                ? "2026 年 10 月 21 日发布。上线前的本地生产构建通过 324 项桌面和手机测试，发布后在正式站通过 44 项浏览器复测。"
                : "Released on October 21, 2026. The local production build passed 324 desktop and mobile checks before release. The public site then passed 44 browser checks."}
            </p>
            <div className="mt-5 flex flex-wrap gap-5">
              <a className="editorial-link" href="https://math-detective.vercel.app/" target="_blank" rel="noreferrer">{zh ? "体验数学侦探 ↗" : "Open Math Detective ↗"}</a>
              <a className="editorial-link" href="https://github.com/fxl625-bit/math-detective/actions/runs/39594959364" target="_blank" rel="noreferrer">{zh ? "发布验证记录 ↗" : "Release validation ↗"}</a>
              <Link className="editorial-link" href="/apps">{zh ? "查看其他应用 →" : "Browse other apps →"}</Link>
            </div>
          </section>
        </Reveal>
      </article>
    </SiteShell>
  );
}
