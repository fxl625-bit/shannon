"use client";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { Reveal } from "@/components/animation/Reveal";
import type { Localized } from "@/data/site";

const pageTitle: Localized = { en: "Second Brain", zh: "第二大脑" };

const pageEyebrow: Localized = {
  en: "Personal Knowledge System",
  zh: "个人知识系统",
};

const sections: {
  key: string;
  title: Localized;
  body: Localized;
}[] = [
  {
    key: "what-is",
    title: {
      en: "What is a Second Brain",
      zh: "什么是第二大脑",
    },
    body: {
      en: "A Second Brain is a personal knowledge management system that extends your biological memory. It captures, organizes, and connects ideas so you can think more clearly, make better decisions, and build on previous insights without starting from scratch every time. Borrowing from Tiago Forte's CODE framework (Capture, Organize, Distill, Express), it treats knowledge as a living ecosystem — not a static archive.",
      zh: "第二大脑是一种扩展生物记忆的个人知识管理系统。它捕捉、组织和连接想法，让你更清晰地思考、做出更好的决策，并在已有洞见的基础上持续构建，而不必每次都从头开始。借鉴 Tiago Forte 的 CODE 框架（捕捉、组织、提炼、表达），它将知识视为一个活的生态系统，而非静态档案。",
    },
  },
  {
    key: "my-setup",
    title: {
      en: "My Setup",
      zh: "我的设置",
    },
    body: {
      en: "My second brain is built around Obsidian as the core knowledge base, kept consistent across devices through cloud sync. The vault follows a clear folder structure: raw/ for unprocessed captures, inbox/ for items waiting to be classified, wiki/ for curated and interlinked notes, and config/ for rules that guide how AI assistants interact with the knowledge base. Regular reviews keep the system clean and prevent long-term digital clutter.",
      zh: "我的第二大脑以 Obsidian 为核心知识库，通过云同步在多设备之间保持一致。知识库遵循清晰的文件夹规范：raw/ 存放未经处理的捕捉内容，inbox/ 存放待分类条目，wiki/ 存放经过策展和相互链接的笔记，config/ 存放管理 AI 助手与知识库交互的规则。定期回顾让系统保持清洁，避免长期积累数字杂乱。",
    },
  },
  {
    key: "tools-workflows",
    title: {
      en: "Tools & Workflows",
      zh: "工具与工作流",
    },
    body: {
      en: "I combine note-taking with AI agent workflows: automated scripts scan raw captures and suggest links to existing notes, agent rules in config/ enforce classification standards, and a weekly report skill surfaces what has been added and what needs attention. The goal is not just storing information, but creating a system that actively supports thinking — surfacing relevant context when I need it, flagging conflicts, and keeping the graph connected.",
      zh: "我将笔记记录与 AI 智能体工作流相结合：自动化脚本扫描原始捕捉内容并建议与现有笔记的链接，config/ 中的 agent 规则强制执行分类标准，周报技能展示新增内容和待处理事项。目标不仅是存储信息，而是创建一个积极支持思考的系统——在我需要时呈现相关上下文，标记冲突，并保持知识图谱的连接性。",
    },
  },
];

const closingThought: Localized = {
  en: "A second brain is not about having perfect notes — it's about building a thinking partner that outlives any single idea.",
  zh: "第二大脑不是为了拥有完美的笔记——而是为了构建一个超越任何单一想法、持续陪伴你思考的伙伴。",
};

export default function SecondBrainPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={pageTitle} eyebrow={pageEyebrow}>
      <section className="py-12 sm:py-16">
        <div className="space-y-16">
          {sections.map((section, index) => (
            <Reveal key={section.key} delay={index * 0.1}>
              <div className="section-block transition-all duration-300 hover:border-[color:var(--border-strong)]">
                <h2 className="text-[28px] leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[36px]">
                  {section.title[locale]}
                </h2>
                <div className="mt-6 max-w-3xl">
                  <p className="text-base leading-8 text-[color:var(--text-secondary)] sm:text-lg">
                    {section.body[locale]}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.35}>
            <div className="glass-surface-strong px-6 py-8 text-center sm:px-10 sm:py-10">
              <p className="text-lg leading-relaxed text-[color:var(--text-primary)] italic sm:text-xl">
                &ldquo;{closingThought[locale]}&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
