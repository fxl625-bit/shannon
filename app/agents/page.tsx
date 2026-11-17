"use client";

import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";
import { ProcessStory, type ProcessStep } from "@/components/ProcessStory";
import { SiteShell } from "@/components/site-shell";
import type { Localized } from "@/data/site";

type AgentProject = {
  id: string;
  title: Localized;
  stage: Localized;
  description: Localized;
  evidence: Localized;
  link?: { href: string; label: Localized };
};

const projects: AgentProject[] = [
  {
    id: "mobile-development",
    title: { en: "Feishu Codex Bridge", zh: "飞书 Codex Bridge" },
    stage: { en: "Public source code", zh: "公开源码" },
    description: {
      en: "Send a development task from Feishu to a computer running Codex and get its result back in the conversation.",
      zh: "从飞书发起开发任务，让电脑端 Codex 执行，再把结果回传到同一个会话。",
    },
    evidence: {
      en: "The project has a documented working baseline and a public repository.",
      zh: "已有可回溯的任务派发与回传验证，源码可公开查看。",
    },
    link: { href: "https://github.com/fxl625-bit/feishu-codex-bridge", label: { en: "View the source ↗", zh: "查看公开源码 ↗" } },
  },
  {
    id: "video-production",
    title: { en: "Content & Video Agent", zh: "内容与视频 Agent" },
    stage: { en: "Production workflow tested", zh: "制作流程已实跑" },
    description: {
      en: "Turn source material into a script, then coordinate shots, narration, subtitles, and the final review.",
      zh: "从资料整理和脚本开始，把画面、配音、字幕与成片审核串到同一个制作流程里。",
    },
    evidence: {
      en: "Real production runs informed the handoff between the script, assets, and final video.",
      zh: "制作记录覆盖脚本、素材衔接、成片和复核环节。",
    },
    link: { href: "/cases/content-ops", label: { en: "Read the content workflow case →", zh: "查看内容工作流案例 →" } },
  },
  {
    id: "opinion-review",
    title: { en: "Public Opinion Research Agent", zh: "舆情研判 Agent" },
    stage: { en: "Internal workflow verified", zh: "内部流程已验证" },
    description: {
      en: "Gather relevant signals, retain the source evidence, and prepare a brief people can review.",
      zh: "收集需要关注的公开信息，保留来源和时间，再汇成便于人工核查的研判摘要。",
    },
    evidence: {
      en: "The documented internal workflow covers collection, analysis, and result delivery.",
      zh: "归档的内部流程包含采集、研判和结果回传。",
    },
  },
  {
    id: "publishing-desk",
    title: { en: "Publishing Desk", zh: "发稿工作台" },
    stage: { en: "Integration testing", zh: "阶段联调" },
    description: {
      en: "Prepare channel-specific drafts, record the approval, and match the submitted item to its receipt.",
      zh: "整理不同渠道的稿件，记录发布审批，再把实际提交结果与回执对上。",
    },
    evidence: {
      en: "The current checks cover draft preparation and approval and receipt handling within the tested stages.",
      zh: "当前验证覆盖草稿准备、审批状态和回执处理等环节。",
    },
    link: { href: "/explorations#agent-delivery", label: { en: "Explore the delivery design →", zh: "查看交付可靠性探索 →" } },
  },
];

const runtimeSteps: ProcessStep[] = [
  { title: { en: "Submit", zh: "接收任务" }, detail: { en: "Record who requested the work, the requested result, and the limits of the action.", zh: "记录由谁发起、要交付什么，以及任务可以做到哪一步。" } },
  { title: { en: "Track", zh: "追踪进度" }, detail: { en: "Keep the task ID and its current state available while the work runs.", zh: "保留任务编号和当前进度，执行期间也能查询。" } },
  { title: { en: "Resume", zh: "沿原任务续办" }, detail: { en: "Resume the existing task with its evidence when a dependency becomes available.", zh: "依赖恢复后，沿原任务和已有证据继续处理。" } },
  { title: { en: "Review", zh: "复核交付" }, detail: { en: "Attach the outcome and review record so the next person can see what was verified.", zh: "把结果和审核记录附到一起，交接时能看到实际核验过的范围。" } },
];

export default function AgentsPage() {
  const { locale } = useLanguage();
  const zh = locale === "zh";

  return (
    <SiteShell
      title={{ en: "Agents", zh: "Agent 项目" }}
      lead={{ en: "Projects that connect AI to development, content production, research, and publishing. Each project shows its current verification stage.", zh: "把 AI 接进开发、内容制作、舆情研判和发布。每个项目都标明已经验证到哪一步。" }}
    >
      <div className="space-y-8 py-10">
        <Reveal>
          <section id="agent-runtime" data-ripple-zone className="editorial-panel scroll-mt-36 p-5 sm:p-8">
            <p className="text-xs font-medium text-cyan-200/85">{zh ? "工程验证与内部试点" : "Engineering validation and internal pilots"}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">{zh ? "Agent 运行时" : "Agent Runtime"}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
              {zh ? "让长任务能查询、能续办、能交接。已在部分内部场景验证任务提交、状态回读和分阶段审核。" : "Long-running tasks can be tracked, resumed, and handed off. Selected internal scenarios have validated submission, status readback, and staged review."}
            </p>
            <ProcessStory steps={runtimeSteps} locale={locale} />
          </section>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 0.12} className="h-full">
              <article id={project.id} className="editorial-panel flex h-full scroll-mt-36 flex-col p-5 sm:p-7">
                <p className="text-xs font-medium text-cyan-200/85">{project.stage[locale]}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">{project.title[locale]}</h2>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{project.description[locale]}</p>
                <p className="mt-auto pt-4 text-sm leading-6 text-[color:var(--text-muted)]">{project.evidence[locale]}</p>
                {project.link && (project.link.href.startsWith("https://") ? (
                  <a className="editorial-link mt-4 self-start" href={project.link.href} target="_blank" rel="noreferrer">{project.link.label[locale]}</a>
                ) : (
                  <Link className="editorial-link mt-4 self-start" href={project.link.href}>{project.link.label[locale]}</Link>
                ))}
              </article>
            </Reveal>
          ))}
        </div>
        <Link href="/skills" className="editorial-link">{zh ? "查看可复用的 Skill 与工作流 →" : "Explore the Skill library and workflows →"}</Link>
      </div>
    </SiteShell>
  );
}
