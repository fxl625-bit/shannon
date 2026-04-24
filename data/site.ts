export type Locale = "en" | "zh";

export type Localized<T = string> = Record<Locale, T>;

export type Project = {
  name: Localized;
  summary: Localized;
  tags: Localized<string[]>;
  demoUrl: string;
};

export const site = {
  name: "Shannon Fu",
  nav: {
    home: { en: "Home", zh: "首页" },
    projects: { en: "Projects", zh: "项目" },
    thoughts: { en: "Thoughts", zh: "想法" },
  },
  languageSwitch: {
    en: { current: "EN", target: "中" },
    zh: { current: "中", target: "EN" },
  },
  home: {
    eyebrow: {
      en: "AI Products - Small Bets - Fresh Thinking",
      zh: "AI 产品 - 小步尝试 - 新鲜思考",
    },
    tagline: {
      en: "I build small AI ideas into useful products.",
      zh: "我把小的 AI 想法做成真正有用的产品。",
    },
    intro: {
      en: "An intentionally quiet space for experiments, tiny AI products, and practical ideas worth testing in the real world.",
      zh: "一个刻意克制的空间，用来展示实验型 AI 小产品和那些值得在真实世界里被验证的想法。",
    },
    cta: { en: "Explore Projects", zh: "查看项目" },
    focusLabel: { en: "Focus", zh: "聚焦" },
    focusItems: [
      {
        title: { en: "Tiny products", zh: "小产品" },
        body: {
          en: "Compact tools designed for one clear use case.",
          zh: "围绕一个明确场景，做紧凑且可落地的工具。",
        },
      },
      {
        title: { en: "Useful demos", zh: "可用演示" },
        body: {
          en: "Working prototypes that explain value in minutes.",
          zh: "可运行原型能在几分钟内说明价值。",
        },
      },
      {
        title: { en: "Clear thinking", zh: "清晰思考" },
        body: {
          en: "Short viewpoints on making AI products more human-scale.",
          zh: "用简短观点探索 AI 产品如何更贴近人的尺度。",
        },
      },
    ],
  },
  projectsSection: {
    title: { en: "Projects", zh: "项目" },
    eyebrow: { en: "Selected Work", zh: "精选项目" },
    intro: {
      en: "A compact set of AI product experiments with clear scope, practical utility, and disciplined execution.",
      zh: "一组范围清晰、强调实用价值、执行克制的 AI 产品实验。",
    },
    cardLabel: { en: "Project", zh: "项目" },
    liveDemo: { en: "Live Demo", zh: "在线体验" },
  },
  thoughtsSection: {
    title: { en: "Thoughts", zh: "想法" },
    eyebrow: { en: "Short Notes", zh: "短观点" },
    intro: {
      en: "Not long essays. Just concise product notes, instincts, and observations worth revisiting.",
      zh: "不是长文，只保留值得反复回看的产品直觉和简洁观点。",
    },
  },
  projects: [
    {
      name: { en: "Signal Atlas", zh: "Signal Atlas" },
      summary: {
        en: "Turns scattered notes into clear next actions for independent builders.",
        zh: "把零散笔记转成清晰的下一步行动，服务独立创造者。",
      },
      tags: {
        en: ["Productivity", "Action Design", "AI Workflow"],
        zh: ["效率", "行动设计", "AI 工作流"],
      },
      demoUrl: "https://example.com/signal-atlas",
    },
    {
      name: { en: "Voice Draft", zh: "Voice Draft" },
      summary: {
        en: "A lightweight speech-to-concept workspace for capturing ideas before they fade.",
        zh: "一个轻量语音到概念工作台，在灵感消失前完成捕捉。",
      },
      tags: {
        en: ["Voice UX", "Rapid Capture", "Idea Lab"],
        zh: ["语音交互", "快速记录", "创意实验"],
      },
      demoUrl: "https://example.com/voice-draft",
    },
    {
      name: { en: "Tiny Mentor", zh: "Tiny Mentor" },
      summary: {
        en: "Provides one useful coaching prompt instead of long chatbot sessions.",
        zh: "不给冗长对话，只给一条真正有用的教练提示。",
      },
      tags: {
        en: ["Coaching", "Prompt Design", "Minimal AI"],
        zh: ["教练模式", "提示设计", "极简 AI"],
      },
      demoUrl: "https://example.com/tiny-mentor",
    },
  ] satisfies Project[],
  thoughts: {
    en: [
      "Most AI products should get smaller before they try to get smarter.",
      "A useful interface is often just a good question at the right moment.",
      "Speed matters, but clarity is what people remember.",
      "The best demos feel obvious right after your first use.",
      "A tool becomes believable when it removes one real friction point.",
    ],
    zh: [
      "多数 AI 产品在变聪明之前，应该先变小、变聚焦。",
      "好界面往往只是一个在正确时机出现的好问题。",
      "速度重要，但真正被记住的是清晰。",
      "最好的演示是在第一次体验后就显得理所当然。",
      "当工具去掉一个真实摩擦点，它才会变得可信。",
    ],
  },
};
