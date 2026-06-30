/**
 * Visual verification for the current homepage experience.
 */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const URL = "http://localhost:4003";
const OUTPUT = path.join(ROOT, "verification-screenshots");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function scrollTo(page, y) {
  await page.evaluate((target) => window.scrollTo({ top: target, behavior: "instant" }), y);
  await sleep(1200);
}

async function centerLocator(page, locator) {
  await locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top - window.innerHeight * 0.28,
      behavior: "instant",
    });
  });
  await sleep(1000);
}

async function main() {
  fs.mkdirSync(OUTPUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  const responses404 = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() === 404) responses404.push(response.url());
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await sleep(3000);

  const initial = await page.evaluate(() => ({
    hasCanvas: Boolean(document.querySelector("canvas")),
    canvasCount: document.querySelectorAll("canvas").length,
    hasHero: document.body.innerText.includes("Shannon Fu"),
    hasCapability: document.body.innerText.includes("Input → Expression → Deposit"),
    hasWorkflow: document.body.innerText.includes("From Signal to Output"),
    hasProjectCards: ["一世圆满", "数学侦探", "收租记录器", "long-fm"].some((name) =>
      document.body.innerText.includes(name),
    ),
    hasErrorOverlay: Boolean(
      document.querySelector(
        "[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay",
      ),
    ),
  }));

  await page.screenshot({
    path: path.join(OUTPUT, "v2-home-hero-start.png"),
  });
  await scrollTo(page, 2700);
  await page.screenshot({
    path: path.join(OUTPUT, "v2-home-hero-middle.png"),
  });
  await scrollTo(page, 5200);
  await page.screenshot({
    path: path.join(OUTPUT, "v2-home-hero-end.png"),
  });

  const capabilityHeading = page.getByText("Input → Expression → Deposit", { exact: true });
  await centerLocator(page, capabilityHeading);
  await page.screenshot({
    path: path.join(OUTPUT, "v2-brand-capability-default.png"),
  });

  const narrativeNode = page.getByRole("button", { name: /Narrative/ });
  await narrativeNode.hover();
  await page.mouse.move(760, 520);
  await page.mouse.move(830, 560, { steps: 5 });
  await sleep(220);
  await page.screenshot({
    path: path.join(OUTPUT, "v2-brand-capability-hover-ripple.png"),
  });

  const workflowHeading = page.getByText("From Signal to Output", { exact: true }).last();
  await centerLocator(page, workflowHeading);
  await sleep(1400);
  const outputNode = page.getByRole("button", { name: /Output/ });
  await outputNode.hover();
  await page.screenshot({
    path: path.join(OUTPUT, "v2-workflow-active.png"),
  });

  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await sleep(700);
  await page.screenshot({
    path: path.join(OUTPUT, "v2-footer.png"),
  });

  await page.goto(`${URL}/apps`, { waitUntil: "networkidle", timeout: 30000 });
  const mathCard = page.locator("article").filter({ hasText: "Math Detective" });
  await centerLocator(page, mathCard);
  await mathCard.hover();
  await page.screenshot({
    path: path.join(OUTPUT, "v2-apps-hover.png"),
  });
  await page.getByRole("button", { name: "Open preview for Math Detective" }).click();
  await page.screenshot({
    path: path.join(OUTPUT, "v2-apps-preview-modal.png"),
  });
  await page.keyboard.press("Escape");

  await page.goto(`${URL}/second-brain`, { waitUntil: "networkidle", timeout: 30000 });
  const diagramTitle = page.getByText("Vault Diagram", { exact: true });
  await centerLocator(page, diagramTitle);
  await page.getByRole("button", { name: /raw\// }).hover();
  await page.screenshot({
    path: path.join(OUTPUT, "v2-knowledge-base-hover.png"),
  });

  const report = {
    initial,
    consoleErrors: errors,
    notFoundResponses: [...new Set(responses404)],
    screenshots: fs
      .readdirSync(OUTPUT)
      .filter((name) => name.startsWith("v2-"))
      .sort(),
  };
  fs.writeFileSync(
    path.join(OUTPUT, "v2-console-report.json"),
    JSON.stringify(report, null, 2),
  );

  console.log(JSON.stringify(report, null, 2));
  await browser.close();

  const passed =
    initial.hasCanvas &&
    initial.hasHero &&
    initial.hasCapability &&
    initial.hasWorkflow &&
    !initial.hasProjectCards &&
    !initial.hasErrorOverlay &&
    errors.length === 0 &&
    responses404.length === 0;
  process.exit(passed ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
