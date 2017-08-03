import { ProjectTrackerPage } from './app.po';

describe('project-tracker App', () => {
  let page: ProjectTrackerPage;

  beforeEach(() => {
    page = new ProjectTrackerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
