import { Application, Assets, Texture } from 'pixi.js';
import { GameLoop } from './GameLoop';
import { GameConfig } from './GameConfig';
import { GameFactory } from '../bootstrap/GameFactory';
import { InputSystem } from '../systems/InputSystem';
import { MenuScene } from '../scene/MenuScene';
import type { IScene } from '../scene/IScene';

export class Game {
  private readonly app = new Application();
  private readonly loop = new GameLoop();
  private readonly runtime = new GameFactory().create();
  private readonly inputSystem = new InputSystem(this.runtime.world);

  private currentScene!: IScene;
  private isGameStarted = false;
  private isInputBound = false;

  constructor(private readonly rootElement: HTMLElement) {}

  public async init(): Promise<void> {
    await this.app.init({
      resizeTo: window,
      background: GameConfig.backgroundColor,
      antialias: true,
    });

    const logoTexture = await Assets.load<Texture>('/assets/logo.svg');

    this.currentScene = new MenuScene(
      logoTexture,
      () => this.startGame(),
    );

    this.rootElement.appendChild(this.app.canvas);
    this.app.stage.addChild(this.currentScene.root);

    this.runtime.soundSystem.register();

    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    this.registerSystems();
    this.startLoop();
  }

  private startGame(): void {
    if (this.isGameStarted) {
      return;
    }

    this.isGameStarted = true;

    this.app.stage.removeChild(this.currentScene.root);
    this.currentScene = this.runtime.scene;
    this.app.stage.addChild(this.currentScene.root);

    this.handleResize();
    this.bindInput();
  }

  private readonly handleResize = (): void => {
    this.currentScene.resize(this.app.screen.width, this.app.screen.height);
  };

  private bindInput(): void {
    if (this.isInputBound) {
      return;
    }

    this.isInputBound = true;
    this.app.stage.eventMode = 'static';

    this.app.stage.on('pointerdown', (event) => {
      if (!this.isGameStarted) {
        return;
      }

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

      if (this.isGameStarted) {
        this.loop.update(deltaTime);
      }

      this.currentScene.update(deltaTime);
    });
  }
}