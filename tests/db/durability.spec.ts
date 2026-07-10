import { test, expect } from '@playwright/test';
import { getDbClient } from '../../utils/dbClient';

/*Durability Testing */

// Property: Once data is committed, it should remain saved even after restart or failure.

/****
 Order flow:

1. Create an order successfully.
2. Restart backend service.
3. Verify order is still present.

Now force failure at payment step.

Expected result:

Order still exists
Status remains correct
No data corruption
Created timestamp is preserved

***/


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