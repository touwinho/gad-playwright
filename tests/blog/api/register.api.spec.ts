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

    // let registeredUserId: number;

    test('should create a new user account successfully', async ({
      request
    }) => {
      const responseUser = await request.post('/api/users', {
        data: user
      });
      //   const responseBody = await responseUser.json();
      //   registeredUserId = responseBody.id;

      expect(responseUser.ok()).toBeTruthy();
    });

    test('should login on recently created account', async ({ request }) => {
      const responseLogin = await request.post('/process_login', {
        data: {
          email: user.email,
          password: user.password
        }
      });

      expect(responseLogin.ok()).toBeTruthy();
    });

    // test('should delete recently created account', async ({ request }) => {
    //   const responseDelete = await request.delete(
    //     `/api/users/${registeredUserId}`,
    //     {
    //       data: {
    //         email: user.email
    //       }
    //     }
    //   );

    //   expect(responseDelete.ok()).toBeTruthy();
    // });
  }
);
