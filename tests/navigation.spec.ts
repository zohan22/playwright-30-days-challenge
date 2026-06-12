import { test, expect } from '@playwright/test';

test('Check left menu option', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  const leftMenuItems = page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('listitem')
  const currentMenuItemsCount = await leftMenuItems.count();
  console.log('Current menu items count: ', currentMenuItemsCount);

  const currentMenuItems: string[] = [];

  for (let i = 0; i < currentMenuItemsCount; i++) {
    const menuText = await leftMenuItems.nth(i).innerText();
    currentMenuItems.push(menuText);
  }

  console.log('Current menu items: ', currentMenuItems);

  const expectedMenuItems = [
    'Admin',
    'PIM',
    'Leave',
    'Time',
    'Recruitment',
    'My Info',
    'Performance',
    'Dashboard',
    'Directory',
    'Maintenance',
    'Claim',
    'Buzz'
  ]

  expect(currentMenuItems).toEqual(expectedMenuItems);
  console.log('First menu item: ', currentMenuItems[0]);
  expect(currentMenuItems[0]).toBe('Admin');
})

test('Navigate through the left panel', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  const leftMenuItems = page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('listitem')
  const currentMenuItemsCount = await leftMenuItems.count();

  for(let i=0; i<currentMenuItemsCount; i++) {
    const menuItem = leftMenuItems.nth(i)

    const menuText = await menuItem.innerText()
    await menuItem.click();

    console.log('Clicking on menu item: ', menuText);
    if(menuText === 'Maintenance') {
      await page.goBack();
    }
  }

})