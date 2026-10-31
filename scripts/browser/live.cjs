module.exports = async function live(page) {
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

};
