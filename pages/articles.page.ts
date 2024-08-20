import { Page, Locator } from '@playwright/test';
import { IArticle } from '../interfaces';

export class ArticlesPage {
  readonly url = '/articles.html';
  readonly title = '🦎 GAD | Articles';
  readonly successfulAddedArticleText = 'Article was created';
  readonly titleInput: Locator;
  readonly contentInput: Locator;
  readonly submitButton: Locator;
  readonly deleteButton: Locator;
  readonly articleTitle: Locator;
  readonly articleContent: Locator;

  constructor(
    private page: Page,
    private article: IArticle
  ) {
    this.titleInput = this.page.getByTestId('title-input');
    this.contentInput = this.page.getByTestId('body-text');
    this.submitButton = this.page.getByTestId('save');
    this.deleteButton = this.page.getByTestId('delete');
    this.articleTitle = this.page.getByText(this.article.title);
    this.articleContent = this.page.getByTestId('article-body');
  }

  async fillArticleForm(article: IArticle): Promise<void> {
    await this.titleInput.fill(article.title);
    await this.contentInput.fill(article.content);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async selectArticle(article: IArticle): Promise<void> {
    await this.page.getByText(article.title).click();
  }

  async deleteArticle(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.deleteButton.click();
  }
}
