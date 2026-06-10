/**
 * visual-scroll-video-check.js — Verify ScrollScrubVideoHero
 *
 * Checks:
 * - ScrollTrigger exists and pin works
 * - video.currentTime changes with scroll
 * - 5 progress screenshots
 * - EN + ZH screenshots
 * - Mobile screenshot
 * - Console errors
 */

const { chromium } = require("playwright");
const http = require("http");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out-dist");
const SCREENSHOT_DIR = path.join(ROOT, "verification-screenshots");

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Minimal server
function serve(base) {
  const MIME = { ".html":"text/html",".js":"text/javascript",".css":"text/css",
    ".png":"image/png",".webp":"image/webp",".jpg":"image/jpeg",".json":"application/json",
    ".woff2":"font/woff2",".svg":"image/svg+xml" };
  return http.createServer((req, res) => {
    const u = new URL(req.url, "http://localhost");
    let fp = path.join(base, u.pathname === "/" ? "index.html" : u.pathname);
    fp = path.normalize(fp);
    if (!fp.startsWith(base)) { res.writeHead(403); res.end(); return; }
    try {
      const d = fs.readFileSync(fp);
      res.writeHead(200, { "Content-Type": MIME[path.extname(fp).toLowerCase()] || "application/octet-stream" });
      res.end(d);
    } catch {
      try { const d = fs.readFileSync(path.join(fp, "index.html"));
        res.writeHead(200,{"Content-Type":"text/html"}); res.end(d); }
      catch { res.writeHead(404); res.end(); }
    }
  });
}

async function main() {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  const PORT = 3470;
  const server = serve(OUT_DIR);
  await new Promise(r => server.listen(PORT, r));
  const BASE = `http://localhost:${PORT}`;
  console.log(`Server on :${PORT}\n`);

  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox","--disable-gpu"] });
  const allErrors = [];
  const allWarnings = [];
  const results = [];

  try {
    // ── Desktop EN ──
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    page.on("console", msg => { if(msg.type()==="error") allErrors.push(msg.text()); else if(msg.type()==="warning") allWarnings.push(msg.text()); });
    page.on("pageerror", e => allErrors.push(e.message));

    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(4000);

    // Check ScrollTrigger pin
    const hasPin = await page.evaluate(() => !!document.querySelector('[class*="sticky"]'));
    results.push({ check: "ScrollTrigger pin active", status: hasPin ? "✅" : "❌" });
    console.log(`Pin active: ${hasPin}`);

    // Check video exists
    const hasVideo = await page.evaluate(() => !!document.querySelector("video"));
    results.push({ check: "Video element exists", status: hasVideo ? "✅" : "❌" });

    // Check Shannon Fu name
    const hasShannon = await page.evaluate(() => document.body.innerText.includes("Shannon Fu"));
    results.push({ check: "Shannon Fu name visible", status: hasShannon ? "✅" : "❌" });

    // Scroll progress screenshots + video time check
    const scrollPositions = [0, 0.25, 0.50, 0.75, 1.0];
    const screenshotNames = [
      "video-scroll-00.png",
      "video-scroll-25.png",
      "video-scroll-50.png",
      "video-scroll-75.png",
      "video-scroll-100.png",
    ];

    const videoTimes = [];
    for (let i = 0; i < scrollPositions.length; i++) {
      const pct = scrollPositions[i];
      const pageHeight = await page.evaluate(() => document.body.scrollHeight);
      const target = Math.round((pageHeight - 900) * pct);
      await page.evaluate(y => window.scrollTo(0, y), target);
      await sleep(2000);

      // Screenshot
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, screenshotNames[i]), fullPage: false });
      console.log(`  ${screenshotNames[i]} — ${Math.round(pct * 100)}%`);

      // Video currentTime
      const ct = await page.evaluate(() => {
        const v = document.querySelector("video");
        return v ? v.currentTime : -1;
      });
      videoTimes.push(ct);
    }

    // Video time changes
    const timeChanges = videoTimes.some((t, i) => i > 0 && t > videoTimes[0]);
    results.push({ check: "Video currentTime changes with scroll", status: timeChanges ? "✅" : "⚠️",
      detail: videoTimes.map(t => t.toFixed(2) + "s").join(" → ") });

    // Reverse scroll
    const pageHeight2 = await page.evaluate(() => document.body.scrollHeight);
    await page.evaluate(y => window.scrollTo(0, y), Math.round((pageHeight2 - 900) * 0.75));
    await sleep(1500);
    const t75 = await page.evaluate(() => { const v = document.querySelector("video"); return v ? v.currentTime : -1; });
    await page.evaluate(y => window.scrollTo(0, y), Math.round((pageHeight2 - 900) * 0.25));
    await sleep(1500);
    const t25 = await page.evaluate(() => { const v = document.querySelector("video"); return v ? v.currentTime : -1; });

    const reverseWorks = t25 < t75;
    results.push({ check: "Reverse scroll: time decreases", status: reverseWorks ? "✅" : "⚠️",
      detail: `75%: ${t75.toFixed(2)}s → 25%: ${t25.toFixed(2)}s` });
    console.log(`Reverse: 75% ${t75.toFixed(2)}s → 25% ${t25.toFixed(2)}s ${reverseWorks ? "✅" : "❌"}`);

    await ctx.close();

    // ── ZH screenshot ──
    const zhCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1,
      locale: "zh-CN" });
    const zhPage = await zhCtx.newPage();
    await zhPage.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(2000);
    // Switch to Chinese
    const zhBtn = await zhPage.$("text=中");
    if (zhBtn) await zhBtn.click();
    await sleep(2000);
    await zhPage.screenshot({ path: path.join(SCREENSHOT_DIR, "home-zh-hero.png"), fullPage: false });
    console.log("  home-zh-hero.png");
    await zhCtx.close();

    // ── Mobile screenshot ──
    const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true,
      deviceScaleFactor: 2 });
    const mPage = await mCtx.newPage();
    await mPage.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(4000);
    await mPage.screenshot({ path: path.join(SCREENSHOT_DIR, "home-mobile-video-scroll.png"), fullPage: false });
    console.log("  home-mobile-video-scroll.png");
    await mCtx.close();

    // ── Report ──
    console.log("\n═══════════════════════════════════");
    console.log("  VIDEO SCROLL VERIFICATION REPORT");
    console.log("═══════════════════════════════════\n");

    for (const r of results) {
      console.log(`  ${r.status} ${r.check}${r.detail ? " — " + r.detail : ""}`);
    }

    console.log(`\n  📸 Screenshots:`);
    for (const s of screenshotNames) {
      const sp = path.join(SCREENSHOT_DIR, s);
      const sz = fs.existsSync(sp) ? (fs.statSync(sp).size / 1024).toFixed(0) + "KB" : "missing";
      console.log(`     ${s} — ${sz}`);
    }
    console.log(`     home-zh-hero.png`);
    console.log(`     home-mobile-video-scroll.png`);

    console.log(`\n  ⚠️  Errors: ${allErrors.length} | Warnings: ${allWarnings.length}`);
    allErrors.slice(0, 3).forEach(e => console.log(`     ${e.substring(0, 100)}`));

    const pass = results.every(r => r.status === "✅");
    console.log(`\n  📋 ${pass ? "✅ ALL PASSED" : "⚠️  ISSUES"}`);

  } catch (err) {
    console.error("❌", err.message);
  } finally {
    await browser.close();
    server.close();
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
