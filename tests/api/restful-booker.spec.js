import { test, expect } from '@playwright/test';
import { BookerClient } from '../../api/bookerClient.js';
import { bookingCredentials, buildBookingPayload, buildUpdatedBookingPayload } from '../test-data.js';

function expectBookingShape(booking) {
  expect(booking).toEqual(
    expect.objectContaining({
      firstname: expect.any(String),
      lastname: expect.any(String),
      totalprice: expect.any(Number),
      depositpaid: expect.any(Boolean),
      bookingdates: expect.objectContaining({
        checkin: expect.any(String),
        checkout: expect.any(String),
      }),
      additionalneeds: expect.any(String),
    })
  );
}

test.describe('Restful Booker API tests', () => {
  test('should generate a valid auth token', async ({ request }) => {
    const client = new BookerClient(request);
    const response = await client.authToken(bookingCredentials);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body.token).toBeTruthy();
    expect(typeof body.token).toBe('string');
  });

  test('should perform booking CRUD operations including DELETE', async ({ request }) => {
    const client = new BookerClient(request);
    const createBookingPayload = buildBookingPayload();

    const createResponse = await client.createBooking(createBookingPayload);
    expect(createResponse.status()).toBe(200);
    expect(createResponse.headers()['content-type']).toContain('application/json');

    const createBody = await createResponse.json();
    expect(createBody.bookingid).toBeGreaterThan(0);
    expectBookingShape(createBody.booking);
    expect(createBody.booking).toEqual(expect.objectContaining(createBookingPayload));

    const bookingId = createBody.bookingid;
    const getResponse = await client.getBooking(bookingId);
    expect(getResponse.status()).toBe(200);
    expect(getResponse.headers()['content-type']).toContain('application/json');

    const bookingBeforeUpdate = await getResponse.json();
    expectBookingShape(bookingBeforeUpdate);
    expect(bookingBeforeUpdate).toEqual(expect.objectContaining(createBookingPayload));

    const authResponse = await client.authToken(bookingCredentials);
    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    const token = authBody.token;
    expect(token).toBeTruthy();

    const updatedPayload = buildUpdatedBookingPayload(bookingBeforeUpdate);

    const updateResponse = await client.updateBooking(bookingId, updatedPayload, token);
    expect(updateResponse.status()).toBe(200);
    expect(updateResponse.headers()['content-type']).toContain('application/json');

    const updatedBody = await updateResponse.json();
    expectBookingShape(updatedBody);
    expect(updatedBody).toEqual(expect.objectContaining(updatedPayload));

    const getAfterUpdateResponse = await client.getBooking(bookingId);
    expect(getAfterUpdateResponse.status()).toBe(200);

    const bookingAfterUpdate = await getAfterUpdateResponse.json();
    expectBookingShape(bookingAfterUpdate);
    expect(bookingAfterUpdate).toEqual(expect.objectContaining(updatedPayload));

    const deleteResponse = await client.deleteBooking(bookingId, token);
    expect([200, 201]).toContain(deleteResponse.status());

    const verifyDeleteResponse = await client.getBooking(bookingId);
    expect(verifyDeleteResponse.status()).toBe(404);
  });
});
