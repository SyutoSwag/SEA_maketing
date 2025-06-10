const { test, expect } = require('@playwright/test');

const urls = [
  '/', // index.html
  '/pages/privacy.html',
  '/pages/terms.html',
  '/pages/verification.html',
  '/pages/2257.html'
];

const viewports = [
  { width: 1920, height: 1080 }, // Desktop
  { width: 768, height: 1024 },  // Tablet
  { width: 375, height: 812 }    // Mobile
];

test.describe('SWAG Landing Page Visual Regression', () => {
  for (const url of urls) {
    for (const viewport of viewports) {
      test(`should render ${url} correctly at ${viewport.width}x${viewport.height}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto('http://localhost:8080' + url);
        expect(await page.screenshot()).toMatchSnapshot(`${url.replace(/\//g, '_')}_${viewport.width}x${viewport.height}.png`);
      });
    }
  }
}); 