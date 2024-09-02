import { Page, Locator } from '@playwright/test';
import { IArticle } from '../interfaces';

export class ArticlePage {
  readonly url = '/articles.html';
  readonly title = '🦎 GAD | Articles';
  readonly successfulAddedArticleText = 'Article was created';
  readonly titleInput: Locator;
  readonly commentInput: Locator;
  readonly contentInput: Locator;
  readonly submitButton: Locator;
  readonly deleteButton: Locator;
  readonly saveComment: Locator;
  readonly addCommentButton: Locator;
  readonly comment: Locator;
  readonly articleTitle: Locator;
  readonly articleContent: Locator;

  constructor(
    private page: Page,
    private article: IArticle
  ) {
    this.titleInput = this.page.getByTestId('title-input');
    this.contentInput = this.page.getByTestId('body-text');
    this.commentInput = this.page.getByRole('textbox');
    this.submitButton = this.page.getByTestId('save');
    this.deleteButton = this.page.getByTestId('delete');
    this.addCommentButton = this.page.locator('#add-new');
    this.comment = this.page.locator('label:text("comment:") + span');
    this.saveComment = this.page.getByRole('button', {
      name: 'Save'
    });
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
