import { test, expect } from '@playwright/test'

test('basic todo lifecycle', async ({page}) => {
  await page.goto('https://todomvc4tasj.herokuapp.com/')
  await page.waitForFunction('Object.keys(require.s.contexts._.defined).length === 39');

  // add
  await expect(page.locator('#new-todo')).toBeEmpty()
  await page.locator('#new-todo').fill('a').then(() => page.keyboard.press('Enter'))
  await page.locator('#new-todo').fill('b').then(() => page.keyboard.press('Enter'))
  await page.locator('#new-todo').fill('c').then(() => page.keyboard.press('Enter'))

  await expect(page.locator('#todo-list>li')).toHaveText(['a','b','c'])
  await expect(page.locator('#todo-count>strong')).toHaveText('3')

  // edit
  await page.locator('#todo-list>li').filter({hasText: 'b'}).dblclick()
  await page.locator('#todo-list>li').and(page.locator('.editing'))
    .locator('.edit').fill('b edited').then(() => page.keyboard.press('Enter'))
  
  // complete
  await page.locator('#todo-list>li').filter({hasText: 'b edited'})
    .locator('.toggle').click()

  // clear completed
  await page.locator('#clear-completed').click()

  await expect(page.locator('#todo-list>li')).toHaveText(['a','c'])

  // cancel edit
  await page.locator('#todo-list>li').filter({hasText: 'c'}).dblclick()
  await page.locator('#todo-list>li').and(page.locator('.editing'))
    .locator('.edit').fill('should be canceled').then(() => page.keyboard.press('Escape'))

  // delete
  await page.locator('#todo-list>li').filter({hasText: 'c'}).hover()
  await page.locator('#todo-list>li').filter({hasText: 'c'}).locator('.destroy').click()

  await expect(page.locator('#todo-list>li')).toHaveText(['a'])
  await expect(page.locator('#todo-count>strong')).toHaveText('1')
})

test.afterEach(async ({page}) => {
  page.close()
})
