import { GameConfig } from '../../core/GameConfig';
import { Animal } from '../../entities/Animal';
import { IPatrolService } from '../../contracts/IPatrolService';

export class PatrolService implements IPatrolService {
  constructor(
    private readonly randomInt: (min: number, max: number) => number,
    private readonly randomFloat: (min: number, max: number) => number,
  ) {}

  public updateAnimals(animals: Animal[], deltaTime: number): void {
    for (const animal of animals) {
      if (!animal.isPatrollingAvailable()) {
        continue;
      }

      if (animal.shouldWaitForPatrol()) {
        animal.decreasePatrolWaitTime(deltaTime);
        continue;
      }

      if (!animal.hasPatrolTarget()) {
        this.assignNewPatrolTarget(animal);
      }

      this.moveTowardsPatrolTarget(animal, deltaTime);
    }
  }

  private assignNewPatrolTarget(animal: Animal): void {
    animal.setPatrolTarget(
      this.randomInt(GameConfig.animals.minX, GameConfig.animals.maxX),
      this.randomInt(GameConfig.animals.minY, GameConfig.animals.maxY),
    );
  }

  private moveTowardsPatrolTarget(
    animal: Animal,
    deltaTime: number,
  ): void {
    const target = animal.getPatrolTarget();

    if (!target) {
      return;
    }

    const distance = animal.distanceTo(target.x, target.y);

    if (distance === 0) {
      this.finishPatrol(animal);
      return;
    }

    const step =
      animal.getSpeed() * GameConfig.animals.patrolSpeedMultiplier * deltaTime;

    animal.moveTowards(target.x, target.y, step);

    if (animal.distanceTo(target.x, target.y) === 0) {
      this.finishPatrol(animal);
    }
  }

  private finishPatrol(animal: Animal): void {
    animal.clearPatrolTarget();
    animal.setPatrolWaitTime(
      this.randomFloat(
        GameConfig.animals.patrolWaitMin,
        GameConfig.animals.patrolWaitMax,
      ),
    );
  }
}