import { test, expect } from '@playwright/test'

test('basic authentication', async ({page}) => {
  await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth')

  await expect(page.locator('#content')).toContainText(
    'Congratulations! You must have the proper credentials.'
  )
})

test('authentication by UI-form', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/login')
  await page.locator('#username').pressSequentially('tomsmith')
  await page.locator('#password').pressSequentially('SuperSecretPassword!')
  await page.locator('button[type="submit"]').click()

  await expect(page.locator('#flash')).toContainText('You logged into a secure area!')
})

test.afterEach(async ({page}) => {
  await page.close()
})
