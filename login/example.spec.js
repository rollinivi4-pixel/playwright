// @ts-check
import { test, expect } from '@playwright/test';
test('login to demo website', async ({ page }) => {
  // Step 1: Go to a demo login page
  await page.goto('https://the-internet.herokuapp.com/login');

  // Step 2: Fill in username
  await page.fill('#username', 'tomsmith');

  // Step 3: Fill in password
  await page.fill('#password', 'SuperSecretPassword!');

  // Step 4: Click login button
  await page.click('button[type="submit"]');

  // Step 5: Check if login was successful
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});

// Test 2: Login with wrong credentials
test('login with wrong password', async ({ page }) => {
  // Go to login page
  await page.goto('https://the-internet.herokuapp.com/login');

  // Enter wrong password
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'wrongpassword');

  // Click login
  await page.click('button[type="submit"]');

  // Check error message
  await expect(page.locator('#flash')).toContainText('Your password is invalid!');
});
