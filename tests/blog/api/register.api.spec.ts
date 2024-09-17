import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

const user = {
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthDate: faker.date.birthdate().toISOString().split('.')[0] + '+01:00',
  avatar: faker.image.dataUri({ type: 'svg-base64' })
};

test.describe(
  'Register new account (API)',
  { tag: ['@blog', '@api', '@smoke'] },
  () => {
    test.describe.configure({ mode: 'serial' });

    let registeredUserId: number;
    let headers: { Authorization: string };

    test('should create a new user account successfully', async ({
      request
    }) => {
      const responseUser = await request.post('/api/users', {
        data: user
      });
      const responseBody = await responseUser.json();
      registeredUserId = responseBody.id;

      expect(responseUser.ok()).toBeTruthy();
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

      expect(responseLogin.ok()).toBeTruthy();
      expect(responseBody.access_token).not.toBeUndefined();
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
  }
);
