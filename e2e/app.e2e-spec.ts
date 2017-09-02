import { DockerVisualizerPage } from './app.po';

describe('docker-visualizer App', () => {
  let page: DockerVisualizerPage;

  beforeEach(() => {
    page = new DockerVisualizerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
