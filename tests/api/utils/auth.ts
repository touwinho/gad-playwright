import { expect } from '@playwright/test';

export async function login(request, user) {
  const responseLogin = await request.post('/api/login', {
    data: {
      email: user.email,
      password: user.password
    }
  });

  const responseBody = await responseLogin.json();

  expect(responseBody.access_token).not.toBeUndefined();
  expect(responseLogin.ok()).toBeTruthy();

  return { Authorization: `Bearer ${responseBody.access_token}` };
}
