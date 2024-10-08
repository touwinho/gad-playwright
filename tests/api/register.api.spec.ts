import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { IUser } from '@interfaces/user';

test.describe('Register new account (API)', { tag: '@api' }, () => {
  test.describe.configure({ mode: 'serial' });

  const user: IUser = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthDate: faker.date.birthdate().toISOString().split('.')[0] + '+01:00',
    avatar: faker.image.dataUri({ type: 'svg-base64' })
  };

  let registeredUserId: number;
  let headers: { Authorization: string };

  test('should create a new user account successfully', async ({ request }) => {
    const responseUser = await request.post('/api/users', {
      data: user
    });
    const responseBody = await responseUser.json();
    registeredUserId = responseBody.id;

    expect(responseUser.ok()).toBeTruthy();
  });

  test('should find new user on users list', async ({ request }) => {
    const responseUsers = await request.get(`/api/users/${registeredUserId}`);
    const responseBody = await responseUsers.json();

    expect(responseBody).toMatchObject({
      id: registeredUserId,
      firstname: user.firstname,
      avatar: user.avatar
    });
  });

  test('should login on recently created account', async ({ request }) => {
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

  test('should delete recently created account', async ({ request }) => {
    const responseDelete = await request.delete(
      `/api/users/${registeredUserId}`,
      {
        data: {
          email: user.email
        },
        headers
      }
    );

    expect(responseDelete.ok()).toBeTruthy();
  });

  test('should not find new user on users list', async ({ request }) => {
    const responseUsers = await request.get(`/api/users/${registeredUserId}`);

    expect(responseUsers.status()).toEqual(404);
  });
});
