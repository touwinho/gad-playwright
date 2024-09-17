import { Page } from '@playwright/test';
import { IArticle } from '@interfaces/index';

export class ArticlePage {
  constructor(
    private page: Page,
    private article: IArticle
  ) {}

  title = '🦎 GAD | Articles';
  url = '/articles.html';
  titleInput = this.page.getByTestId('title-input');
  commentInput = this.page.getByRole('textbox');
  contentInput = this.page.getByTestId('body-text');
  submitButton = this.page.getByTestId('save');
  deleteButton = this.page.getByTestId('delete');
  saveCommentButton = this.page.getByRole('button', {
    name: 'Save'
  });
  addCommentButton = this.page.locator('#add-new');
  comment = this.page.locator('label:text("comment:") + span');
  articleTitle = this.page.getByText(this.article.title);
  articleContent = this.page.getByTestId('article-body');

  async fillForm(article: IArticle): Promise<void> {
    await this.titleInput.fill(article.title);
    await this.contentInput.fill(article.content);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async select(article: IArticle): Promise<void> {
    await this.page.getByText(article.title).click();
  }

  async delete(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.deleteButton.click();
  }
}
