import { Application } from 'pixi.js';
import { GameConfig } from './GameConfig';
import { GameLoop } from './GameLoop';
import { MainScene } from '../scene/MainScene';
import { RenderSystem } from '../systems/RenderSystem';

export class Game {
  private readonly app = new Application();
  private readonly loop = new GameLoop();
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

    this.registerSystems();
    this.startLoop();
  }

  private registerSystems(): void {
    this.loop.register(
      new RenderSystem(
        this.scene,
        () => this.app.screen.width,
        () => this.app.screen.height,
      ),
    );
  }

  private startLoop(): void {
    this.app.ticker.add(() => {
      const deltaTime = this.app.ticker.deltaMS / 1000;

      this.loop.update(deltaTime);
      this.scene.update(deltaTime);
    });
  }
}