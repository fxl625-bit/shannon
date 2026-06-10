export type MapNode = {
  id: string;
  label: { en: string; zh: string };
  description: { en: string; zh: string };
};

export type MapGroup = {
  id: string;
  title: { en: string; zh: string };
  nodes: MapNode[];
};

export const potentialMap: MapGroup[] = [
  {
    id: "inputs",
    title: { en: "Human Inputs", zh: "人的输入" },
    nodes: [
      {
        id: "notes",
        label: { en: "Notes", zh: "笔记" },
        description: { en: "Daily observations and ideas", zh: "日常观察与想法" },
      },
      {
        id: "questions",
        label: { en: "Questions", zh: "问题" },
        description: { en: "Unresolved questions and curiosities", zh: "未解决的问题与好奇心" },
      },
      {
        id: "experiences",
        label: { en: "Experiences", zh: "经验" },
        description: { en: "Lived experiences and lessons", zh: "经历与教训" },
      },
      {
        id: "signals",
        label: { en: "Public Signals", zh: "公开信号" },
        description: { en: "Trends, news, and social signals", zh: "趋势、新闻与社交信号" },
      },
      {
        id: "fragments",
        label: { en: "Content Fragments", zh: "内容碎片" },
        description: { en: "Clips, quotes, and references", zh: "片段、引用与参考" },
      },
      {
        id: "memory",
        label: { en: "Personal Memory", zh: "个人记忆" },
        description: { en: "Context that shaped decisions", zh: "塑造决策的上下文" },
      },
    ],
  },
  {
    id: "systems",
    title: { en: "AI Systems", zh: "AI 系统" },
    nodes: [
      {
        id: "second-brain",
        label: { en: "Second Brain", zh: "第二大脑" },
        description: { en: "Structured knowledge repository", zh: "结构化知识库" },
      },
      {
        id: "knowledge-base",
        label: { en: "Knowledge Base", zh: "知识库" },
        description: { en: "Connected notes and references", zh: "关联笔记与参考" },
      },
      {
        id: "skills",
        label: { en: "Skills", zh: "技能" },
        description: { en: "Reusable AI workflows", zh: "可复用的 AI 工作流" },
      },
      {
        id: "agents",
        label: { en: "Agents", zh: "智能体" },
        description: { en: "Autonomous task executors", zh: "自主任务执行器" },
      },
      {
        id: "workflows",
        label: { en: "Workflows", zh: "工作流" },
        description: { en: "Multi-step processes", zh: "多步骤流程" },
      },
      {
        id: "rules",
        label: { en: "Rules", zh: "规则" },
        description: { en: "Constraints and guardrails", zh: "约束与护栏" },
      },
      {
        id: "retrieval",
        label: { en: "Retrieval", zh: "检索" },
        description: { en: "Context-aware search", zh: "上下文感知搜索" },
      },
    ],
  },
  {
    id: "outputs",
    title: { en: "Human Outputs", zh: "人的输出" },
    nodes: [
      {
        id: "narratives",
        label: { en: "Narratives", zh: "叙事" },
        description: { en: "Stories and insights", zh: "故事与洞察" },
      },
      {
        id: "reports",
        label: { en: "Reports", zh: "报告" },
        description: { en: "Structured analysis", zh: "结构化分析" },
      },
      {
        id: "apps",
        label: { en: "Apps", zh: "应用" },
        description: { en: "Functional tools", zh: "功能性工具" },
      },
      {
        id: "decisions",
        label: { en: "Decisions", zh: "决策" },
        description: { en: "Informed choices", zh: "知情选择" },
      },
      {
        id: "scripts",
        label: { en: "Scripts", zh: "脚本" },
        description: { en: "Automated processes", zh: "自动化流程" },
      },
      {
        id: "tools",
        label: { en: "Tools", zh: "工具" },
        description: { en: "Reusable instruments", zh: "可复用的工具" },
      },
    ],
  },
];

// Connections between groups (for SVG lines)
export type Connection = {
  from: string; // node id
  to: string;   // node id
};

export const connections: Connection[] = [
  // Inputs → Systems
  { from: "notes", to: "second-brain" },
  { from: "notes", to: "knowledge-base" },
  { from: "questions", to: "agents" },
  { from: "experiences", to: "skills" },
  { from: "signals", to: "retrieval" },
  { from: "signals", to: "agents" },
  { from: "fragments", to: "knowledge-base" },
  { from: "memory", to: "second-brain" },
  { from: "memory", to: "rules" },
  // Systems → Outputs
  { from: "second-brain", to: "narratives" },
  { from: "knowledge-base", to: "reports" },
  { from: "skills", to: "apps" },
  { from: "agents", to: "decisions" },
  { from: "workflows", to: "scripts" },
  { from: "rules", to: "tools" },
  { from: "retrieval", to: "reports" },
  { from: "retrieval", to: "narratives" },
];
