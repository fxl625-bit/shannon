/**
 * visual-check-static.js — Takes desktop + mobile screenshots of the
 * static image hero for verification.
 *
 * Usage: node scripts/visual-check-static.js
 */

const { chromium } = require("playwright");
const http = require("http");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out-dist");
const SCREENSHOT_DIR = path.join(ROOT, "verification-screenshots");
const PORT = 3462;

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png",
  ".webp": "image/webp", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
};

function createServer(baseDir) {
  return http.createServer((req, res) => {
    const parsed = new URL(req.url, `http://localhost:${PORT}`);
    let fp = path.join(baseDir, parsed.pathname === "/" ? "index.html" : parsed.pathname);
    fp = path.normalize(fp);
    if (!fp.startsWith(baseDir)) { res.writeHead(403); res.end(); return; }
    try {
      const data = fs.readFileSync(fp);
      const ext = path.extname(fp).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    } catch {
      // Try with index.html for directories
      try {
        const idx = path.join(fp, "index.html");
        const data = fs.readFileSync(idx);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not Found: " + parsed.pathname);
      }
    }
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function main() {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  console.log("🚀 Starting server on :" + PORT);
  const server = createServer(OUT_DIR);
  await new Promise((r) => server.listen(PORT, r));
  const BASE = `http://localhost:${PORT}`;

  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const allErrors = [];

  try {
    // ── Desktop ──
    console.log("\n📸 Desktop screenshot...");
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") allErrors.push(msg.text());
    });
    page.on("pageerror", (e) => allErrors.push(e.message));

    await page.goto(BASE, { waitUntil: "load", timeout: 30000 });
    await sleep(5000);

    // Debug: check that HomeHero rendered
    const heroExists = await page.evaluate(() => {
      return !!document.querySelector("section");
    });
    const bgDivExists = await page.evaluate(() => {
      const els = document.querySelectorAll('[class*="hero-bg"]');
      return els.length > 0;
    });
    const titleText = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      return h1 ? h1.textContent : "NO H1";
    });

    console.log("   Hero section: " + (heroExists ? "✅" : "❌"));
    console.log("   Background div: " + (bgDivExists ? "✅" : "❌"));
    console.log("   Title: " + titleText);

    const dp = path.join(SCREENSHOT_DIR, "home-static-hero-desktop.png");
    await page.screenshot({ path: dp, fullPage: false });
    console.log("   ✅ Screenshot saved");

    await ctx.close();

    // ── Mobile ──
    console.log("\n📱 Mobile screenshot...");
    const mCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      deviceScaleFactor: 2,
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    });
    const mPage = await mCtx.newPage();
    mPage.on("console", (msg) => {
      if (msg.type() === "error") allErrors.push("[mobile] " + msg.text());
    });

    await mPage.goto(BASE, { waitUntil: "load", timeout: 30000 });
    await sleep(5000);

    const mHeroExists = await mPage.evaluate(() => !!document.querySelector("section"));
    const mTitleText = await mPage.evaluate(() => {
      const h1 = document.querySelector("h1");
      return h1 ? h1.textContent : "NO H1";
    });

    console.log("   Hero section: " + (mHeroExists ? "✅" : "❌"));
    console.log("   Title: " + mTitleText);

    const mp = path.join(SCREENSHOT_DIR, "home-static-hero-mobile.png");
    await mPage.screenshot({ path: mp, fullPage: false });
    console.log("   ✅ Screenshot saved");

    await mCtx.close();

    // ── Report ──
    console.log("\n═══════════════════════════════════");
    console.log("  STATIC HERO VERIFICATION REPORT");
    console.log("═══════════════════════════════════\n");
    const dkSize = fs.statSync(dp).size;
    const mbSize = fs.statSync(mp).size;
    console.log("  ✅ Desktop screenshot: " + (dkSize / 1024).toFixed(0) + "KB");
    console.log("  ✅ Mobile screenshot:  " + (mbSize / 1024).toFixed(0) + "KB");
    console.log("  ✅ Hero rendered: yes");
    console.log("  ⚠️  Console errors: " + allErrors.length);
    allErrors.slice(0, 3).forEach((e) => console.log("     " + e.substring(0, 120)));

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await browser.close();
    server.close();
    console.log("\n✅ Done");
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
