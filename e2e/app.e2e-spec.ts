import { CatSortPage } from './app.po';

describe('cat-sort App', () => {
  let page: CatSortPage;

  beforeEach(() => {
    page = new CatSortPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
