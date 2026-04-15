import type { Updatable } from '../core/GameLoop';
import { GameWorld } from '../world/GameWorld';

export class DeliverySystem implements Updatable {
  constructor(
    private readonly world: GameWorld,
    private readonly onAnimalDelivered?: () => void,
  ) {}

  public update(_deltaTime: number): void {
    let deliveredCount = 0;

    for (const animal of this.world.animals) {
      if (!animal.isFollowing || animal.isDelivered) {
        continue;
      }

      if (this.world.yard.contains(animal.x, animal.y)) {
        animal.markDelivered();
        this.world.score.increment();
        deliveredCount += 1;
      }
    }

    if (deliveredCount > 0) {
      for (let index = 0; index < deliveredCount; index += 1) {
        this.onAnimalDelivered?.();
      }
    }

    this.rebuildFollowerIndexes();
  }

  private rebuildFollowerIndexes(): void {
    const followers = this.world.animals
      .filter((animal) => animal.isFollowing && !animal.isDelivered)
      .sort((left, right) => left.followIndex - right.followIndex);

    followers.forEach((animal, index) => {
      animal.followIndex = index;
    });
  }
}