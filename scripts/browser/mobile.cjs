module.exports = async function mobile(page) {
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

};
