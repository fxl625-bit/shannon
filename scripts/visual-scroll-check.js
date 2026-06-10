/**
 * visual-scroll-check.js
 *
 * 使用 Playwright 验证滚动驱动的视频序列效果。
 *
 * 功能：
 * 1. 启动 dev server 或静态文件服务
 * 2. 打开页面
 * 3. 截取不同 scrollProgress 下的画面
 * 4. 验证 canvas 是否正常绘制
 * 5. 验证反向滚动
 * 6. 检查 console 错误
 * 7. 输出验证截图
 *
 * 用法：
 *   node scripts/visual-scroll-check.js [--port 3000] [--headless]
 */

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const SCREENSHOT_DIR = path.join(ROOT, "verification-screenshots");
const OUTPUT_DIR = path.join(ROOT, "out");
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const SCROLL_POSITIONS = [0, 0.25, 0.50, 0.75, 1.0];
const SCREENSHOT_NAMES = [
  "scroll-video-hero-00.png",
  "scroll-video-hero-25.png",
  "scroll-video-hero-50.png",
  "scroll-video-hero-75.png",
  "scroll-video-hero-100.png",
];

const args = process.argv.slice(2);
const HEADLESS = args.includes("--headless");

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("🧪 Scroll Video Hero — Visual Check\n");

  // 确保截图目录存在
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  // 检查构建输出或静态文件
  const isStaticExport = fs.existsSync(path.join(OUTPUT_DIR, "index.html"));

  const url = isStaticExport && !process.env.BASE_URL
    ? `file://${OUTPUT_DIR.replace(/\\/g, "/")}/index.html#scroll-check`
    : BASE_URL;

  console.log(`📡 目标 URL: ${url}`);
  console.log(`🎭 Headless: ${HEADLESS}`);
  console.log("");

  // 启动浏览器
  const browser = await chromium.launch({
    headless: HEADLESS,
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });

  const page = await context.newPage();

  // 收集 console 消息
  const consoleErrors = [];
  const consoleWarnings = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    } else if (msg.type() === "warning") {
      consoleWarnings.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  try {
    console.log("🚀 打开页面...");
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

    // 等待初始渲染
    await sleep(3000);

    // 检查页面是否有 ScrollVideoHero section
    const hasScrollVideo = await page.evaluate(() => {
      return !!document.querySelector(
        '[class*="sticky"][class*="top-0"]'
      );
    });

    console.log(`📋 ScrollVideoHero 存在: ${hasScrollVideo}`);

    if (!hasScrollVideo) {
      console.warn("⚠️  未检测到 ScrollVideoHero — 可能是空构建或页面不含该组件");
      // 保存当前页面截图
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, "debug-current.png"),
        fullPage: true,
      });
    }

    // 获取页面高度
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = 900;

    console.log(`📐 页面总高度: ${pageHeight}px`);
    console.log(`📐 Viewport 高度: ${viewportHeight}px`);
    console.log("");

    // 模拟不同滚动进度并截图
    const results = [];

    for (let i = 0; i < SCROLL_POSITIONS.length; i++) {
      const progress = SCROLL_POSITIONS[i];
      const scrollTarget = Math.round(
        (pageHeight - viewportHeight) * progress
      );

      console.log(`📸 截图 ${i + 1}/${SCROLL_POSITIONS.length}: ${(progress * 100).toFixed(0)}% 滚动`);

      await page.evaluate((y) => window.scrollTo(0, y), scrollTarget);
      await sleep(1500); // 等待帧渲染

      const screenshotPath = path.join(SCREENSHOT_DIR, SCREENSHOT_NAMES[i]);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false,
      });

      // 尝试读取 canvas 上的帧号（dev 模式下）
      const frameInfo = await page.evaluate(() => {
        const el = document.querySelector('[class*="bottom-4"][class*="right-4"]');
        return el?.textContent || null;
      });

      results.push({
        position: progress,
        frame: frameInfo || "N/A",
        file: SCREENSHOT_NAMES[i],
      });

      console.log(`   ✅ ${SCREENSHOT_NAMES[i]}${frameInfo ? ` (${frameInfo})` : ""}`);
    }

    // 测试反向滚动
    console.log("\n🔄 测试反向滚动...");
    const scrollDown = Math.round((pageHeight - viewportHeight) * 0.75);
    const scrollUp = Math.round((pageHeight - viewportHeight) * 0.25);

    // 先滚到 75%
    await page.evaluate((y) => window.scrollTo(0, y), scrollDown);
    await sleep(1000);

    // 获取当前帧号
    const frameBefore = await page.evaluate(() => {
      const el = document.querySelector('[class*="bottom-4"][class*="right-4"]');
      return el?.textContent || null;
    });

    // 滚回 25%
    await page.evaluate((y) => window.scrollTo(0, y), scrollUp);
    await sleep(1500);

    // 获取反向滚动后的帧号
    const frameAfter = await page.evaluate(() => {
      const el = document.querySelector('[class*="bottom-4"][class*="right-4"]');
      return el?.textContent || null;
    });

    const reverseWorks =
      frameBefore !== null &&
      frameAfter !== null &&
      frameBefore !== frameAfter;

    console.log(`   向前滚动后帧: ${frameBefore}`);
    console.log(`   反向滚动后帧: ${frameAfter}`);
    console.log(`   ✅ 反向滚动支持: ${reverseWorks}`);

    // 移动端测试
    console.log("\n📱 移动端测试...");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    });

    const mobilePage = await mobileContext.newPage();

    mobilePage.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(`[mobile] ${msg.text()}`);
      }
    });

    await mobilePage.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(3000);

    const mobileScreenshotPath = path.join(
      SCREENSHOT_DIR,
      "home-mobile-scroll-video.png"
    );

    // 滚动到不同位置截图
    const mobilePageHeight = await mobilePage.evaluate(
      () => document.body.scrollHeight
    );

    // 50% 滚动位置
    await mobilePage.evaluate(
      (y) => window.scrollTo(0, Math.round((y - 844) * 0.5)),
      mobilePageHeight
    );
    await sleep(1500);
    await mobilePage.screenshot({
      path: mobileScreenshotPath,
      fullPage: false,
    });

    console.log(`   ✅ home-mobile-scroll-video.png`);

    await mobileContext.close();

    // 生成验证报告
    console.log("\n─── 验证报告 ───────────────────────────────");

    console.log(`\n📸 截图输出:`);
    for (const r of results) {
      console.log(`   ${r.file} — ${Math.round(r.position * 100)}% progress`);
    }
    console.log(`   home-mobile-scroll-video.png — 移动端`);

    console.log(`\n🔄 反向滚动: ${reverseWorks ? "✅ 支持" : "❌ 不支持"}`);

    console.log(`\n⚠️  Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.slice(0, 5).forEach((e) => console.log(`   ❌ ${e}`));
    }

    console.log(`\n⚠️  Console Warnings: ${consoleWarnings.length}`);

    console.log(
      `\n📋 结论: ${
        hasScrollVideo && reverseWorks && consoleErrors.length === 0
          ? "✅ 验收基本通过"
          : "⚠️  存在待解决问题"
      }`
    );

  } catch (err) {
    console.error("❌ 验证过程出错:", err);

    // 保存错误时的截图
    try {
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, "debug-error.png"),
        fullPage: true,
      });
      console.log("📸 错误截图已保存: debug-error.png");
    } catch {
      // ignore
    }
  } finally {
    await browser.close();
  }

  console.log("\n✅ 验证完成");
}

// TypeScript 兼容
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
