import { test, expect } from '@playwright/test'
import { Base, authData } from '../lib/page/luma/base.js'

test.use({ baseURL: 'https://magento.softwaretestingboard.com' })

test.describe.skip('authentication by UI-form', () => {
  let base

  test.beforeAll(async ({ page }) => {
    base = new Base(page)
  })

  test.beforeEach(async ({ page }) => {
    await base.authorizeByUi()
  })

  test('should open authorized area', async ({ page }) => {
    await page.goto('/customer/account/')

    await expect(page).toHaveTitle('My Account')
    await expect(base.welcomeMessage).toContainText('Welcome')
  })

  test.afterEach(async ({ page }) => {
    await page.close()
  })
})

test.describe.skip('authentication by cookie', () => {
  let page, base, cookies

  test.beforeAll(async ({ browser }) => {
    cookies = await new Base(await browser.newPage()).getAuthCookiesFromBrowser()
  })

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    base = new Base(page)
    await base.authorizeByCookies(cookies)
  })

  test('should open authorized area', async () => {
    await page.goto('/customer/account/')

    await expect(page).toHaveTitle('My Account')
    await expect(base.welcomeMessage).toContainText('Welcome')
  })

  test('should open authorized area2', async () => {
    await page.goto('/customer/account/')

    await expect(page).toHaveTitle('My Account')
    await expect(base.welcomeMessage).toContainText('Welcome')
  })

  test.afterEach(async () => {
    await page.close()
  })
})

test.describe.skip('authentication by state file', () => {
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
    await page.goto('/customer/account/')

    await expect(page).toHaveTitle('My Account')
    await expect(base.welcomeMessage).toContainText('Welcome')
  })

  test('should open authorized area2', async () => {
    await page.goto('/customer/account/')

    await expect(page).toHaveTitle('My Account')
    await expect(base.welcomeMessage).toContainText('Welcome')
  })

  test.afterEach(async () => {
    await page.close()
  })
})
