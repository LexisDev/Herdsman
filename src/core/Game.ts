import { Application } from 'pixi.js';
import { GameConfig } from './GameConfig';
import { GameLoop } from './GameLoop';
import { MainScene } from '../scene/MainScene';
import { RenderSystem } from '../systems/RenderSystem';
import { InputSystem } from '../systems/InputSystem';
import { MovementSystem } from '../systems/MovementSystem';
import { FollowSystem } from '../systems/FollowSystem';
import { DeliverySystem } from '../systems/DeliverySystem';
import { RespawnSystem } from '../systems/RespawnSystem';
import { SpawnSystem } from '../systems/SpawnSystem';
import { PatrolSystem } from '../systems/PatrolSystem';
import { SoundSystem } from '../systems/SoundSystem';
import { Hero } from '../entities/Hero';
import { Animal } from '../entities/Animal';
import { Yard } from '../entities/Yard';
import { Score } from '../entities/Score';
import { GameWorld } from '../world/GameWorld';

export class Game {
  private readonly app = new Application();
  private readonly loop = new GameLoop();

  private readonly world: GameWorld;

  private readonly inputSystem: InputSystem;
  private readonly movementSystem: MovementSystem;
  private readonly soundSystem: SoundSystem;
  private readonly followSystem: FollowSystem;
  private readonly deliverySystem: DeliverySystem;
  private readonly respawnSystem: RespawnSystem;
  private readonly spawnSystem: SpawnSystem;
  private readonly patrolSystem: PatrolSystem;

  private readonly scene: MainScene;

  constructor(private readonly rootElement: HTMLElement) {
    const hero = new Hero(
      GameConfig.hero.x,
      GameConfig.hero.y,
      GameConfig.hero.radius,
      GameConfig.hero.speed,
    );

    const animals: Animal[] = [];

    const yard = new Yard(
      GameConfig.yard.x,
      GameConfig.yard.y,
      GameConfig.yard.width,
      GameConfig.yard.height,
    );

    const score = new Score(0);

    this.world = new GameWorld(hero, animals, yard, score);

    this.soundSystem = new SoundSystem();

    this.inputSystem = new InputSystem(this.world.hero);
    this.movementSystem = new MovementSystem(this.world.hero);

    this.followSystem = new FollowSystem(
      this.world.hero,
      this.world.animals,
      () => this.soundSystem.playPickup(),
    );

    this.deliverySystem = new DeliverySystem(
      this.world.animals,
      this.world.yard,
      this.world.score,
      () => this.soundSystem.playDelivery(),
    );

    this.respawnSystem = new RespawnSystem(
      this.world.animals,
      (min, max) => this.randomInt(min, max),
    );

    this.spawnSystem = new SpawnSystem(
      this.world.animals,
      (min, max) => this.randomInt(min, max),
      (min, max) => this.randomFloat(min, max),
    );

    this.patrolSystem = new PatrolSystem(
      this.world.animals,
      (min, max) => this.randomInt(min, max),
      (min, max) => this.randomFloat(min, max),
    );

    this.createAnimals();

    this.scene = new MainScene(
      this.world.hero,
      this.world.animals,
      this.world.yard,
      this.world.score,
    );
  }

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

    this.bindInput();
    this.registerSystems();
    this.startLoop();
  }

  private readonly handleResize = (): void => {
    this.scene.resize(this.app.screen.width, this.app.screen.height);
  };

  private bindInput(): void {
    this.app.stage.eventMode = 'static';

    this.app.stage.on('pointerdown', (event) => {
      const position = event.getLocalPosition(this.app.stage);
      this.inputSystem.moveHeroTo(position.x, position.y);
    });
  }

  private registerSystems(): void {
    this.loop.register(this.movementSystem);
    this.loop.register(this.patrolSystem);
    this.loop.register(this.followSystem);
    this.loop.register(this.deliverySystem);
    this.loop.register(this.respawnSystem);
    this.loop.register(this.spawnSystem);
    this.loop.register(new RenderSystem(this.scene));
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
      this.world.animals.push(this.createAnimal());
    }
  }

  private createAnimal(): Animal {
    const animal = new Animal(
      this.randomInt(GameConfig.animals.minX, GameConfig.animals.maxX),
      this.randomInt(GameConfig.animals.minY, GameConfig.animals.maxY),
      GameConfig.animals.radius,
      GameConfig.animals.speed,
    );

    animal.patrolWaitTime = this.randomFloat(
      GameConfig.animals.spawnIdleMin,
      GameConfig.animals.spawnIdleMax,
    );

    return animal;
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}