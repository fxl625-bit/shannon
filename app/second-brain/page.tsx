"use client";

import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { Reveal } from "@/components/animation/Reveal";
import type { Localized } from "@/data/site";

const pageTitle: Localized = { en: "AI-Agent Knowledge Base", zh: "AI-Agent 知识库" };

const pageEyebrow: Localized = {
  en: "Knowledge System for AI Agents",
  zh: "面向 AI-Agent 的知识系统",
};

type Section = {
  key: string;
  title: Localized;
  body: Localized;
};

const sections: Section[] = [
  {
    key: "overview",
    title: {
      en: "Overview",
      zh: "概览",
    },
    body: {
      en: "My AI-Agent Knowledge Base is built around Obsidian and kept consistent across devices through cloud sync. The vault follows a clear folder structure: raw/ for unprocessed captures, inbox/ for items waiting to be classified, wiki/ for curated and interlinked knowledge entries, and config/ for rules that guide how AI assistants interact with the knowledge base. It is not just a notebook; it is a knowledge layer for long-term context, reusable references, and working rules for AI agents. Regular reviews keep the system clean and prevent long-term digital clutter.",
      zh: "我的 AI-Agent 知识库以 Obsidian 为核心，通过云同步在多设备之间保持一致。知识库遵循清晰的文件夹规范：raw/ 存放未经处理的捕捉内容，inbox/ 存放待分类条目，wiki/ 存放经过策展和相互链接的知识条目，config/ 存放管理 AI 助手与知识库交互的规则。它不是普通笔记本，而是为 AI-Agent 提供长期上下文、可复用资料和工作规则的知识底座。定期回顾让系统保持清洁，避免长期积累数字杂乱。",
    },
  },
  {
    key: "vault-structure",
    title: {
      en: "Vault Structure",
      zh: "知识库结构",
    },
    body: {
      en: "The vault is organized into four top-level directories. raw/ captures incoming content at full fidelity, preserving original form. inbox/ holds items awaiting classification and processing. wiki/ contains curated, interlinked knowledge entries that have been reviewed and connected. config/ stores rule files that define how AI agents should operate within the vault — classification standards, conflict resolution rules, and query conventions.",
      zh: "知识库分为四个顶层目录。raw/ 以完整保真度捕捉收入的内容，保留原始形态。inbox/ 存放等待分类和处理的条目。wiki/ 存放经过策展和相互链接的知识条目。config/ 存储定义 AI-Agent 如何在知识库中运作的规则文件——包括分类标准、冲突解决规则和查询约定。",
    },
  },
  {
    key: "agent-context",
    title: {
      en: "Agent Context",
      zh: "Agent 上下文",
    },
    body: {
      en: "The knowledge base is designed to serve as long-term context for AI agents. Instead of treating notes as isolated documents, the vault uses structured frontmatter, consistent tagging, and interlinked wikilinks so agents can navigate the graph and retrieve relevant context efficiently. The config/ directory contains explicit rules that agents read at startup to understand how to classify, summarize, and cross-reference entries.",
      zh: "知识库设计为 AI-Agent 提供长期上下文。笔记不是孤立的文档，而是通过结构化 frontmatter、一致标签和互联的 wikilinks 组织，使 Agent 能够高效导航图谱并检索相关内容。config/ 目录包含 Agent 启动时读取的明确规则，定义如何分类、摘要和交叉引用条目。",
    },
  },
  {
    key: "working-rules",
    title: {
      en: "Working Rules",
      zh: "工作规则",
    },
    body: {
      en: "Rules in config/ govern every AI interaction with the vault. AI-generated summaries must compress information, not copy full text. Classifications allow multiple tags but the main category count stays restrained. When sources conflict, the rule is to log the conflict into wiki/reviews/ — never adjudicate privately. These rules are enforced at the config level and read by every agent before operating on the vault.",
      zh: "config/ 中的规则管理着每个 AI 与知识库的交互方式。AI 生成的摘要必须压缩信息而非照抄全文。分类允许多标签但主类别数目保持克制。来源冲突时，规则是记录到 wiki/reviews/ 而非私下裁断。这些规则在 config 层强制执行，每个 Agent 在操作知识库前都会读取。",
    },
  },
  {
    key: "review-loop",
    title: {
      en: "Review Loop",
      zh: "回顾机制",
    },
    body: {
      en: "Regular reviews prevent digital clutter and keep the knowledge base healthy. Unprocessed items in inbox/ are triaged periodically. Stale wiki entries are flagged for review. Orphan nodes and broken wikilinks are detected through full-vault scans. Weekly reports surface what has been added, what needs attention, and what can be archived.",
      zh: "定期回顾防止数字杂乱，保持知识库健康。inbox/ 中的未处理条目定期分类。过时的 wiki 条目被标记待审。孤立的节点和损坏的 wikilinks 通过全库扫描检测。周报展示新增内容、待处理事项和可归档内容。",
    },
  },
  {
    key: "sync",
    title: {
      en: "Sync",
      zh: "同步",
    },
    body: {
      en: "The entire vault is kept consistent across devices through cloud sync. No iCloud is involved. This ensures the same folder structure, rules, and knowledge entries are available whether working from desktop or mobile, and that AI agents always reference the latest version of the knowledge base.",
      zh: "整个知识库通过云同步在多设备之间保持一致。不涉及 iCloud。这确保了无论从桌面端还是移动端工作，相同的文件夹结构、规则和知识条目始终可用，AI-Agent 始终引用最新版本的知识库。",
    },
  },
];

const closingThought: Localized = {
  en: "A knowledge base for AI agents is not about storing everything — it is about making the right context findable when it matters.",
  zh: "AI-Agent 知识库不是为了存储一切——而是在关键时刻让正确的上下文变得可发现。",
};

export default function AiAgentKnowledgeBasePage() {
  const { locale } = useLanguage();

  return (
    <SiteShell title={pageTitle} eyebrow={pageEyebrow}>
      <section className="py-12 sm:py-16">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <Reveal key={section.key} delay={index * 0.06}>
              <div className="section-block transition-all duration-300 hover:border-[color:var(--border-strong)]">
                <h2 className="text-[24px] leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-[30px]">
                  {section.title[locale]}
                </h2>
                <div className="mt-4 max-w-3xl">
                  <p className="text-base leading-8 text-[color:var(--text-secondary)] sm:text-lg">
                    {section.body[locale]}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.4}>
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
