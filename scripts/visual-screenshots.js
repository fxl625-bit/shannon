/**
 * visual-screenshots.js — Take verification screenshots for the visual optimization round.
 */

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const SD = path.join(ROOT, "verification-screenshots");
const URL = "http://localhost:4003";

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  fs.mkdirSync(SD, { recursive: true });
  const errors = [];

  const browser = await chromium.launch({ headless: true });

  // ── EN context ──
  const enCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const enPage = await enCtx.newPage();
  enPage.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  enPage.on("pageerror", e => errors.push(e.message));

  await enPage.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await sleep(5000);

  // 1. Hero EN
  await enPage.screenshot({ path: path.join(SD, "visual-home-hero-en.png"), fullPage: false });
  console.log("✅ visual-home-hero-en.png");

  // 3. Gateway EN
  await enPage.evaluate(() => window.scrollTo(0, 6400));
  await sleep(2500);
  await enPage.screenshot({ path: path.join(SD, "visual-gateway-en.png"), fullPage: false });
  console.log("✅ visual-gateway-en.png");

  // 5. Footer EN
  const totalEN = await enPage.evaluate(() => document.body.scrollHeight);
  await enPage.evaluate(y => window.scrollTo(0, y), totalEN - 900);
  await sleep(2500);
  await enPage.screenshot({ path: path.join(SD, "visual-footer-en.png"), fullPage: false });
  console.log("✅ visual-footer-en.png");

  // 7. AI-Agent Knowledge Base page EN
  await enPage.goto(URL + "/second-brain", { waitUntil: "networkidle", timeout: 30000 });
  await sleep(3000);
  await enPage.screenshot({ path: path.join(SD, "visual-ai-agent-kb-en.png"), fullPage: true });
  console.log("✅ visual-ai-agent-kb-en.png");

  await enCtx.close();

  // ── ZH context ──
  const zhCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const zhPage = await zhCtx.newPage();
  await zhPage.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await sleep(2000);
  const zhBtn = await zhPage.$("text=中");
  if (zhBtn) await zhBtn.click();
  await sleep(2000);

  // 2. Hero ZH
  await zhPage.screenshot({ path: path.join(SD, "visual-home-hero-zh.png"), fullPage: false });
  console.log("✅ visual-home-hero-zh.png");

  // 4. Gateway ZH
  await zhPage.evaluate(() => window.scrollTo(0, 6400));
  await sleep(2500);
  await zhPage.screenshot({ path: path.join(SD, "visual-gateway-zh.png"), fullPage: false });
  console.log("✅ visual-gateway-zh.png");

  // 6. Footer ZH
  const totalZH = await zhPage.evaluate(() => document.body.scrollHeight);
  await zhPage.evaluate(y => window.scrollTo(0, y), totalZH - 900);
  await sleep(2500);
  await zhPage.screenshot({ path: path.join(SD, "visual-footer-zh.png"), fullPage: false });
  console.log("✅ visual-footer-zh.png");

  // 8. AI-Agent Knowledge Base page ZH
  await zhPage.goto(URL + "/second-brain", { waitUntil: "networkidle", timeout: 30000 });
  await sleep(3000);
  await zhPage.screenshot({ path: path.join(SD, "visual-ai-agent-kb-zh.png"), fullPage: true });
  console.log("✅ visual-ai-agent-kb-zh.png");

  await zhCtx.close();

  // Summary
  if (errors.length > 0) {
    console.log("\n⚠️ Console errors:");
    errors.forEach(e => console.log(`  ${e}`));
  } else {
    console.log("\n✅ No console errors");
  }

  await browser.close();
  console.log("\nDone! All screenshots saved to verification-screenshots/");
}

main().catch(e => { console.error(e); process.exit(1); });
