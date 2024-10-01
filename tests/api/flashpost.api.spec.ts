import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { IUser } from '@interfaces/index';

test.describe('Flashpost operations (API)', { tag: '@api' }, () => {
  test.describe.configure({ mode: 'serial' });

  const user: IUser = {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD
  };

  const flashpost = faker.lorem.sentence();

  let headers: { Authorization: string };
  let publicFlashpostId: number;
  let privateFlashpostId: number;

  test('should login on existing account', async ({ request }) => {
    const responseLogin = await request.post('/api/login', {
      data: {
        email: user.email,
        password: user.password
      }
    });

    const responseBody = await responseLogin.json();
    headers = { Authorization: `Bearer ${responseBody.access_token}` };

    expect(responseBody.access_token).not.toBeUndefined();
    expect(responseLogin.ok()).toBeTruthy();
  });

  test('should add new public flashpost', async ({ request }) => {
    const responseFlashposts = await request.post('/api/flashposts', {
      data: { body: flashpost, is_public: true },
      headers
    });

    const responseBody = await responseFlashposts.json();
    publicFlashpostId = responseBody.id;

    expect(publicFlashpostId).not.toBeUndefined();
    expect(responseFlashposts.ok()).toBeTruthy();
  });

  test('should add new private flashpost', async ({ request }) => {
    const responseFlashposts = await request.post('/api/flashposts', {
      data: { body: flashpost, is_public: false },
      headers
    });

    const responseBody = await responseFlashposts.json();
    privateFlashpostId = responseBody.id;

    expect(privateFlashpostId).not.toBeUndefined();
    expect(responseFlashposts.ok()).toBeTruthy();
  });

  test('should find new public flashpost on flashposts list', async ({
    request
  }) => {
    const responseFlashpostsPublic = await request.get(
      `/api/flashposts/${publicFlashpostId}`
    );
    const responseFlashpostsPrivate = await request.get(
      `/api/flashposts/${privateFlashpostId}`,
      { headers }
    );

    const responseBodyPrivate = await responseFlashpostsPrivate.json();
    const responseBodyPublic = await responseFlashpostsPublic.json();

    expect(responseBodyPrivate && responseBodyPublic).toMatchObject({
      id: publicFlashpostId,
      body: flashpost,
      is_public: true
    });
  });

  test('should find new private flashpost on flashposts list', async ({
    request
  }) => {
    const responseFlashpostsPublic = await request.get(
      `/api/flashposts/${privateFlashpostId}`
    );
    const responseFlashpostsPrivate = await request.get(
      `/api/flashposts/${privateFlashpostId}`,
      { headers }
    );

    const responseBodyPrivate = await responseFlashpostsPrivate.json();

    expect(responseFlashpostsPublic.ok()).toBeFalsy();
    expect(responseBodyPrivate).toMatchObject({
      id: privateFlashpostId,
      body: flashpost,
      is_public: false
    });
  });

  test('should delete public flashpost', async ({ request }) => {
    const responseFlashposts = await request.delete(
      `/api/flashposts/${publicFlashpostId}`,
      {
        headers
      }
    );

    expect(responseFlashposts.ok()).toBeTruthy();
  });

  test('should delete private flashpost', async ({ request }) => {
    const responseFlashposts = await request.delete(
      `/api/flashposts/${privateFlashpostId}`,
      {
        headers
      }
    );

    expect(responseFlashposts.ok()).toBeTruthy();
  });

  test('should not find new public flashpost on flashpost list', async ({
    request
  }) => {
    const responseFlashposts = await request.get(
      `/api/flashposts/${publicFlashpostId}`
    );

    expect(responseFlashposts.status()).toEqual(404);
  });

  test('should not find new private flashpost on flashpost list', async ({
    request
  }) => {
    const responseFlashposts = await request.get(
      `/api/flashposts/${privateFlashpostId}`,
      { headers }
    );

    expect(responseFlashposts.status()).toEqual(404);
  });
});
