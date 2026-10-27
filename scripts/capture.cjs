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
  await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
  await page.screenshot({
    path: "docs/screenshots/01-inicio-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: /Ver exemplo/ }).click();
  await page.locator("#roteiro").waitFor();
  await page.locator(".tool-trace summary").click();
  await page
    .locator("#roteiro")
    .screenshot({ path: "docs/screenshots/02-roteiro-exemplo.png" });
  await page.getByRole("button", { name: /Como funciona/ }).click();
  await page
    .locator("dialog[open]")
    .screenshot({ path: "docs/screenshots/03-como-funciona.png" });
  await page.getByRole("button", { name: "Fechar", exact: true }).click();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Salvar roteiro" }).click();
  await (await download).saveAs("tmp/roteiro-testado.txt");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
  await page.screenshot({
    path: "docs/screenshots/04-mobile.png",
    fullPage: true,
  });
  await page
    .locator("#planejar")
    .screenshot({ path: "docs/screenshots/09-formulario-mobile.png" });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  if (overflow) throw new Error("Overflow horizontal no celular");
  await page.getByRole("button", { name: /Ver exemplo/ }).click();
  await page.locator("#roteiro").waitFor();
  await page
    .locator("#roteiro")
    .screenshot({ path: "docs/screenshots/05-roteiro-mobile.png" });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw new Error("Overflow no roteiro mobile");
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
  // Testa a interface de erro sem consumir cota nem depender da disponibilidade externa.
  await page.route("**/api/plan", (route) =>
    route.fulfill({
      status: 429,
      contentType: "application/json",
      body: JSON.stringify({
        error:
          "Limite de uso da API atingido. Aguarde um pouco ou confira a cota do Gemini.",
      }),
    }),
  );
  await page.getByRole("button", { name: /Gerar roteiro/ }).click();
  await page.getByRole("alert").waitFor();
  await page
    .getByRole("alert")
    .screenshot({ path: "docs/screenshots/06-erro-tratado.png" });
  await page.unroute("**/api/plan");
  await page.getByRole("button", { name: /Gerar roteiro/ }).click();
  await page.locator("#roteiro").waitFor({ timeout: 240000 });
  await page.locator(".tool-trace summary").click();
  await page
    .locator("#roteiro")
    .screenshot({ path: "docs/screenshots/07-roteiro-real.png" });
  await page
    .locator(".tool-trace")
    .screenshot({ path: "docs/screenshots/08-function-calling-real.png" });
  console.log(
    JSON.stringify({
      ok: true,
      javascriptErrors: errors,
      mobileOverflow: overflow,
      liveTitle: await page.locator(".itinerary-heading h3").innerText(),
    }),
  );
  if (errors.length) process.exitCode = 1;
  await browser.close();
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
