"use client";

import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import type { Localized } from "@/data/site";

type Exploration = {
  id: string;
  title: Localized;
  question: Localized;
  idea: Localized;
  possibility: Localized;
};

const explorations: Exploration[] = [
  {
    id: "geo-workbench",
    title: { en: "GEO Workbench", zh: "GEO 工作台" },
    question: {
      en: "When AI helps people choose, how does a brand become part of the answer?",
      zh: "当大家开始向 AI 寻找答案，品牌怎样被理解和选择？",
    },
    idea: {
      en: "I want to understand the questions, contexts, and sources behind a brand’s appearance in AI answers. Can those answers reveal what people still need to know about a brand?",
      zh: "我想把用户会问的问题、AI 给出的答案和它引用的内容放在一起看。品牌在哪些场景出现，被怎样描述，还有哪些问题没有得到好好回答，都可能成为新的内容线索。",
    },
    possibility: {
      en: "I’m interested in connecting question discovery, content ideas, and repeat observations in one workbench, so that each informs the next.",
      zh: "想尝试把问题发现、内容构思和持续观察接到一个工作台里，让对 AI 回答的观察参与下一次内容创作。",
    },
  },
  {
    id: "brand-knowledge-base",
    title: { en: "Brand Knowledge Base", zh: "品牌知识库" },
    question: {
      en: "Could accumulated brand knowledge become something people and AI can work with together?",
      zh: "品牌多年积累的资料，能不能变成人和 AI 都用得上的知识？",
    },
    idea: {
      en: "Brand knowledge lives across documents, cases, and the people who know their context. I want to connect those pieces so a question can bring back useful material, its source, and the situation it applies to.",
      zh: "品牌知识分散在文档、案例和人的经验里。我想把这些内容之间的联系整理出来，让一个问题能带回相关材料，也带回它的出处和适用场景。",
    },
    possibility: {
      en: "I’d like to explore how this knowledge could support writing and answering questions, while keeping its sources and versions available during creation.",
      zh: "进一步想试的是，让这份积累参与写作和问答，创作过程中随时能找到原文、版本和依据。",
    },
  },
  {
    id: "agent-delivery",
    title: { en: "Long-Term Human–AI Collaboration", zh: "长期的人机协作" },
    question: {
      en: "How could AI learn a person’s working habits over time?",
      zh: "AI 怎样在长期合作里了解一个人？",
    },
    idea: {
      en: "A preference expressed during one task may only apply to that moment. I’m interested in how AI could distinguish a temporary instruction from a lasting habit, and let a person inspect and correct what it remembers.",
      zh: "一次任务里的偏好，可能只适合当时的情况。我想探索 AI 怎样区分临时要求与长期习惯，以及人能不能方便地查看、修正它记住的内容。",
    },
    possibility: {
      en: "One idea is to let people confirm which feedback should become lasting memory, and choose what context to carry when they switch tools or devices.",
      zh: "一个想法是，让人确认哪些反馈值得长期记住，再自主选择换工具、换设备时应该带上哪些上下文。",
    },
  },
  {
    id: "product-iteration",
    title: { en: "When AI Should Step In", zh: "AI 介入日常的时机" },
    question: {
      en: "When is an AI suggestion welcome?",
      zh: "AI 什么时候出现，才会让人觉得刚好？",
    },
    idea: {
      en: "The same suggestion can help at one moment and interrupt at another. I want to explore how context, timing, and the amount of explanation change whether people find AI assistance welcome.",
      zh: "同一个建议，在一个时刻能帮上忙，换个时刻却可能打断人。我想探索使用场景、出现时机和解释多少，会怎样影响人接受 AI 帮助的意愿。",
    },
    possibility: {
      en: "I’d like to try assistance that is easy to dismiss, easy to ask for again, and lets people decide when to invite it into an activity.",
      zh: "想试试让 AI 的帮助可以轻松收起，也能随时叫回来，由使用者决定什么时候让它参与。",
    },
  },
];

export default function ExplorationsPage() {
  const { locale } = useLanguage();
  return (
    <SiteShell
      title={{ en: "Explorations", zh: "探索与想法" }}
      lead={{ en: "Questions I want to pursue about AI, knowledge, work, and everyday life, and ideas for what I’d like to try.", zh: "关于 AI、知识、工作和日常生活，一些我想继续追问的问题，以及值得动手试试的想法。" }}
    >
      <section className="grid gap-6 py-10 lg:grid-cols-2">
        {explorations.map((item, index) => (
          <Reveal key={item.id} delay={(index % 2) * 0.1} className="h-full">
            <article id={item.id} data-ripple-zone className="editorial-panel flex h-full scroll-mt-36 flex-col p-5 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-cyan-100 sm:text-3xl">{item.title[locale]}</h2>
              <p className="mt-5 text-xl font-medium leading-relaxed text-[color:var(--text-primary)] sm:text-2xl">{item.question[locale]}</p>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">{item.idea[locale]}</p>
              <div className="mt-auto pt-5">
                <p className="border-t border-white/8 pt-5 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">{item.possibility[locale]}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </SiteShell>
  );
}
