// Executar com NODE_PATH apontando para um diretório que contenha playwright.
const { chromium } = require("playwright");
const fs = require("node:fs/promises");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await fs.mkdir("docs/screenshots", { recursive: true });
  try {
    await require('./browser/desktop.cjs')(page);
    await require('./browser/mobile.cjs')(page);
    await require('./browser/live.cjs')(page);
    console.log(JSON.stringify({ ok: true, javascriptErrors: errors }));
    if (errors.length) process.exitCode = 1;
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
