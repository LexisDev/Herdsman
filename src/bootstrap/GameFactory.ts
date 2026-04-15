import { GameConfig } from '../core/GameConfig';
import { RenderSystem } from '../systems/RenderSystem';
import { MovementSystem } from '../systems/MovementSystem';
import { FollowSystem } from '../systems/FollowSystem';
import { DeliverySystem } from '../systems/DeliverySystem';
import { RespawnSystem } from '../systems/RespawnSystem';
import { SpawnSystem } from '../systems/SpawnSystem';
import { PatrolSystem } from '../systems/PatrolSystem';
import { SoundSystem } from '../systems/SoundSystem';
import { FpsSystem } from '../systems/FpsSystem';
import { Hero } from '../entities/Hero';
import { Animal } from '../entities/Animal';
import { Yard } from '../entities/Yard';
import { Score } from '../entities/Score';
import { Fps } from '../entities/Fps';
import { GameWorld } from '../world/GameWorld';
import { AnimalFactory } from '../factories/AnimalFactory';
import { EventBus } from '../events/EventBus';
import { MainScene } from '../scene/MainScene';
import { GameRuntime } from './GameRuntime';
import { DeliveryService } from '../systems/services/DeliveryService';

export class GameFactory {
  public create(): GameRuntime {
    const world = this.createWorld();
    const eventBus = new EventBus();
    const soundSystem = new SoundSystem(eventBus);

    const animalFactory = new AnimalFactory(
      (min, max) => this.randomInt(min, max),
      (min, max) => this.randomFloat(min, max),
    );

    this.createInitialAnimals(world, animalFactory);

    const scene = new MainScene(
      world.hero,
      world.animals,
      world.yard,
      world.score,
      world.fps,
    );

    const movementSystem = new MovementSystem(world);
    const followSystem = new FollowSystem(world, eventBus);
    const deliveryService = new DeliveryService();
    const deliverySystem = new DeliverySystem(
      world,
      eventBus,
      deliveryService,
    );
    const respawnSystem = new RespawnSystem(
      world,
      (min, max) => this.randomInt(min, max),
    );
    const spawnSystem = new SpawnSystem(
      world,
      animalFactory,
      (min, max) => this.randomFloat(min, max),
    );
    const patrolSystem = new PatrolSystem(
      world,
      (min, max) => this.randomInt(min, max),
      (min, max) => this.randomFloat(min, max),
    );
    const fpsSystem = new FpsSystem(world);
    const renderSystem = new RenderSystem(scene);

    return new GameRuntime(
      world,
      scene,
      soundSystem,
      [
        movementSystem,
        patrolSystem,
        followSystem,
        deliverySystem,
        respawnSystem,
        spawnSystem,
        fpsSystem,
        renderSystem,
      ],
    );
  }

  private createWorld(): GameWorld {
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
    const fps = new Fps(0);

    return new GameWorld(hero, animals, yard, score, fps);
  }

  private createInitialAnimals(
    world: GameWorld,
    animalFactory: AnimalFactory,
  ): void {
    const count = this.randomInt(
      GameConfig.animals.minCount,
      GameConfig.animals.maxCount,
    );

    for (let index = 0; index < count; index += 1) {
      world.animals.push(animalFactory.create());
    }
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}