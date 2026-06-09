import { test, expect } from '@playwright/test';
import { getDbClient } from '../utils/dbClient';

test('isolation - two users should not book same ticket', async ({ request }) => {
  const ticketId = 501;
   const db = await getDbClient();

  const user1Booking = request.post('/api/bookings', {
    data: {
      ticketId,
      userId: 'user_1'
    }
  });

  const user2Booking = request.post('/api/bookings', {
    data: {
      ticketId,
      userId: 'user_2'
    }
  });

  const responses = await Promise.all([user1Booking, user2Booking]);

  const successResponses = responses.filter(r => r.status() === 201);
  const failedResponses = responses.filter(r => r.status() >= 400);

  expect(successResponses.length).toBe(1);
  expect(failedResponses.length).toBe(1);

  const bookings = await db.query(
    'SELECT * FROM bookings WHERE ticket_id = $1',
    [ticketId]
  );

  expect(bookings.rowCount).toBe(1);
});