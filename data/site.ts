export type Locale = "en" | "zh";

export type Localized<T = string> = Record<Locale, T>;

export type Skill = {
  name: Localized;
  label: Localized;
  summary: Localized;
  githubUrl?: string;
};

export type AppTool = {
  slug: string;
  name: Localized;
  typeLabel: Localized;
  summary: Localized;
  previewLabel: Localized;
  previewImage?: string;
  previewImages?: Localized;
  previewVideoWebm?: string;
  previewVideoMp4?: string;
  demoUrl?: string;
  storeUrl?: string;
  githubUrl?: string;
  status: Localized;
  statusTone?: "store" | "live" | "internal" | "building";
  frameStyle?: "browser" | "phone" | "desktop" | "dashboard" | "player";
  viewportLabel?: Localized;
  spotlight: Localized;
  detail: Localized;
  detailBullets: Localized[];
  tags: Localized[];
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
    cases: { en: "Cases", zh: "\u6848\u4f8b" },
    skills: { en: "Workflows", zh: "\u5de5\u4f5c\u6d41" },
    apps: { en: "Apps", zh: "\u5e94\u7528" },
    agents: { en: "Agents", zh: "Agent" },
    explorations: { en: "Explorations", zh: "探索" },
    "ai-agent-knowledge-base": { en: "AI-Agent Knowledge Base", zh: "AI-Agent \u77e5\u8bc6\u5e93" },
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
      zh: "\u63a2\u7d22 AI \u5982\u4f55\u63d0\u5347\u4eba\u7684\u80fd\u529b\u8fb9\u754c",
    },
    description: {
      en: "Notes on AI tools and workflows in practice.",
      zh: "\u4e00\u4e9b AI \u5de5\u5177\u548c\u5de5\u4f5c\u6d41\u7684\u5b9e\u8df5\u8bb0\u5f55\u3002",
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
      en: "AI Skills Engineering",
      zh: "AI Skills \u5de5\u7a0b\u65b9\u6cd5",
    },
    subtitle: {
      en: "How I build, organize, and publish reusable skills \u2014 not a list, but a system.",
      zh: "\u5982\u4f55\u6784\u5efa\u3001\u7ec4\u7ec7\u548c\u53d1\u5e03\u53ef\u590d\u7528 skills \u2014\u2014 \u4e0d\u662f\u4e00\u5f20\u6e05\u5355\uff0c\u800c\u662f\u4e00\u5957\u5de5\u7a0b\u65b9\u6cd5\u3002",
    },
    cta: { en: "View AI Skills", zh: "\u67e5\u770b AI \u6280\u80fd" },
  },
  appsSection: {
    title: {
      en: "Apps & Lightweight AI Tools",
      zh: "Apps \u4e0e\u8f7b\u91cf AI \u5de5\u5177",
    },
    subtitle: {
      en: "Two small tools built for real use.",
      zh: "\u81ea\u5df1\u505a\u6765\u81ea\u5df1\u7528\u7684\u4e24\u4e2a\u5c0f\u5de5\u5177\u3002",
    },
    cta: { en: "View Apps", zh: "\u67e5\u770b\u8f7b\u91cf\u5e94\u7528" },
  },
  appsPage: {
    title: { en: "Apps", zh: "\u5e94\u7528" },
    eyebrow: { en: "Projects I've built", zh: "\u6211\u505a\u7684\u9879\u76ee" },
    intro: {
      en: "Small tools and apps I built for real problems I ran into.",
      zh: "\u81ea\u5df1\u9047\u5230\u95ee\u9898\u65f6\u505a\u7684\u5c0f\u5de5\u5177\u548c\u5e94\u7528\u3002",
    },
    cardLabel: { en: "App / Tool", zh: "\u5e94\u7528 / \u5de5\u5177" },
    demoLabel: { en: "Live Demo", zh: "\u5728\u7ebf\u6f14\u793a" },
    githubLabel: { en: "GitHub", zh: "GitHub" },
    detailLabel: { en: "View details", zh: "\u67e5\u770b\u8be6\u60c5" },
    detailTitle: { en: "Product notes", zh: "\u4ea7\u54c1\u7b14\u8bb0" },
    detailClose: { en: "Close", zh: "\u5173\u95ed" },
    modalStatusLabel: { en: "Current status", zh: "\u5f53\u524d\u72b6\u6001" },
    modalFocusLabel: { en: "What it is solving", zh: "\u5728\u89e3\u51b3\u4ec0\u4e48" },
    modalHighlightsLabel: { en: "What is inside", zh: "\u91cc\u9762\u6709\u4ec0\u4e48" },
    surfaceLabel: { en: "Screenshot", zh: "\u622a\u56fe" },
    tapHint: { en: "Tap a card to open details.", zh: "\u70b9\u51fb\u5361\u7247\u67e5\u770b\u8be6\u60c5\u3002" },
  },
  skillsPage: {
    title: { en: "Skills Engineering", zh: "Skills \u5de5\u7a0b\u65b9\u6cd5" },
    eyebrow: { en: "AI Skills / Workflows", zh: "AI \u6280\u80fd / \u5de5\u4f5c\u6d41" },
    intro: {
      en: "Not a catalog of skills \u2014 a system for building, organizing, and governing them.",
      zh: "\u4e0d\u662f\u4e00\u5f20\u6280\u80fd\u6e05\u5355\uff0c\u800c\u662f\u6784\u5efa\u3001\u7ec4\u7ec7\u548c\u6cbb\u7406 skills \u7684\u5de5\u7a0b\u65b9\u6cd5\u3002",
    },
    skillLabel: { en: "AI Skill / Workflow", zh: "AI Skill / Workflow" },
    githubLabel: { en: "GitHub", zh: "GitHub" },
    methodology: {
      title: { en: "Three-Layer Architecture", zh: "\u4e09\u5c42\u67b6\u6784" },
      items: [
        {
          title: { en: "Source Skill", zh: "\u6e90 Skill" },
          body: {
            en: "Skills live in category directories under analysis/automation/creation/integration. Each skill follows the Agent Scan-Ready spec: Trigger Conditions, Required Handling, Output Contract, Do Not, and Load These Files \u2014 structured so an agent can judge applicability within the first screen.",
            zh: "Skills \u6309 analysis/automation/creation/integration \u5206\u7c7b\u5b58\u653e\u5728\u6e90\u76ee\u5f55\u3002\u6bcf\u4e2a skill \u9075\u5faa Agent Scan-Ready \u89c4\u8303\uff1aTrigger Conditions\u3001Required Handling\u3001Output Contract\u3001Do Not\u3001Load These Files \u2014\u2014 \u786e\u4fdd Agent \u5728\u9996\u5c4f\u5c31\u80fd\u5224\u65ad\u662f\u5426\u9002\u7528\u3002",
          },
        },
        {
          title: { en: "Runtime Package", zh: "\u8fd0\u884c\u65f6\u5305" },
          body: {
            en: "Skills are normalized and exported to a discoverable packages directory. Scripts carry deterministic logic, references hold rules and examples. The package is what the agent actually loads \u2014 the source is the canonical definition.",
            zh: "Skills \u88ab\u89c4\u8303\u5316\u5bfc\u51fa\u5230\u53ef\u53d1\u73b0\u7684 packages \u76ee\u5f55\u3002scripts \u627f\u8f7d\u786e\u5b9a\u6027\u903b\u8f91\uff0creferences \u5b58\u653e\u89c4\u5219\u548c\u793a\u4f8b\u3002Agent \u5b9e\u9645\u52a0\u8f7d\u7684\u662f\u8fd0\u884c\u65f6\u5305\uff0c\u6e90\u76ee\u5f55\u662f\u89c4\u8303\u5b9a\u4e49\u3002",
          },
        },
        {
          title: { en: "Publish Layer", zh: "\u53d1\u5e03\u5c42" },
          body: {
            en: "Not every skill can be public. The publish layer tracks three states: standalone (safe to open-source), project-bound (tied to a specific GitHub repo, no duplicate uploads), and private-blocked (depends on private knowledge, credentials, or internal methodology). The default for new skills is private.",
            zh: "\u4e0d\u662f\u6240\u6709 skill \u90fd\u80fd\u516c\u5f00\u3002\u53d1\u5e03\u5c42\u8ffd\u8e2a\u4e09\u79cd\u72b6\u6001\uff1astandalone\uff08\u53ef\u72ec\u7acb\u5f00\u6e90\uff09\u3001project-bound\uff08\u5df2\u7ed1\u5b9a\u7279\u5b9a GitHub \u4ed3\u5e93\uff0c\u7981\u6b62\u91cd\u590d\u4e0a\u4f20\uff09\u3001private-blocked\uff08\u4f9d\u8d56\u79c1\u6709\u77e5\u8bc6\u3001\u51ed\u8bc1\u6216\u5185\u90e8\u65b9\u6cd5\u8bba\uff09\u3002\u65b0\u5efa skill \u9ed8\u8ba4\u79c1\u6709\u3002",
          },
        },
      ],
    },
    pipeline: {
      title: { en: "Maintenance Pipeline", zh: "\u7ef4\u62a4\u6d41\u6c34\u7ebf" },
      body: {
        en: "When a skill changes, the update order matters: 1) modify the source skill, 2) sync the runtime package, 3) update the publish layer status, 4) finally regenerate indexes and wiki pages. Skipping steps creates drift between what is documented and what is running.",
        zh: "\u5f53 skill \u53d1\u751f\u53d8\u5316\u65f6\uff0c\u66f4\u65b0\u987a\u5e8f\u5f88\u91cd\u8981\uff1a1) \u4fee\u6539\u6e90 skill\uff0c2) \u540c\u6b65\u8fd0\u884c\u65f6\u5305\uff0c3) \u66f4\u65b0\u53d1\u5e03\u5c42\u72b6\u6001\uff0c4) \u6700\u540e\u91cd\u65b0\u751f\u6210\u7d22\u5f15\u548c wiki \u9875\u9762\u3002\u8df3\u8fc7\u6b65\u9aa4\u4f1a\u5bfc\u81f4\u6587\u6863\u8bb0\u5f55\u4e0e\u5b9e\u9645\u8fd0\u884c\u72b6\u6001\u8131\u8282\u3002",
      },
    },
  },
  obsidianPage: {
    title: { en: "Knowledge Engineering", zh: "\u77e5\u8bc6\u5de5\u7a0b\u65b9\u6cd5" },
    eyebrow: { en: "Personal Agent Knowledge Base", zh: "\u4e2a\u4eba Agent \u77e5\u8bc6\u5e93" },
    intro: {
      en: "How I manage a long-running knowledge base \u2014 not what is in it, but the engineering behind it.",
      zh: "\u5982\u4f55\u7ba1\u7406\u4e00\u4e2a\u957f\u671f\u8fd0\u884c\u7684\u77e5\u8bc6\u5e93 \u2014\u2014 \u4e0d\u662f\u91cc\u9762\u653e\u4e86\u4ec0\u4e48\uff0c\u800c\u662f\u80cc\u540e\u7684\u5de5\u7a0b\u65b9\u6cd5\u3002",
    },
    cards: [
      {
        title: { en: "Collect First, Organize Later", zh: "\u5148\u6536\u96c6\uff0c\u540e\u6574\u7406" },
        body: {
          en: "New content enters raw/ first, preserving fidelity. Only after import and cleaning does it flow into wiki/ for aggregation. Original materials are never deleted \u2014 outputs are always traceable to sources.",
          zh: "\u65b0\u5185\u5bb9\u5148\u8fdb\u5165 raw/ \u4fdd\u7559\u539f\u59cb\u4fdd\u771f\u5ea6\uff0c\u7ecf\u8fc7\u5bfc\u5165\u548c\u6e05\u6d17\u540e\u624d\u6d41\u5165 wiki/ \u505a\u805a\u5408\u3002\u539f\u59cb\u6750\u6599\u4e0d\u5220\u9664\uff0c\u6574\u7406\u7ed3\u679c\u59cb\u7ec8\u53ef\u8ffd\u6eaf\u5230\u6765\u6e90\u3002",
        },
      },
      {
        title: { en: "Multi-Label, Controlled Categories", zh: "\u591a\u6807\u7b7e\uff0c\u514b\u5236\u5206\u7c7b" },
        body: {
          en: "Notes can belong to multiple topics, but the top-level category count stays disciplined. Aggregation pages prioritize why this is worth reading over simply listing sources.",
          zh: "\u7b14\u8bb0\u53ef\u4ee5\u5c5e\u4e8e\u591a\u4e2a\u4e3b\u9898\uff0c\u4f46\u4e3b\u7c7b\u76ee\u6570\u91cf\u4fdd\u6301\u514b\u5236\u3002\u805a\u5408\u9875\u4f18\u5148\u63d0\u70bc\u300c\u4e3a\u4ec0\u4e48\u503c\u5f97\u770b\u300d\uff0c\u800c\u4e0d\u662f\u7b80\u5355\u7f57\u5217\u6765\u6e90\u3002",
        },
      },
      {
        title: { en: "Conflict Logging, Not Ruling", zh: "\u8bb0\u5f55\u51b2\u7a81\uff0c\u4e0d\u79c1\u4e0b\u88c1\u51b3" },
        body: {
          en: "When sources disagree, the rule is to log the conflict into wiki/reviews/ \u2014 never resolve it unilaterally. The knowledge base is a map, not a judge.",
          zh: "\u5f53\u6765\u6e90\u4e4b\u95f4\u5b58\u5728\u51b2\u7a81\u65f6\uff0c\u89c4\u5219\u662f\u8bb0\u5f55\u5230 wiki/reviews/ \u2014\u2014 \u4e0d\u79c1\u4e0b\u88c1\u51b3\u3002\u77e5\u8bc6\u5e93\u662f\u5730\u56fe\uff0c\u4e0d\u662f\u6cd5\u5b98\u3002",
        },
      },
      {
        title: { en: "Graph Integrity", zh: "\u56fe\u8c31\u5b8c\u6574\u6027" },
        body: {
          en: "The knowledge graph only resolves wikilinks between local Markdown files. Aggregation pages must prioritize internal links over external URLs. Shadow notes, orphan nodes, and broken wikilinks are detected via full-vault scans, not spot fixes.",
          zh: "\u77e5\u8bc6\u56fe\u8c31\u53ea\u8bc6\u522b Markdown \u5185\u94fe\u3002\u805a\u5408\u9875\u5fc5\u987b\u4f18\u5148\u4f7f\u7528\u5185\u90e8\u94fe\u63a5\u800c\u975e\u5916\u90e8 URL\u3002\u5f71\u5b50\u7b14\u8bb0\u3001\u5b64\u7acb\u8282\u70b9\u548c\u635f\u574f\u5185\u94fe\u901a\u8fc7\u5168\u5e93\u626b\u63cf\u68c0\u6d4b\uff0c\u800c\u4e0d\u662f\u9010\u4e2a\u4fee\u8865\u3002",
        },
      },
    ] satisfies ObsidianCard[],
    sourceListTitle: { en: "Agent Working Rules", zh: "Agent \u5de5\u4f5c\u89c4\u5219" },
    sourceDetail: {
      en: "AI-generated summaries must compress information, not copy full text. Classifications allow multiple tags but the main category count stays restrained. When sources conflict, log to wiki/reviews/ \u2014 never adjudicate privately. These rules are enforced in config/ and read by every agent before operating on the vault.",
      zh: "AI \u751f\u6210\u7684\u6458\u8981\u5fc5\u987b\u538b\u7f29\u4fe1\u606f\u800c\u975e\u7167\u6284\u5168\u6587\u3002\u5206\u7c7b\u5141\u8bb8\u591a\u6807\u7b7e\u4f46\u4e3b\u7c7b\u76ee\u6570\u91cf\u4fdd\u6301\u514b\u5236\u3002\u6765\u6e90\u51b2\u7a81\u65f6\u8bb0\u5f55\u5230 wiki/reviews/ \u800c\u4e0d\u79c1\u81ea\u88c1\u51b3\u3002\u8fd9\u4e9b\u89c4\u5219\u5199\u5165 config/ \u5e76\u88ab\u6bcf\u4e2a Agent \u5728\u64cd\u4f5c\u77e5\u8bc6\u5e93\u524d\u52a0\u8f7d\u3002",
    },
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
        en: "A second-brain command flow for goals, tasks, memory, and decision support.",
        zh: "\u7528\u6765\u7ba1\u7406\u76ee\u6807\u3001\u4efb\u52a1\u3001\u8bb0\u5fc6\u548c\u51b3\u7b56\u8f85\u52a9\u7684 second-brain \u6d41\u7a0b\u3002",
      },
      githubUrl: undefined,
    },
    {
      name: { en: "Video Translation Skill", zh: "\u89c6\u9891\u7ffb\u8bd1 Skill" },
      label: { en: "AI Skill / Workflow", zh: "AI Skill / Workflow" },
      summary: {
        en: "A local video translation flow for subtitles, dubbing, and remux.",
        zh: "\u7528\u4e8e\u5b57\u5e55\u3001\u914d\u97f3\u548c\u91cd\u65b0\u5c01\u88c5\u7684\u672c\u5730\u89c6\u9891\u7ffb\u8bd1\u6d41\u7a0b\u3002",
      },
      githubUrl: undefined,
    },
    {
      name: { en: "Weekly Report Skill", zh: "\u5468\u62a5 Skill" },
      label: { en: "AI Skill / Workflow", zh: "AI Skill / Workflow" },
      summary: {
        en: "Turns task exports into structured weekly reports.",
        zh: "\u628a\u4efb\u52a1\u5bfc\u51fa\u6574\u7406\u6210\u7ed3\u6784\u5316\u5468\u62a5\u3002",
      },
      githubUrl: undefined,
    },
  ] satisfies Skill[],
  casesPage: {
    title: { en: "AI-Native Workflow Cases", zh: "AI-Native 工作流案例" },
    eyebrow: { en: "AI-Native / Vibe Coding / Agent", zh: "AI-Native / Vibe Coding / Agent" },
    intro: {
      en: "Turning repetitive labor, experience-based judgment, and cross-tool operations into reusable Agent workflows.",
      zh: "把重复劳动、经验判断和跨工具操作，沉淀成可复用的 Agent 工作流。",
    },
  },
  apps: [
    {
      slug: "yishiyuanman",
      name: { en: "LocalLog", zh: "一世圆满" },
      typeLabel: { en: "Health Record App", zh: "\u5065\u5eb7\u8bb0\u5f55 App" },
      summary: {
        en: "It started as a simple way to track blood pressure and blood glucose for my family, and later became a standalone app published on Google Play.",
        zh: "\u6700\u5f00\u59cb\u53ea\u662f\u4e3a\u4e86\u5bb6\u91cc\u4eba\u8bb0\u5f55\u8840\u538b\u548c\u8840\u7cd6\uff0c\u540e\u6765\u6574\u7406\u6210\u72ec\u7acb App\uff0c\u5e76\u5df2\u53d1\u5e03\u5230 Google Play\u3002",
      },
      status: {
        en: "Published on Google Play",
        zh: "\u5df2\u4e0a\u67b6 Google Play",
      },
      previewLabel: {
        en: "LocalLog measurement entry screen",
        zh: "一世圆满测量记录界面",
      },
      previewImages: {
        en: "/media/locallog/en-US-01-record.png",
        zh: "/media/locallog/zh-CN-01-record.png",
      },
      storeUrl: "https://play.google.com/store/apps/details?id=com.yishiyuanman.health",
      frameStyle: "phone",
      viewportLabel: {
        en: "Android app screen",
        zh: "Android App \u754c\u9762",
      },
      spotlight: {
        en: "A family health log that grew from private necessity into a publishable product.",
        zh: "\u4ece\u5bb6\u4eba\u81ea\u7528\u9700\u6c42\u51fa\u53d1\uff0c\u6700\u540e\u6253\u78e8\u6210\u53ef\u4e0a\u67b6\u7684\u5065\u5eb7\u8bb0\u5f55\u4ea7\u54c1\u3002",
      },
      detail: {
        en: "The product keeps the interaction simple enough for everyday family use: quick entries, clear readings, and a layout that feels safe instead of clinical.",
        zh: "\u4ea7\u54c1\u5c3d\u91cf\u628a\u4ea4\u4e92\u505a\u5f97\u8db3\u591f\u76f4\u63a5\uff1a\u8f93\u5165\u5feb\uff0c\u8bfb\u6570\u6e05\u6670\uff0c\u6574\u4f53\u611f\u53d7\u66f4\u50cf\u6bcf\u5929\u53ef\u7528\u7684\u5bb6\u5ead\u5de5\u5177\uff0c\u800c\u4e0d\u662f\u751f\u786c\u7684\u533b\u7597\u7cfb\u7edf\u3002",
      },
      detailBullets: [
        {
          en: "Tracks blood pressure and blood glucose in one place.",
          zh: "\u5728\u4e00\u4e2a\u754c\u9762\u91cc\u8bb0\u5f55\u8840\u538b\u548c\u8840\u7cd6\u3002",
        },
        {
          en: "Built around family usage instead of hospital workflow assumptions.",
          zh: "\u4ee5\u5bb6\u5ead\u65e5\u5e38\u4f7f\u7528\u4e3a\u4e2d\u5fc3\uff0c\u4e0d\u7167\u642c\u533b\u9662\u6d41\u7a0b\u5047\u8bbe\u3002",
        },
        {
          en: "Shipped as a standalone Android app on Google Play.",
          zh: "\u5df2\u4ee5\u72ec\u7acb Android App \u5f62\u6001\u53d1\u5e03\u5230 Google Play\u3002",
        },
      ],
      tags: [
        { en: "Mobile-first", zh: "\u79fb\u52a8\u4f18\u5148" },
        { en: "Family health", zh: "\u5bb6\u5ead\u5065\u5eb7" },
        { en: "Published", zh: "\u5df2\u53d1\u5e03" },
      ],
      demoUrl: undefined,
      githubUrl: undefined,
      statusTone: "store",
    },
    {
      slug: "math-detective",
      name: { en: "Math Detective", zh: "\u6570\u5b66\u4fa6\u63a2" },
      typeLabel: { en: "Math Practice Tool", zh: "\u6570\u5b66\u7ec3\u4e60\u5de5\u5177" },
      summary: {
        en: "A small tool for helping children read math word problems, with a focus on spotting numbers and understanding the question.",
        zh: "\u7ed9\u5b69\u5b50\u7ec3\u6570\u5b66\u8bfb\u9898\u7528\u7684\u5c0f\u5de5\u5177\uff0c\u91cd\u70b9\u653e\u5728\u627e\u6570\u5b57\u548c\u8bfb\u61c2\u9898\u610f\u4e0a\u3002",
      },
      status: {
        en: "Live on Vercel",
        zh: "\u5df2\u4e0a\u7ebf Vercel",
      },
      previewLabel: {
        en: "Math Detective exercise screen",
        zh: "数学侦探练习界面",
      },
      previewImage: "/images/apps/math-detective.png",
      frameStyle: "browser",
      viewportLabel: {
        en: "Browser learning view",
        zh: "\u6d4f\u89c8\u5668\u7ec3\u4e60\u754c\u9762",
      },
      spotlight: {
        en: "A reading aid for math problems, designed to slow children down just enough to really see the question.",
        zh: "\u8fd9\u662f\u4e00\u4e2a\u5e2e\u52a9\u5b69\u5b50\u300c\u770b\u61c2\u9898\u300d\u7684\u6570\u5b66\u8f85\u52a9\u5de5\u5177\uff0c\u4e0d\u662f\u53ea\u8ffd\u6c42\u505a\u9898\u901f\u5ea6\u3002",
      },
      detail: {
        en: "Instead of drilling answers, it guides attention toward quantities, clues, and the wording of the problem. The product is live and still being tuned through use.",
        zh: "\u5b83\u4e0d\u662f\u5355\u7eaf\u8bad\u7ec3\u7b54\u6848\uff0c\u800c\u662f\u628a\u6ce8\u610f\u529b\u5f15\u5411\u6570\u91cf\u3001\u7ebf\u7d22\u548c\u9898\u610f\u672c\u8eab\u3002\u73b0\u5728\u5df2\u7ecf\u5728\u7ebf\uff0c\u4e5f\u4ecd\u5728\u8fb9\u7528\u8fb9\u8fed\u4ee3\u3002",
      },
      detailBullets: [
        {
          en: "Helps children identify numbers, entities, and relationships in text.",
          zh: "\u5e2e\u52a9\u5b69\u5b50\u5728\u9898\u76ee\u6587\u5b57\u4e2d\u627e\u51fa\u6570\u5b57\u3001\u5bf9\u8c61\u548c\u5173\u7cfb\u3002",
        },
        {
          en: "Keeps the interface light so the exercise stays focused on reading comprehension.",
          zh: "\u754c\u9762\u5c3d\u91cf\u8f7b\uff0c\u8ba9\u7ec3\u4e60\u91cd\u70b9\u7559\u5728\u8bfb\u9898\u8fc7\u7a0b\u3002",
        },
        {
          en: "Deployed on Vercel and improved through ongoing usage feedback.",
          zh: "\u5df2\u90e8\u7f72\u5728 Vercel\uff0c\u5e76\u4f9d\u636e\u5b9e\u9645\u4f7f\u7528\u53cd\u9988\u7ee7\u7eed\u4f18\u5316\u3002",
        },
      ],
      tags: [
        { en: "Web app", zh: "Web App" },
        { en: "Education", zh: "\u6559\u80b2" },
        { en: "Iterating", zh: "\u6301\u7eed\u8fed\u4ee3" },
      ],
      demoUrl: "https://math-detective.vercel.app/",
      githubUrl: "https://github.com/fxl625-bit/math-detective",
      statusTone: "live",
    },
    {
      slug: "rent-tracker",
      name: { en: "RentTracker", zh: "\u6536\u79df\u8bb0\u5f55\u5668" },
      typeLabel: { en: "Property Management Tool", zh: "\u623f\u4ea7\u7ba1\u7406\u5de5\u5177" },
      summary: {
        en: "A small tool for tracking rental properties, rent, and payment status, currently used internally.",
        zh: "\u7528\u6765\u8bb0\u5f55\u623f\u6e90\u3001\u79df\u91d1\u548c\u6536\u6b3e\u72b6\u6001\u7684\u5c0f\u5de5\u5177\uff0c\u76ee\u524d\u5728\u5185\u90e8\u4f7f\u7528\u3002",
      },
      status: {
        en: "Internal tool",
        zh: "内部工具",
      },
      previewLabel: {
        en: "RentTracker dashboard mockup",
        zh: "收租记录器界面示意",
      },
      previewImage: "/images/apps/rent-tracker-mockup.png",
      frameStyle: "dashboard",
      viewportLabel: {
        en: "Operations dashboard",
        zh: "\u8fd0\u8425\u9762\u677f",
      },
      spotlight: {
        en: "A practical internal console for keeping rent records, payment timing, and property status from drifting apart.",
        zh: "\u4e00\u4e2a\u504f\u5b9e\u52a1\u7684\u5185\u90e8\u5de5\u5177\uff0c\u7528\u6765\u628a\u623f\u6e90\u3001\u79df\u91d1\u548c\u6536\u6b3e\u72b6\u6001\u7a33\u7a33\u5730\u5bf9\u9f50\u3002",
      },
      detail: {
        en: "This one is intentionally pragmatic. It is not trying to look like a consumer product; it is trying to reduce missed follow-up and keep the operational picture current.",
        zh: "\u8fd9\u4e2a\u5de5\u5177\u7684\u51fa\u53d1\u70b9\u5f88\u52a1\u5b9e\uff0c\u4e0d\u662f\u53bb\u8ffd\u6c42\u6d88\u8d39\u7ea7\u4ea7\u54c1\u611f\uff0c\u800c\u662f\u5c3d\u91cf\u51cf\u5c11\u9057\u6f0f\u8ddf\u8fdb\uff0c\u8ba9\u7ba1\u7406\u89c6\u56fe\u4fdd\u6301\u66f4\u65b0\u3002",
      },
      detailBullets: [
        {
          en: "Tracks properties, rent schedules, and payment completion in one place.",
          zh: "\u628a\u623f\u6e90\u3001\u79df\u671f\u548c\u6536\u6b3e\u5b8c\u6210\u72b6\u6001\u653e\u5728\u540c\u4e00\u4e2a\u5de5\u4f5c\u9762\u677f\u3002",
        },
        {
          en: "Optimized for internal clarity rather than public polish.",
          zh: "\u66f4\u91cd\u89c6\u5185\u90e8\u4f7f\u7528\u6e05\u6670\u5ea6\uff0c\u800c\u4e0d\u662f\u5bf9\u5916\u5c55\u793a\u611f\u3002",
        },
        {
          en: "Used in a real workflow today, which shapes what gets improved next.",
          zh: "\u5df2\u5728\u771f\u5b9e\u573a\u666f\u4e2d\u4f7f\u7528\uff0c\u4e5f\u56e0\u6b64\u51b3\u5b9a\u4e0b\u4e00\u6b65\u4f18\u5316\u4ec0\u4e48\u3002",
        },
      ],
      tags: [
        { en: "Internal tool", zh: "\u5185\u90e8\u5de5\u5177" },
        { en: "Dashboard", zh: "\u9762\u677f" },
        { en: "Operations", zh: "\u8fd0\u8425" },
      ],
      demoUrl: undefined,
      githubUrl: undefined,
      statusTone: "internal",
    },
    {
      slug: "long-fm",
      name: { en: "long-fm", zh: "long-fm" },
      typeLabel: { en: "AI Music Companion", zh: "AI \u97f3\u4e50\u4f34\u4fa3" },
      summary: {
        en: "A browser-based AI radio that uses your NetEase Cloud Music playlists. Connect a NetEase account to listen.",
        zh: "把网易云音乐歌单整理成个人 AI 电台。进入网页版后，连接网易云账号即可收听。",
      },
      status: {
        en: "Web app · sign-in required",
        zh: "网页版 · 收听需登录",
      },
      previewLabel: {
        en: "long-fm radio screen",
        zh: "long-fm 电台界面",
      },
      previewImage: "/images/apps/long-fm.png",
      frameStyle: "player",
      viewportLabel: {
        en: "Browser listening view",
        zh: "\u6d4f\u89c8\u5668\u64ad\u653e\u89c6\u56fe",
      },
      spotlight: {
        en: "A lightweight AI music companion with a more atmospheric, listening-first interface.",
        zh: "\u4e00\u4e2a\u66f4\u504f\u6c1b\u56f4\u611f\u7684 AI \u97f3\u4e50\u4f34\u4fa3\uff0c\u754c\u9762\u91cd\u70b9\u653e\u5728\u300c\u542c\u300d\u8fd9\u4ef6\u4e8b\u4e0a\u3002",
      },
      detail: {
        en: "The interface leans into mood and companionship rather than dense controls. It is a small experiment in making an AI music experience feel softer and more personal.",
        zh: "\u5b83\u7684\u754c\u9762\u66f4\u503e\u5411\u6c14\u6c1b\u548c\u966a\u4f34\uff0c\u800c\u4e0d\u662f\u5806\u53e0\u5bc6\u96c6\u63a7\u4ef6\u3002\u8fd9\u662f\u4e00\u4e2a\u5c0f\u5c1d\u8bd5\uff0c\u770b\u770b AI \u97f3\u4e50\u4ea7\u54c1\u80fd\u4e0d\u80fd\u66f4\u67d4\u548c\u4e00\u70b9\u3002",
      },
      detailBullets: [
        {
          en: "Explores an AI-assisted listening experience instead of a traditional player UI.",
          zh: "\u63a2\u7d22 AI \u8f85\u52a9\u7684\u542c\u97f3\u4f53\u9a8c\uff0c\u800c\u4e0d\u662f\u4f20\u7edf\u64ad\u653e\u5668\u754c\u9762\u3002",
        },
        {
          en: "Uses a calmer visual rhythm to support music discovery and companionship.",
          zh: "\u7528\u66f4\u5e73\u7f13\u7684\u89c6\u89c9\u8282\u594f\u6765\u627f\u6258\u97f3\u4e50\u53d1\u73b0\u4e0e\u966a\u4f34\u611f\u3002",
        },
        {
          en: "Already live on Vercel as an openly accessible experiment.",
          zh: "\u5df2\u5728 Vercel \u4e0a\u7ebf\uff0c\u4f5c\u4e3a\u4e00\u4e2a\u53ef\u4ee5\u76f4\u63a5\u8bbf\u95ee\u7684\u5b9e\u9a8c\u6027\u4ea7\u54c1\u3002",
        },
      ],
      tags: [
        { en: "AI companion", zh: "AI \u4f34\u4fa3" },
        { en: "Music", zh: "\u97f3\u4e50" },
        { en: "Live", zh: "\u5df2\u4e0a\u7ebf" },
      ],
      demoUrl: "https://long-fm.vercel.app/",
      githubUrl: "https://github.com/fxl625-bit/long-fm",
      statusTone: "live",
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

export const publicNav = [
  { href: "/", label: site.nav.home },
  { href: "/apps", label: site.nav.apps },
  { href: "/agents", label: site.nav.agents },
  { href: "/explorations", label: site.nav.explorations },
  { href: "/second-brain", label: { en: "Knowledge Base", zh: "知识库" } },
  { href: "/skills", label: site.nav.skills },
] as const;
