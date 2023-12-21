import { expect } from '@playwright/test'
import { getCredentials } from '../../common/helpers.js'

const userData = getCredentials('user-autotesthow.json')
export const authData = 'playwright/.auth/user.json'

export class Base {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page
    this.loginField = page.locator('[name="login"]')
    this.passwordField = page.locator('[name="password"]')
    this.submitButton = page.locator('[type=submit]')
    this.profileButton = page.locator('button[class*="user-image"]')
    this.profileMenuEmail = page.locator('[class*="popup-email"]')
  }

  async authorizeByUi(credentials = userData) {
    await this.page.goto('/members/login')
    await expect(this.page).toHaveTitle('Log In To Your Account', { timeout: 10000 })
    // await expect(this.page).toHaveTitle('Авторизация', { timeout: 10000 })
    await this.loginField.pressSequentially(credentials.login)
    await this.passwordField.pressSequentially(credentials.password)
    await this.submitButton.click()
    await expect(this.profileButton).toBeVisible({ timeout: 10000 })
  }

  async getAuthLocalStorageTokens(credentials = userData) {
    await this.authorizeByUi(credentials)
    const tokens = await this.page.evaluate(() => {
      let _tokens = {}
      for (let key of Object.keys(localStorage)) {
        _tokens[key] = localStorage.getItem(key)
      }
      return _tokens
    })
    await this.page.close()
    return tokens
  }

  async authorizeByLocalStorageTokens(tokens = undefined) {
    if (tokens == undefined) tokens = await this.getAuthLocalStorageTokens()
    await this.page.goto('/favicon.ico')
    await expect(this.page).toHaveTitle(/favicon.ico/)
    await this.page.evaluate((_tokens) => {
      for (let key in _tokens) {
        localStorage.setItem(key, _tokens[key])
      }
    }, tokens)
  }

  async saveAuthState(credentials = userData) {
    await this.authorizeByUi(credentials)
    await this.page.context().storageState({ path: authData })
    await this.page.close()
  }
}
