import { test, expect } from '@playwright/test';

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test('automated stakeholder demo journey', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  await pause(700);

  await page.getByTestId('email').click();
  await page.getByTestId('email').fill('demo@northstar.local');
  await page.getByTestId('password').click();
  await page.getByTestId('password').fill('Demo2026!');
  await pause(500);
  await page.getByTestId('login-button').click();

  await expect(page.getByText('99.94')).toBeVisible();
  await expect(page.getByText('Live service overview')).toBeVisible();
  await pause(1100);

  await page.getByTestId('nav-services').click();
  await expect(page.getByText('Connectivity services').first()).toBeVisible();
  await pause(700);
  await page.getByTestId('service-details-core').click();
  await expect(page.locator('#dialog-title')).toHaveText('Core Fibre A');
  await pause(900);
  await page.getByLabel('Close service details').click();

  await page.getByTestId('refresh-services').click();
  await expect(page.getByText('Status refreshed · 3 services checked')).toBeVisible();
  await pause(700);

  await page.getByTestId('nav-support').click();
  await expect(page.getByRole('heading', { name: 'Report a service issue' })).toBeVisible();
  await page.getByTestId('ticket-service').selectOption({ label: 'Edge Transit B' });
  await page.getByTestId('ticket-category').selectOption({ label: 'Connectivity degradation' });
  await page.getByRole('button', { name: 'High' }).click();
  await page.getByTestId('ticket-description').fill('Intermittent packet loss is affecting access for users on the west transit path.');
  await pause(600);
  await page.getByTestId('submit-ticket').click();
  await expect(page.getByTestId('ticket-success')).toBeVisible();
  await pause(1200);

  await page.getByTestId('nav-dashboard').click();
  await expect(page.getByText('Good afternoon.')).toBeVisible();
  await pause(900);
});
