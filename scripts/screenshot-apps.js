const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SD = path.resolve(__dirname, '..', 'verification-screenshots');
fs.mkdirSync(SD, { recursive: true });

(async () => {
  // EN - Apps page
  const b1 = await chromium.launch({ headless: true });
  const p1 = await (await b1.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p1.goto('http://localhost:4003/apps', { waitUntil: 'networkidle', timeout: 30000 });
  await p1.waitForTimeout(3000);
  await p1.screenshot({ path: path.join(SD, 'apps-en-full.png'), fullPage: true });
  console.log('EN apps full page saved');
  await b1.close();

  // ZH - Apps page
  const b2 = await chromium.launch({ headless: true });
  const p2 = await (await b2.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p2.goto('http://localhost:4003/apps', { waitUntil: 'networkidle', timeout: 30000 });
  await p2.waitForTimeout(2000);
  const btns = await p2.locator('button').all();
  for (const btn of btns) {
    const text = await btn.textContent();
    if (text && text.includes('\u4e2d')) {
      await btn.click();
      break;
    }
  }
  await p2.waitForTimeout(800);
  await p2.screenshot({ path: path.join(SD, 'apps-zh-full.png'), fullPage: true });
  console.log('ZH apps full page saved');
  await b2.close();

  console.log('All screenshots done');
})();
