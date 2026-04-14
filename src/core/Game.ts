import { Application } from 'pixi.js';
import { GameConfig } from './GameConfig';
import { MainScene } from '../scene/MainScene';

export class Game {
  private readonly app = new Application();
  private readonly scene = new MainScene();

  constructor(private readonly rootElement: HTMLElement) {}

  public async init(): Promise<void> {
    await this.app.init({
      resizeTo: window,
      background: GameConfig.backgroundColor,
      antialias: true,
    });

    this.rootElement.appendChild(this.app.canvas);
    this.app.stage.addChild(this.scene.root);

    this.handleResize();

    window.addEventListener('resize', this.handleResize);
  }

  private readonly handleResize = (): void => {
    this.scene.resize(this.app.screen.width, this.app.screen.height);
  };
}