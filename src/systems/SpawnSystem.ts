import type { Updatable } from '../core/GameLoop';
import { GameConfig } from '../core/GameConfig';
import { AnimalFactory } from '../factories/AnimalFactory';
import { GameWorld } from '../world/GameWorld';

export class SpawnSystem implements Updatable {
  private timeUntilNextSpawn = 0;

  constructor(
    private readonly world: GameWorld,
    private readonly animalFactory: AnimalFactory,
    private readonly randomFloat: (min: number, max: number) => number,
  ) {
    this.scheduleNextSpawn();
  }

  public update(deltaTime: number): void {
    this.timeUntilNextSpawn -= deltaTime;

    if (this.timeUntilNextSpawn > 0) {
      return;
    }

    const aliveAnimalsCount = this.world.animals.filter(
      (animal) => !animal.isDeliveredState(),
    ).length;

    if (aliveAnimalsCount < GameConfig.animals.maxAliveOnField) {
      this.world.animals.push(this.animalFactory.create());
    }

    this.scheduleNextSpawn();
  }

  private scheduleNextSpawn(): void {
    this.timeUntilNextSpawn = this.randomFloat(
      GameConfig.animals.spawnIntervalMin,
      GameConfig.animals.spawnIntervalMax,
    );
  }
}