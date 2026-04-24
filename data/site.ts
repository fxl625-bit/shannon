export type Locale = "en" | "zh";

export type Localized<T = string> = Record<Locale, T>;

export type Project = {
  name: Localized;
  summary: Localized;
  demoUrl: string;
};

export const site = {
  name: "Shannon Fu",
  nav: {
    home: { en: "Home", zh: "首页" },
    projects: { en: "Projects", zh: "项目" },
    thoughts: { en: "Thoughts", zh: "想法" },
  },
  home: {
    eyebrow: {
      en: "AI Products - Small Bets - Fresh Thinking",
      zh: "AI 产品 - 小步尝试 - 新鲜想法",
    },
    tagline: {
      en: "I build small AI idea.",
      zh: "我做小而实用的 AI 想法。",
    },
    intro: {
      en: "An intentionally quiet space for experiments, tiny AI products, and practical ideas worth testing in the real world.",
      zh: "一个刻意留白的空间，用来展示实验型 AI 小产品和值得在真实世界里验证的创新想法。",
    },
    cta: { en: "Explore Projects", zh: "查看项目" },
    focusLabel: { en: "Focus", zh: "重点" },
    focusItems: [
      {
        title: { en: "Tiny products", zh: "小产品" },
        body: {
          en: "Compact tools with one sharp use case.",
          zh: "围绕单一核心场景，做紧凑好用的工具。",
        },
      },
      {
        title: { en: "Useful demos", zh: "可用演示" },
        body: {
          en: "Working prototypes that explain themselves quickly.",
          zh: "可以快速自解释的可运行原型。",
        },
      },
      {
        title: { en: "Clear thinking", zh: "清晰思考" },
        body: {
          en: "Short opinions on where AI can be more human-scale.",
          zh: "关于 AI 如何更贴近人类尺度的简短观点。",
        },
      },
    ],
  },
  projectsSection: {
    title: { en: "Projects", zh: "项目" },
    eyebrow: { en: "Selected Work", zh: "精选作品" },
    intro: {
      en: "A short list of AI product experiments with simple interfaces, narrow scope, and a bias toward usefulness over noise.",
      zh: "一组 AI 产品实验，保持简洁界面与清晰边界，优先追求实用价值而非噱头。",
    },
    cardLabel: { en: "Project", zh: "项目" },
    liveDemo: { en: "Live Demo", zh: "在线体验" },
  },
  thoughtsSection: {
    title: { en: "Thoughts", zh: "想法" },
    eyebrow: { en: "Short Notes", zh: "短观点" },
    intro: {
      en: "Not essays. Just compact ideas, product instincts, and small observations worth keeping visible.",
      zh: "不是长文，只保留短观点、产品直觉和那些值得被持续看见的小观察。",
    },
  },
  languageSwitch: {
    en: { current: "EN", target: "中文" },
    zh: { current: "中", target: "EN" },
  },
  projects: [
    {
      name: { en: "Signal Atlas", zh: "Signal Atlas" },
      summary: {
        en: "An AI tool that turns scattered notes into clear next actions for solo builders.",
        zh: "把零散笔记转成明确下一步行动的 AI 工具，面向独立创造者。",
      },
      demoUrl: "https://example.com/signal-atlas",
    },
    {
      name: { en: "Voice Draft", zh: "Voice Draft" },
      summary: {
        en: "A lightweight speech-to-concept workspace for shaping product thoughts before they disappear.",
        zh: "一个轻量语音到概念工作台，帮助在灵感消失前快速固化产品想法。",
      },
      demoUrl: "https://example.com/voice-draft",
    },
    {
      name: { en: "Tiny Mentor", zh: "Tiny Mentor" },
      summary: {
        en: "A compact coaching loop that gives one useful prompt instead of a full chatbot conversation.",
        zh: "一个紧凑的教练循环，不做冗长对话，只给一条真正有用的提示。",
      },
      demoUrl: "https://example.com/tiny-mentor",
    },
  ] satisfies Project[],
  thoughts: {
    en: [
      "Most AI products should get smaller before they try to get smarter.",
      "A useful interface is often just a good question in the right moment.",
      "Speed matters, but clarity is what people remember.",
      "The best demos feel obvious after you see them once.",
      "New tools become believable when they reduce one real friction point.",
    ],
    zh: [
      "多数 AI 产品在变聪明之前，应该先变小、变聚焦。",
      "一个有用的界面，往往只是恰当时机下的一个好问题。",
      "速度很重要，但真正被记住的是清晰。",
      "好的演示应该在看完一次后显得理所当然。",
      "当工具减少了一个真实摩擦点，它才会变得可信。",
    ],
  },
};
