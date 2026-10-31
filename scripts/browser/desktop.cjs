module.exports = async function desktop(page) {
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

};
