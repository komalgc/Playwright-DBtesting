import { test, expect } from '@playwright/test';
import { getDbClient } from '../utils/dbClient';


test('durability - committed order should persist after service restart', async ({ request }) => {
  const db = await getDbClient();
    const response = await request.post('/api/orders', {
    data: {
      productId: 101,
      quantity: 1,
      customerId: 2001
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  const orderId = body.orderId;

  // Restart service manually, through CI script, Docker command, or test environment hook

  const order = await db.query(
    'SELECT * FROM orders WHERE id = $1',
    [orderId]
  );

  expect(order.rowCount).toBe(1);
  expect(order.rows[0].status).toBe('CREATED');
});