export type Locale = "en" | "zh";

export type Localized<T = string> = Record<Locale, T>;

export type Experiment = {
  name: Localized;
  summary: Localized;
  tags: Localized<string[]>;
  demoUrl?: string;
  githubUrl?: string;
};

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
  demoUrl?: string;
  githubUrl?: string;
};

export const site = {
  name: "Shannon Fu",
  nav: {
    home: { en: "Home", zh: "\u9996\u9875" },
    experiments: { en: "Experiments", zh: "\u5b9e\u9a8c" },
    skills: { en: "Skills", zh: "\u6280\u80fd" },
    notes: { en: "Notes", zh: "\u7b14\u8bb0" },
  },
  languageSwitch: {
    en: { current: "EN", target: "\u4e2d" },
    zh: { current: "\u4e2d", target: "EN" },
  },
  home: {
    badge: {
      en: "AI x Human Potential",
      zh: "AI x \u4eba\u7c7b\u80fd\u529b",
    },
    title: {
      en: "Exploring how AI extends human capability",
      zh: "\u63a2\u7d22 AI \u5982\u4f55\u62d3\u5c55\u4eba\u7684\u80fd\u529b\u8fb9\u754c",
    },
    description: {
      en: "An intentionally quiet space for small experiments at the intersection of AI, thinking, and human potential.",
      zh: "\u4e00\u4e2a\u514b\u5236\u5b89\u9759\u7684\u7a7a\u95f4\uff0c\u8bb0\u5f55\u53d1\u751f\u5728 AI\uff0c\u601d\u8003\u4e0e\u4eba\u7c7b\u80fd\u529b\u4ea4\u6c47\u5904\u7684\u5c0f\u5b9e\u9a8c\u3002",
    },
    subline: {
      en: "This is not a portfolio. It is a thinking lab.",
      zh: "\u8fd9\u4e0d\u662f\u4f5c\u54c1\u96c6\uff0c\u800c\u662f\u4e00\u4e2a thinking lab\u3002",
    },
    ctaPrimary: {
      en: "View Experiments",
      zh: "\u67e5\u770b\u5b9e\u9a8c",
    },
    ctaSecondary: {
      en: "Read Notes",
      zh: "\u9605\u8bfb\u7b14\u8bb0",
    },
  },
  exploreSection: {
    title: {
      en: "What I Explore",
      zh: "\u6211\u5728\u63a2\u7d22\u4ec0\u4e48",
    },
    cards: [
      {
        title: { en: "Cognition", zh: "\u8ba4\u77e5" },
        body: {
          en: "How AI changes the way we think, remember, and make decisions.",
          zh: "\u89c2\u5bdf AI \u5982\u4f55\u6539\u53d8\u6211\u4eec\u7684\u601d\u8003\uff0c\u8bb0\u5fc6\u548c\u51b3\u7b56\u65b9\u5f0f\u3002",
        },
      },
      {
        title: { en: "Tools", zh: "\u5de5\u5177" },
        body: {
          en: "Small systems that turn repeated work into reusable capability.",
          zh: "\u5c06\u91cd\u590d\u5de5\u4f5c\u53d8\u6210\u53ef\u590d\u7528\u80fd\u529b\u7684\u5c0f\u578b\u7cfb\u7edf\u3002",
        },
      },
      {
        title: { en: "Behavior", zh: "\u884c\u4e3a" },
        body: {
          en: "Experiments in discipline, execution, health, and daily routines.",
          zh: "\u5728\u7eaa\u5f8b\uff0c\u6267\u884c\uff0c\u5065\u5eb7\u4e0e\u65e5\u5e38\u8282\u5f8b\u4e2d\u8fdb\u884c\u5b9e\u9a8c\u3002",
        },
      },
    ],
  },
  skillsSection: {
    title: {
      en: "Personal AI Skills",
      zh: "\u4e2a\u4eba AI Skills",
    },
    subtitle: {
      en: "Reusable AI workflows designed for writing, planning, translation, reporting, and personal operating systems.",
      zh: "\u53ef\u590d\u7528\u7684 AI \u5de5\u4f5c\u6d41\uff0c\u7528\u4e8e\u5199\u4f5c\uff0c\u89c4\u5212\uff0c\u7ffb\u8bd1\uff0c\u5468\u62a5\u4e0e\u4e2a\u4eba\u64cd\u4f5c\u7cfb\u7edf\u3002",
    },
  },
  appsSection: {
    title: {
      en: "Apps & Lightweight AI Tools",
      zh: "Apps \u4e0e\u8f7b\u91cf AI \u5de5\u5177",
    },
    subtitle: {
      en: "Small, practical experiments that turn AI ideas into usable interfaces.",
      zh: "\u5c06 AI \u60f3\u6cd5\u53d8\u6210\u53ef\u7528\u754c\u9762\u7684\u5c0f\u578b\u5b9e\u8df5\u3002",
    },
  },
  notesSection: {
    title: { en: "Notes", zh: "\u7b14\u8bb0" },
    subtitle: {
      en: "Short reflections on cognition, systems, and daily AI practice.",
      zh: "\u5173\u4e8e\u8ba4\u77e5\uff0c\u7cfb\u7edf\u4e0e\u65e5\u5e38 AI \u5b9e\u8df5\u7684\u7b80\u77ed\u601d\u8003\u3002",
    },
    cta: { en: "Open Notes", zh: "\u6253\u5f00\u7b14\u8bb0" },
  },
  experimentsPage: {
    title: { en: "Experiments", zh: "\u5b9e\u9a8c" },
    eyebrow: { en: "AI x Human Potential", zh: "AI x \u4eba\u7c7b\u80fd\u529b" },
    intro: {
      en: "Current experiments in personal AI systems, cognitive tooling, and behavior design.",
      zh: "\u5f53\u524d\u56f4\u7ed5\u4e2a\u4eba AI \u7cfb\u7edf\uff0c\u8ba4\u77e5\u5de5\u5177\u4e0e\u884c\u4e3a\u8bbe\u8ba1\u7684\u5b9e\u9a8c\u3002",
    },
    cardLabel: { en: "Experiment", zh: "\u5b9e\u9a8c" },
    demoLabel: { en: "Open Demo", zh: "\u6253\u5f00\u6f14\u793a" },
    githubLabel: { en: "GitHub", zh: "GitHub" },
  },
  skillsPage: {
    title: { en: "Skills", zh: "\u6280\u80fd" },
    eyebrow: { en: "Personal AI Systems", zh: "\u4e2a\u4eba AI \u7cfb\u7edf" },
    intro: {
      en: "Capability modules I use to run writing, planning, translation, reporting, and decision workflows.",
      zh: "\u6211\u7528\u6765\u9a71\u52a8\u5199\u4f5c\uff0c\u89c4\u5212\uff0c\u7ffb\u8bd1\uff0c\u62a5\u544a\u4e0e\u51b3\u7b56\u6d41\u7a0b\u7684\u80fd\u529b\u6a21\u5757\u3002",
    },
    skillLabel: { en: "Skill", zh: "\u6280\u80fd" },
    githubLabel: { en: "GitHub", zh: "GitHub" },
  },
  notesPage: {
    title: { en: "Notes", zh: "\u7b14\u8bb0" },
    eyebrow: { en: "Thinking Lab", zh: "Thinking Lab" },
    intro: {
      en: "Working notes and concise reflections from ongoing AI x human capability experiments.",
      zh: "\u6765\u81ea AI x \u4eba\u7c7b\u80fd\u529b\u5b9e\u9a8c\u7684\u5de5\u4f5c\u7b14\u8bb0\u4e0e\u7b80\u6d01\u601d\u8003\u3002",
    },
  },
  skills: [
    {
      name: { en: "Novel Skill", zh: "\u5c0f\u8bf4 Skill" },
      label: { en: "Skill", zh: "\u6280\u80fd" },
      summary: {
        en: "A writing-assistant skill for story ideation, structure, chapter planning, quality review, and market signal analysis.",
        zh: "\u7528\u4e8e\u5c0f\u8bf4\u521b\u4f5c\u7684 AI \u5de5\u4f5c\u6d41\uff0c\u8f85\u52a9\u5b8c\u6210\u7075\u611f\u751f\u6210\uff0c\u7ed3\u6784\u8bbe\u8ba1\uff0c\u7ae0\u8282\u89c4\u5212\uff0c\u8d28\u91cf\u8bc4\u4f30\u4e0e\u5e02\u573a\u4fe1\u53f7\u5206\u6790\u3002",
      },
      githubUrl: undefined,
    },
    {
      name: { en: "AI BOSS Skill", zh: "AI BOSS Skill" },
      label: { en: "Skill", zh: "\u6280\u80fd" },
      summary: {
        en: "A personal command-center skill for managing goals, tasks, memory, skills, and decision workflows.",
        zh: "\u9762\u5411\u4e2a\u4eba\u8d85\u7ea7\u4e2a\u4f53\u7684 AI \u603b\u63a7\u5de5\u4f5c\u6d41\uff0c\u7528\u4e8e\u7ba1\u7406\u76ee\u6807\uff0c\u4efb\u52a1\uff0c\u8bb0\u5fc6\uff0c\u6280\u80fd\u548c\u51b3\u7b56\u6d41\u7a0b\u3002",
      },
      githubUrl: undefined,
    },
    {
      name: { en: "Video Translation Skill", zh: "\u89c6\u9891\u7ffb\u8bd1 Skill" },
      label: { en: "Skill", zh: "\u6280\u80fd" },
      summary: {
        en: "A workflow for translating, localizing, and restructuring video content across languages and cultural contexts.",
        zh: "\u7528\u4e8e\u89c6\u9891\u5185\u5bb9\u7ffb\u8bd1\uff0c\u672c\u5730\u5316\u6539\u5199\u548c\u8de8\u8bed\u8a00\u8868\u8fbe\u4f18\u5316\u7684 AI \u5de5\u4f5c\u6d41\u3002",
      },
      githubUrl: undefined,
    },
    {
      name: { en: "Weekly Report Skill", zh: "\u5468\u62a5 Skill" },
      label: { en: "Skill", zh: "\u6280\u80fd" },
      summary: {
        en: "A practical workflow that turns to-do lists, work notes, and progress logs into structured weekly reports.",
        zh: "\u5c06\u5f85\u529e\u6e05\u5355\uff0c\u5de5\u4f5c\u8bb0\u5f55\u548c\u9879\u76ee\u8fdb\u5c55\u81ea\u52a8\u6574\u7406\u4e3a\u7ed3\u6784\u5316\u5468\u62a5\u7684\u5b9e\u7528 AI \u5de5\u4f5c\u6d41\u3002",
      },
      githubUrl: undefined,
    },
  ] satisfies Skill[],
  apps: [
    {
      name: { en: "\u4e00\u4e16\u5706\u6ee1", zh: "\u4e00\u4e16\u5706\u6ee1" },
      typeLabel: { en: "Health Record App", zh: "\u5065\u5eb7\u8bb0\u5f55 App" },
      summary: {
        en: "A blood pressure and blood glucose tracking app with AI-assisted interpretation of historical records and health reports.",
        zh: "\u4e00\u6b3e\u8840\u538b\u8840\u7cd6\u8bb0\u5f55\u5de5\u5177\uff0c\u652f\u6301\u5386\u53f2\u6570\u636e\u7ba1\u7406\uff0c\u8d8b\u52bf\u67e5\u770b\uff0c\u4ee5\u53ca AI \u8f85\u52a9\u89e3\u8bfb\u4f53\u68c0\u62a5\u544a\u548c\u5065\u5eb7\u8bb0\u5f55\u3002",
      },
      previewLabel: {
        en: "Interface placeholder",
        zh: "\u754c\u9762\u5360\u4f4d",
      },
      demoUrl: undefined,
      githubUrl: undefined,
    },
    {
      name: { en: "FlowMate \u4e50\u4f34", zh: "FlowMate \u4e50\u4f34" },
      typeLabel: { en: "AI Lightweight App", zh: "AI \u8f7b\u91cf App" },
      summary: {
        en: "A lightweight AI companion experiment for daily flow, emotional support, and small personal routines.",
        zh: "\u4e00\u4e2a\u8f7b\u91cf\u7ea7 AI \u966a\u4f34\u5e94\u7528\u5b9e\u9a8c\uff0c\u5173\u6ce8\u65e5\u5e38\u8282\u594f\uff0c\u60c5\u7eea\u652f\u6301\u4e0e\u4e2a\u4eba\u5c0f\u4e60\u60ef\u3002",
      },
      previewLabel: {
        en: "Interface placeholder",
        zh: "\u754c\u9762\u5360\u4f4d",
      },
      demoUrl: undefined,
      githubUrl: undefined,
    },
  ] satisfies AppTool[],
  experiments: [
    {
      name: { en: "Signal Atlas", zh: "Signal Atlas" },
      summary: {
        en: "Turns scattered notes into clear next actions for independent builders.",
        zh: "\u628a\u96f6\u6563\u7b14\u8bb0\u8f6c\u6210\u6e05\u6670\u7684\u4e0b\u4e00\u6b65\u884c\u52a8\uff0c\u670d\u52a1\u72ec\u7acb\u521b\u9020\u8005\u3002",
      },
      tags: {
        en: ["Cognition", "Action Design", "Personal AI Systems"],
        zh: ["\u8ba4\u77e5", "\u884c\u52a8\u8bbe\u8ba1", "\u4e2a\u4eba AI \u7cfb\u7edf"],
      },
      demoUrl: undefined,
      githubUrl: undefined,
    },
    {
      name: { en: "Voice Draft", zh: "Voice Draft" },
      summary: {
        en: "A lightweight speech-to-concept workspace for capturing ideas before they fade.",
        zh: "\u4e00\u4e2a\u8f7b\u91cf\u8bed\u97f3\u5230\u6982\u5ff5\u5de5\u4f5c\u53f0\uff0c\u5728\u7075\u611f\u6d88\u5931\u524d\u5b8c\u6210\u6355\u6349\u3002",
      },
      tags: {
        en: ["Thinking Interface", "Voice", "Capture"],
        zh: ["\u601d\u7ef4\u754c\u9762", "\u8bed\u97f3", "\u5feb\u901f\u8bb0\u5f55"],
      },
      demoUrl: undefined,
      githubUrl: undefined,
    },
    {
      name: { en: "Tiny Mentor", zh: "Tiny Mentor" },
      summary: {
        en: "Provides one useful coaching prompt instead of long chatbot sessions.",
        zh: "\u4e0d\u505a\u51d7\u957f\u5bf9\u8bdd\uff0c\u53ea\u63d0\u4f9b\u4e00\u6761\u771f\u6b63\u6709\u7528\u7684\u6559\u7ec3\u63d0\u793a\u3002",
      },
      tags: {
        en: ["Behavior", "Execution", "Micro Coaching"],
        zh: ["\u884c\u4e3a", "\u6267\u884c", "\u5fae\u578b\u6559\u7ec3"],
      },
      demoUrl: undefined,
      githubUrl: undefined,
    },
  ] satisfies Experiment[],
  notes: {
    en: [
      "Why most personal AI systems fail at behavior change rather than model quality.",
      "Designing prompts as reusable interfaces instead of one-off instructions.",
      "Cognitive load as a product metric for AI-assisted workflows.",
      "How to turn daily logs into decision-ready memory.",
    ],
    zh: [
      "\u4e3a\u4ec0\u4e48\u591a\u6570\u4e2a\u4eba AI \u7cfb\u7edf\u5931\u8d25\u5728\u884c\u4e3a\u6539\u53d8\uff0c\u800c\u4e0d\u662f\u6a21\u578b\u8d28\u91cf\u3002",
      "\u628a Prompt \u5f53\u6210\u53ef\u590d\u7528\u754c\u9762\uff0c\u800c\u4e0d\u662f\u4e00\u6b21\u6027\u6307\u4ee4\u3002",
      "\u8ba9\u8ba4\u77e5\u8d1f\u8377\u6210\u4e3a AI \u5de5\u4f5c\u6d41\u7684\u4ea7\u54c1\u6307\u6807\u3002",
      "\u5982\u4f55\u628a\u65e5\u5fd7\u53d8\u6210\u53ef\u652f\u6301\u51b3\u7b56\u7684\u8bb0\u5fc6\u7cfb\u7edf\u3002",
    ],
  },
};
