import { expect } from '@playwright/test'
import { getCredentials } from '../../common/helpers.js'

const userData = getCredentials('user-luma.json')
export const authData = 'playwright/.auth/user.json'

export class Base {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page
    this.emailField = page.locator('[name="login[username]"]')
    this.passwordField = page.locator('[name="login[password]"]')
    this.submitButton = page.locator('[name="send"].primary')
    this.welcomeMessage = page.locator('header').locator('.logged-in')
  }

  async authorizeByUi(credentials = userData) {
    await this.page.goto('/customer/account/login/')
	  await expect(this.page).toHaveTitle('Customer Login', { timeout: 10000 })
    await this.emailField.pressSequentially(credentials.email)
    await this.passwordField.pressSequentially(credentials.password)
    await this.submitButton.click()
    await expect(this.page).toHaveTitle('My Account', { timeout: 10000 })
  }

  async getAuthCookiesFromBrowser(credentials = userData) {
    await this.authorizeByUi(credentials)
    const cookies = await this.page.context().cookies()
    await this.page.close()
    return cookies
  }

  async authorizeByCookies(cookies = undefined) {
    if (cookies == undefined) cookies = await this.getAuthCookiesFromBrowser()
    await this.page.goto('/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Theme/favicon.ico')
    await expect(this.page).toHaveTitle(/favicon.ico/, { timeout: 10000 })
    await this.page.context().addCookies(cookies)
  }

  async saveAuthState(credentials = userData) {
    await this.authorizeByUi(credentials)
    await this.page.context().storageState({ path: authData })
    await this.page.close()
  }
}