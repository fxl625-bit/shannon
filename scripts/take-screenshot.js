const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SD = path.resolve(__dirname, '..', 'verification-screenshots');
fs.mkdirSync(SD, { recursive: true });

(async () => {
  // EN
  const b1 = await chromium.launch({ headless: true });
  const p1 = await (await b1.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p1.goto('http://localhost:4003', { waitUntil: 'networkidle', timeout: 30000 });
  await p1.waitForTimeout(3000);

  await p1.evaluate(() => {
    const el = Array.from(document.querySelectorAll('section')).find(s =>
      s.textContent?.includes('Brand Capability Upgrade')
    );
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await p1.waitForTimeout(1000);
  await p1.screenshot({ path: path.join(SD, 'brand-capability-en.png'), fullPage: false });
  console.log('EN screenshot saved');
  await b1.close();

  // ZH
  const b2 = await chromium.launch({ headless: true });
  const p2 = await (await b2.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p2.goto('http://localhost:4003', { waitUntil: 'networkidle', timeout: 30000 });
  await p2.waitForTimeout(2000);

  // Find and click the language switch button
  await p2.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const zhBtn = btns.find(b => b.textContent?.includes('\u4e2d') || b.textContent?.includes('ZH'));
    if (zhBtn) zhBtn.click();
  });
  await p2.waitForTimeout(800);

  await p2.evaluate(() => {
    const el = Array.from(document.querySelectorAll('section')).find(s =>
      s.textContent?.includes('\u54c1\u724c\u80fd\u529b\u5347\u7ea7')
    );
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await p2.waitForTimeout(1000);
  await p2.screenshot({ path: path.join(SD, 'brand-capability-zh.png'), fullPage: false });
  console.log('ZH screenshot saved');
  await b2.close();

  // Mobile
  const b3 = await chromium.launch({ headless: true });
  const p3 = await (await b3.newContext({ viewport: { width: 375, height: 812 } })).newPage();
  await p3.goto('http://localhost:4003', { waitUntil: 'networkidle', timeout: 30000 });
  await p3.waitForTimeout(3000);

  await p3.evaluate(() => {
    const el = Array.from(document.querySelectorAll('section')).find(s =>
      s.textContent?.includes('Brand Capability Upgrade')
    );
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await p3.waitForTimeout(1000);
  await p3.screenshot({ path: path.join(SD, 'brand-capability-mobile.png'), fullPage: true });
  console.log('Mobile screenshot saved');
  await b3.close();

  console.log('All screenshots done');
})();
