const { chromium } = require('playwright');
const { mkdir } = require('node:fs/promises');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await mkdir('tmp/ui', { recursive: true });
    await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'tmp/ui/desktop.png', fullPage: true });
    await page.getByRole('button', { name: 'Ver exemplo' }).click();
    await page.locator('#roteiro').waitFor();
    await page.locator('.tool-trace summary').click();
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Salvar roteiro' }).click();
    await (await download).saveAs('tmp/ui/roteiro.txt');
    await page.getByRole('button', { name: /Como funciona/ }).click();
    await page.locator('dialog[open]').waitFor();
    await page.getByRole('button', { name: 'Fechar', exact: true }).click();
    await page.setViewportSize({ width: 390, height: 844 });
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) {
      throw new Error('Rolagem horizontal no celular.');
    }
    await page.locator('#roteiro').screenshot({ path: 'tmp/ui/mobile.png' });
    await page.route('**/api/plan', route => route.fulfill({
      status: 429, contentType: 'application/json', body: JSON.stringify({ error: 'Limite de teste.' }),
    }));
    await page.getByRole('button', { name: 'Gerar roteiro' }).click();
    await page.getByRole('alert').waitFor();
    if (errors.length) throw new Error(errors.join('\n'));
    console.log('Interface OK: exemplo, funções, download, modal, celular e erro.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
