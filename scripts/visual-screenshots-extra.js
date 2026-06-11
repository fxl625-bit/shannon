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

  // EN
  const enCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const enPage = await enCtx.newPage();

  await enPage.goto(URL + "/apps", { waitUntil: "networkidle", timeout: 30000 });
  await sleep(2000);
  await enPage.screenshot({ path: path.join(SD, "visual-apps-en.png"), fullPage: true });
  console.log("visual-apps-en.png");

  await enPage.goto(URL + "/skills", { waitUntil: "networkidle", timeout: 30000 });
  await sleep(2000);
  await enPage.screenshot({ path: path.join(SD, "visual-workflows-en.png"), fullPage: true });
  console.log("visual-workflows-en.png");

  await enCtx.close();

  // ZH — set localStorage before navigating
  const zhCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const zhPage = await zhCtx.newPage();
  // Set zh locale via localStorage before loading
  await zhPage.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await zhPage.evaluate(() => { localStorage.setItem("shannon-fu-site-locale", "zh"); });
  await sleep(500);

  await zhPage.goto(URL + "/apps", { waitUntil: "networkidle", timeout: 30000 });
  await sleep(2000);
  await zhPage.screenshot({ path: path.join(SD, "visual-apps-zh.png"), fullPage: true });
  console.log("visual-apps-zh.png");

  await zhPage.goto(URL + "/skills", { waitUntil: "networkidle", timeout: 30000 });
  await sleep(2000);
  await zhPage.screenshot({ path: path.join(SD, "visual-workflows-zh.png"), fullPage: true });
  console.log("visual-workflows-zh.png");

  await zhCtx.close();
  await browser.close();
  console.log("Done");
}

main().catch(e => { console.error(e); process.exit(1); });
