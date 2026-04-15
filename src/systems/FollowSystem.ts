import type { Updatable } from '../core/GameLoop';
import { GameConfig } from '../core/GameConfig';
import { EventBus } from '../events/EventBus';
import { GameEvents } from '../events/GameEvents';
import { GameWorld } from '../world/GameWorld';
import { Animal } from '../entities/Animal';

export class FollowSystem implements Updatable {
  constructor(
    private readonly world: GameWorld,
    private readonly eventBus: EventBus,
  ) {}

  public update(deltaTime: number): void {
    this.tryPickAnimals();
    this.updateFollowers(deltaTime);
  }

  private tryPickAnimals(): void {
    const followers = this.getFollowers();

    if (followers.length >= GameConfig.animals.maxGroupSize) {
      return;
    }

    for (const animal of this.world.animals) {
      if (!animal.isAvailableForPickup()) {
        continue;
      }

      const distance = animal.distanceTo(this.world.hero.x, this.world.hero.y);

      if (distance > GameConfig.animals.pickupDistance) {
        continue;
      }

      const currentFollowers = this.getFollowers();

      if (currentFollowers.length >= GameConfig.animals.maxGroupSize) {
        return;
      }

      animal.startFollowing(currentFollowers.length);
      this.eventBus.emit(GameEvents.AnimalPicked, { animal });
    }
  }

  private updateFollowers(deltaTime: number): void {
    const followers = this.getFollowers();

    followers.forEach((animal, index) => {
      animal.setFollowIndex(index);

      const targetX =
        this.world.hero.x - (index + 1) * GameConfig.animals.followSpacing;
      const targetY = this.world.hero.y;

      this.moveAnimalTowards(animal, targetX, targetY, deltaTime);
    });
  }

  private moveAnimalTowards(
    animal: Animal,
    targetX: number,
    targetY: number,
    deltaTime: number,
  ): void {
    const step = animal.getSpeed() * deltaTime;
    animal.moveTowards(targetX, targetY, step);
  }

  private getFollowers(): Animal[] {
    return this.world.animals
      .filter((animal) => animal.isActiveFollower())
      .sort(
        (left, right) => left.getFollowIndex() - right.getFollowIndex(),
      );
  }
}