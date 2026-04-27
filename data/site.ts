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
    obsidian: { en: "Obsidian", zh: "Obsidian \u77e5\u8bc6\u5e93" },
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
      en: "A personal record of workflows, Obsidian notes, and lightweight apps that stayed useful after real use.",
      zh: "\u8fd9\u91cc\u8bb0\u5f55\u6211\u771f\u6b63\u7528\u4e0b\u6765\u7684\u5de5\u4f5c\u6d41\u3001Obsidian \u7b14\u8bb0\u548c\u8f7b\u91cf\u5e94\u7528\u3002",
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
      en: "Workflows that stayed useful after repeated use.",
      zh: "\u53cd\u590d\u7528\u4e0b\u6765\u8fd8\u503c\u5f97\u4fdd\u7559\u7684\u6d41\u7a0b\u3002",
    },
    cta: { en: "View AI Skills", zh: "\u67e5\u770b AI \u6280\u80fd" },
  },
  appsSection: {
    title: {
      en: "Apps & Lightweight AI Tools",
      zh: "Apps \u4e0e\u8f7b\u91cf AI \u5de5\u5177",
    },
    subtitle: {
      en: "Small tools from real builds.",
      zh: "\u6765\u81ea\u771f\u5b9e\u9879\u76ee\u7684\u5c0f\u5de5\u5177\u3002",
    },
    cta: { en: "View Apps", zh: "\u67e5\u770b\u8f7b\u91cf\u5e94\u7528" },
  },
  appsPage: {
    title: { en: "Apps", zh: "Apps \u4e0e\u8f7b\u91cf AI \u5de5\u5177" },
    eyebrow: { en: "AI x Human Potential", zh: "AI x \u4eba\u7684\u80fd\u529b" },
    intro: {
      en: "Practical apps and lightweight tools.",
      zh: "\u5b9e\u7528 App \u4e0e\u8f7b\u91cf\u5de5\u5177\u3002",
    },
    cardLabel: { en: "App / Tool", zh: "\u5e94\u7528 / \u5de5\u5177" },
    demoLabel: { en: "Live Demo", zh: "\u5728\u7ebf\u6f14\u793a" },
    githubLabel: { en: "GitHub", zh: "GitHub" },
  },
  skillsPage: {
    title: { en: "Skills", zh: "AI \u6280\u80fd" },
    eyebrow: { en: "AI Skills / Workflows", zh: "AI \u6280\u80fd / \u5de5\u4f5c\u6d41" },
    intro: {
      en: "Reusable skills from my local workflow system.",
      zh: "\u6765\u81ea\u672c\u5730\u5de5\u4f5c\u6d41\u7cfb\u7edf\u7684\u53ef\u590d\u7528 skills\u3002",
    },
    skillLabel: { en: "AI Skill / Workflow", zh: "AI Skill / Workflow" },
    githubLabel: { en: "GitHub", zh: "GitHub" },
  },
  obsidianPage: {
    title: { en: "Obsidian", zh: "Obsidian \u77e5\u8bc6\u5e93" },
    eyebrow: { en: "Personal Agent Knowledge Base", zh: "\u4e2a\u4eba Agent \u77e5\u8bc6\u5e93" },
    intro: {
      en: "Obsidian stores my sources, skills, and reusable rules.",
      zh: "Obsidian \u7528\u6765\u7ba1\u7406\u6211\u7684\u6765\u6e90\u8d44\u6599\u3001skills \u548c\u590d\u7528\u89c4\u5219\u3002",
    },
    cards: [
      {
        title: { en: "Content Collection", zh: "\u5185\u5bb9\u6536\u96c6" },
        body: {
          en: "Collect links in one inbox.",
          zh: "\u628a\u94fe\u63a5\u7edf\u4e00\u653e\u8fdb inbox\u3002",
        },
      },
      {
        title: { en: "Cleaning & Classification", zh: "\u6e05\u6d17\u4e0e\u5206\u7c7b" },
        body: {
          en: "Clean and rebuild searchable indexes.",
          zh: "\u6e05\u6d17\u8d44\u6599\u5e76\u91cd\u5efa\u68c0\u7d22\u7d22\u5f15\u3002",
        },
      },
      {
        title: { en: "Skills Archive", zh: "Skills \u5f52\u6863" },
        body: {
          en: "Archive skills by category.",
          zh: "\u6309\u7c7b\u522b\u5f52\u6863 skills\u3002",
        },
      },
      {
        title: { en: "Rules & Memory", zh: "\u89c4\u5219\u4e0e\u8bb0\u5fc6" },
        body: {
          en: "Keep rules and long-term memory explicit.",
          zh: "\u660e\u786e\u8bb0\u5f55\u89c4\u5219\u4e0e\u957f\u671f\u8bb0\u5fc6\u3002",
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
        en: "Novel writing flow with fixed stages: outline, draft, rewrite, finalize.",
        zh: "\u5c0f\u8bf4\u5199\u4f5c\u6d41\uff0c\u56fa\u5b9a\u4e3a\u5927\u7eb2\u3001\u8349\u7a3f\u3001\u6539\u7a3f\u548c\u5b9a\u7a3f\u3002",
      },
      githubUrl: undefined,
    },
    {
      name: { en: "AI BOSS Skill", zh: "AI BOSS Skill" },
      label: { en: "AI Skill / Workflow", zh: "AI Skill / Workflow" },
      summary: {
        en: "Second-brain command flow with stable routing and response patterns.",
        zh: "\u4e2a\u4eba second brain \u603b\u63a7\u6d41\uff0c\u56fa\u5b9a\u8def\u7531\u548c\u8f93\u51fa\u6a21\u5f0f\u3002",
      },
      githubUrl: undefined,
    },
    {
      name: { en: "Video Translation Skill", zh: "\u89c6\u9891\u7ffb\u8bd1 Skill" },
      label: { en: "AI Skill / Workflow", zh: "AI Skill / Workflow" },
      summary: {
        en: "Local video translation flow for subtitles, dubbing, and remux.",
        zh: "\u672c\u5730\u89c6\u9891\u7ffb\u8bd1\u6d41\uff0c\u652f\u6301\u5b57\u5e55\u3001\u914d\u97f3\u548c\u91cd\u5c01\u88c5\u3002",
      },
      githubUrl: undefined,
    },
    {
      name: { en: "Weekly Report Skill", zh: "\u5468\u62a5 Skill" },
      label: { en: "AI Skill / Workflow", zh: "AI Skill / Workflow" },
      summary: {
        en: "Turn Dida or TickTick CSV tasks into structured weekly reports.",
        zh: "\u628a\u6ef4\u7b54\u6216 TickTick CSV \u4efb\u52a1\u8f6c\u4e3a\u7ed3\u6784\u5316\u5468\u62a5\u3002",
      },
      githubUrl: undefined,
    },
  ] satisfies Skill[],
  apps: [
    {
      name: { en: "\u4e00\u4e16\u5706\u6ee1", zh: "\u4e00\u4e16\u5706\u6ee1" },
      typeLabel: { en: "Health Record App", zh: "\u5065\u5eb7\u8bb0\u5f55 App" },
      summary: {
        en: "Local-first health app for glucose and blood pressure records, trends, and OCR.",
        zh: "\u672c\u5730\u4f18\u5148\u7684\u5065\u5eb7\u8bb0\u5f55 App\uff0c\u652f\u6301\u8840\u7cd6/\u8840\u538b\u8d8b\u52bf\u4e0e OCR\u3002",
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
        en: "A small music companion shaped around listening flow: enter, play, and adjust the mood.",
        zh: "\u4e00\u4e2a\u56f4\u7ed5\u6536\u542c\u8282\u594f\u505a\u7684\u5c0f\u5e94\u7528\uff1a\u8fdb\u5165\u9891\u9053\u3001\u5f00\u59cb\u64ad\u653e\uff0c\u518d\u6309\u5f53\u4e0b\u72b6\u6001\u5fae\u8c03\u6c1b\u56f4\u3002",
      },
      previewLabel: {
        en: "Screenshot placeholder",
        zh: "\u622a\u56fe\u5360\u4f4d",
      },
      previewImage: "/images/flowmate-overview.png",
      demoUrl: undefined,
      githubUrl: undefined,
    },
  ] satisfies AppTool[],
  obsidianSources: [
    {
      name: { en: "Xiaohongshu Sources", zh: "\u5c0f\u7ea2\u4e66\u6765\u6e90" },
      detail: {
        en: "Source page at `wiki/sources/\u5c0f\u7ea2\u4e66.md`, built from inbox and raw notes.",
        zh: "\u5728 `wiki/sources/\u5c0f\u7ea2\u4e66.md` \u7ef4\u62a4\u6765\u6e90\u7d22\u5f15\uff0c\u6765\u6e90\u4e8e inbox \u5bfc\u5165\u548c raw \u7b14\u8bb0\u6d41\u7a0b\u3002",
      },
    },
    {
      name: { en: "Douyin Sources", zh: "\u6296\u97f3\u6765\u6e90" },
      detail: {
        en: "Favorites are synced to `raw/douyin/*` and indexed in `wiki/sources/douyin.md`.",
        zh: "\u6296\u97f3\u6536\u85cf\u4e0e\u94fe\u63a5\u4f1a\u540c\u6b65\u5230 `raw/douyin/*`\uff0c\u5e76\u5728 `wiki/sources/douyin.md` \u7edf\u4e00\u7d22\u5f15\u3002",
      },
    },
    {
      name: { en: "Skill Packages", zh: "\u6280\u80fd\u5305\u5f52\u6863" },
      detail: {
        en: "Workflow packages are archived under `skills/` with definitions and examples.",
        zh: "\u5de5\u4f5c\u6d41\u6280\u80fd\u5305\u6309 `skills/` \u76ee\u5f55\u5f52\u6863\uff0c\u5305\u542b SKILL \u5b9a\u4e49\u548c\u793a\u4f8b\u3002",
      },
    },
  ] satisfies ObsidianSource[],
};
