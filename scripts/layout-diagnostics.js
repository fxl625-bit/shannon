/**
 * layout-diagnostics.js — Measure DOM heights to find the blank gap source.
 */
const { chromium } = require("playwright");
const http = require("http");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out-v3");
const SCREENSHOT_DIR = path.join(ROOT, "verification-screenshots");
const PORT = 3481;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function serve(base) {
  const MIME = { ".html":"text/html",".js":"text/javascript",".css":"text/css",
    ".png":"image/png",".webp":"image/webp",".jpg":"image/jpeg",".json":"application/json" };
  return http.createServer((req, res) => {
    const u = new URL(req.url, "http://localhost");
    let fp = path.join(base, u.pathname === "/" ? "index.html" : u.pathname);
    fp = path.normalize(fp);
    if (!fp.startsWith(base)) { res.writeHead(403); res.end(); return; }
    try {
      const d = fs.readFileSync(fp);
      res.writeHead(200,{"Content-Type":MIME[path.extname(fp).toLowerCase()]||"application/octet-stream"});
      res.end(d);
    } catch {
      try { const d = fs.readFileSync(path.join(fp,"index.html")); res.writeHead(200,{"Content-Type":"text/html"}); res.end(d); }
      catch { res.writeHead(404); res.end(); }
    }
  });
}

async function main() {
  const server = serve(OUT_DIR);
  await new Promise(r => server.listen(PORT, r));
  console.log("Server on :"+PORT);

  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle", timeout: 30000 });
  await sleep(5000);

  // DOM height diagnostics
  const diag = await page.evaluate(() => {
    const items = [];
    const all = document.querySelectorAll("section, main > div, .pin-spacer, footer");
    all.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const rawText = (el.textContent || "").trim().slice(0, 100);
      items.push({
        index: i,
        tag: el.tagName,
        classNames: (el.className && typeof el.className === "string") ? el.className.slice(0, 80) : "",
        top: Math.round(r.top + window.scrollY),
        height: Math.round(r.height),
        bottom: Math.round(r.bottom + window.scrollY),
        marginTop: cs.marginTop,
        marginBottom: cs.marginBottom,
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        textPreview: rawText,
      });
    });
    return {
      bodyScrollHeight: document.body.scrollHeight,
      viewportHeight: window.innerHeight,
      items
    };
  });

  const outPath = path.join(SCREENSHOT_DIR, "layout-height-diagnostics.json");
  fs.writeFileSync(outPath, JSON.stringify(diag, null, 2));
  console.log("\n=== LAYOUT DIAGNOSTICS ===");
  console.log("bodyScrollHeight:", diag.bodyScrollHeight, "viewport:", diag.viewportHeight);
  for (const item of diag.items) {
    const blanks = !item.textPreview ? " ⚠️ EMPTY" : "";
    console.log(`  #${item.index} ${item.tag} top=${item.top} h=${item.height} bottom=${item.bottom}${blanks}`);
    if (item.textPreview) console.log(`     "${item.textPreview}"`);
  }

  // Find gaps
  console.log("\n=== GAP ANALYSIS ===");
  for (let i = 1; i < diag.items.length; i++) {
    const prev = diag.items[i - 1];
    const curr = diag.items[i];
    const gap = curr.top - prev.bottom;
    if (gap > 200) {
      console.log(`  ⚠️ GAP ${gap}px between #${prev.index} (bottom=${prev.bottom}) and #${curr.index} (top=${curr.top})`);
    }
  }

  // Count pin-spacers
  const pinSpacers = diag.items.filter(i => i.classNames.includes("pin-spacer"));
  console.log(`\n  pin-spacer count: ${pinSpacers.length}`);

  // Find the "A personal system" section
  const introSection = diag.items.find(i => i.textPreview.includes("personal system"));
  if (introSection) {
    console.log(`  "A personal system" at top=${introSection.top}`);
    // Find the gap from pin end to this section
    const pinItem = diag.items.find(i => i.classNames.includes("sticky") || i.classNames.includes("pin-spacer"));
    if (pinItem) {
      const gap = introSection.top - pinItem.bottom;
      console.log(`  Gap from pin bottom (${pinItem.bottom}) to intro (${introSection.top}): ${gap}px`);
    }
  }

  // Screenshots
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "after-pin-end.png"), fullPage: false });
  // Scroll to where the pin ends + gap
  if (introSection) {
    const scrollTo = Math.max(0, introSection.top - 100);
    await page.evaluate(y => window.scrollTo(0, y), scrollTo);
    await sleep(1000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "after-sequence-section.png"), fullPage: false });
  }
  // Page bottom
  await page.evaluate(y => window.scrollTo(0, y), diag.bodyScrollHeight - 900);
  await sleep(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "page-bottom.png"), fullPage: false });

  await browser.close();
  server.close();
  console.log("\nDone. Diagnostics saved to " + outPath);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
