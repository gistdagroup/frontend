import { TryAgmMapPage } from './app.po';

describe('try-agm-map App', () => {
  let page: TryAgmMapPage;

  beforeEach(() => {
    page = new TryAgmMapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
