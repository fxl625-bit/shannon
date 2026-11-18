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
    title: { en: "Digital Twin", zh: "数字分身" },
    question: {
      en: "What would it take to delegate work to a digital version of myself?",
      zh: "如果把一件事交给另一个自己，他需要了解什么？",
    },
    idea: {
      en: "I’m exploring a digital twin I can hand work to in a conversation, with an interaction similar to Grok Bot and Dots. I want it to draw on my knowledge, skills, and workflows, and to carry the context of the work over time.",
      zh: "我想做一个可以在对话里交办工作的数字分身，交互思路类似 Grok Bot 和 Dots。它能用上我积累的知识、Skill 和工作流，也能带着一件事的上下文继续做下去。",
    },
    possibility: {
      en: "I’m interested in how it could learn my working preferences, ask me at the right moments, and let me return through another conversation entry point to continue the same task.",
      zh: "我关心它怎样逐渐了解我的做事习惯，什么时候该回来问我，以及我换一个对话入口时，怎样自然接上之前的事。",
    },
  },
  {
    id: "product-iteration",
    title: { en: "AI in Everyday Life", zh: "AI 与日常生活" },
    question: {
      en: "Which small moments in everyday life could become better with AI?",
      zh: "生活里反复遇到的小事，哪些值得用 AI 重新做一遍？",
    },
    idea: {
      en: "Learning, keeping personal records, and listening to music are all places to explore. I’m interested in small apps that fit a specific moment, from helping someone understand a problem to making a record easier to revisit or a radio session more personal.",
      zh: "学习、记录和听音乐都是很具体的切口。我想探索适合这些时刻的小应用，比如帮助孩子理解一道题，让日常记录更容易回看，或者让一段电台节目更贴近自己的兴趣。",
    },
    possibility: {
      en: "I want to explore when an app should offer a suggestion, when it should wait for input, and how it could fit naturally into an existing habit.",
      zh: "想继续琢磨的是，应用什么时候适合主动给建议，什么时候应该等人操作，以及怎样融入本来就有的生活习惯。",
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
