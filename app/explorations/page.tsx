"use client";

import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";
import { ProcessStory, type ProcessStep } from "@/components/ProcessStory";
import { SiteShell } from "@/components/site-shell";
import type { Localized } from "@/data/site";

type Exploration = {
  id: string;
  title: Localized;
  status: Localized;
  intro: Localized;
  next: Localized;
  steps: ProcessStep[];
};

const explorations: Exploration[] = [
  {
    id: "geo-workbench",
    title: { en: "GEO Workbench", zh: "GEO 工作台" },
    status: { en: "Local evaluation tool", zh: "本地评测工具" },
    intro: {
      en: "I use a repeatable set of questions to see where a brand appears in AI answers and inspect the responses behind each count.",
      zh: "用一组可复测的问题观察品牌在 AI 回答里的出现情况，并保留每次统计对应的原始回答。",
    },
    next: {
      en: "Compare repeat runs with the same inputs, and show which responses were excluded from the count.",
      zh: "重点看同口径复测的变化，同时列清哪些回答被排除在统计之外。",
    },
    steps: [
      { title: { en: "Define", zh: "固定题集" }, detail: { en: "Set the question set, model, and response mode for each run.", zh: "先确定题集、模型和回答模式，让每轮结果都有明确口径。" } },
      { title: { en: "Sample", zh: "采集回答" }, detail: { en: "Keep the original responses and mark timeouts and unusable responses separately.", zh: "保留原答，单列超时和无效回答，方便逐题复核。" } },
      { title: { en: "Review", zh: "复核提及" }, detail: { en: "Check mentions in the answer text and use valid responses as the denominator.", zh: "核对正文里的品牌提及，以有效回答数作分母。" } },
      { title: { en: "Compare", zh: "同口径复测" }, detail: { en: "Compare runs with matching questions, models, and settings.", zh: "只对比题集、模型和回答设置一致的轮次。" } },
    ],
  },
  {
    id: "brand-knowledge-base",
    title: { en: "Brand Knowledge Base", zh: "品牌知识库" },
    status: { en: "Engineering prototype", zh: "工程原型验证中" },
    intro: {
      en: "I’m exploring how brand documents and case materials can become a searchable reference with traceable sources and versions.",
      zh: "探索怎样把分散的品牌资料和案例整理成可检索的参考库，让使用者能找到原文、版本和出处。",
    },
    next: {
      en: "Test which source is shown when a document changes or two sources disagree.",
      zh: "接下来重点验证文档换版、同一主题出现冲突来源时，检索会引用哪一份。",
    },
    steps: [
      { title: { en: "Collect", zh: "归整来源" }, detail: { en: "Organize source documents by topic and record where each one came from.", zh: "按主题整理原始资料，记录来源和适用场景。" } },
      { title: { en: "Version", zh: "记录版本" }, detail: { en: "Keep version and review records so that similar documents can be distinguished.", zh: "保存版本和审核记录，方便区分相近的材料。" } },
      { title: { en: "Retrieve", zh: "带出处检索" }, detail: { en: "Test whether a query surfaces relevant passages with a link back to the source.", zh: "验证检索能否返回相关段落，并把出处一起带回来。" } },
      { title: { en: "Verify", zh: "检查结果" }, detail: { en: "Use fixture data to check retrieval, source display, and evidence gaps.", zh: "用样例数据检查检索、出处展示和证据缺口。" } },
    ],
  },
];

export default function ExplorationsPage() {
  const { locale } = useLanguage();
  return (
    <SiteShell
      title={{ en: "Explorations", zh: "最近的探索" }}
      lead={{ en: "Experiments in brand visibility and source-backed knowledge, plus what I’m learning by iterating on the Digital Twin and everyday apps.", zh: "最近在试怎么测品牌可见度、让知识查得到出处，也在记录数字分身和日常应用每一轮解决了什么问题。" }}
    >
      <section className="grid gap-6 py-10 lg:grid-cols-2">
        {explorations.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.1} className="h-full">
            <article id={item.id} data-ripple-zone className="editorial-panel flex h-full scroll-mt-36 flex-col p-5 sm:p-7">
              <p className="text-xs font-medium text-cyan-200/85">{item.status[locale]}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{item.title[locale]}</h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">{item.intro[locale]}</p>
              <div className="mt-auto pt-2">
                <ProcessStory steps={item.steps} locale={locale} />
                <p className="mt-4 border-t border-white/8 pt-4 text-sm leading-6 text-[color:var(--text-secondary)]">{item.next[locale]}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
      <section className="mb-9 grid gap-5 md:grid-cols-2">
        <Reveal>
          <article id="agent-delivery" className="editorial-panel scroll-mt-36 p-5 sm:p-7">
            <h2 className="text-2xl font-semibold tracking-tight">{locale === "zh" ? "数字分身的迭代" : "Iterating on the Digital Twin"}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">
              {locale === "zh" ? "先把任务接进来，再试着让人离开对话之后，回来还能找到那件事。内部试点已跑过任务提交、进度回读和分阶段审核。" : "I started by getting tasks into the system, then explored how to let someone leave a conversation and return to the same task. Internal pilots have covered task submission, status readback, and staged review."}
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">
              {locale === "zh" ? "下一轮想验证，换一个对话入口接着做时，能不能找回原任务、已有结果和待本人决定的事。" : "Next I want to test whether switching conversation entry points preserves the original task, partial results, and decisions still waiting for me."}
            </p>
            <Link href="/agents#agent-runtime" className="editorial-link mt-4 inline-flex">{locale === "zh" ? "查看数字分身 →" : "Explore the Digital Twin →"}</Link>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article id="product-iteration" className="editorial-panel scroll-mt-36 p-5 sm:p-7">
            <h2 className="text-2xl font-semibold tracking-tight">{locale === "zh" ? "从日常需求迭代应用" : "Iterating on everyday apps"}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">
              {locale === "zh" ? "数学侦探这一轮想弄清，孩子看完讲解后能不能用同样的方法解一道新题。我加了同构变式，把题目、答案和判题结果逐项核对后再发布。" : "In this Math Detective iteration, I wanted to know whether a learner could use the same reasoning on a new problem after reading the explanation. I added follow-up variants and checked the problems, answers, and grading before release."}
            </p>
            <Link href="/cases/math-detective-iteration" className="editorial-link mt-4 inline-flex">{locale === "zh" ? "查看数学侦探迭代 →" : "Read the Math Detective iteration →"}</Link>
          </article>
        </Reveal>
      </section>
      <Link href="/second-brain" className="editorial-link self-start">
        {locale === "zh" ? "查看 AI-Agent 知识库结构 →" : "Explore the AI-Agent knowledge base →"}
      </Link>
    </SiteShell>
  );
}
