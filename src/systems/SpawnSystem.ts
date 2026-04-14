import type { Updatable } from '../core/GameLoop';
import { GameConfig } from '../core/GameConfig';
import { Animal } from '../entities/Animal';

export class SpawnSystem implements Updatable {
  private timeUntilNextSpawn = 0;

  constructor(
    private readonly animals: Animal[],
    private readonly randomInt: (min: number, max: number) => number,
    private readonly randomFloat: (min: number, max: number) => number,
  ) {
    this.scheduleNextSpawn();
  }

  public update(deltaTime: number): void {
    this.timeUntilNextSpawn -= deltaTime;

    if (this.timeUntilNextSpawn > 0) {
      return;
    }

    const aliveAnimalsCount = this.animals.filter((animal) => !animal.isDelivered).length;

    if (aliveAnimalsCount < GameConfig.animals.maxAliveOnField) {
      this.spawnAnimal();
    }

    this.scheduleNextSpawn();
  }

  private spawnAnimal(): void {
    const animal = new Animal(
      this.randomInt(GameConfig.animals.minX, GameConfig.animals.maxX),
      this.randomInt(GameConfig.animals.minY, GameConfig.animals.maxY),
      GameConfig.animals.radius,
      GameConfig.animals.speed,
    );

    animal.patrolWaitTime = this.randomFloat(2.4, 7.4);

    this.animals.push(animal);
  }

  private scheduleNextSpawn(): void {
    this.timeUntilNextSpawn = this.randomFloat(
      GameConfig.animals.spawnIntervalMin,
      GameConfig.animals.spawnIntervalMax,
    );
  }
}