import { test, expect } from '@playwright/test';

test.describe('Login to OrangeHRM', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  })

  test('login successful', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });


  test('Login with empty credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Required').first()).toBeVisible();
    await expect(page.getByText('Required').last()).toBeVisible();

  })

  test('Login with invalid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('Hello');
    await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  })

});
