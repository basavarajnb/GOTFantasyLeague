import { GOTFantasyLeaguePage } from './app.po';

describe('gotfantasy-league App', () => {
  let page: GOTFantasyLeaguePage;

  beforeEach(() => {
    page = new GOTFantasyLeaguePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
