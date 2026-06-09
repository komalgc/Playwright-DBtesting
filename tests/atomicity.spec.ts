import { test, expect } from '@playwright/test';
import { getDbClient } from '../utils/dbClient';

/*Atomicity Testing */

// Property: Either the full transaction succeeds, or everything rolls back.

/****
 Order flow:

1. Create order
2. Reduce inventory
3. Create payment record
4. Send confirmation

Now force failure at payment step.

Expected result:

No half-created order
Inventory should not be reduced
Payment record should not exist
Order status should not be CREATED

***/


test('atomicity - order should rollback if payment fails', async ({ request }) => {
    const db = await getDbClient();
    const orderPayload = {
    productId: 101,
    quantity: 1,
    paymentMode: 'FORCE_PAYMENT_FAILURE'
  };

  const response = await request.post('/api/orders', {
    data: orderPayload
  });

  expect(response.status()).toBe(500);

  const order = await db.query(
    'SELECT * FROM orders WHERE product_id = $1 ORDER BY created_at DESC LIMIT 1',
    [101]
  );

  const inventory = await db.query(
    'SELECT quantity FROM inventory WHERE product_id = $1',
    [101]
  );

  expect(order.rowCount).toBe(0);
  expect(inventory.rows[0].quantity).toBe(10); // original quantity
});

