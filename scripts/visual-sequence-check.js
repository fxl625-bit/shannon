/**
 * visual-sequence-check.js — Verify ScrollSequenceHero
 */

const { chromium } = require("playwright");
const http = require("http");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const DEV_URL = "http://localhost:4003";
const SCREENSHOT_DIR = path.join(ROOT, "verification-screenshots");
const PORT = 3480;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

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
  console.log(`Using dev server at ${DEV_URL}`);

  console.log(`Server on :${PORT}\n`);

  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox","--disable-gpu"] });
  const allErrors = [];
  const results = [];

  try {
    // ── Desktop EN ──
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    page.on("console", msg => { if(msg.type()==="error") allErrors.push(msg.text()); });
    page.on("pageerror", e => allErrors.push(e.message));

    await page.goto(DEV_URL, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(5000);

    // Basic checks
    const hasCanvas = await page.evaluate(() => !!document.querySelector("canvas"));
    results.push({ check: "Canvas rendered", status: hasCanvas ? "✅" : "❌" });

    const hasShannon = await page.evaluate(() => document.body.innerText.includes("Shannon Fu"));
    results.push({ check: "Shannon Fu visible", status: hasShannon ? "✅" : "❌" });

    const hasScrollDriven = await page.evaluate(() =>
      document.body.innerText.includes("scroll-driven timeline")
    );
    results.push({ check: "No 'scroll-driven timeline' text", status: hasScrollDriven ? "❌" : "✅" });

    const hasButtons = await page.evaluate(() =>
      document.body.innerText.includes("Explore the System") && document.body.innerText.includes("View Experiments")
    );
    // Buttons should exist SOMEWHERE on page (in CinematicSection) but not in the scroll hero
    // The hero should NOT have buttons, cinematic section SHOULD have buttons
    // We just verify buttons exist on the full page
    results.push({ check: "Buttons present on page (in cinematicsection)", status: hasButtons ? "✅" : "❌" });

    const hasVideo = await page.evaluate(() => !!document.querySelector("video"));
    results.push({ check: "No autoplay video background", status: hasVideo ? "❌" : "✅" });

    // Check initial text sharpness
    const textSharpness = await page.evaluate(() => {
      // Find the text container — it has the inline opacity/filter styles
      const textDiv = document.querySelector('[style*="opacity"]');
      if (!textDiv) return { opacity: 0, blur: "no element", sharp: false };
      const style = window.getComputedStyle(textDiv);
      const opacity = parseFloat(style.opacity);
      const filter = style.filter;
      const isSharp = opacity >= 0.95 && (filter === "none" || filter.includes("blur(0px)"));
      return { opacity, filter, sharp: isSharp };
    });
    results.push({ check: "Initial text opacity >= 0.95", status: textSharpness.opacity >= 0.95 ? "✅" : "❌",
      detail: `opacity: ${textSharpness.opacity}` });
    results.push({ check: "Initial text not blurred", status: textSharpness.sharp ? "✅" : "❌",
      detail: `filter: ${textSharpness.filter}` });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "sequence-initial-with-copy.png"), fullPage: false });
    console.log("  sequence-initial-with-copy.png — initial state (no scroll)");

    // Check initial text visibility
    const initialShannon = await page.evaluate(() => document.body.innerText.includes("Shannon Fu"));
    results.push({ check: "Initial state: Shannon Fu visible", status: initialShannon ? "✅" : "❌" });

    const initialTitle = await page.evaluate(() =>
      document.body.innerText.includes("AI × HUMAN POTENTIAL") || document.body.innerText.includes("AI × 人类潜能")
    );
    results.push({ check: "Initial state: title visible", status: initialTitle ? "✅" : "❌" });

    // Check no buttons in hero (buttons should exist ONLY in cinematic section further down)
    // On initial viewport, buttons should NOT be visible
    const heroHasButtons = await page.evaluate(() => {
      const visible = document.body.innerText;
      // Buttons exist somewhere but shouldn't be at the top of page
      return visible.includes("Explore the System") || visible.includes("探索系统");
    });
    results.push({ check: "Initial state: no CTA buttons in hero", status: heroHasButtons ? "⚠️" : "✅",
      detail: "buttons expected in CinematicSection below the fold" });

    // Check no poster flash: canvas should be present
    const canvasPresent = await page.evaluate(() => !!document.querySelector("canvas"));
    results.push({ check: "Canvas present", status: canvasPresent ? "✅" : "❌" });

    // Progress screenshots
    const scrollPositions = [0, 0.25, 0.50, 0.75, 1.0];
    const shotNames = [
      "sequence-final-00.png",
      "sequence-final-25.png",
      "sequence-final-50.png",
      "sequence-final-75.png",
      "sequence-final-100.png",
    ];

    const shotSizes = [];
    for (let i = 0; i < scrollPositions.length; i++) {
      const pct = scrollPositions[i];
      const ph = await page.evaluate(() => document.body.scrollHeight);
      const target = Math.round((ph - 900) * pct);
      await page.evaluate(y => window.scrollTo(0, y), target);
      await sleep(2500);
      const fp = path.join(SCREENSHOT_DIR, shotNames[i]);
      await page.screenshot({ path: fp, fullPage: false });
      const sz = fs.statSync(fp).size;
      shotSizes.push(sz);
      console.log(`  ${shotNames[i]} — ${Math.round(pct * 100)}% — ${(sz / 1024).toFixed(0)}KB`);
    }

    const framesChange = shotSizes.some((s, i) => i > 0 && Math.abs(s - shotSizes[0]) > 10000);
    results.push({ check: "Frames change across scroll (screenshot delta)", status: framesChange ? "✅" : "⚠️",
      detail: shotSizes.map(s => (s / 1024).toFixed(0) + "KB").join(" → ") });

    await ctx.close();

    // ── ZH screenshot ──
    const zhCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "zh-CN" });
    const zhPage = await zhCtx.newPage();
    await zhPage.goto(DEV_URL, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(2000);
    const zhBtn = await zhPage.$("text=中");
    if (zhBtn) await zhBtn.click();
    await sleep(2000);
    await zhPage.screenshot({ path: path.join(SCREENSHOT_DIR, "sequence-zh-initial-with-copy.png"), fullPage: false });
    console.log("  sequence-zh-initial-with-copy.png");

    // Check Chinese text
    const zhText = await zhPage.evaluate(() => document.body.innerText.includes("人类潜能"));
    results.push({ check: "Chinese hero text visible", status: zhText ? "✅" : "❌" });
    await zhCtx.close();

    // ── Mobile ──
    const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 });
    const mPage = await mCtx.newPage();
    await mPage.goto(DEV_URL, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(5000);
    await mPage.screenshot({ path: path.join(SCREENSHOT_DIR, "sequence-mobile-initial-with-copy.png"), fullPage: false });
    console.log("  sequence-mobile-initial-with-copy.png");

    const mNoOverflow = await mPage.evaluate(() =>
      document.documentElement.scrollWidth <= document.documentElement.clientWidth
    );
    results.push({ check: "Mobile: no horizontal overflow", status: mNoOverflow ? "✅" : "❌" });
    await mCtx.close();

    // ── Content checks across the whole page ──
    const fCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const fPage = await fCtx.newPage();
    await fPage.goto(DEV_URL, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(3000);

    // Check iCloud
    const hasICloud = await fPage.evaluate(() => document.body.innerText.includes("iCloud"));
    results.push({ check: "No iCloud on page", status: hasICloud ? "❌" : "✅" });

    // Check Google Play
    const hasGooglePlay = await fPage.evaluate(() => document.body.innerText.includes("Google Play"));
    results.push({ check: "Google Play status visible", status: hasGooglePlay ? "✅" : "❌" });

    // Check no React 418
    const has418 = allErrors.some(e => e.includes("418"));
    results.push({ check: "No React 418 errors", status: has418 ? "❌" : "✅" });

    await fCtx.close();

    // ── Report ──
    console.log("\n═══════════════════════════════════");
    console.log("  SEQUENCE HERO VERIFICATION");
    console.log("═══════════════════════════════════\n");
    for (const r of results) {
      console.log(`  ${r.status} ${r.check}${r.detail ? " — " + r.detail : ""}`);
    }
    console.log(`\n  ⚠️  Console errors: ${allErrors.length}`);
    allErrors.slice(0, 3).forEach(e => console.log("     " + e.substring(0, 100)));

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
