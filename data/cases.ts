import type { Locale, Localized } from "./site";

export type CaseMetric = {
  label: Localized;
  value: Localized;
};

export type ListItem = Localized<string[]>;

export type CaseData = {
  slug: string;
  number: string;
  title: Localized;
  heroSubtitle: Localized;
  heroImage: string;
  metrics: CaseMetric[];
  valueStatement: Localized;
  before: ListItem;
  after: ListItem;
  agent: {
    name: Localized;
    role: Localized;
    avatar: string;
    tags: Localized<string[]>;
    jobTitle: Localized;
    oneLiner: Localized;
    habits: ListItem;
    boundaries: ListItem;
    quote: Localized;
  };
  workflow: {
    sectionSub: Localized;
    steps: Localized<string[]>;
  };
  result: {
    sectionSub: Localized;
    image: string;
    input: Localized;
    process: Localized;
    output: Localized;
    assets: Localized<string[]>;
  };
  rule: {
    path: string;
    codeLines: { line: string; text: string; classes?: string }[];
    tags: string[];
  };
};

export const cases: CaseData[] = [
  {
    slug: "leadership-brain",
    number: "01",
    title: { en: "Leadership Second Brain", zh: "领导第二大脑 Agent" },
    heroSubtitle: {
      en: "Turning leadership judgment habits, historical expressions, and Q&A standards into reusable workflows.",
      zh: "把领导判断习惯、历史表达和答问口径沉淀成可复用工作流。",
    },
    heroImage: "assets/images/gpt-hero-leader-style-qa-agent.png",
    metrics: [
      { label: { en: "Scenario", zh: "场景" }, value: { en: "Leadership Q&A", zh: "领导答问" } },
      { label: { en: "Core Action", zh: "核心动作" }, value: { en: "Style Matching", zh: "风格拟合" } },
      { label: { en: "Result", zh: "结果" }, value: { en: "Q&A Draft", zh: "答问草稿" } },
      { label: { en: "Asset", zh: "资产" }, value: { en: "Expression Sample Library", zh: "表达样本库" } },
    ],
    valueStatement: {
      en: "This case solves the problem of leadership expression experience being non-replicable — turning ad-hoc tone guessing into Q&A generation based on historical materials.",
      zh: "这个案例真正解决的是 leadership expression experience being non-replicable 的问题，把临时揣摩口吻改成基于历史材料和表达习惯的答问生成。",
    },
    before: {
      en: ["Manual document search", "Mimicking tone from memory", "Repeated judgment order edits", "Experience hard to hand over"],
      zh: ["靠人翻材料", "靠记忆学口吻", "反复改判断顺序", "经验难交接"],
    },
    after: {
      en: ["Classify question type", "Retrieve historical expressions", "Match speaking habits", "Output Q&A draft"],
      zh: ["识别问题类型", "检索历史表达", "匹配说话习惯", "输出答问草稿"],
    },
    agent: {
      name: { en: "Leadership Second Brain", zh: "领导第二大脑" },
      role: { en: "Leadership Brain 01", zh: "领导大脑 01" },
      avatar: "assets/images/avatar-cn-leader-style-qa-agent.svg",
      tags: { en: ["Expression Matching", "Question Classification", "Tone Generation"], zh: ["表达拟合", "问题分类", "口径生成"] },
      jobTitle: { en: "Role: Q&A Advisor", zh: "岗位：答问参谋" },
      oneLiner: { en: "Turns leadership historical expressions and judgment habits into Q&A drafts.", zh: "把领导历史表达和判断习惯转成答问草稿。" },
      habits: { en: ["First: can the question be answered?", "Second: is there historical basis?", "Last: does it sound like the person?"], zh: ["先看问题能不能答", "再看有没有历史依据", "最后看表达像不像本人"] },
      boundaries: { en: ["Don't fabricate factual basis", "Don't make decisions for leaders", "External statements must be confirmed"], zh: ["不编造事实依据", "不替负责人拍板", "对外口径必须确认"] },
      quote: { en: "Not a speechwriter - an external cache for leadership expression experience.", zh: "不是写稿机器，是领导表达经验的外部缓存。" },
    },
    workflow: {
      sectionSub: { en: "Style Matching to Q&A Draft", zh: "风格拟合 -> 答问草稿" },
      steps: { en: ["Question Input", "Classify Type", "Retrieve History", "Match Habits", "Generate Draft", "Confirm Tone"], zh: ["问题输入", "判断问题类型", "检索历史表达", "匹配表达习惯", "生成答问草稿", "确认口径"] },
    },
    result: {
      sectionSub: { en: "Leadership Q&A Workbench", zh: "领导答问工作台" },
      image: "assets/images/poster-01-leadership-brain.png",
      input: { en: "How would the leader best organize the response to this interview question?", zh: "这个采访问题如果让领导来答，怎么组织更稳？" },
      process: { en: "Classify question type, match historical expressions and common judgment sequences.", zh: "先分辨问题类型，再匹配历史表达和常用判断顺序。" },
      output: { en: "A Q&A draft close to the leader's style, with factual points marked for confirmation.", zh: "一版接近领导表达习惯的答问草稿，并标出需要确认的事实点。" },
      assets: { en: ["Expression Sample Library", "Question Classification Table", "Q&A Structure Library"], zh: ["表达样本库", "问题分类表", "答问结构库"] },
    },
    rule: {
      path: ".ai/agents/leadership-brain/agent.md",
      codeLines: [
        { line: "01", text: "---" },
        { line: "02", text: "name: leadership-brain", classes: "token-key" },
        { line: "03", text: "role: leadership brain Q&A advisor", classes: "token-key" },
        { line: "04", text: "entry: answer_with_leader_style", classes: "token-key" },
        { line: "05", text: "---" },
        { line: "06", text: "" },
        { line: "07", text: "<workflow>" },
        { line: "08", text: "1. classify_question(input)" },
        { line: "09", text: "2. retrieve_history_samples(question_type)" },
        { line: "10", text: "3. extract_judgement_order(samples)" },
        { line: "11", text: '4. draft_answer(style="leader_like")' },
        { line: "12", text: "5. mark_review_points()" },
        { line: "13", text: "</workflow>" },
        { line: "14", text: "" },
        { line: "15", text: "<guardrails>" },
        { line: "16", text: "- Do not impersonate the leader's exact words" },
        { line: "17", text: "- Do not fabricate non-existent historical views" },
      ],
      tags: ["agent.md", "workflow", "guardrails"],
    },
  },
  {
    slug: "feishu-mobile-dev",
    number: "02",
    title: { en: "Feishu-Codex-Claude Mobile Dev", zh: "飞书-Codex-Claude 移动开发 Agent" },
    heroSubtitle: {
      en: "Turning phone messages into a controlled entry point for local Codex / Claude.",
      zh: "把手机消息变成本地 Codex / Claude 的受控开发入口。",
    },
    heroImage: "assets/images/gpt-hero-feishu-codex-claude-mobile-dev-agent.png",
    metrics: [
      { label: { en: "Scenario", zh: "场景" }, value: { en: "Mobile Dev", zh: "移动开发" } },
      { label: { en: "Core Action", zh: "核心动作" }, value: { en: "Remote Dispatch", zh: "远程调度" } },
      { label: { en: "Result", zh: "结果" }, value: { en: "Summary Return", zh: "摘要回传" } },
      { label: { en: "Asset", zh: "资产" }, value: { en: "Session Logs", zh: "会话日志" } },
    ],
    valueStatement: {
      en: "This case solves being unable to push development away from the computer - turning phone messages into a controlled entry point for local Codex/Claude.",
      zh: "这个案例真正解决的是离开电脑就无法推进开发的问题，把手机消息变成本地 Codex / Claude 的受控入口。",
    },
    before: {
      en: ["Can't check code remotely", "Remote commands lack context", "Unclear execution boundaries", "Scattered logs"],
      zh: ["离开电脑无法查代码", "远程指令缺少上下文", "执行边界不清", "日志散落"],
    },
    after: {
      en: ["Receive commands via Feishu", "Whitelist pre-auth", "Read/write task routing", "Summary returned to chat"],
      zh: ["飞书接收指令", "白名单先验权", "读写任务分流", "结果摘要回传"],
    },
    agent: {
      name: { en: "Feishu-Codex-Claude Mobile Dev", zh: "飞书-Codex-Claude 移动开发" },
      role: { en: "Mobile Dispatch 02", zh: "移动调度 02" },
      avatar: "assets/images/avatar-cn-feishu-codex-claude-mobile-dev-agent.svg",
      tags: { en: ["Auth Check", "Task Routing", "Log Archive"], zh: ["权限校验", "任务分流", "日志归档"] },
      jobTitle: { en: "Role: Dev Dispatcher", zh: "岗位：开发调度员" },
      oneLiner: { en: "Routes Feishu messages into controlled dev tasks for local Codex / Claude.", zh: "把飞书消息转成本地 Codex / Claude 的受控开发任务。" },
      habits: { en: ["First: verify sender", "Then: route /ask vs /run", "Last: confirm workspace"], zh: ["先验发起人", "再分 /ask 与 /run", "最后确认工作区"] },
      boundaries: { en: ["Never bypass whitelist", "Confirm before writes", "Sensitive logs stay local"], zh: ["不绕过白名单", "写入前先确认", "敏感日志不外发"] },
      quote: { en: "Not a chatbot - a remote dev console with brakes.", zh: "不是聊天机器人，是带刹车的远程开发调度台。" },
    },
    workflow: {
      sectionSub: { en: "Remote Dispatch to Summary Return", zh: "远程调度 -> 摘要回传" },
      steps: { en: ["Feishu Command", "Whitelist Check", "/ask or /run Route", "Locate Workspace", "Call Codex/Claude", "Summary to Feishu"], zh: ["飞书指令", "白名单校验", "/ask 或 /run 分流", "定位本地工作区", "调用 Codex / Claude", "摘要回传飞书"] },
    },
    result: {
      sectionSub: { en: "Feishu Remote Dev Console", zh: "飞书远程开发调度台" },
      image: "assets/images/poster-02-feishu-dev.png",
      input: { en: "/ask why is the sync button stuck spinning?", zh: "/ask 看一下同步按钮为什么一直转圈。" },
      process: { en: "Verify sender, determine read-only investigation, locate source workspace, invoke local model session.", zh: "校验发起人，判断只读排查，定位源码工作区，调用本地模型会话。" },
      output: { en: "Returns issue diagnosis summary, risk notes, and suggested next steps.", zh: "返回问题定位摘要、风险提示和下一步处理建议。" },
      assets: { en: ["Whitelist Config", "Command Router", "Session Logs"], zh: ["白名单配置", "命令路由", "会话日志"] },
    },
    rule: {
      path: "agents/feishu-dev-dispatcher/config.yaml",
      codeLines: [
        { line: "01", text: "agent: feishu-dev-dispatcher", classes: "token-key" },
        { line: "02", text: "entrypoint: lark_message_handler", classes: "token-key" },
        { line: "03", text: "" },
        { line: "04", text: "commands:", classes: "token-key" },
        { line: "05", text: "  /ask:" },
        { line: "06", text: "    mode: readonly", classes: "token-key" },
        { line: "07", text: "    tools: [codex, claude]", classes: "token-key" },
        { line: "08", text: "  /run:" },
        { line: "09", text: "    mode: write", classes: "token-key" },
        { line: "10", text: "    require_confirm: true", classes: "token-key" },
        { line: "11", text: "" },
        { line: "12", text: "guards:", classes: "token-key" },
        { line: "13", text: "  allow_users: ${FEISHU_ALLOWLIST}", classes: "token-key" },
        { line: "14", text: "  workspace: ${CODEX_ROOT}", classes: "token-key" },
        { line: "15", text: "  deny_paths:", classes: "token-key" },
        { line: "16", text: "    - dist/" },
        { line: "17", text: "    - node_modules/" },
        { line: "18", text: "    - runtime/" },
      ],
      tags: ["config.yaml", "commands", "guards"],
    },
  },
  {
    slug: "content-ops",
    number: "03",
    title: { en: "Content Operations Agent", zh: "内容运营 Agent" },
    heroSubtitle: {
      en: "Stringing topic planning, deconstruction, rewriting, scoring, and review into a content production line.",
      zh: "把选题、拆解、改写、评分和复盘串成内容生产线。",
    },
    heroImage: "assets/images/gpt-hero-content-ops-agent.png",
    metrics: [
      { label: { en: "Scenario", zh: "场景" }, value: { en: "Content Production", zh: "内容生产" } },
      { label: { en: "Core Action", zh: "核心动作" }, value: { en: "Topic Deconstruction", zh: "选题拆解" } },
      { label: { en: "Result", zh: "结果" }, value: { en: "Multi-Platform Content", zh: "多平台稿件" } },
      { label: { en: "Asset", zh: "资产" }, value: { en: "Sample Library", zh: "样本库" } },
    ],
    valueStatement: {
      en: "This case solves content production relying on inspiration - turning topic planning, deconstruction, rewriting, and review into a content pipeline.",
      zh: "这个案例真正解决的是内容生产靠灵感、不稳定的问题，把选题、拆解、改写、复盘做成一条内容流水线。",
    },
    before: {
      en: ["Topics chosen on impulse", "Platform differences memorized", "Viral hits only surface-copied", "No review accumulation"],
      zh: ["选题靠临时想", "平台差异靠人记", "爆款只学表面", "复盘没有沉淀"],
    },
    after: {
      en: ["Start with content PRD", "Deconstruct competitors & hits", "Three platforms, separate output", "Sample library continuous review"],
      zh: ["先做内容 PRD", "拆竞品和爆款", "三平台分别产出", "样本库持续复盘"],
    },
    agent: {
      name: { en: "Content Operations", zh: "内容运营" },
      role: { en: "Content Editor 03", zh: "内容主编 03" },
      avatar: "assets/images/avatar-cn-content-ops-agent.svg",
      tags: { en: ["Topic Deconstruction", "Platform Rewriting", "Quality Scoring"], zh: ["选题拆解", "平台改写", "质量评分"] },
      jobTitle: { en: "Role: Content Editor-in-Chief", zh: "岗位：内容生产主编" },
      oneLiner: { en: "Orchestrates brand materials, competitor samples, and platform requirements into a content production line.", zh: "把品牌资料、竞品样本和平台要求编排成内容生产线。" },
      habits: { en: ["First: who is this for?", "Then: are the materials real?", "Last: log into sample library for review"], zh: ["先问内容给谁看", "再看素材是否真实", "最后进样本库复盘"] },
      boundaries: { en: ["Don't fabricate client cases", "Don't copy viral hits directly", "Low-score content doesn't ship"], zh: ["不编客户案例", "不照搬爆款", "低分内容不发布"] },
      quote: { en: "Not a copywriter - a content editor who reads samples and enforces quality gates.", zh: "不是文案机器，是会看样本和卡质量门的内容主编。" },
    },
    workflow: {
      sectionSub: { en: "Topic Deconstruction to Multi-Platform Content", zh: "选题拆解 -> 多平台稿件" },
      steps: { en: ["Brand Materials", "Competitor Analysis", "Content Calendar", "Platform Rewriting", "Quality Scoring", "Sample Library Review"], zh: ["品牌资料", "竞品拆解", "选题日历", "平台改写", "质量评分", "样本库复盘"] },
    },
    result: {
      sectionSub: { en: "Content Production Line Dashboard", zh: "内容生产线看板" },
      image: "assets/images/poster-03-content-ops.png",
      input: { en: "Break down this viral video structure and adapt it for a B2B brand.", zh: "把这个爆款视频结构拆出来，改成适合 B 端品牌的内容。" },
      process: { en: "Deconstruct hooks, information density, emotional curves, and platform expressions, then fill with brand facts.", zh: "拆钩子、信息密度、情绪曲线和平台表达，再套入品牌事实。" },
      output: { en: "Outputs content calendar, short-video scripts, article drafts, and review samples.", zh: "输出选题日历、短视频脚本、图文稿和复盘样本。" },
      assets: { en: ["Content Calendar", "Viral Deconstruction Framework", "Sample Library"], zh: ["选题日历", "爆款拆解框架", "正负样本库"] },
    },
    rule: {
      path: ".claude/skills/content-ops/SKILL.md",
      codeLines: [
        { line: "01", text: "---" },
        { line: "02", text: "name: content-ops", classes: "token-key" },
        { line: "03", text: "description: competitor analysis, content calendar, 3-platform production", classes: "token-key" },
        { line: "04", text: "---" },
        { line: "05", text: "" },
        { line: "06", text: "## Trigger", classes: "token-comment" },
        { line: "07", text: "- account operations" },
        { line: "08", text: "- viral content deconstruction" },
        { line: "09", text: "- Xiaohongshu / Douyin / WeChat rewrite" },
        { line: "10", text: "" },
        { line: "11", text: "## Pipeline", classes: "token-comment" },
        { line: "12", text: "1. read_brand_profile()" },
        { line: "13", text: "2. analyze_competitor_samples()" },
        { line: "14", text: "3. create_content_prd()" },
        { line: "15", text: "4. generate_platform_versions()" },
        { line: "16", text: "5. score(collect_value, spread_value)" },
        { line: "17", text: "6. write_back_to_sample_library()" },
      ],
      tags: ["SKILL.md", "Pipeline", "Reject"],
    },
  },
  {
    slug: "weekly-report",
    number: "04",
    title: { en: "Weekly Report Agent", zh: "周报 Agent" },
    heroSubtitle: {
      en: "Auto-organizing task records into Excel weekly reports and email drafts.",
      zh: "把任务记录自动整理成 Excel 周报和邮件草稿。",
    },
    heroImage: "assets/images/gpt-hero-weekly-report-agent.png",
    metrics: [
      { label: { en: "Scenario", zh: "场景" }, value: { en: "Weekly Summary", zh: "周报汇总" } },
      { label: { en: "Core Action", zh: "核心动作" }, value: { en: "Auto Classification", zh: "自动分类" } },
      { label: { en: "Result", zh: "结果" }, value: { en: "Email Draft", zh: "邮件草稿" } },
      { label: { en: "Asset", zh: "资产" }, value: { en: "Excel Template", zh: "Excel 模板" } },
    ],
    valueStatement: {
      en: "This case solves manually assembling weekly reports on Friday - turning task records into structured Excel reports and email drafts.",
      zh: "这个案例真正解决的是周报靠周五手工拼的问题，把任务记录自动整理成 Excel 周报和邮件草稿。",
    },
    before: {
      en: ["Manually scanning tasks", "Classification from memory", "Excel items easily missed", "Email as separate process"],
      zh: ["手工翻任务", "分类靠记忆", "Excel 容易漏项", "邮件另起流程"],
    },
    after: {
      en: ["CSV import", "Task cleaning", "Module classification", "Confirm then send"],
      zh: ["CSV 导入", "任务清洗", "模块分类", "确认后发送"],
    },
    agent: {
      name: { en: "Weekly Report", zh: "周报" },
      role: { en: "Weekly Report 04", zh: "周报整理 04" },
      avatar: "assets/images/avatar-cn-weekly-report-agent.svg",
      tags: { en: ["Task Cleaning", "Module Classification", "Email Assembly"], zh: ["任务清洗", "模块分类", "邮件整理"] },
      jobTitle: { en: "Role: Report Organizer", zh: "岗位：周报整理官" },
      oneLiner: { en: "Turns task streams into Excel reports, screenshot summaries, and email drafts.", zh: "把任务流水整理成 Excel 周报、截图摘要和邮件草稿。" },
      habits: { en: ["First: exclude non-work items", "Then: classify by module", "Last: pause for confirmation before sending"], zh: ["先排除非工作项", "再按模块归类", "发送前停下来确认"] },
      boundaries: { en: ["Never send silently", "Don't overwrite templates", "Skip personal reminders"], zh: ["不静默发邮件", "不覆盖模板", "不处理个人提醒"] },
      quote: { en: "Not a ghostwriter - a review secretary that preserves the paper trail.", zh: "不是代写周报，是会保留痕迹的复盘秘书。" },
    },
    workflow: {
      sectionSub: { en: "Auto Classification to Email Draft", zh: "自动分类 -> 邮件草稿" },
      steps: { en: ["CSV Import", "Task Cleaning", "Module Classification", "Write to Excel", "Generate Screenshot", "Email Confirm & Send"], zh: ["CSV 导入", "任务清洗", "模块分类", "写入 Excel", "生成截图", "邮件确认发送"] },
    },
    result: {
      sectionSub: { en: "CSV to Excel Weekly Report", zh: "CSV 到 Excel 周报" },
      image: "assets/images/poster-04-weekly-report.png",
      input: { en: "Use this week's task CSV to generate the brand weekly report, confirm then send via company email.", zh: "用本周任务 CSV 生成品牌周报，确认后发企业邮箱。" },
      process: { en: "Read task status and Content fields, filter personal items, write to template by module.", zh: "读取任务状态和 Content 字段，过滤个人项，按模块写入模板。" },
      output: { en: "Generates Excel report, screenshot preview, and email body draft.", zh: "生成 Excel 周报、截图摘要和邮件正文草稿。" },
      assets: { en: ["Excel Template", "Classification Rules", "Email Draft"], zh: ["Excel 模板", "分类规则", "邮件草稿"] },
    },
    rule: {
      path: "skills/weekly-report/build_weekly_report.py",
      codeLines: [
        { line: "01", text: 'REPORT_COLUMNS = ["this_week_done", "next_week_plan"]' },
        { line: "02", text: "MODULES = [" },
        { line: "03", text: '    "brand_communication", "content_ops",' },
        { line: "04", text: '    "opinion_monitoring", "project_collab",' },
        { line: "05", text: '    "material_support", "ad_hoc"' },
        { line: "06", text: "]" },
        { line: "07", text: "" },
        { line: "08", text: "def build_weekly_report(csv_path, template_path):" },
        { line: "09", text: "    rows = read_dida_csv(csv_path)" },
        { line: "10", text: "    tasks = filter_work_items(rows)" },
        { line: "11", text: "    grouped = classify_by_module(tasks, MODULES)" },
        { line: "12", text: "    workbook = write_excel_template(template_path, grouped)" },
        { line: "13", text: '    preview = export_range_image(workbook, "I9:J14")' },
        { line: "14", text: "    mail = build_mail_draft(workbook, preview)" },
        { line: "15", text: "    return workbook, preview, mail" },
      ],
      tags: ["Python", "Excel", "Email"],
    },
  },
  {
    slug: "globalization",
    number: "05",
    title: { en: "Video / Text Globalization Agent", zh: "视频 / 文本全球化 Agent" },
    heroSubtitle: {
      en: "Putting subtitles, documents, terminology, and format checks into a single globalization pipeline.",
      zh: "把字幕、文档、术语和格式校验放进同一套全球化流程。",
    },
    heroImage: "assets/images/gpt-hero-video-text-globalization-agent.png",
    metrics: [
      { label: { en: "Scenario", zh: "场景" }, value: { en: "Content Globalization", zh: "内容全球化" } },
      { label: { en: "Core Action", zh: "核心动作" }, value: { en: "Terminology Check", zh: "术语校验" } },
      { label: { en: "Result", zh: "结果" }, value: { en: "English Draft", zh: "英文稿件" } },
      { label: { en: "Asset", zh: "资产" }, value: { en: "Termbase", zh: "术语表" } },
    ],
    valueStatement: {
      en: "This case solves scattered translation and inconsistent terminology - putting video subtitles and enterprise documents into the same terminology validation pipeline.",
      zh: "这个案例真正解决的是翻译分散、术语不一致的问题，把视频字幕和企业文档放进同一套术语校验流程。",
    },
    before: {
      en: ["Video & docs translated separately", "Inconsistent terminology", "Manual format checks", "Arbitrary proper noun translations"],
      zh: ["视频文档分开翻", "术语前后不一致", "格式靠人工检查", "专名容易自造"],
    },
    after: {
      en: ["Extract terminology", "Unify expressions", "Preserve formatting", "Confirm before publishing"],
      zh: ["抽取术语", "统一表达", "保留格式", "发布前确认"],
    },
    agent: {
      name: { en: "Video / Text Globalization", zh: "视频 / 文本全球化" },
      role: { en: "Globalization Proofreader 05", zh: "全球化校对 05" },
      avatar: "assets/images/avatar-cn-video-text-globalization-agent.svg",
      tags: { en: ["Term Extraction", "Format Preservation", "Readback Validation"], zh: ["术语抽取", "格式保留", "读回校验"] },
      jobTitle: { en: "Role: Globalization Proofreader", zh: "岗位：全球化校对官" },
      oneLiner: { en: "Makes subtitles and enterprise documents share terminology, fact, and format validation standards.", zh: "让字幕和企业文档共用术语、事实和格式校验标准。" },
      habits: { en: ["First: find existing English references", "Then: lock proper nouns", "Last: check formatting"], zh: ["先找既有英文参考", "再锁定专有名词", "最后检查格式"] },
      boundaries: { en: ["Don't alter numbers/facts", "Don't invent official English names", "Must review before publishing"], zh: ["不改数字事实", "不创造官方英文名", "发布前必须复核"] },
      quote: { en: "Not a translation machine - a globalization proofreader watching terminology and format.", zh: "不是翻译机，是盯术语和格式的全球化校对官。" },
    },
    workflow: {
      sectionSub: { en: "Terminology Check to English Draft", zh: "术语校验 -> 英文稿件" },
      steps: { en: ["Input Video/Doc", "Extract Terms", "Translate & Rewrite", "Preserve Format", "Readback Check", "Confirm Publish"], zh: ["输入视频/文档", "抽取术语", "翻译改写", "格式保留", "读回校验", "发布前确认"] },
    },
    result: {
      sectionSub: { en: "Video Subtitle + Document Dual Pipeline", zh: "视频字幕 + 文档全球化双线流程" },
      image: "assets/images/poster-05-globalization.png",
      input: { en: "Make an English version of this Chinese company profile, and unify subtitle terminology.", zh: "把这份中文企业简介做英文版，同时统一视频字幕术语。" },
      process: { en: "Extract termbase, cross-reference existing English materials, translate then readback-check formatting.", zh: "抽取术语表，对照既有英文资料，翻译后读回检查格式。" },
      output: { en: "Outputs English document draft, termbase, and pending proper noun list.", zh: "输出英文文档草稿、术语表和待确认专名清单。" },
      assets: { en: ["Termbase", "Subtitle Rules", "Readback Records"], zh: ["术语表", "字幕规则", "读回记录"] },
    },
    rule: {
      path: "skills/globalization/rules.yaml",
      codeLines: [
        { line: "01", text: "skill: globalization", classes: "token-key" },
        { line: "02", text: "inputs:", classes: "token-key" },
        { line: "03", text: "  - video_subtitle" },
        { line: "04", text: "  - docx_document" },
        { line: "05", text: "  - termbase" },
        { line: "06", text: "" },
        { line: "07", text: "rules:", classes: "token-key" },
        { line: "08", text: "  keep_unchanged:", classes: "token-key" },
        { line: "09", text: "    - numbers" },
        { line: "10", text: "    - product_names" },
        { line: "11", text: "    - dates" },
        { line: "12", text: "    - legal_entities" },
        { line: "13", text: "" },
        { line: "14", text: "checks:", classes: "token-key" },
        { line: "15", text: "  - terminology_consistency" },
        { line: "16", text: "  - subtitle_timeline" },
        { line: "17", text: "  - docx_structure" },
        { line: "18", text: "  - readback_validation" },
      ],
      tags: ["rules.yaml", "checks", "confirm"],
    },
  },
  {
    slug: "docx-form-fill",
    number: "06",
    title: { en: "Document Form Fill Agent", zh: "文档表单填充 Agent" },
    heroSubtitle: {
      en: "Breaking Word forms into fields, sources, and missing items for draft output.",
      zh: "把 Word 表单拆成字段、来源、缺失项和草稿输出。",
    },
    heroImage: "assets/images/gpt-hero-docx-form-fill-agent.png",
    metrics: [
      { label: { en: "Scenario", zh: "场景" }, value: { en: "Form Filling", zh: "表单填报" } },
      { label: { en: "Core Action", zh: "核心动作" }, value: { en: "Field Matching", zh: "字段匹配" } },
      { label: { en: "Result", zh: "结果" }, value: { en: "Word Draft", zh: "Word 草稿" } },
      { label: { en: "Asset", zh: "资产" }, value: { en: "Field Dictionary", zh: "字段字典" } },
    ],
    valueStatement: {
      en: "This case solves repetitive form filling with fragile formatting - breaking Word forms into fields, sources, and missing items.",
      zh: "这个案例真正解决的是重复填表、格式易坏的问题，把 Word 表单拆成字段、来源和缺失项三部分处理。",
    },
    before: {
      en: ["Repeatedly copying company info", "Table formatting easily broken", "Unclear field sources", "Missing items found last"],
      zh: ["反复复制公司信息", "表格格式易坏", "字段来源不清", "缺项最后才发现"],
    },
    after: {
      en: ["Read template", "Identify fields", "Match materials", "Output missing-items list"],
      zh: ["读取模板", "识别字段", "匹配资料", "输出缺项清单"],
    },
    agent: {
      name: { en: "Document Form Fill", zh: "文档表单填充" },
      role: { en: "Form Manager 06", zh: "表单管家 06" },
      avatar: "assets/images/avatar-cn-docx-form-fill-agent.svg",
      tags: { en: ["Field Recognition", "Material Matching", "Format Preservation"], zh: ["字段识别", "资料匹配", "格式保留"] },
      jobTitle: { en: "Role: Form Filling Officer", zh: "岗位：表单填报官" },
      oneLiner: { en: "Decomposes fixed-format Word forms into fields, sources, and pending confirmation checklists.", zh: "把固定格式 Word 表单拆成字段、来源和待确认清单。" },
      habits: { en: ["First: protect template structure", "Then: trace field sources", "Last: list missing items"], zh: ["先保模板结构", "再看字段来源", "最后列缺失项"] },
      boundaries: { en: ["Don't fabricate facts", "Don't overwrite templates", "Key fields must be confirmed"], zh: ["不编造事实", "不覆盖模板", "关键字段必须确认"] },
      quote: { en: "Not a Word editor - a field manager that flags gaps.", zh: "不是 Word 编辑器，是会标缺口的字段管理员。" },
    },
    workflow: {
      sectionSub: { en: "Field Matching to Word Draft", zh: "字段匹配 -> Word 草稿" },
      steps: { en: ["Read Template", "Identify Fields", "Match Materials", "Fill Table", "Mark Missing", "Output Word Draft"], zh: ["读取模板", "识别字段", "匹配资料", "填入表格", "标出缺失项", "输出 Word 草稿"] },
    },
    result: {
      sectionSub: { en: "Word Form Field Workbench", zh: "Word 表单字段化工作台" },
      image: "assets/images/poster-06-docx-form.png",
      input: { en: "Fill this application template with existing materials, mark what is missing.", zh: "按这个申报表模板，先用已有材料填一版，缺的标出来。" },
      process: { en: "Identify table fields, build field dictionary, fill content by source while preserving formatting.", zh: "识别表格字段，建立字段字典，按来源填入内容并保护格式。" },
      output: { en: "Outputs filled Word draft, missing-items checklist, and fields pending confirmation.", zh: "输出 Word 填报草稿、缺失项清单和待确认字段。" },
      assets: { en: ["Field Dictionary", "Source Checklist", "Missing Items Table"], zh: ["字段字典", "来源清单", "缺失项表"] },
    },
    rule: {
      path: "skills/docx-form-fill/fill_form.py",
      codeLines: [
        { line: "01", text: "def fill_docx_form(template, field_dict):" },
        { line: "02", text: "    doc = load_docx(template)" },
        { line: "03", text: "    fields = scan_table_fields(doc)" },
        { line: "04", text: "" },
        { line: "05", text: "    for field in fields:" },
        { line: "06", text: "        value = field_dict.get(field.name)" },
        { line: "07", text: "        if value:" },
        { line: "08", text: "            write_cell(field.cell, value, keep_style=True)" },
        { line: "09", text: "        else:", classes: "token-key" },
        { line: "10", text: '            mark_pending(field.cell, "pending")' },
        { line: "11", text: "" },
        { line: "12", text: "    return save_as_draft(doc)" },
      ],
      tags: ["Python", "DOCX", "pending"],
    },
  },
  {
    slug: "public-opinion",
    number: "07",
    title: { en: "Public Opinion / Complaint Agent", zh: "舆情处置 / 举报 Agent" },
    heroSubtitle: {
      en: "Organizing spread trails, fact-checking, and disposition materials into evidence chains.",
      zh: "把传播线索、事实核查和处置材料整理成证据链。",
    },
    heroImage: "assets/images/gpt-hero-public-opinion-complaint-agent.png",
    metrics: [
      { label: { en: "Scenario", zh: "场景" }, value: { en: "Public Opinion", zh: "舆情处置" } },
      { label: { en: "Core Action", zh: "核心动作" }, value: { en: "Fact Checking", zh: "事实核查" } },
      { label: { en: "Result", zh: "结果" }, value: { en: "Disposition Materials", zh: "处置材料" } },
      { label: { en: "Asset", zh: "资产" }, value: { en: "Material Templates", zh: "材料模板" } },
    ],
    valueStatement: {
      en: "This case solves panic first, gather evidence later - restructuring the process to find spread trails first, then verify facts, then generate materials.",
      zh: "这个案例真正解决的是舆情来了先慌、证据后补的问题，把处置过程改成先找传播链、再核查事实、最后生成材料。",
    },
    before: {
      en: ["Emotional first response", "Incomplete spread trails", "Facts & opinions mixed", "Attachments added last-minute"],
      zh: ["先凭情绪回应", "传播线索不完整", "事实观点混在一起", "附件临时补"],
    },
    after: {
      en: ["Search spread trails", "Extract disputed claims", "Verify facts", "Generate disposition materials"],
      zh: ["搜传播线索", "抽争议表述", "核查事实", "生成处置材料"],
    },
    agent: {
      name: { en: "Public Opinion / Complaint", zh: "舆情处置 / 举报" },
      role: { en: "Public Opinion Sentinel 07", zh: "舆情哨兵 07" },
      avatar: "assets/images/avatar-cn-public-opinion-complaint-agent.svg",
      tags: { en: ["Trail Search", "Fact Checking", "Material Assembly"], zh: ["线索搜索", "事实核查", "材料整理"] },
      jobTitle: { en: "Role: Public Opinion Analyst", zh: "岗位：舆情分析员" },
      oneLiner: { en: "Finds evidence first in the information flow, then verifies facts, finally assembles disposition materials.", zh: "在信息流里先找证据，再核查事实，最后整理处置材料。" },
      habits: { en: ["First: separate facts from opinions", "Then: check public sources", "Last: list pending attachments"], zh: ["先区分事实与观点", "再看公开依据", "最后列待补附件"] },
      boundaries: { en: ["No aggressive language", "Don't fabricate illegal acts", "Never auto-submit"], zh: ["不写攻击性措辞", "不编造违法事实", "不自动提交"] },
      quote: { en: "Not an anger proxy - a sentinel who lays out the evidence first.", zh: "不是替人发火，是先把证据摆齐的舆情哨兵。" },
    },
    workflow: {
      sectionSub: { en: "Fact Checking to Disposition Materials", zh: "事实核查 -> 处置材料" },
      steps: { en: ["Input Links/Screenshots", "Search Spread Trails", "Extract Disputed Claims", "Verify Facts", "Map Platform Rules", "Generate Materials"], zh: ["输入链接/截图", "搜传播线索", "抽争议表述", "核查事实", "匹配平台规则", "生成处置材料"] },
    },
    result: {
      sectionSub: { en: "Public Opinion Evidence Dashboard", zh: "舆情证据处置看板" },
      image: "assets/images/poster-07-public-opinion.png",
      input: { en: "This article's claims are inaccurate - help me organize disposition materials.", zh: "这篇文章说法不准，帮我整理处置材料。" },
      process: { en: "Extract disputed sentences, check spread scope, separate factual errors from subjective comments.", zh: "提取争议句，查传播范围，区分事实错误和主观评论。" },
      output: { en: "Produces spread trail table, fact-checking table, and disposition material draft.", zh: "形成传播线索表、事实核查表和处置材料草稿。" },
      assets: { en: ["Spread Trail Table", "Fact Check Table", "Material Templates"], zh: ["传播线索表", "事实核查表", "材料模板"] },
    },
    rule: {
      path: "agents/public-opinion-response/workflow.yaml",
      codeLines: [
        { line: "01", text: "agent: public-opinion-response", classes: "token-key" },
        { line: "02", text: "" },
        { line: "03", text: "steps:", classes: "token-key" },
        { line: "04", text: "  - collect_source_links" },
        { line: "05", text: "  - search_reposts_by_title" },
        { line: "06", text: "  - extract_disputed_claims" },
        { line: "07", text: "  - verify_with_public_sources" },
        { line: "08", text: "  - map_platform_rules" },
        { line: "09", text: "  - draft_complaint_materials" },
        { line: "10", text: "" },
        { line: "11", text: "limits:", classes: "token-key" },
        { line: "12", text: "  auto_submit: false", classes: "token-key" },
        { line: "13", text: "  legal_conclusion: require_human", classes: "token-key" },
        { line: "14", text: "  tone: factual_only", classes: "token-key" },
      ],
      tags: ["workflow.yaml", "steps", "limits"],
    },
  },
  {
    slug: "content-safety",
    number: "08",
    title: { en: "Content Safety Review Agent", zh: "内容安全审核 Agent" },
    heroSubtitle: {
      en: "Turning path, account, key, and internal info checks into a pre-publish gate.",
      zh: "把路径、账号、密钥和内部信息检查变成发布前闸门。",
    },
    heroImage: "assets/images/gpt-hero-content-safety-redaction-agent.png",
    metrics: [
      { label: { en: "Scenario", zh: "场景" }, value: { en: "Pre-Publish Check", zh: "发布前检查" } },
      { label: { en: "Core Action", zh: "核心动作" }, value: { en: "Risk Scanning", zh: "风险扫描" } },
      { label: { en: "Result", zh: "结果" }, value: { en: "Publish-Ready Version", zh: "发布版" } },
      { label: { en: "Asset", zh: "资产" }, value: { en: "Rule Library", zh: "规则库" } },
    ],
    valueStatement: {
      en: "This case solves scanning for risks with naked eyes before publishing - making path, account, key, and internal info checks into a pre-publish gate.",
      zh: "这个案例真正解决的是公开前靠肉眼扫风险的问题，把路径、账号、密钥、内部信息检查做成发布前闸门。",
    },
    before: {
      en: ["Naked-eye risk scanning", "Key patterns easily missed", "Fix one, leak another", "Can't judge publishability"],
      zh: ["靠肉眼扫风险", "密钥形态易漏", "修一处漏多处", "无法判断能否公开"],
    },
    after: {
      en: ["Rule-based scanning", "Risk tiering", "Replace & redact", "Re-scan confirmation"],
      zh: ["规则扫描", "风险分级", "替换处理", "复扫确认"],
    },
    agent: {
      name: { en: "Content Safety Review", zh: "内容安全审核" },
      role: { en: "Publish Gate 08", zh: "发布闸门 08" },
      avatar: "assets/images/avatar-cn-content-safety-redaction-agent.svg",
      tags: { en: ["Rule Scanning", "Risk Tiering", "Re-scan Confirm"], zh: ["规则扫描", "风险分级", "复扫确认"] },
      jobTitle: { en: "Role: Content Safety Reviewer", zh: "岗位：内容安全审核官" },
      oneLiner: { en: "Turns pre-publish risk checking for public materials into a re-scannable gate.", zh: "把公开材料发布前的风险检查做成可复扫的闸门。" },
      habits: { en: ["First: scan sensitive patterns", "Then: assign risk levels", "Last: re-scan for clearance"], zh: ["先扫敏感形态", "再分风险级别", "最后复扫通过"] },
      boundaries: { en: ["Never display raw keys", "Don't delete business facts", "Alert credential rotation on discovery"], zh: ["不展示密钥原文", "不擅删业务事实", "发现凭据先提醒轮换"] },
      quote: { en: "Not a nitpick tool - the final gate before materials go public.", zh: "不是挑错工具，是材料公开前的最后一道闸。" },
    },
    workflow: {
      sectionSub: { en: "Risk Scanning to Publish-Ready Version", zh: "风险扫描 -> 发布版" },
      steps: { en: ["Input Material", "Scan Sensitive Items", "Risk Tiering", "Replace & Redact", "Re-scan", "Output Publish Version"], zh: ["输入材料", "扫描敏感项", "风险分级", "替换处理", "复扫", "输出发布版"] },
    },
    result: {
      sectionSub: { en: "Pre-Publish Safety Check Panel", zh: "发布前安全检查面板" },
      image: "assets/images/poster-08-content-safety.png",
      input: { en: "These cases need a pre-publish check before submission.", zh: "这批案例要提交，先做公开前检查。" },
      process: { en: "Scan for paths, accounts, key patterns, and internal info; process by risk level.", zh: "扫描路径、账号、密钥形态和内部信息，按风险级别处理。" },
      output: { en: "Outputs publish-ready version, risk list, and re-scan clearance record.", zh: "输出可发布版本、风险清单和复扫通过记录。" },
      assets: { en: ["Risk Rule Library", "Re-scan Records", "Publish Checklist"], zh: ["风险规则库", "复扫记录", "发布检查表"] },
    },
    rule: {
      path: "skills/content-safety/patterns.ts",
      codeLines: [
        { line: "01", text: "export const riskPatterns = {" },
        { line: "02", text: "  P0: [/sk-[A-Za-z0-9_-]{20,}/, /AKIA[0-9A-Z]{16}/],", classes: "token-key" },
        { line: "03", text: "  P1: [/[A-Z]:\\\\Users\\\\[^\\\\]+/i, /\\/Users\\/[^/]+/],", classes: "token-key" },
        { line: "04", text: "  P2: [/localhost:\\d+/, /internal|private|draft/i],", classes: "token-key" },
        { line: "05", text: "};" },
        { line: "06", text: "" },
        { line: "07", text: "export function reviewBeforePublish(text: string) {" },
        { line: "08", text: "  const findings = scan(text, riskPatterns);" },
        { line: "09", text: "  return groupByLevel(findings);" },
        { line: "10", text: "}" },
      ],
      tags: ["TypeScript", "patterns", "P0/P1/P2"],
    },
  },
  {
    slug: "research-report",
    number: "09",
    title: { en: "Research Report Agent", zh: "研报 Agent" },
    heroSubtitle: {
      en: "Stringing data baselines, peer screening, valuation attribution, and fact-checking into a research pipeline.",
      zh: "把数据基线、可比筛选、估值归因和事实核查串成研究流程。",
    },
    heroImage: "assets/images/gpt-hero-research-report-agent.png",
    metrics: [
      { label: { en: "Scenario", zh: "场景" }, value: { en: "Research Analysis", zh: "研报分析" } },
      { label: { en: "Core Action", zh: "核心动作" }, value: { en: "Peer Benchmarking", zh: "对标核查" } },
      { label: { en: "Result", zh: "结果" }, value: { en: "Research Framework", zh: "研报框架" } },
      { label: { en: "Asset", zh: "资产" }, value: { en: "Benchmarking Matrix", zh: "对标矩阵" } },
    ],
    valueStatement: {
      en: "This case solves research report material pile-up with chaotic metric definitions - restructuring the research process into data baselines, peer screening, and fact-checking chains.",
      zh: "这个案例真正解决的是研报资料堆砌、数字口径混乱的问题，把研究过程改成数据基线、可比筛选和事实核查链。",
    },
    before: {
      en: ["Materials scatter wider", "Inconsistent metric definitions", "Peers chosen by intuition", "Unclear conclusion boundaries"],
      zh: ["资料越堆越散", "数字口径不统一", "可比公司凭感觉", "结论边界不清"],
    },
    after: {
      en: ["Lock metric definitions", "Screen peer companies", "Build benchmarking matrix", "Decompose valuation gaps"],
      zh: ["锁定数据口径", "筛可比公司", "建对标矩阵", "拆估值差"],
    },
    agent: {
      name: { en: "Research Report", zh: "研报" },
      role: { en: "Research Verifier 09", zh: "研报核查 09" },
      avatar: "assets/images/avatar-cn-research-report-agent.svg",
      tags: { en: ["Data Baseline", "Benchmarking Matrix", "Fact Checking"], zh: ["数据基线", "对标矩阵", "事实核查"] },
      jobTitle: { en: "Role: Research Verifier", zh: "岗位：研报核查官" },
      oneLiner: { en: "Organizes research subjects, metric definitions, and benchmarking logic into reviewable research frameworks.", zh: "把研究对象、数据口径和对标逻辑整理成可复核研报框架。" },
      habits: { en: ["First: lock the metric definition", "Then: screen comparable peers", "Last: mark conclusion boundaries"], zh: ["先锁口径", "再筛可比对象", "最后标出结论边界"] },
      boundaries: { en: ["Don't invent data sources", "Don't mix metric definitions", "Don't substitute for investment judgment"], zh: ["不编数据来源", "不混用口径", "不替代投资判断"] },
      quote: { en: "Not a material mover - a research verifier watching metric definitions.", zh: "不是资料搬运工，是盯数字口径的研究核查官。" },
    },
    workflow: {
      sectionSub: { en: "Peer Benchmarking to Research Framework", zh: "对标核查 -> 研报框架" },
      steps: { en: ["Define Subject", "Lock Metrics", "Screen Peers", "Build Matrix", "Decompose Valuation", "Generate Framework"], zh: ["确定研究对象", "锁定数据口径", "筛可比公司", "建对标矩阵", "拆估值差", "生成研报框架"] },
    },
    result: {
      sectionSub: { en: "Research Verification Workbench", zh: "研究核查工作台" },
      image: "assets/images/poster-09-research-report.png",
      input: { en: "Analyze this company's valuation gap - list peer companies and metric definitions clearly first.", zh: "帮我分析这家公司估值差异，先把可比公司和口径列清楚。" },
      process: { en: "Unify metric definitions, screen comparable peers, decompose valuation gaps and factual basis.", zh: "统一数据口径，筛选可比对象，拆解估值差异和事实依据。" },
      output: { en: "Outputs benchmarking matrix, valuation attribution, and research framework.", zh: "输出对标矩阵、估值归因和研报框架。" },
      assets: { en: ["Data Baseline", "Benchmarking Matrix", "Verification Checklist"], zh: ["数据基线", "对标矩阵", "核查清单"] },
    },
    rule: {
      path: "skills/research-report/schema.json",
      codeLines: [
        { line: "01", text: "{" },
        { line: "02", text: '  "agent": "research-report",' },
        { line: "03", text: '  "required_sources": [' },
        { line: "04", text: '    "financial_baseline",' },
        { line: "05", text: '    "peer_companies",' },
        { line: "06", text: '    "valuation_data"' },
        { line: "07", text: "  ]," },
        { line: "08", text: '  "checks": [' },
        { line: "09", text: '    "data_date",' },
        { line: "10", text: '    "metric_definition",' },
        { line: "11", text: '    "forecast_vs_actual",' },
        { line: "12", text: '    "peer_comparability",' },
        { line: "13", text: '    "valuation_gap_reason"' },
        { line: "14", text: "  ]," },
        { line: "15", text: '  "guardrails": { "invent_financial_data": false }' },
        { line: "16", text: "}" },
      ],
      tags: ["schema.json", "checks", "guardrails"],
    },
  },
];

export function getCaseBySlug(slug: string): CaseData | undefined {
  return cases.find((c) => c.slug === slug);
}
