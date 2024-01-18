import { test, expect } from '@playwright/test'
import { Base, authData } from '../lib/page/autotest-how/base.js'

test.use({ baseURL: 'https://autotest.how' })

test.describe('authentication by UI-form', () => {
  let base

  test.beforeAll(async ({ page }) => {
    base = new Base(page)
  })

  test.beforeEach(async ({ page }) => {
    base = new Base(page)
    await base.authorizeByUi()
  })

  test('should open authorized area', async ({ page }) => {
    await page.goto('/members/')

    await expect(base.profileButton).toBeVisible()
    await expect(page).toHaveTitle('Resource list')
  })

  test('should open authorized area2', async ({ page }) => {
    await page.goto('/members/')

    await expect(base.profileButton).toBeVisible()
    await expect(page).toHaveTitle('Resource list')
  })

  test.afterEach(async ({ page }) => {
    await page.close()
  })
})

test.describe('authentication by tokens', () => {
  let page, base, tokens

  test.beforeAll(async ({ browser }) => {
    tokens = await new Base(await browser.newPage()).getAuthLocalStorageTokens()
  })

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    base = new Base(page)
    await base.authorizeByLocalStorageTokens(tokens)
  })

  test('should open authorized area', async () => {
    await page.goto('/members/')

    await expect(base.profileButton).toBeVisible()
    await expect(page).toHaveTitle('Resource list')
  })

  test('should open authorized area2', async () => {
    await page.goto('/members/')

    await expect(base.profileButton).toBeVisible()
    await expect(page).toHaveTitle('Resource list')
  })

  test.afterEach(async () => {
    await page.close()
  })
})

test.describe('authentication by state file', () => {
  let page, base

  test.beforeAll(async ({ browser }) => {
    await new Base(await browser.newPage()).saveAuthState()
  })

  test.beforeEach(async ({ browser }) => {
    const pageContext = await browser.newContext({ storageState: authData })
    page = await pageContext.newPage()
    base = new Base(page)
  })

  test('should open authorized area', async () => {
    await page.goto('/members/')

    await expect(base.profileButton).toBeVisible()
    await expect(page).toHaveTitle('Resource list')
  })

  test('should open authorized area2', async () => {
    await page.goto('/members/')

    await expect(base.profileButton).toBeVisible()
    await expect(page).toHaveTitle('Resource list')
  })

  test.afterEach(async () => {
    await page.close()
  })
})
