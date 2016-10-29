import { ReceptionServicePage } from './app.po';

describe('reception-service App', function() {
  let page: ReceptionServicePage;

  beforeEach(() => {
    page = new ReceptionServicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
