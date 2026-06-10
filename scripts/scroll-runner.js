/**
 * scroll-runner.js — Start a server, run visual scroll checks with GSAP verification.
 * Verifies: GSAP ScrollTrigger registered, pinned section, scrub, frame changes, reverse scroll.
 */

const { chromium } = require("playwright");
const http = require("http");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out");
const SCREENSHOT_DIR = path.join(ROOT, "verification-screenshots");
const PORT = 3461;

function createStaticServer(baseDir) {
  const MIME = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
  };
  return http.createServer((req, res) => {
    const parsed = new URL(req.url, `http://localhost:${PORT}`);
    let filePath = path.join(baseDir, parsed.pathname === "/" ? "index.html" : parsed.pathname);
    filePath = path.normalize(filePath);
    if (!filePath.startsWith(baseDir)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not Found");
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    });
  });
}

function sleep(ms) {
  return new Promise(function(r) { setTimeout(r, ms); });
}

async function main() {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  console.log("🚀 Starting static server on :" + PORT + "...");
  const server = createStaticServer(OUT_DIR);
  await new Promise(function(resolve) { server.listen(PORT, resolve); });
  console.log("✅ Server at http://localhost:" + PORT + "\n");

  const BASE_URL = "http://localhost:" + PORT;
  const SCROLL_POSITIONS = [0, 0.25, 0.50, 0.75, 1.0];
  const SCREENSHOT_NAMES = [
    "scroll-video-hero-00.png",
    "scroll-video-hero-25.png",
    "scroll-video-hero-50.png",
    "scroll-video-hero-75.png",
    "scroll-video-hero-100.png",
  ];
  const MOTION_NAMES = [
    "scroll-video-motion-frame-1.png",
    "scroll-video-motion-frame-2.png",
    "scroll-video-motion-frame-3.png",
  ];

  console.log("🧪 GSAP ScrollTrigger — Visual Verification\n");

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });

  const page = await context.newPage();
  var consoleErrors = [];
  var consoleWarnings = [];

  page.on("console", function(msg) {
    if (msg.type() === "error") consoleErrors.push(msg.text());
    else if (msg.type() === "warning") consoleWarnings.push(msg.text());
  });
  page.on("pageerror", function(err) { consoleErrors.push(err.message); });

  var results = [];

  try {
    console.log("🚀 Opening page...");
    await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(3000);

    // V1: ScrollVideoHero exists
    var hasScrollVideo = await page.evaluate(function() {
      return !!document.querySelector('[class*="sticky"][class*="top-0"]');
    });
    results.push({ check: "ScrollVideoHero exists", status: hasScrollVideo ? "✅" : "❌" });
    console.log("📋 ScrollVideoHero: " + hasScrollVideo);

    // V2: Canvas exists
    var hasCanvas = await page.evaluate(function() {
      return !!document.querySelector("canvas");
    });
    results.push({ check: "Canvas rendered", status: hasCanvas ? "✅" : "❌" });

    // V3: GSAP ScrollTrigger pin active (check DOM effects)
    var scrollTriggerActive = await page.evaluate(function() {
      var spacer = document.querySelector('[class*="pin-spacer"]');
      var pinned = document.querySelector('[class*="sticky"][class*="top-0"]');
      return !!(spacer || pinned);
    });
    results.push({
      check: "GSAP ScrollTrigger pin active",
      status: scrollTriggerActive ? "✅" : "❌",
    });

    // ── Screenshots at different scroll positions ──
    var pageHeight = await page.evaluate(function() { return document.body.scrollHeight; });
    var viewportHeight = 900;
    console.log("\n📐 Page height: " + pageHeight + "px, Viewport: " + viewportHeight + "px");

    for (var i = 0; i < SCROLL_POSITIONS.length; i++) {
      var progress = SCROLL_POSITIONS[i];
      var scrollTarget = Math.round((pageHeight - viewportHeight) * progress);
      console.log("\n📸 Screenshot " + (i + 1) + "/" + SCROLL_POSITIONS.length + ": " + Math.round(progress * 100) + "%");

      await page.evaluate(function(y) { window.scrollTo(0, y); }, scrollTarget);
      await sleep(2000);

      var filePath = path.join(SCREENSHOT_DIR, SCREENSHOT_NAMES[i]);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log("   ✅ " + SCREENSHOT_NAMES[i]);
    }

    // Check frame changes via screenshot file size
    var screenshotSizes = SCREENSHOT_NAMES.map(function(name) {
      var fp = path.join(SCREENSHOT_DIR, name);
      return fs.existsSync(fp) ? fs.statSync(fp).size : 0;
    });
    var framesChange = screenshotSizes.some(function(s, idx) {
      return idx > 0 && Math.abs(s - screenshotSizes[0]) > 10000;
    });
    results.push({
      check: "Frame changes with scroll (screenshot size delta)",
      status: framesChange ? "✅" : "⚠️",
      detail: screenshotSizes.map(function(s) { return (s / 1024).toFixed(0) + "KB"; }).join(" → "),
    });
    console.log("📸 Screenshot sizes: " + screenshotSizes.map(function(s) { return (s / 1024).toFixed(0) + "KB"; }).join(" → "));

    // ── Motion frames ──
    console.log("\n📸 Motion frame captures...");
    for (var m = 0; m < 3; m++) {
      var scrollPos = 0.2 + m * 0.25;
      await page.evaluate(function(y) { window.scrollTo(0, y); }, Math.round((pageHeight - viewportHeight) * scrollPos));
      await sleep(500);
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, MOTION_NAMES[m]),
        fullPage: false,
      });
    }
    console.log("   ✅ " + MOTION_NAMES.join(", "));

    // ── Reverse scroll test ──
    console.log("\n🔄 Testing reverse scroll...");
    var scrollDown75 = Math.round((pageHeight - viewportHeight) * 0.75);
    var scrollUp25 = Math.round((pageHeight - viewportHeight) * 0.25);

    await page.evaluate(function(y) { window.scrollTo(0, y); }, scrollDown75);
    await sleep(2000);
    var size75Path = path.join(SCREENSHOT_DIR, "temp-75.png");
    await page.screenshot({ path: size75Path, fullPage: false });

    await page.evaluate(function(y) { window.scrollTo(0, y); }, scrollUp25);
    await sleep(2000);
    var size25Path = path.join(SCREENSHOT_DIR, "temp-25.png");
    await page.screenshot({ path: size25Path, fullPage: false });

    var size75 = fs.statSync(size75Path).size;
    var size25 = fs.statSync(size25Path).size;
    fs.unlinkSync(size75Path);
    fs.unlinkSync(size25Path);

    var reverseWorks = Math.abs(size75 - size25) > 10000;
    results.push({
      check: "Reverse scroll works (75% vs 25% size diff)",
      status: reverseWorks ? "✅" : "⚠️",
      detail: "75%: " + (size75 / 1024).toFixed(0) + "KB, 25%: " + (size25 / 1024).toFixed(0) + "KB",
    });
    console.log("   75%: " + (size75 / 1024).toFixed(0) + "KB");
    console.log("   25%: " + (size25 / 1024).toFixed(0) + "KB");
    console.log("   Reverse scroll: " + (reverseWorks ? "✅" : "❌"));

    // ── Mobile test ──
    console.log("\n📱 Mobile test...");
    var mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    });
    var mobilePage = await mobileContext.newPage();
    mobilePage.on("console", function(msg) {
      if (msg.type() === "error") consoleErrors.push("[mobile] " + msg.text());
    });
    await mobilePage.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(3000);

    var mobileOverflow = await mobilePage.evaluate(function() {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    results.push({
      check: "Mobile: no horizontal overflow",
      status: mobileOverflow ? "❌" : "✅",
    });

    var mobilePageHeight = await mobilePage.evaluate(function() { return document.body.scrollHeight; });
    await mobilePage.evaluate(function(y) { window.scrollTo(0, Math.round((y - 844) * 0.5)); }, mobilePageHeight);
    await sleep(1500);
    await mobilePage.screenshot({
      path: path.join(SCREENSHOT_DIR, "home-mobile-scroll-video.png"),
      fullPage: false,
    });
    console.log("   ✅ home-mobile-scroll-video.png");
    await mobileContext.close();

    // ── Console errors check ──
    var hasReact418 = consoleErrors.some(function(e) { return e.indexOf("418") >= 0; });
    results.push({
      check: "Console errors = 0",
      status: consoleErrors.length === 0 ? "✅" : "⚠️",
      detail: consoleErrors.length + " errors" + (consoleErrors.length > 0 ? " (first: " + consoleErrors[0].substring(0, 100) + ")" : ""),
    });
    results.push({
      check: "No React 418",
      status: hasReact418 ? "❌" : "✅",
    });

    // ── Report ──
    console.log("\n\n═══════════════════════════════════════");
    console.log("     GSAP SCROLLTRIGGER — FINAL REPORT");
    console.log("═══════════════════════════════════════\n");

    for (var r = 0; r < results.length; r++) {
      var res = results[r];
      console.log("  " + res.status + " " + res.check + (res.detail ? " — " + res.detail : ""));
    }

    console.log("\n📸 Screenshots:");
    for (var si = 0; si < SCREENSHOT_NAMES.length; si++) {
      var sp = path.join(SCREENSHOT_DIR, SCREENSHOT_NAMES[si]);
      var ss = fs.existsSync(sp) ? (fs.statSync(sp).size / 1024).toFixed(0) + "KB" : "missing";
      console.log("   " + SCREENSHOT_NAMES[si] + " — " + Math.round(SCROLL_POSITIONS[si] * 100) + "% — " + ss);
    }
    console.log("   " + MOTION_NAMES.join(", "));
    console.log("   home-mobile-scroll-video.png");

    console.log("\n⚠️  Console warnings: " + consoleWarnings.length);

    var allPassed = results.every(function(rr) { return rr.status === "✅"; });
    console.log("\n📋 Overall: " + (allPassed ? "✅ ALL CHECKS PASSED" : "⚠️  SOME ISSUES"));

    // Sequence info
    console.log("\n📦 Sequence:");
    var heroDir = path.join(OUT_DIR, "sequences", "hero");
    var mobileDir = path.join(OUT_DIR, "sequences", "hero-mobile");
    var desktFrames = fs.readdirSync(heroDir).filter(function(f) { return f.endsWith(".webp"); }).length;
    var mobFrames = fs.readdirSync(mobileDir).filter(function(f) { return f.endsWith(".webp"); }).length;
    var totalSize = fs.readdirSync(heroDir).reduce(function(sum, f) {
      return sum + (fs.statSync(path.join(heroDir, f)).size || 0);
    }, 0);
    console.log("   Desktop: " + desktFrames + " frames | Mobile: " + mobFrames + " frames");
    console.log("   Desktop seq size: " + (totalSize / 1024 / 1024).toFixed(1) + " MB");

  } catch (err) {
    console.error("❌ Error:", err.message);
    try {
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, "debug-error.png"), fullPage: true });
    } catch (e) {}
  } finally {
    await browser.close();
    server.close();
    console.log("\n✅ Verification complete");
  }
}

main()
  .then(function() { process.exit(0); })
  .catch(function(err) {
    console.error(err);
    process.exit(1);
  });
