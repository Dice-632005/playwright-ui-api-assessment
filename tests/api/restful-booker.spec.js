import { test, expect } from '@playwright/test';
import { BookerClient } from '../../pages/api/bookerClient.js';
import { apiTestData, buildBookingPayload, buildUpdatedBookingPayload } from '../testdata/test-data.js';

/**
 * Validates the required schema structure of a booking object.
 * @param {object} booking
 */
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
  test('Verify a valid auth token is generated', async ({ request }) => {
    const client = new BookerClient(request);
    const response = await client.authToken(apiTestData.auth);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body.token).toBeTruthy();
    expect(typeof body.token).toBe('string');
  });

  test('Verify booking CRUD operations including DELETE', async ({ request }) => {
    const client = new BookerClient(request);
    const createBookingPayload = buildBookingPayload();
    let bookingId;
    let bookingBeforeUpdate;
    let token;
    let updatedPayload;

    await test.step('Verify booking is created successfully (CREATE)', async () => {
      const createResponse = await client.createBooking(createBookingPayload);
      expect(createResponse.status()).toBe(200);
      expect(createResponse.headers()['content-type']).toContain('application/json');

      const body = await createResponse.json();
      expect(body.bookingid).toBeGreaterThan(0);
      expectBookingShape(body.booking);
      expect(body.booking).toEqual(expect.objectContaining(createBookingPayload));
      bookingId = body.bookingid;
    });

    await test.step('Verify booking can be read before update (READ)', async () => {
      const getResponse = await client.getBooking(bookingId);
      expect(getResponse.status()).toBe(200);
      expect(getResponse.headers()['content-type']).toContain('application/json');

      bookingBeforeUpdate = await getResponse.json();
      expectBookingShape(bookingBeforeUpdate);
      expect(bookingBeforeUpdate).toEqual(expect.objectContaining(createBookingPayload));
    });

    await test.step('Verify auth token can be retrieved for updates', async () => {
      const authResponse = await client.authToken(apiTestData.auth);
      expect(authResponse.status()).toBe(200);

      const authBody = await authResponse.json();
      expect(authBody.token).toBeTruthy();
      token = authBody.token;
    });

    updatedPayload = buildUpdatedBookingPayload(bookingBeforeUpdate);

    await test.step('Verify booking is updated successfully (UPDATE)', async () => {
      const updateResponse = await client.updateBooking(bookingId, updatedPayload, token);
      expect(updateResponse.status()).toBe(200);
      expect(updateResponse.headers()['content-type']).toContain('application/json');

      const updatedBody = await updateResponse.json();
      expectBookingShape(updatedBody);
      expect(updatedBody).toEqual(expect.objectContaining(updatedPayload));
    });

    await test.step('Verify booking can be read after update', async () => {
      const getAfterUpdateResponse = await client.getBooking(bookingId);
      expect(getAfterUpdateResponse.status()).toBe(200);

      const bookingAfterUpdate = await getAfterUpdateResponse.json();
      expectBookingShape(bookingAfterUpdate);
      expect(bookingAfterUpdate).toEqual(expect.objectContaining(updatedPayload));
    });

    await test.step('Verify booking is deleted successfully (DELETE)', async () => {
      const deleteResponse = await client.deleteBooking(bookingId, token);
      expect([200, 201]).toContain(deleteResponse.status());

      const verifyDeleteResponse = await client.getBooking(bookingId);
      expect(verifyDeleteResponse.status()).toBe(404);
    });
  });
});
