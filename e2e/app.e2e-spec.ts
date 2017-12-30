import { KennethSitePage } from './app.po';

describe('kenneth-site App', function() {
  let page: KennethSitePage;

  beforeEach(() => {
    page = new KennethSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
