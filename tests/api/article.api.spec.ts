import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { IArticle, IComment, IUser } from '@interfaces/index';
import { login } from './utils/auth';

test.describe('Article operations (API)', { tag: '@api' }, () => {
  test.describe.configure({ mode: 'serial' });

  const user: IUser = {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD
  };

  const article: IArticle = {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(3),
    date: new Date().toISOString(),
    image: faker.image.dataUri({ type: 'svg-base64' })
  };

  const comment: IComment = {
    body: faker.lorem.paragraph(),
    date: new Date().toISOString()
  };

  let headers: { Authorization: string };
  let articleId: number;
  let commentId: number;

  test.beforeAll(async ({ request }) => {
    headers = await login(request, user);
  });

  test('should add new article', async ({ request }) => {
    const responseArticle = await request.post('/api/articles', {
      data: article,
      headers
    });

    const responseBody = await responseArticle.json();
    articleId = responseBody.id;

    expect(articleId).not.toBeUndefined();
    expect(responseArticle.ok()).toBeTruthy();
  });

  test('should find new article on articles list', async ({ request }) => {
    const responseArticles = await request.get(`/api/articles/${articleId}`);
    const responseBody = await responseArticles.json();

    expect(responseBody).toMatchObject({
      id: articleId,
      title: article.title,
      body: article.body,
      image: article.image
    });
  });

  test('should add comment to article', async ({ request }) => {
    const responseComment = await request.post(`/api/comments`, {
      data: {
        article_id: articleId,
        ...comment
      },
      headers
    });

    const responseBody = await responseComment.json();
    commentId = responseBody.id;

    expect(commentId).not.toBeUndefined();
    expect(responseComment.ok()).toBeTruthy();
  });

  test('should find new comment on comments list', async ({ request }) => {
    const responseComments = await request.get(`/api/comments/${commentId}`);
    const responseBody = await responseComments.json();

    expect(responseBody).toMatchObject({
      id: commentId,
      body: comment.body
    });
  });

  test('should delete comment', async ({ request }) => {
    const responseDelete = await request.delete(`/api/comments/${commentId}`, {
      headers
    });

    expect(responseDelete.ok()).toBeTruthy();
  });

  test('should not find new comment on comments list', async ({ request }) => {
    const responseComments = await request.get(`/api/comments/${commentId}`);

    expect(responseComments.status()).toEqual(404);
  });

  test('should delete article', async ({ request }) => {
    const responseDelete = await request.delete(`/api/articles/${articleId}`, {
      headers
    });

    expect(responseDelete.ok()).toBeTruthy();
  });

  test('should not find new article on articles list', async ({ request }) => {
    const responseArticles = await request.get(`/api/articles/${articleId}`);

    expect(responseArticles.status()).toEqual(404);
  });
});
