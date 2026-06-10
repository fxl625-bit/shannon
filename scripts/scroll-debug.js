const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const ROOT = path.resolve(__dirname, "..");
const SD = path.join(ROOT, "verification-screenshots");
const URL = "http://localhost:4003";
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function main() {
  fs.mkdirSync(SD, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }});
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await sleep(5000);

  // Full layout
  const layout = await page.evaluate(() => {
    const secs = document.querySelectorAll("section");
    const r = [];
    secs.forEach((s, i) => {
      const rect = s.getBoundingClientRect();
      r.push({
        idx: i,
        tag: s.tagName,
        classes: (s.className || "").slice(0, 50),
        top: Math.round(rect.top + window.scrollY),
        height: Math.round(rect.height),
        bottom: Math.round(rect.bottom + window.scrollY),
        text: (s.textContent || "").trim().slice(0, 60).replace(/\n/g, " "),
      });
    });
    return {
      scrollHeight: document.documentElement.scrollHeight,
      bodyScroll: document.body.scrollHeight,
      winHeight: window.innerHeight,
      scrollY: window.scrollY,
      sections: r,
    };
  });
  
  console.log("=== INITIAL LAYOUT ===");
  console.log(`scrollHeight=${layout.scrollHeight}, innerHeight=${layout.winHeight}`);
  layout.sections.forEach(s => {
    console.log(`  #${s.idx} top=${s.top} h=${s.height} bottom=${s.bottom} — "${s.text.slice(0,50)}"`);
  });

  // Find gateway
  const gw = layout.sections.find(s => s.text.includes("personal system"));
  if (gw) console.log(`\nGateway at document position: ${gw.top} - ${gw.bottom} (height=${gw.height})`);

  // Now scroll all the way down in small increments
  console.log("\n=== STEP SCROLL ===");
  let prevY = 0;
  for (let step = 0; step < 30; step++) {
    await page.mouse.wheel(0, 200);
    await sleep(100);
    const y = await page.evaluate(() => window.scrollY);
    if (y > prevY + 100 || step % 5 === 0) {
      const vis = await page.evaluate(() => {
        const el = Array.from(document.querySelectorAll("section")).find(s =>
          s.textContent?.includes("A personal system") || s.textContent?.includes("一个围绕 AI")
        );
        if (!el) return "NO_GATEWAY";
        const r = el.getBoundingClientRect();
        return `top=${Math.round(r.top)}, bot=${Math.round(r.bottom)}, win=900, visible=${r.top < 900 && r.bottom > 0}`;
      });
      console.log(`  step=${step} scrollY=${y} gateway: ${vis}`);
      prevY = y;
    }
  }

  const finalY = await page.evaluate(() => window.scrollY);
  console.log(`\nFinal scrollY: ${finalY}/${layout.scrollHeight}`);
  await page.screenshot({ path: path.join(SD, "scroll-debug-final.png") });

  await browser.close();
}
main().catch(e => { console.error(e); process.exit(1); });
