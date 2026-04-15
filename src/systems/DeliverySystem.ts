import type { Updatable } from '../core/GameLoop';
import { EventBus } from '../events/EventBus';
import { GameEvents } from '../events/GameEvents';
import { GameWorld } from '../world/GameWorld';

export class DeliverySystem implements Updatable {
  constructor(
    private readonly world: GameWorld,
    private readonly eventBus: EventBus,
  ) {}

  public update(_deltaTime: number): void {
    for (const animal of this.world.animals) {
      if (!animal.isFollowing || animal.isDelivered) {
        continue;
      }

      if (this.world.yard.contains(animal.x, animal.y)) {
        animal.markDelivered();
        this.world.score.increment();
        this.eventBus.emit(GameEvents.AnimalDelivered, { animal });
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