/**
 * scroll-roundtrip-check.js v2 — Scroll down through hero → reach gateway →
 * scroll back up → scroll down to gateway again. Tests bidirectional scroll works.
 */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const ROOT = path.resolve(__dirname, "..");
const SD = path.join(ROOT, "verification-screenshots");
const URL = "http://localhost:4003";
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function wheelUntil(page, direction, targetY, maxSteps = 40) {
  for (let i = 0; i < maxSteps; i++) {
    const y = await page.evaluate(() => window.scrollY);
    if (direction > 0 && y >= targetY) return { y, steps: i, reached: true };
    if (direction < 0 && y <= targetY) return { y, steps: i, reached: true };
    await page.mouse.wheel(0, direction * 200);
    await sleep(120);
  }
  const finalY = await page.evaluate(() => window.scrollY);
  return { y: finalY, steps: maxSteps, reached: false };
}

async function main() {
  fs.mkdirSync(SD, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }});
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", e => errors.push(e.message));

  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await sleep(5000);
  let results = [];

  // 1. Initial
  let scrollY = await page.evaluate(() => window.scrollY);
  results.push({ check: "Initial scrollY ≈ 0", status: scrollY < 50 ? "✅" : "❌", detail: `${scrollY}` });

  // Find gateway position
  const gwPos = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("section")).find(s =>
      s.textContent?.includes("My AI-native workbench")
    );
    return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : -1;
  });
  console.log(`Gateway at document position: ${gwPos}`);
  await page.screenshot({ path: path.join(SD, "roundtrip-00-initial.png") });

  // 2. Scroll down to gateway (scroll past the pin-spacer into gateway area)
  const scrollTarget = Math.min(gwPos + 200, gwPos);
  const down1 = await wheelUntil(page, 1, scrollTarget + 100);
  scrollY = down1.y;
  const visible1 = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("section")).find(s =>
      s.textContent?.includes("My AI-native workbench")
    );
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top < 900 && r.bottom > 0;
  });
  results.push({ check: "Down: gateway visible", status: visible1 ? "✅" : "❌",
    detail: `scrollY=${scrollY}, gwPos=${gwPos}` });
  await page.screenshot({ path: path.join(SD, "roundtrip-01-gateway.png") });
  console.log(`Down to scrollY=${scrollY}, gateway visible: ${visible1}`);

  // 3. Scroll back up to hero area
  const downScrollY = scrollY;
  const up1 = await wheelUntil(page, -1, 100);
  scrollY = up1.y;
  const atHero = await page.evaluate(() => document.body.innerText.includes("Shannon Fu"));
  results.push({ check: "Up: back to hero", status: atHero ? "✅" : "❌", detail: `scrollY=${scrollY}` });
  await page.screenshot({ path: path.join(SD, "roundtrip-02-back-to-hero.png") });
  console.log(`Up to scrollY=${scrollY}, hero visible: ${atHero}, went from ${downScrollY}`);

  // 4. Scroll down to gateway again
  const down2 = await wheelUntil(page, 1, scrollTarget + 100);
  scrollY = down2.y;
  const visible2 = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("section")).find(s =>
      s.textContent?.includes("My AI-native workbench")
    );
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top < 900 && r.bottom > 0;
  });
  results.push({ check: "Down again: gateway visible", status: visible2 ? "✅" : "❌",
    detail: `scrollY=${scrollY}` });
  await page.screenshot({ path: path.join(SD, "roundtrip-03-gateway-again.png") });
  console.log(`Down again to scrollY=${scrollY}, gateway visible: ${visible2}`);

  // 5. Summary
  results.push({ check: "Roundtrip complete (both directions)", status: (visible1 && atHero && visible2 && scrollY > 200) ? "✅" : "❌" });
  results.push({ check: "Console errors", status: errors.length === 0 ? "✅" : "⚠️", detail: `${errors.length}` });

  console.log("\n═══════════════════════════════════════\n  SCROLL ROUNDTRIP REPORT\n═══════════════════════════════════════\n");
  for (const r of results) console.log(`  ${r.status} ${r.check}${r.detail ? " — " + r.detail : ""}`);
  const pass = results.every(r => r.status === "✅");
  console.log(`\n  OVERALL: ${pass ? "✅ PASSED" : "⚠️ ISSUES"}`);
  await browser.close();
  process.exit(pass ? 0 : 1);
}
main().catch(e => { console.error(e); process.exit(1); });
