import { test, expect } from '@playwright/test'

test.beforeEach(async ({page}) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
})

test('finds playwright', async ({ page }) => {
  await page.goto('https://google.com/ncr')
  await expect(page.locator('[name="q"]')).toBeEmpty()

  await page.locator('[name="q"]').fill('playwright')
  await page.locator('[name="q"]').press('Enter')
  await expect.poll(() => page.locator('#rso>div').count()).toBeGreaterThanOrEqual(2)
  await expect(page.locator('#rso>div').first()).toContainText('Playwright')

  await page.locator('#rso>div').first().locator('h3').first().click()
  await expect(page).toHaveTitle(/Playwright/)
})

test.afterEach(async ({page}) => {
  page.close()
})