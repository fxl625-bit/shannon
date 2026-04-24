export type Locale = "en" | "zh";

export type Localized<T = string> = Record<Locale, T>;

export type Skill = {
  name: Localized;
  label: Localized;
  summary: Localized;
  githubUrl?: string;
};

export type AppTool = {
  name: Localized;
  typeLabel: Localized;
  summary: Localized;
  previewLabel: Localized;
  previewImage?: string;
  demoUrl?: string;
  githubUrl?: string;
};

export type ObsidianCard = {
  title: Localized;
  body: Localized;
};

export type ObsidianSource = {
  name: Localized;
  detail: Localized;
};

export const site = {
  name: "Shannon Fu",
  nav: {
    home: { en: "Home", zh: "\u9996\u9875" },
    skills: { en: "Skills", zh: "AI \u6280\u80fd" },
    apps: { en: "Apps", zh: "\u8f7b\u91cf\u5e94\u7528" },
    obsidian: { en: "Obsidian", zh: "\u77e5\u8bc6\u5e93" },
  },
  languageSwitch: {
    en: { current: "EN", target: "\u4e2d" },
    zh: { current: "\u4e2d", target: "EN" },
  },
  home: {
    badge: {
      en: "AI x Human Potential",
      zh: "AI x \u4eba\u7684\u80fd\u529b",
    },
    title: {
      en: "Exploring how AI extends human capability",
      zh: "\u63a2\u7d22 AI \u5982\u4f55\u63d0\u5347\u4eba\u7684\u80fd\u529b",
    },
    description: {
      en: "I use AI to build practical workflows, personal knowledge systems, and lightweight tools for writing, decision-making, automation, and everyday execution.",
      zh: "\u8fd9\u91cc\u8bb0\u5f55\u6211\u7528 AI \u6539\u9020\u5de5\u4f5c\u6d41\u3001\u77e5\u8bc6\u5e93\u3001\u5185\u5bb9\u521b\u4f5c\u548c\u8f7b\u91cf\u5e94\u7528\u7684\u4e00\u4e9b\u5b9e\u8df5\u3002",
    },
    ctaPrimary: {
      en: "View AI Skills",
      zh: "\u67e5\u770b AI \u6280\u80fd",
    },
    ctaSecondary: {
      en: "View Apps",
      zh: "\u67e5\u770b\u8f7b\u91cf\u5e94\u7528",
    },
  },
  skillsSection: {
    title: {
      en: "AI Skills",
      zh: "AI \u6280\u80fd",
    },
    subtitle: {
      en: "Reusable workflows from my Obsidian skill archive, focused on writing, planning, translation, and reporting.",
      zh: "\u57fa\u4e8e Obsidian \u6280\u80fd\u5e93\u6c89\u6dc0\u7684\u53ef\u590d\u7528\u5de5\u4f5c\u6d41\uff0c\u4e3b\u8981\u8986\u76d6\u5199\u4f5c\u3001\u89c4\u5212\u3001\u7ffb\u8bd1\u548c\u5468\u62a5\u6574\u7406\u3002",
    },
    cta: { en: "View AI Skills", zh: "\u67e5\u770b AI \u6280\u80fd" },
  },
  appsSection: {
    title: {
      en: "Apps & Lightweight AI Tools",
      zh: "Apps \u4e0e\u8f7b\u91cf AI \u5de5\u5177",
    },
    subtitle: {
      en: "Practical tools from real projects, including health records and everyday AI-assisted products.",
      zh: "\u6765\u81ea\u5b9e\u9645\u9879\u76ee\u7684\u5de5\u5177\u5316\u5c1d\u8bd5\uff0c\u5305\u62ec\u5065\u5eb7\u8bb0\u5f55\u5e94\u7528\u548c\u65e5\u5e38 AI \u8f7b\u91cf\u4ea7\u54c1\u3002",
    },
    cta: { en: "View Apps", zh: "\u67e5\u770b\u8f7b\u91cf\u5e94\u7528" },
  },
  obsidianSection: {
    title: { en: "Obsidian Knowledge Base", zh: "Obsidian \u77e5\u8bc6\u5e93" },
    subtitle: {
      en: "I use Obsidian as a personal agent knowledge base: collect sources, clean data, archive skills, and keep reusable rules and memory.",
      zh: "\u6211\u628a Obsidian \u5f53\u4f5c\u4e2a\u4eba agent \u77e5\u8bc6\u5e93\uff0c\u7528\u6765\u6536\u96c6\u8d44\u6599\u3001\u6e05\u6d17\u5206\u7c7b\uff0c\u5e76\u6c89\u6dc0 Skills\u3001\u89c4\u5219\u548c\u53ef\u590d\u7528\u8bb0\u5fc6\u3002",
    },
    cards: [
      {
        title: { en: "Content Collection", zh: "\u5185\u5bb9\u6536\u96c6" },
        body: {
          en: "Collect links and references from Xiaohongshu, Douyin, WeChat, Bilibili, and other web sources into one inbox.",
          zh: "\u628a\u5c0f\u7ea2\u4e66\u3001\u6296\u97f3\u3001\u516c\u4f17\u53f7\u3001B \u7ad9\u7b49\u6e20\u9053\u7684\u5185\u5bb9\u7edf\u4e00\u6536\u96c6\u5230 inbox\u3002",
        },
      },
      {
        title: { en: "Cleaning & Classification", zh: "\u6e05\u6d17\u4e0e\u5206\u7c7b" },
        body: {
          en: "Process inbox materials into structured source notes, then rebuild topic and source indexes for retrieval.",
          zh: "\u5bf9\u8d44\u6599\u505a\u5bfc\u5165\u3001\u6e05\u6d17\u548c\u5206\u7c7b\uff0c\u751f\u6210\u53ef\u68c0\u7d22\u7684\u6765\u6e90\u9875\u3001\u4e3b\u9898\u9875\u548c\u7d22\u5f15\u3002",
        },
      },
      {
        title: { en: "Skills Archive", zh: "Skills \u5f52\u6863" },
        body: {
          en: "Store reusable AI workflows with SKILL definitions, examples, and version notes for repeat use.",
          zh: "\u5c06 AI \u5de5\u4f5c\u6d41\u6309\u6280\u80fd\u5305\u5f52\u6863\uff0c\u5305\u542b SKILL \u5b9a\u4e49\u3001\u793a\u4f8b\u548c\u7248\u672c\u8bb0\u5f55\u3002",
        },
      },
      {
        title: { en: "Rules & Memory", zh: "\u89c4\u5219\u4e0e\u8bb0\u5fc6" },
        body: {
          en: "Keep conventions, templates, and long-term context so Codex and other agents can reuse stable knowledge.",
          zh: "\u628a\u89c4\u5219\u3001\u6a21\u677f\u548c\u957f\u671f\u4e0a\u4e0b\u6587\u56fa\u5316\u4e0b\u6765\uff0c\u4f9b Codex \u548c\u5176\u4ed6 agent \u6301\u7eed\u590d\u7528\u3002",
        },
      },
    ] satisfies ObsidianCard[],
    cta: { en: "Open Obsidian", zh: "\u6253\u5f00 Obsidian \u680f\u76ee" },
  },
  appsPage: {
    title: { en: "Apps", zh: "Apps \u4e0e\u8f7b\u91cf AI \u5de5\u5177" },
    eyebrow: { en: "AI x Human Potential", zh: "AI x \u4eba\u7c7b\u80fd\u529b" },
    intro: {
      en: "This page focuses on practical apps and lightweight AI tools. Every item is grounded in existing project notes, not placeholder product copy.",
      zh: "\u8fd9\u4e2a\u9875\u9762\u53ea\u5c55\u793a\u5b9e\u9645\u5728\u505a\u7684 App \u548c\u8f7b\u91cf AI \u5de5\u5177\uff0c\u6587\u6848\u57fa\u4e8e\u73b0\u6709\u9879\u76ee\u8bf4\u660e\u6574\u7406\u3002",
    },
    cardLabel: { en: "App / Tool", zh: "\u5e94\u7528 / \u5de5\u5177" },
    demoLabel: { en: "Live Demo", zh: "\u5728\u7ebf\u6f14\u793a" },
    githubLabel: { en: "GitHub", zh: "GitHub" },
  },
  skillsPage: {
    title: { en: "Skills", zh: "AI \u6280\u80fd" },
    eyebrow: { en: "AI Skills / Workflows", zh: "AI \u6280\u80fd / \u5de5\u4f5c\u6d41" },
    intro: {
      en: "These are the workflows I actually reuse. They come from local skill packages and runtime docs in my Obsidian knowledge base.",
      zh: "\u8fd9\u4e9b\u662f\u6211\u5728\u65e5\u5e38\u4e2d\u771f\u6b63\u53cd\u590d\u7528\u7684\u5de5\u4f5c\u6d41\uff0c\u6765\u6e90\u662f Obsidian \u4e2d\u7684\u6280\u80fd\u5305\u548c runtime \u8bf4\u660e\u6587\u6863\u3002",
    },
    skillLabel: { en: "AI Skill / Workflow", zh: "AI Skill / Workflow" },
    githubLabel: { en: "GitHub", zh: "GitHub" },
  },
  obsidianPage: {
    title: { en: "Obsidian", zh: "Obsidian \u77e5\u8bc6\u5e93" },
    eyebrow: { en: "Personal Agent Knowledge Base", zh: "\u4e2a\u4eba Agent \u77e5\u8bc6\u5e93" },
    intro: {
      en: "I use Obsidian as a personal agent knowledge base. It stores source material, cleaned notes, skill definitions, and reusable rules so agents can keep long-term context.",
      zh: "\u6211\u628a Obsidian \u7528\u4f5c\u4e2a\u4eba agent \u77e5\u8bc6\u5e93\uff0c\u7528\u6765\u7ba1\u7406\u6e90\u8d44\u6599\u3001\u6574\u7406\u7b14\u8bb0\u3001Skills \u8bf4\u660e\u4ee5\u53ca\u53ef\u590d\u7528\u89c4\u5219\uff0c\u8ba9 agent \u6709\u7a33\u5b9a\u7684\u957f\u671f\u4e0a\u4e0b\u6587\u3002",
    },
    cards: [
      {
        title: { en: "Content Collection", zh: "\u5185\u5bb9\u6536\u96c6" },
        body: {
          en: "Use a single inbox file to collect links from short-form platforms and web pages, then process them in batch.",
          zh: "\u5148\u7528\u7edf\u4e00 inbox \u6536\u96c6\u5c0f\u7ea2\u4e66\u3001\u6296\u97f3\u548c\u7f51\u9875\u94fe\u63a5\uff0c\u518d\u6279\u91cf\u5904\u7406\u5bfc\u5165\u3002",
        },
      },
      {
        title: { en: "Cleaning & Classification", zh: "\u6e05\u6d17\u4e0e\u5206\u7c7b" },
        body: {
          en: "Pipeline scripts turn raw material into source notes and rebuild topic indexes for future retrieval.",
          zh: "\u901a\u8fc7 pipeline \u811a\u672c\u628a raw \u6750\u6599\u6574\u7406\u6210\u6765\u6e90\u7b14\u8bb0\uff0c\u5e76\u91cd\u5efa\u4e3b\u9898\u4e0e\u6765\u6e90\u7d22\u5f15\u3002",
        },
      },
      {
        title: { en: "Skills Archive", zh: "Skills \u5f52\u6863" },
        body: {
          en: "Skills are archived by category with definitions, examples, and changelogs so they can be reused consistently.",
          zh: "Skills \u6309\u7c7b\u522b\u5f52\u6863\uff0c\u4fdd\u7559\u5b9a\u4e49\u3001\u793a\u4f8b\u548c\u7248\u672c\u8bb0\u5f55\uff0c\u786e\u4fdd\u53ef\u7a33\u5b9a\u590d\u7528\u3002",
        },
      },
      {
        title: { en: "Rules & Memory", zh: "\u89c4\u5219\u4e0e\u8bb0\u5fc6" },
        body: {
          en: "Conventions, templates, and source-trace rules are kept explicit to reduce drift across Codex and other agents.",
          zh: "\u660e\u786e\u5b58\u6863\u89c4\u5219\u3001\u6a21\u677f\u548c\u6765\u6e90\u8ffd\u6eaf\u8981\u6c42\uff0c\u964d\u4f4e Codex \u548c\u5176\u4ed6 agent \u5728\u591a\u8f6e\u4f7f\u7528\u4e2d\u7684\u6f02\u79fb\u3002",
        },
      },
    ] satisfies ObsidianCard[],
    sourceListTitle: { en: "Current Source Hubs", zh: "\u5f53\u524d\u6765\u6e90\u8d44\u6599\u7ec4" },
  },
  skills: [
    {
      name: { en: "Novel Skill", zh: "\u5c0f\u8bf4 Skill" },
      label: { en: "AI Skill / Workflow", zh: "AI Skill / Workflow" },
      summary: {
        en: "This workflow breaks fiction writing into clear stages: project setup, outline, chapter draft, rewrite, and finalize. The runtime tracks chapter state transitions and preserves structured artifacts at each step. Final materials can be synced to Obsidian for review and backup.",
        zh: "\u8fd9\u4e2a Skill \u628a\u5c0f\u8bf4\u521b\u4f5c\u62c6\u6210\u6e05\u6670\u7684\u6b65\u9aa4\uff1a\u7acb\u9879\u3001\u5927\u7eb2\u3001\u8349\u7a3f\u3001\u6539\u5199\u548c\u5b9a\u7a3f\u3002runtime \u4f1a\u8ddf\u8e2a\u7ae0\u8282\u72b6\u6001\uff0c\u5e76\u4fdd\u5b58\u6bcf\u4e00\u9636\u6bb5\u7684\u7ed3\u6784\u5316\u4ea7\u7269\u3002\u6838\u5fc3\u5185\u5bb9\u8fd8\u53ef\u4ee5\u540c\u6b65\u5230 Obsidian \u4fbf\u4e8e\u590d\u76d8\u3002",
      },
      githubUrl: undefined,
    },
    {
      name: { en: "AI BOSS Skill", zh: "AI BOSS Skill" },
      label: { en: "AI Skill / Workflow", zh: "AI Skill / Workflow" },
      summary: {
        en: "AI BOSS is the command workflow behind my second-brain setup. In daily runtime mode it answers from published runtime data, while build and rebuild are used only for maintenance updates. The response flow stays consistent through family matching, mental-model selection, and fixed answer patterns.",
        zh: "AI BOSS \u662f\u6211\u4e2a\u4eba second brain \u7684\u603b\u63a7\u5de5\u4f5c\u6d41\u3002\u65e5\u5e38\u4f7f\u7528\u65f6\u4f1a\u4ece runtime \u77e5\u8bc6\u5e93\u76f4\u63a5\u8c03\u7528\uff0cbuild/rebuild \u53ea\u5728\u7ef4\u62a4\u65f6\u4f7f\u7528\u3002\u56de\u7b54\u8fc7\u7a0b\u56fa\u5b9a\u5305\u62ec\u95ee\u9898\u7c07\u5339\u914d\u3001\u5fc3\u667a\u6a21\u578b\u9009\u62e9\u548c\u7b54\u6848\u6a21\u677f\u8f93\u51fa\u3002",
      },
      githubUrl: undefined,
    },
    {
      name: { en: "Video Translation Skill", zh: "\u89c6\u9891\u7ffb\u8bd1 Skill" },
      label: { en: "AI Skill / Workflow", zh: "AI Skill / Workflow" },
      summary: {
        en: "This skill runs local Windows video translation with a reusable PowerShell entrypoint. It supports subtitle translation, optional English dubbing, and optional subtitle cleanup plus remux. The workflow returns concrete output paths for MP4, SRT, and WAV files.",
        zh: "\u8fd9\u4e2a Skill \u901a\u8fc7 PowerShell \u5165\u53e3\u6267\u884c\u672c\u5730\u89c6\u9891\u7ffb\u8bd1\u6d41\u7a0b\u3002\u652f\u6301\u5b57\u5e55\u7ffb\u8bd1\u3001\u53ef\u9009\u82f1\u6587\u914d\u97f3\uff0c\u4ee5\u53ca\u5b57\u5e55\u6e05\u6d17\u4e0e\u91cd\u65b0\u5c01\u88c5\u3002\u8fd0\u884c\u540e\u4f1a\u8fd4\u56de MP4\u3001SRT\u3001WAV \u7684\u786e\u5207\u8f93\u51fa\u8def\u5f84\u3002",
      },
      githubUrl: undefined,
    },
    {
      name: { en: "Weekly Report Skill", zh: "\u5468\u62a5 Skill" },
      label: { en: "AI Skill / Workflow", zh: "AI Skill / Workflow" },
      summary: {
        en: "Weekly Report turns Dida or TickTick CSV exports into a structured Chinese weekly report. It separates completed work from next-week plans and groups tasks by six reporting modules. When needed, it can write results into an Excel weekly-report template.",
        zh: "Weekly Report \u53ef\u4ee5\u628a\u6ef4\u7b54\u6216 TickTick \u7684 CSV \u5bfc\u51fa\u6574\u7406\u6210\u4e2d\u6587\u7ed3\u6784\u5316\u5468\u62a5\u3002\u5de5\u4f5c\u5185\u5bb9\u4f1a\u533a\u5206\u201c\u672c\u5468\u5b8c\u6210\u201d\u548c\u201c\u4e0b\u5468\u8ba1\u5212\u201d\uff0c\u5e76\u6309 6 \u4e2a\u6a21\u5757\u5206\u7c7b\u3002\u9700\u8981\u65f6\u53ef\u76f4\u63a5\u5199\u5165 Excel \u6a21\u677f\u3002",
      },
      githubUrl: undefined,
    },
  ] satisfies Skill[],
  apps: [
    {
      name: { en: "\u4e00\u4e16\u5706\u6ee1", zh: "\u4e00\u4e16\u5706\u6ee1" },
      typeLabel: { en: "Health Record App", zh: "\u5065\u5eb7\u8bb0\u5f55 App" },
      summary: {
        en: "A local-first health record app for blood glucose and blood pressure tracking. It supports threshold alerts, history filters, trend charts, reminders, and CSV import/export for migration. OCR runs on-device for meter photos, and optional AI features are user-configured for text organization.",
        zh: "\u4e00\u6b3e\u4ee5\u672c\u5730\u8bb0\u5f55\u4e3a\u4e3b\u7684\u8840\u7cd6/\u8840\u538b\u7ba1\u7406 App\u3002\u76ee\u524d\u5305\u542b\u9608\u503c\u63d0\u9192\u3001\u5386\u53f2\u7b5b\u9009\u3001\u8d8b\u52bf\u56fe\u3001\u65e5\u5e38\u63d0\u9192\u4ee5\u53ca CSV \u5bfc\u5165\u5bfc\u51fa\u3002\u62cd\u7167\u8bc6\u522b\u5728\u8bbe\u5907\u7aef\u5b8c\u6210\uff0cAI \u80fd\u529b\u4e3a\u7528\u6237\u53ef\u9009\u914d\u7f6e\u3002",
      },
      previewLabel: {
        en: "Screenshot placeholder",
        zh: "\u622a\u56fe\u5360\u4f4d",
      },
      previewImage: "/images/yishiyuanman-overview.png",
      demoUrl: undefined,
      githubUrl: undefined,
    },
    {
      name: { en: "FlowMate \u4e50\u4f34", zh: "FlowMate \u4e50\u4f34" },
      typeLabel: { en: "AI Lightweight Tool", zh: "AI \u8f7b\u91cf\u5de5\u5177" },
      summary: {
        en: "FlowMate is a private AI DJ player with a player-first design: open the app and start listening. The homepage combines daily recommendations, current playback, queue preview, and lightweight tune commands. When the official music source is unstable, the provider chain falls back automatically to keep playback available.",
        zh: "FlowMate \u4e50\u4f34\u7684\u5b9a\u4f4d\u662f\u201c\u64ad\u653e\u5668\u4f18\u5148\uff0cAI \u6b21\u4e4b\u201d\u7684\u79c1\u4eba AI DJ \u5de5\u5177\u3002\u9996\u9875\u63d0\u4f9b\u4eca\u65e5\u63a8\u8350\u3001\u5f53\u524d\u64ad\u653e\u3001\u961f\u5217\u9884\u89c8\u548c\u8f7b\u91cf\u201c\u544a\u8bc9 DJ\u201d\u5fae\u8c03\u3002\u5f53\u5b98\u65b9\u97f3\u6e90\u4e0d\u7a33\u5b9a\u65f6\uff0c\u4f1a\u81ea\u52a8 fallback \u4ee5\u4fdd\u6301\u53ef\u64ad\u653e\u6027\u3002",
      },
      previewLabel: {
        en: "Screenshot placeholder",
        zh: "\u622a\u56fe\u5360\u4f4d",
      },
      demoUrl: undefined,
      githubUrl: undefined,
    },
  ] satisfies AppTool[],
  obsidianSources: [
    {
      name: { en: "Xiaohongshu Sources", zh: "\u5c0f\u7ea2\u4e66\u6765\u6e90" },
      detail: {
        en: "Source page maintained under `wiki/sources/小红书.md`, built from the inbox and raw notes pipeline.",
        zh: "\u5728 `wiki/sources/\u5c0f\u7ea2\u4e66.md` \u7ef4\u62a4\u6765\u6e90\u7d22\u5f15\uff0c\u6765\u6e90\u4e8e inbox \u5bfc\u5165\u548c raw \u7b14\u8bb0\u6d41\u7a0b\u3002",
      },
    },
    {
      name: { en: "Douyin Sources", zh: "\u6296\u97f3\u6765\u6e90" },
      detail: {
        en: "Favorites and links are synchronized into `raw/douyin/*` and indexed in `wiki/sources/douyin.md`.",
        zh: "\u6296\u97f3\u6536\u85cf\u4e0e\u94fe\u63a5\u4f1a\u540c\u6b65\u5230 `raw/douyin/*`\uff0c\u5e76\u5728 `wiki/sources/douyin.md` \u7edf\u4e00\u7d22\u5f15\u3002",
      },
    },
    {
      name: { en: "Skill Packages", zh: "\u6280\u80fd\u5305\u5f52\u6863" },
      detail: {
        en: "Workflow packages are archived under `skills/` with SKILL definitions, references, examples, and changelogs.",
        zh: "\u5de5\u4f5c\u6d41\u6280\u80fd\u5305\u6309 `skills/` \u76ee\u5f55\u5f52\u6863\uff0c\u5305\u542b SKILL \u5b9a\u4e49\u3001\u53c2\u8003\u6587\u6863\u3001\u793a\u4f8b\u548c\u53d8\u66f4\u8bb0\u5f55\u3002",
      },
    },
  ] satisfies ObsidianSource[],
};
