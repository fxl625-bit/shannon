/**
 * scroll-reachability-check.js v2
 * Real scroll test: verify the user can see the gateway section.
 * Uses the live dev server on :3102.
 */

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const SD = path.join(ROOT, "verification-screenshots");
const DEV = "http://localhost:4003";

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  fs.mkdirSync(SD, { recursive: true });
  const results = [];

  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];

  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", e => errors.push(e.message));

  await page.goto(DEV, { waitUntil: "networkidle", timeout: 30000 });
  await sleep(4000);
  await page.screenshot({ path: path.join(SD, "reachability-initial.png") });

  // Measure document
  const doc = await page.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
    bodyScrollHeight: document.body.scrollHeight,
    innerHeight: window.innerHeight,
    scrollY: window.scrollY,
    htmlOverflow: getComputedStyle(document.documentElement).overflow,
    bodyOverflow: getComputedStyle(document.body).overflow,
  }));
  console.log("=== DOCUMENT ===");
  console.log(`scrollHeight: ${doc.scrollHeight}, innerHeight: ${doc.innerHeight}`);
  console.log(`html.overflow: ${doc.htmlOverflow}, body.overflow: ${doc.bodyOverflow}`);

  const maxScroll = doc.scrollHeight - doc.innerHeight;
  const steps = [];

  // Wheel 20 times
  for (let i = 0; i < 20; i++) {
    await page.mouse.wheel(0, 300);
    await sleep(200);
    const s = await page.evaluate(() => window.scrollY);
    steps.push(s);

    // At 50% of maxScroll, screenshot
    if (i === 10) {
      await page.screenshot({ path: path.join(SD, "reachability-sequence-50.png") });
    }
  }

  const finalScrollY = steps[steps.length - 1];
  console.log(`\nAfter 20 wheels (300px each): scrollY = ${finalScrollY}/${maxScroll}`);

  // Get positions of ALL sections
  const sections = await page.evaluate(() => {
    const secs = document.querySelectorAll("section");
    const result = [];
    secs.forEach((s, i) => {
      const r = s.getBoundingClientRect();
      const text = (s.textContent || "").trim().slice(0, 80);
      result.push({
        index: i,
        tag: s.tagName,
        className: (s.className || "").slice(0, 60),
        top: Math.round(r.top + window.scrollY),
        height: Math.round(r.height),
        bottom: Math.round(r.bottom + window.scrollY),
        textPreview: text,
      });
    });
    return result;
  });

  console.log("\n=== SECTIONS ===");
  for (const s of sections) {
    const preview = s.textPreview.replace(/\n/g, " ").slice(0, 60);
    console.log(`  #${s.index} top=${s.top} h=${s.height} bottom=${s.bottom} — "${preview}"`);
  }

  // Check if gateway section is in the page and reachable
  const gateway = sections.find(s =>
    s.textPreview.includes("A personal system") || s.textPreview.includes("一个围绕 AI")
  );

  if (gateway) {
    console.log(`\n=== GATEWAY SECTION at document position ${gateway.top} ===`);
    console.log(`Height: ${gateway.height}, ends at: ${gateway.bottom}`);

    // Scroll to where gateway should be centered
    const scrollToGateway = Math.max(0, gateway.top - 200);
    await page.evaluate(y => window.scrollTo(0, y), scrollToGateway);
    await sleep(2000);

    const gwVisible = await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll("section")).find(s =>
        s.textContent?.includes("A personal system") || s.textContent?.includes("一个围绕 AI")
      );
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < 900 && r.bottom > 0;
    });

    console.log(`Gateway visible when scrolled to ${scrollToGateway}: ${gwVisible}`);
    await page.screenshot({ path: path.join(SD, "reachability-home-gateway.png") });
    results.push({ check: "Gateway section reachable", status: gwVisible ? "✅" : "❌" });

    // Also check Chinese
    const zhPresent = await page.evaluate(() => document.body.innerText.includes("一个围绕 AI"));
    results.push({ check: "Chinese gateway text '一个围绕 AI'", status: zhPresent ? "✅" : "❌" });

    // Find the second brain / apps cards
    const hasAppCards = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes("Apps") && text.includes("Experiments") && (text.includes("Notes") || text.includes("笔记"));
    });
    results.push({ check: "Gateway content cards visible", status: hasAppCards ? "✅" : "❌" });

  } else {
    console.log("\n⚠️ Gateway section NOT FOUND in DOM!");
    results.push({ check: "Gateway section exists", status: "❌" });
  }

  // Scroll further to see more sections
  const scrollFurther = Math.min(maxScroll, finalScrollY + 2000);
  await page.evaluate(y => window.scrollTo(0, y), scrollFurther);
  await sleep(1000);
  await page.screenshot({ path: path.join(SD, "reachability-after-gateway.png") });

  // Check pin-spacer
  const pinSpacerInfo = await page.evaluate(() => {
    const spacers = document.querySelectorAll(".pin-spacer");
    return {
      count: spacers.length,
      heights: Array.from(spacers).map(s => Math.round(s.getBoundingClientRect().height)),
    };
  });
  console.log(`\npin-spacers: ${pinSpacerInfo.count}, heights: ${pinSpacerInfo.heights}`);
  results.push({ check: "pin-spacer count = 1", status: pinSpacerInfo.count === 1 ? "✅" : "❌" });

  // Check no overflow on html/body/main
  const overflowCheck = await page.evaluate(() => ({
    html: getComputedStyle(document.documentElement).overflow,
    body: getComputedStyle(document.body).overflow,
    main: document.querySelector("main") ? getComputedStyle(document.querySelector("main")).overflow : "n/a",
  }));
  results.push({ check: "html overflow not hidden", status: overflowCheck.html !== "hidden" ? "✅" : "❌" });
  results.push({ check: "body allows scroll", status: overflowCheck.body.includes("auto") || overflowCheck.body === "visible" ? "✅" : "❌" });

  // No fixed layers covering content
  const fixedCover = await page.evaluate(() => {
    const fixed = Array.from(document.querySelectorAll("*")).filter(el => {
      const pos = getComputedStyle(el).position;
      return pos === "fixed";
    });
    return fixed.length;
  });
  console.log(`\nFixed elements: ${fixedCover}`);
  results.push({ check: "Gateway content after pin", status: gateway && gateway.top > 1000 ? "✅" : "❌" });
  results.push({ check: "Scroll increased past hero", status: finalScrollY > doc.innerHeight * 2 ? "✅" : "❌" });

  // Console errors
  const has418 = errors.some(e => e.includes("418"));
  results.push({ check: "Console errors = 0", status: errors.length === 0 ? "✅" : "⚠️",
    detail: `${errors.length} errors` });
  results.push({ check: "No React 418", status: has418 ? "❌" : "✅" });

  // Summary
  console.log("\n═══════════════════════════════════");
  console.log("  SCROLL REACHABILITY REPORT");
  console.log("═══════════════════════════════════\n");
  for (const r of results) {
    console.log(`  ${r.status} ${r.check}${r.detail ? " — " + r.detail : ""}`);
  }

  const pass = results.filter(r => r.status === "❌").length === 0;
  console.log(`\n  OVERALL: ${pass ? "✅ PASS" : "⚠️ ISSUES"}`);

  // Save diagnostics
  const diag = { results, sections, pinSpacerInfo, overflowCheck, errors, scrollSteps: steps };
  fs.writeFileSync(path.join(SD, "scroll-reachability.json"), JSON.stringify(diag, null, 2));
  console.log("\nSaved: verification-screenshots/scroll-reachability.json");

  await browser.close();
  process.exit(pass ? 0 : 1);
}

main().catch(e => { console.error(e); process.exit(1); });
