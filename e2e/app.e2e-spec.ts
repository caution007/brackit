import { BrackitPage } from './app.po';

describe('brackit App', function() {
  let page: BrackitPage;

  beforeEach(() => {
    page = new BrackitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
