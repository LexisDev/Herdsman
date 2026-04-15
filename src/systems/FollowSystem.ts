import type { Updatable } from '../core/GameLoop';
import { GameConfig } from '../core/GameConfig';
import { GameWorld } from '../world/GameWorld';

export class FollowSystem implements Updatable {
  constructor(
    private readonly world: GameWorld,
    private readonly onAnimalPicked?: () => void,
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
      if (animal.isDelivered || animal.isFollowing) {
        continue;
      }

      const dx = this.world.hero.x - animal.x;
      const dy = this.world.hero.y - animal.y;
      const distance = Math.hypot(dx, dy);

      if (distance <= GameConfig.animals.pickupDistance) {
        const currentFollowers = this.getFollowers();

        if (currentFollowers.length >= GameConfig.animals.maxGroupSize) {
          return;
        }

        animal.startFollowing(currentFollowers.length);
        this.onAnimalPicked?.();
      }
    }
  }

  private updateFollowers(deltaTime: number): void {
    const followers = this.getFollowers();

    followers.forEach((animal, index) => {
      animal.followIndex = index;

      const targetX =
        this.world.hero.x - (index + 1) * GameConfig.animals.followSpacing;
      const targetY = this.world.hero.y;

      this.moveAnimalTowards(animal, targetX, targetY, deltaTime);
    });
  }

  private moveAnimalTowards(
    animal: (typeof this.world.animals)[number],
    targetX: number,
    targetY: number,
    deltaTime: number,
  ): void {
    const dx = targetX - animal.x;
    const dy = targetY - animal.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) {
      return;
    }

    const step = animal.speed * deltaTime;

    if (distance <= step) {
      animal.x = targetX;
      animal.y = targetY;
      return;
    }

    animal.x += (dx / distance) * step;
    animal.y += (dy / distance) * step;
  }

  private getFollowers() {
    return this.world.animals
      .filter((animal) => animal.isFollowing && !animal.isDelivered)
      .sort((left, right) => left.followIndex - right.followIndex);
  }
}