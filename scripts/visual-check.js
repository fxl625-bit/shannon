#!/usr/bin/env node
/**
 * visual-check.js
 * Serves the static export (out/) via HTTP, takes Playwright screenshots.
 * Handles _next/static paths correctly for full fidelity.
 */

const path = require("path");
const fs = require("fs");
const http = require("http");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const SCREENSHOT_DIR = path.join(PROJECT_ROOT, "verification-screenshots");
const OUT_DIR = path.join(PROJECT_ROOT, "out");
const PORT = 3099;

const SHOTS = {
  "home-desktop-hero": { w: 1440, h: 900, file: "home-desktop-hero.png" },
  "home-desktop-potential-map": { w: 1440, h: 900, file: "home-desktop-potential-map.png" },
  "home-desktop-experiments": { w: 1440, h: 900, file: "home-desktop-experiments.png" },
  "home-mobile-hero": { w: 390, h: 844, file: "home-mobile-hero.png" },
};

const MIME = {
  ".html": "text/html", ".js": "application/javascript",
  ".css": "text/css", ".png": "image/png", ".glb": "model/gltf-binary",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".json": "application/json",
  ".woff2": "font/woff2", ".woff": "font/woff", ".txt": "text/plain",
  ".map": "application/json",
};

function serveOut(req, res) {
  let decodedUrl = decodeURIComponent(req.url.split("?")[0]);

  // Map root → /index.html, /cases → /cases/index.html etc.
  let filePath;
  if (decodedUrl === "/" || decodedUrl === "") {
    filePath = path.join(OUT_DIR, "index.html");
  } else if (decodedUrl.endsWith("/")) {
    filePath = path.join(OUT_DIR, decodedUrl, "index.html");
  } else {
    // Try exact path first
    filePath = path.join(OUT_DIR, decodedUrl);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      // If no exact match, try adding /index.html (for SPA routes)
      const indexPath = path.join(OUT_DIR, decodedUrl, "index.html");
      if (fs.existsSync(indexPath)) {
        filePath = indexPath;
      }
    }
  }

  try {
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      // Fall back to 404 page
      filePath = path.join(OUT_DIR, "404", "index.html");
      if (!fs.existsSync(filePath)) {
        res.writeHead(404); res.end("404");
        return;
      }
    }
    const ext = path.extname(filePath);
    const content = fs.readFileSync(filePath);
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Content-Length": content.length,
    });
    res.end(content);
  } catch {
    res.writeHead(404); res.end("404");
  }
}

function waitForServer(url, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) resolve(true);
        else if (Date.now() - start > timeoutMs) reject(new Error("Timeout"));
        else setTimeout(check, 300);
      }).on("error", () => {
        if (Date.now() - start > timeoutMs) reject(new Error("Timeout"));
        else setTimeout(check, 300);
      });
    };
    check();
  });
}

async function main() {
  console.log("=== Visual Check ===");
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  // Start static server
  console.log("[1/4] Starting server on out/...");
  const server = http.createServer(serveOut);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`  Server at http://localhost:${PORT}`);

  const url = `http://localhost:${PORT}`;
  await waitForServer(url);

  try {
    console.log("[2/4] Launching Playwright...");
    const { chromium } = require("playwright");
    const browser = await chromium.launch({ headless: true });

    const consoleErrors = [];
    const glbRequests = [];

    console.log("[3/4] Taking screenshots...");

    // Desktop — home hero + motion frames
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
      page.on("pageerror", (err) => consoleErrors.push(err.message));
      page.on("request", (req) => { if (req.url().includes("hero-orb.glb")) glbRequests.push(req.url()); });
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, SHOTS["home-desktop-hero"].file), fullPage: false });
      console.log(`  ${SHOTS["home-desktop-hero"].file}`);

      // Motion frames
      for (let f = 1; f <= 3; f++) {
        await page.waitForTimeout(1500);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, `hero-motion-frame-${f}.png`), fullPage: false });
        console.log(`  hero-motion-frame-${f}.png`);
      }
      await ctx.close();
    }

    // Desktop — Potential Map
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
      page.on("pageerror", (err) => consoleErrors.push(err.message));
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      // Scroll to Potential Map section with offset for header
      await page.evaluate(() => {
        const el = document.querySelector("#experiments");
        if (el) el.scrollIntoView({ behavior: "instant" });
        window.scrollBy(0, -100);
      });
      // Wait for IntersectionObserver to fire + Reveal animations to finish
      await page.waitForTimeout(2000);
      // Confirm at least one node card is fully visible (opacity=1 after animation)
      await page.waitForSelector('[data-node-id]', { state: "visible", timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, SHOTS["home-desktop-potential-map"].file), fullPage: false });
      console.log(`  ${SHOTS["home-desktop-potential-map"].file}`);
      await ctx.close();
    }

    // Desktop — Experiments (scroll-triggered, viewport screenshot only)
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
      page.on("pageerror", (err) => consoleErrors.push(err.message));
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      // Scroll all the way down to trigger every Reveal animation
      await page.waitForTimeout(500);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1500);
      // Scroll back up to the Experiments section for a clean viewport shot
      await page.evaluate(() => {
        const el = document.querySelector("#experiments ~ section");
        // Experiments is after PotentialMap (#experiments); find the next section or use a known anchor
        // Fallback: find the section that contains experiment cards
        const sections = document.querySelectorAll("section");
        for (const s of sections) {
          if (s.textContent?.includes("Possibilities") || s.textContent?.includes("探索的可能性") || s.textContent?.includes("Featured Experiments") || s.textContent?.includes("实验档案")) {
            s.scrollIntoView({ behavior: "instant" });
            window.scrollBy(0, -80);
            break;
          }
        }
      });
      await page.waitForTimeout(1500);
      // Verify cards are visible and not blurry
      await page.waitForFunction(() => {
        const cards = document.querySelectorAll('[class*="rounded-2xl"]');
        if (cards.length === 0) return false;
        return Array.from(cards).some((c) => {
          const style = window.getComputedStyle(c);
          return style.opacity === "1" && (style.filter === "none" || !style.filter.includes("blur"));
        });
      }, { timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, SHOTS["home-desktop-experiments"].file),
        fullPage: false,
      });
      console.log(`  ${SHOTS["home-desktop-experiments"].file}`);
      await ctx.close();
    }

    // Mobile — hero
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, SHOTS["home-mobile-hero"].file), fullPage: false });
      console.log(`  ${SHOTS["home-mobile-hero"].file}`);
      await ctx.close();
    }

    // Summary
    console.log("");
    console.log("[4/4] Results:");
    console.log(`  GLB requests: ${glbRequests.length}`);
    console.log(`  Console errors (${consoleErrors.length}):`);
    consoleErrors.slice(0, 5).forEach((e, i) => console.log(`    ${i+1}. ${e}`));
    console.log("  Screenshot files:");
    for (const [, info] of Object.entries(SHOTS)) {
      const fp = path.join(SCREENSHOT_DIR, info.file);
      const sz = fs.existsSync(fp) ? (fs.statSync(fp).size / 1024).toFixed(1) + " KB" : "MISSING";
      console.log(`    ${info.file}: ${sz}`);
    }
    for (let f = 1; f <= 3; f++) {
      const fp = path.join(SCREENSHOT_DIR, `hero-motion-frame-${f}.png`);
      const sz = fs.existsSync(fp) ? (fs.statSync(fp).size / 1024).toFixed(1) + " KB" : "MISSING";
      console.log(`    hero-motion-frame-${f}.png: ${sz}`);
    }

    await browser.close();
    console.log("Done.");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    server.close();
  }
}

main().catch(console.error);
