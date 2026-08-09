import { test, expect } from '@playwright/test';

test.describe('Mobile dropdown menu', () => {
  // The dropdown only exists (in the `md:hidden` sense) below Tailwind's md
  // breakpoint, so this suite needs a mobile-sized viewport regardless of
  // whatever the default project viewport is.
  test.use({ viewport: { width: 375, height: 800 } });

  test('opens, stays pinned to the viewport when scrolled, and closes', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByTestId('menu-toggle');
    const dropdown = page.getByTestId('dropdown-menu');

    await expect(dropdown).toHaveClass(/opacity-0/);

    await toggle.click();
    await expect(dropdown).toHaveClass(/opacity-100/);
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();

    // Regression test for the bug fixed in 758542c: the dropdown used to be
    // `position: absolute`, so scrolling the page moved it out from under the
    // viewport top and revealed page content behind it. Force extra scrollable
    // height so the assertion holds regardless of how much blog content exists.
    await page.evaluate(() => {
      document.body.style.minHeight = '3000px';
    });
    await page.mouse.wheel(0, 800);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    await expect(dropdown).toHaveClass(/opacity-100/);
    const box = await dropdown.boundingBox();
    expect(box?.y).toBe(0);
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();

    await toggle.click();
    await expect(dropdown).toHaveClass(/opacity-0/);
  });
});
