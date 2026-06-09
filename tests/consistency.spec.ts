import { test, expect } from '@playwright/test';
import { getDbClient } from '../utils/dbClient';

test('consistency - should not allow negative quantity', async ({ request }) => {
  const db = await getDbClient();
    const response = await request.post('/api/products', {
    data: {
      name: 'Laptop',
      quantity: -5
    }
  });

  expect(response.status()).toBeGreaterThanOrEqual(400);

  const result = await db.query(
    'SELECT * FROM products WHERE name = $1 AND quantity < 0',
    ['Laptop']
  );

  expect(result.rowCount).toBe(0);
});