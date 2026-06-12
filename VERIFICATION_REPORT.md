# v0.5 最终验收报告

**版本**: v0.5  
**验证时间**: 2026-06-12  
**验证方式**: Playwright 截图 (Chromium) + next build + scroll roundtrip

---

## 本次修改内容

### 1. Brand Capability Section — 品牌能力升级（新增首页版块）

**文件**: `components/BrandCapabilitySection.tsx`

将原来的 3×2 卡片平铺改为三层递进工作流结构：

```
输入 (Input)       →   表达 (Expression)    →   沉淀 (System)
[情报能力] [知识能力]  →  [叙事能力] [视觉能力] [原型能力]  →  [系统能力 · 全宽大卡]
     ↓                           ↓
   箭头连接线                   箭头连接线
```

- 每层有中/英层级标签（输入/Input、表达/Expression、沉淀/System）
- 层间 SVG 箭头连接
- 同一层卡片等高（`h-full min-h-[180px] flex flex-col` + `items-stretch`）
- 系统能力横向全宽大卡突出
- 文案无"不是……而是……、赋能、生态、矩阵、重新定义"

### 2. Apps 页面项目状态修复

**文件**: `data/site.ts`、`components/project-card.tsx`

| 项目 | 原状态 | 现状态 |
|------|--------|--------|
| 一世圆满 | 已发布 Google Play | 已上架 Google Play ✅ |
| 数学侦探 | 已上线 Vercel | 已上线 Vercel / 持续迭代中 ✅ |
| 收租记录器 | **还在开发中** ❌ | 内部使用中 ✅ |
| long-fm | **还在开发中** ❌ | 已上线 Vercel ✅ |

- 新增 `status` 字段到 `AppTool` 类型
- project-card 添加状态标签 badge 渲染（带边框的 pill 样式）
- 已删除所有"开发中"表述

---

## ✅ 验证结果

| # | 验证项 | 结果 | 证据 |
|---|--------|------|------|
| 1 | npm run build | ✅ Compiled 3.1s, TypeScript 7.0s, 20 pages | `node ./node_modules/next/dist/bin/next build` |
| 2 | scroll roundtrip | ✅ 6/6 通过, 0 console error | `node scripts/scroll-roundtrip-check.js` |
| 3 | 品牌能力版块截图 (EN) | ✅ 1440×900 | `verification-screenshots/brand-capability-en.png` |
| 4 | 品牌能力版块截图 (ZH) | ✅ 1440×900 | `verification-screenshots/brand-capability-zh.png` |
| 5 | 品牌能力版块截图 (Mobile) | ✅ 375×812 | `verification-screenshots/brand-capability-mobile.png` |
| 6 | Apps 页面截图 (EN) | ✅ 1440×900, 全页 | `verification-screenshots/apps-en-full.png` |
| 7 | Apps 页面截图 (ZH) | ✅ 1440×900, 全页 | `verification-screenshots/apps-zh-full.png` |
| 8 | long-fm 标注"已上线 Vercel" | ✅ Playwright 文本验证 | `scripts/screenshot-apps.js` |
| 9 | 收租记录器标注"内部使用中" | ✅ Playwright 文本验证 | `scripts/screenshot-apps.js` |
| 10 | 一世圆满标注"已上架 Google Play" | ✅ Playwright 文本验证 | `scripts/screenshot-apps.js` |
| 11 | 数学侦探标注"已上线 Vercel/持续迭代中" | ✅ Playwright 文本验证 | `scripts/screenshot-apps.js` |
| 12 | 文案无禁用词 | ✅ grep "不是……而是……、赋能、生态、矩阵、重新定义" 0 命中 | `grep -c` |

---

## 截图路径

```
F:\CODEX\shannon-fu-site\verification-screenshots\
├── brand-capability-en.png      (1.28 MB, 1440×900)
├── brand-capability-zh.png      (1.25 MB, 1440×900)
├── brand-capability-mobile.png  (705 KB, 375×812)
├── apps-en-full.png             (325 KB, 1440×900 全页)
└── apps-zh-full.png             (296 KB, 1440×900 全页)
```

---

## 变更文件清单

| 文件 | 变更类型 |
|------|----------|
| `components/BrandCapabilitySection.tsx` | 新增（完整重写） |
| `app/page.tsx` | 修改（新增 import + 放置 BrandCapabilitySection） |
| `data/site.ts` | 修改（AppTool 新增 status 字段 + 4 App 数据更新） |
| `components/project-card.tsx` | 修改（新增 status badge 渲染） |
| `scripts/take-screenshot.js` | 新增 |
| `scripts/screenshot-apps.js` | 新增 |

---

## 命令

```bash
# 构建
npm run build

# 滚动动画验证
npm run check:scroll-roundtrip

# 本地预览
npm run dev
```
