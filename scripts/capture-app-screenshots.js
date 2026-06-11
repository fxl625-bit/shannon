const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const SD = path.join(__dirname, "..", "public", "images", "apps");
const ROOT = path.join(__dirname, "..");
const URL = "http://localhost:4003";

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  fs.mkdirSync(SD, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  // --- 1. Capture math-detective from Vercel ---
  console.log("=== Capturing math-detective from Vercel ===");
  try {
    const mdPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await mdPage.goto("https://math-detective.vercel.app/", { waitUntil: "networkidle", timeout: 30000 });
    await sleep(4000);
    await mdPage.screenshot({ path: path.join(SD, "math-detective.png") });
    console.log("math-detective.png captured");
    await mdPage.close();
  } catch(e) { console.log("math-detective from Vercel failed:", e.message); }

  // --- 2. Capture long-fm from Vercel ---
  console.log("=== Capturing long-fm from Vercel ===");
  try {
    const lfPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await lfPage.goto("https://long-fm.vercel.app/", { waitUntil: "networkidle", timeout: 30000 });
    await sleep(4000);
    await lfPage.screenshot({ path: path.join(SD, "long-fm.png") });
    console.log("long-fm.png captured");
    await lfPage.close();
  } catch(e) { console.log("long-fm from Vercel failed:", e.message); }

  // --- 3. Generate rent-tracker mockup ---
  console.log("=== Generating rent-tracker mockup ===");
  try {
    const rtPage = await browser.newPage({ viewport: { width: 800, height: 600 } });
    const rows = [
      ["A-101", "示例租客甲", "¥3,000", "¥3,000", "¥0", "已收", "6/15"],
      ["B-202", "示例租客乙", "¥4,500", "¥4,500", "¥0", "已收", "6/20"],
      ["C-303", "示例租客丙", "¥3,800", "¥0", "¥3,800", "待收", "6/10"],
      ["D-105", "示例租客丁", "¥5,200", "¥2,600", "¥2,600", "部分", "6/25"],
      ["E-408", "示例租客戊", "¥2,800", "¥2,800", "¥0", "已收", "7/1"],
    ];
    const rowHtml = rows.map(r => {
      const statusColor = r[5] === "已收" ? "#4ADE80" : r[5] === "部分" ? "#F5D7A1" : "#FB7185";
      return `<tr style="border-bottom:1px solid rgba(255,255,255,0.03)">
        <td style="padding:8px 6px;color:#F8FAFC">${r[0]}</td>
        <td style="padding:8px 6px;color:#A1A1AA">${r[1]}</td>
        <td style="padding:8px 6px;text-align:right;color:#F8FAFC">${r[2]}</td>
        <td style="padding:8px 6px;text-align:right;color:#A1A1AA">${r[3]}</td>
        <td style="padding:8px 6px;text-align:right;color:${r[4] === "¥0" ? "#4ADE80" : "#FB7185"}">${r[4]}</td>
        <td style="padding:8px 6px;text-align:center"><span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;border:1px solid rgba(255,255,255,0.1);color:${statusColor}">${r[5]}</span></td>
        <td style="padding:8px 6px;text-align:right;color:#71717A">${r[6]}</td>
      </tr>`;
    }).join("");

    const html = `<!DOCTYPE html>
<html style="background:#05070D"><body style="margin:0;padding:20px;font-family:Inter, sans-serif;background:#05070D">
<div style="max-width:700px;margin:0 auto;border:1px solid rgba(255,255,255,0.1);border-radius:16px;background:rgba(255,255,255,0.04);padding:24px">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:16px">
    <div>
      <div style="font-size:16px;font-weight:600;color:#F8FAFC">RentTracker</div>
      <div style="font-size:11px;color:#71717A;letter-spacing:0.12em;text-transform:uppercase;margin-top:4px">收租记录器</div>
    </div>
    <div style="font-size:12px;color:#67E8F9">开发中 · In development</div>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:13px">
    <tr style="border-bottom:1px solid rgba(255,255,255,0.06)">
      <th style="text-align:left;padding:8px 6px;color:#71717A;font-weight:500;font-size:11px">房源</th>
      <th style="text-align:left;padding:8px 6px;color:#71717A;font-weight:500;font-size:11px">租客</th>
      <th style="text-align:right;padding:8px 6px;color:#71717A;font-weight:500;font-size:11px">应收</th>
      <th style="text-align:right;padding:8px 6px;color:#71717A;font-weight:500;font-size:11px">已收</th>
      <th style="text-align:right;padding:8px 6px;color:#71717A;font-weight:500;font-size:11px">未收</th>
      <th style="text-align:center;padding:8px 6px;color:#71717A;font-weight:500;font-size:11px">状态</th>
      <th style="text-align:right;padding:8px 6px;color:#71717A;font-weight:500;font-size:11px">下次收款</th>
    </tr>
    ${rowHtml}
  </table>
  <div style="margin-top:20px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;font-size:12px;color:#71717A">
    <div>本月应收: ¥19,300</div>
    <div>已收: ¥12,900</div>
    <div style="color:#FB7185">待收: ¥6,400</div>
  </div>
</div></body></html>`;
    await rtPage.setContent(html);
    await sleep(500);
    await rtPage.screenshot({ path: path.join(SD, "rent-tracker-mockup.png") });
    console.log("rent-tracker-mockup.png captured");
    await rtPage.close();
  } catch(e) { console.log("rent-tracker mockup failed:", e.message); }

  // --- 4. Copy existing yishiyuanman screenshot ---
  try {
    const src = path.join(ROOT, "public", "images", "yishiyuanman-overview.png");
    const dest = path.join(SD, "yishiyuanman.png");
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log("yishiyuanman.png copied");
    }
  } catch(e) { console.log("yishiyuanman copy:", e.message); }

  await browser.close();
  console.log("Done");
}
main().catch(e => { console.error(e); process.exit(1); });
