import { MyCompanyTemplatePage } from './app.po';

describe('MyCompany App', function() {
  let page: MyCompanyTemplatePage;

  beforeEach(() => {
    page = new MyCompanyTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
