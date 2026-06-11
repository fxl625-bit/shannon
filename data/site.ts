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
    cases: { en: "Cases", zh: "\u6848\u4f8b" },
    skills: { en: "Workflows", zh: "\u5de5\u4f5c\u6d41" },
    apps: { en: "Apps", zh: "\u5e94\u7528" },
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
      name: { en: "\u4e00\u4e16\u5706\u6ee1", zh: "\u4e00\u4e16\u5706\u6ee1" },
      typeLabel: { en: "Health Record App", zh: "\u5065\u5eb7\u8bb0\u5f55 App" },
      summary: {
        en: "A local-first family health recording app, now published on Google Play.",
        zh: "\u4e00\u6b3e\u672c\u5730\u4f18\u5148\u7684\u5bb6\u5ead\u5065\u5eb7\u8bb0\u5f55\u5e94\u7528\uff0c\u5df2\u4e0a\u67b6 Google Play\u3002",
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
