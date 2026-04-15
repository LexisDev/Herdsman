import { Application } from 'pixi.js';
import { GameLoop } from './GameLoop';
import { GameConfig } from './GameConfig';
import { GameFactory } from '../bootstrap/GameFactory';
import { InputSystem } from '../systems/InputSystem';

export class Game {
  private readonly app = new Application();
  private readonly loop = new GameLoop();
  private readonly runtime = new GameFactory().create();
  private readonly inputSystem = new InputSystem(this.runtime.world);

  constructor(private readonly rootElement: HTMLElement) {}

  public async init(): Promise<void> {
    await this.app.init({
      resizeTo: window,
      background: GameConfig.backgroundColor,
      antialias: true,
    });

    this.rootElement.appendChild(this.app.canvas);
    this.app.stage.addChild(this.runtime.scene.root);

    this.runtime.soundSystem.register();

    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    this.bindInput();
    this.registerSystems();
    this.startLoop();
  }

  private readonly handleResize = (): void => {
    this.runtime.scene.resize(this.app.screen.width, this.app.screen.height);
  };

  private bindInput(): void {
    this.app.stage.eventMode = 'static';

    this.app.stage.on('pointerdown', (event) => {
      const position = event.getLocalPosition(this.app.stage);
      this.inputSystem.moveHeroTo(position.x, position.y);
    });
  }

  private registerSystems(): void {
    for (const system of this.runtime.systems) {
      this.loop.register(system);
    }
  }

  private startLoop(): void {
    this.app.ticker.add(() => {
      const deltaTime = this.app.ticker.deltaMS / 1000;
      this.loop.update(deltaTime);
      this.runtime.scene.update(deltaTime);
    });
  }
}