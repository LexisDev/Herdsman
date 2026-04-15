import type { Updatable } from '../core/GameLoop';
import { GameConfig } from '../core/GameConfig';
import { GameWorld } from '../world/GameWorld';

export class PatrolSystem implements Updatable {
  constructor(
    private readonly world: GameWorld,
    private readonly randomInt: (min: number, max: number) => number,
    private readonly randomFloat: (min: number, max: number) => number,
  ) {}

  public update(deltaTime: number): void {
    for (const animal of this.world.animals) {
      if (animal.isDelivered || animal.isFollowing) {
        continue;
      }

      if (animal.patrolWaitTime > 0) {
        animal.patrolWaitTime -= deltaTime;
        continue;
      }

      if (animal.patrolTargetX === null || animal.patrolTargetY === null) {
        this.assignNewPatrolTarget(animal);
      }

      this.moveTowardsPatrolTarget(animal, deltaTime);
    }
  }

  private assignNewPatrolTarget(animal: GameWorld['animals'][number]): void {
    animal.setPatrolTarget(
      this.randomInt(GameConfig.animals.minX, GameConfig.animals.maxX),
      this.randomInt(GameConfig.animals.minY, GameConfig.animals.maxY),
    );
  }

  private moveTowardsPatrolTarget(
    animal: GameWorld['animals'][number],
    deltaTime: number,
  ): void {
    if (animal.patrolTargetX === null || animal.patrolTargetY === null) {
      return;
    }

    const dx = animal.patrolTargetX - animal.x;
    const dy = animal.patrolTargetY - animal.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) {
      animal.clearPatrolTarget();
      animal.patrolWaitTime = this.randomFloat(
        GameConfig.animals.patrolWaitMin,
        GameConfig.animals.patrolWaitMax,
      );
      return;
    }

    const step =
      animal.speed * GameConfig.animals.patrolSpeedMultiplier * deltaTime;

    if (distance <= step) {
      animal.x = animal.patrolTargetX;
      animal.y = animal.patrolTargetY;
      animal.clearPatrolTarget();
      animal.patrolWaitTime = this.randomFloat(
        GameConfig.animals.patrolWaitMin,
        GameConfig.animals.patrolWaitMax,
      );
      return;
    }

    animal.x += (dx / distance) * step;
    animal.y += (dy / distance) * step;
  }
}