import { Client } from 'pg';

export async function getLatestOrderStatus(
  db: Client,
  customerEmail: string
) {
  const result = await db.query(
    `SELECT status 
     FROM orders 
     WHERE customer_email = $1 
     ORDER BY created_at DESC 
     LIMIT 1`,
    [customerEmail]
  );

  return result.rows[0]?.status;
}