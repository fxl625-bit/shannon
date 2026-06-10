export type Experiment = {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  capability: { en: string; zh: string };
  status: { en: string; zh: string };
  accentColor: string;
};

export const experiments: Experiment[] = [
  {
    id: "public-opinion-agent",
    title: {
      en: "Public Opinion Agent",
      zh: "舆情 Agent",
    },
    description: {
      en: "Turning fragmented public signals into readable risk awareness.",
      zh: "将碎片化的公开信号转化为可读的风险感知。",
    },
    capability: {
      en: "Perception + Judgment",
      zh: "感知 + 判断",
    },
    status: {
      en: "Active experiment",
      zh: "进行中",
    },
    accentColor: "var(--cyan)",
  },
  {
    id: "second-brain-system",
    title: {
      en: "Second Brain System",
      zh: "第二大脑系统",
    },
    description: {
      en: "Transforming scattered notes and experiences into reusable AI context.",
      zh: "将零散笔记和经验转化为可复用的 AI 上下文。",
    },
    capability: {
      en: "Memory + Organization",
      zh: "记忆 + 组织",
    },
    status: {
      en: "Evolving",
      zh: "持续进化",
    },
    accentColor: "var(--violet)",
  },
  {
    id: "ai-content-workflow",
    title: {
      en: "AI Content Workflow",
      zh: "AI 内容工作流",
    },
    description: {
      en: "Turning inspiration, research, scripting and rewriting into a repeatable creative system.",
      zh: "将灵感、调研、撰稿和改写整合为可重复的创作系统。",
    },
    capability: {
      en: "Expression + Creativity",
      zh: "表达 + 创造",
    },
    status: {
      en: "In use",
      zh: "已投入使用",
    },
    accentColor: "var(--blue)",
  },
  {
    id: "family-health-app",
    title: {
      en: "Family Health App",
      zh: "家庭健康 App",
    },
    description: {
      en: "Helping ordinary families record and understand long-term health signals.",
      zh: "帮助普通家庭记录和理解长期健康信号。",
    },
    capability: {
      en: "Care + Awareness",
      zh: "关怀 + 感知",
    },
    status: {
      en: "Published on Google Play",
      zh: "已上架 Google Play",
    },
    accentColor: "var(--warm)",
  },
  {
    id: "math-detective",
    title: {
      en: "Math Detective",
      zh: "数学探案",
    },
    description: {
      en: "Helping children understand math problems through guided reasoning.",
      zh: "通过引导式推理帮助孩子理解数学问题。",
    },
    capability: {
      en: "Learning + Reasoning",
      zh: "学习 + 推理",
    },
    status: {
      en: "Prototype",
      zh: "原型阶段",
    },
    accentColor: "var(--green)",
  },
];
