/**
 * sequenceConfig.ts — Frame sequence and timeline configuration
 *
 * Central config for the scroll-driven video hero:
 * - Frame paths for desktop/mobile
 * - Timeline phases with progress ranges
 * - Phase copy (i18n: en/zh)
 */

export interface TimelinePhase {
  key: string;
  /** 0-1 progress range for this phase */
  start: number;
  end: number;
  /** EN copy */
  en: {
    heading?: string;
    subheading?: string;
    items?: { label: string; sub?: string; color?: string }[];
    body?: string;
  };
  /** ZH copy */
  zh: {
    heading?: string;
    subheading?: string;
    items?: { label: string; sub?: string; color?: string }[];
    body?: string;
  };
  /** Visual style: 'hero' | 'grid' | 'statement' | 'flow' | 'closing' */
  style: 'hero' | 'grid' | 'statement' | 'flow' | 'closing';
}

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    key: 'title',
    start: 0,
    end: 0.18,
    style: 'hero',
    en: {
      heading: 'AI × Human Potential',
      body: 'A personal interface for exploring how AI expands memory, expression, judgment, and creativity.',
    },
    zh: {
      heading: 'AI × 人的潜能',
      body: '一个探索 AI 如何扩展记忆、表达、判断与创造力的个人界面。',
    },
  },
  {
    key: 'four-pillars',
    start: 0.18,
    end: 0.35,
    style: 'grid',
    en: {
      items: [
        { label: 'Memory', color: 'var(--cyan)' },
        { label: 'Expression', color: 'var(--violet)' },
        { label: 'Judgment', color: 'var(--blue)' },
        { label: 'Creativity', color: 'var(--warm)' },
      ],
    },
    zh: {
      items: [
        { label: 'Memory', sub: '记忆', color: 'var(--cyan)' },
        { label: 'Expression', sub: '表达', color: 'var(--violet)' },
        { label: 'Judgment', sub: '判断', color: 'var(--blue)' },
        { label: 'Creativity', sub: '创造力', color: 'var(--warm)' },
      ],
    },
  },
  {
    key: 'cognition',
    start: 0.35,
    end: 0.55,
    style: 'statement',
    en: {
      heading: 'AI is not only automation.',
      body: 'It is a new layer of cognition.',
    },
    zh: {
      heading: 'AI 不只是自动化工具。',
      body: '它是认知的新一层。',
    },
  },
  {
    key: 'io-cycle',
    start: 0.55,
    end: 0.75,
    style: 'flow',
    en: {
      items: [
        { label: 'Human Inputs', color: 'var(--cyan)' },
        { label: '↕', color: 'var(--text-muted)' },
        { label: 'AI Systems', color: 'var(--violet)' },
        { label: '↕', color: 'var(--text-muted)' },
        { label: 'Human Outputs', color: 'var(--blue)' },
      ],
    },
    zh: {
      items: [
        { label: 'Human Inputs', sub: '人的输入', color: 'var(--cyan)' },
        { label: '↕', sub: '', color: 'var(--text-muted)' },
        { label: 'AI Systems', sub: 'AI 系统', color: 'var(--violet)' },
        { label: '↕', sub: '', color: 'var(--text-muted)' },
        { label: 'Human Outputs', sub: '人的输出', color: 'var(--blue)' },
      ],
    },
  },
  {
    key: 'augmented',
    start: 0.75,
    end: 1.0,
    style: 'closing',
    en: {
      heading: 'The future is augmented humanity.',
    },
    zh: {
      heading: '未来是增强的人类。',
    },
  },
];

export const FRAME_CONFIG = {
  desktop: {
    totalFrames: 165,
    basePath: '/sequences/hero',
    prefix: 'frame_',
    format: 'webp' as const,
  },
  mobile: {
    totalFrames: 83,
    basePath: '/sequences/hero-mobile',
    prefix: 'frame_',
    format: 'webp' as const,
  },
  scrollHeightMultiplier: 5,
};

export function getFrameUrls(
  total: number,
  basePath: string,
  prefix: string = 'frame_',
  format: string = 'webp'
): string[] {
  return Array.from(
    { length: total },
    (_, i) => `${basePath}/${prefix}${String(i + 1).padStart(4, '0')}.${format}`
  );
}
