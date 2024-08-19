import { Page, Locator } from '@playwright/test';
import { TArticle } from '../types/article';

export class ArticlesPage {
  readonly url: string = '/articles.html';
  readonly title: string = '🦎 GAD | Articles';
  readonly successfulAddedArticleText: string = 'Article was created';
  readonly titleInput: Locator;
  readonly contentInput: Locator;
  readonly submitButton: Locator;
  readonly articleTitle: Locator;
  readonly articleContent: Locator;

  constructor(private page: Page) {
    this.titleInput = this.page.getByTestId('title-input');
    this.contentInput = this.page.getByTestId('body-text');
    this.submitButton = this.page.getByTestId('save');
    this.articleTitle = this.page.getByTestId('article-title');
    this.articleContent = this.page.getByTestId('article-body');
  }

  async fillArticleForm(article: TArticle): Promise<void> {
    await this.titleInput.fill(article.title);
    await this.contentInput.fill(article.content);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
