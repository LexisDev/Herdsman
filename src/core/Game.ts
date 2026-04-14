import { Application } from 'pixi.js';
import { GameConfig } from './GameConfig';
import { GameLoop } from './GameLoop';
import { MainScene } from '../scene/MainScene';
import { RenderSystem } from '../systems/RenderSystem';
import { Hero } from '../entities/Hero';
import { Animal } from '../entities/Animal';
import { Yard } from '../entities/Yard';

export class Game {
  private readonly app = new Application();
  private readonly loop = new GameLoop();

  private readonly hero = new Hero(
    GameConfig.hero.x,
    GameConfig.hero.y,
    GameConfig.hero.radius,
  );

  private readonly animals: Animal[] = [];

  private readonly yard = new Yard(
    GameConfig.yard.x,
    GameConfig.yard.y,
    GameConfig.yard.width,
    GameConfig.yard.height,
  );

  private readonly scene: MainScene;

  constructor(private readonly rootElement: HTMLElement) {
    this.createAnimals();
    this.scene = new MainScene(this.hero, this.animals, this.yard);
  }

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

  private createAnimals(): void {
    const count = this.randomInt(
      GameConfig.animals.minCount,
      GameConfig.animals.maxCount,
    );

    for (let i = 0; i < count; i++) {
      this.animals.push(
        new Animal(
          this.randomInt(GameConfig.animals.minX, GameConfig.animals.maxX),
          this.randomInt(GameConfig.animals.minY, GameConfig.animals.maxY),
          GameConfig.animals.radius,
        ),
      );
    }
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}