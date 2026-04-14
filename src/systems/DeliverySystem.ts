import type { Updatable } from '../core/GameLoop';
import { Animal } from '../entities/Animal';
import { Yard } from '../entities/Yard';
import { Score } from '../entities/Score';

export class DeliverySystem implements Updatable {
  constructor(
    private readonly animals: Animal[],
    private readonly yard: Yard,
    private readonly score: Score,
  ) {}

  public update(_deltaTime: number): void {
    for (const animal of this.animals) {
      if (!animal.isFollowing || animal.isDelivered) {
        continue;
      }

      if (this.yard.contains(animal.x, animal.y)) {
        animal.markDelivered();
        this.score.increment();
      }
    }

    this.rebuildFollowerIndexes();
  }

  private rebuildFollowerIndexes(): void {
    const followers = this.animals
      .filter((animal) => animal.isFollowing && !animal.isDelivered)
      .sort((left, right) => left.followIndex - right.followIndex);

    followers.forEach((animal, index) => {
      animal.followIndex = index;
    });
  }
}