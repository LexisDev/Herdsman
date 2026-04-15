import { GameConfig } from '../core/GameConfig';
import { Animal } from '../entities/Animal';

export class AnimalFactory {
  constructor(
    private readonly randomInt: (min: number, max: number) => number,
    private readonly randomFloat: (min: number, max: number) => number,
  ) {}

  public create(): Animal {
    const animal = new Animal(
      this.randomInt(GameConfig.animals.minX, GameConfig.animals.maxX),
      this.randomInt(GameConfig.animals.minY, GameConfig.animals.maxY),
      GameConfig.animals.radius,
      GameConfig.animals.speed,
    );

    animal.setPatrolWaitTime(
      this.randomFloat(
        GameConfig.animals.spawnIdleMin,
        GameConfig.animals.spawnIdleMax,
      ),
    );

    return animal;
  }
}