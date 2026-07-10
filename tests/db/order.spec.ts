import { test, expect } from '@playwright/test';
import { getDbClient } from '../../utils/dbClient';
import { getLatestOrderStatus } from '../../utils/dbQueries';

test('verify order status in database', async ({ page }) => {
  const db = await getDbClient();

  await page.goto('https://my-shop-app.com');
  await page.getByText('Add to Cart').click();
  await page.getByRole('button', { name: 'Place Order' }).click();

  await expect(page.getByText('Order placed successfully')).toBeVisible();

  const status = await getLatestOrderStatus(db, 'testuser@example.com');

  expect(status).toBe('CREATED');

  await db.end();
});