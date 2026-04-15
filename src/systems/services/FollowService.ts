import { GameConfig } from '../../core/GameConfig';
import { Animal } from '../../entities/Animal';
import { Hero } from '../../entities/Hero';
import { IFollowService } from '../../contracts/IFollowService';

export class FollowService implements IFollowService {
  public tryPickAnimals(
    animals: Animal[],
    hero: Hero,
  ): Animal[] {
    const pickedAnimals: Animal[] = [];
    const followers = this.getFollowers(animals);

    if (followers.length >= GameConfig.animals.maxGroupSize) {
      return pickedAnimals;
    }

    const heroPosition = hero.getPosition();

    for (const animal of animals) {
      if (!animal.isAvailableForPickup()) {
        continue;
      }

      const distance = animal.distanceTo(heroPosition.x, heroPosition.y);

      if (distance > GameConfig.animals.pickupDistance) {
        continue;
      }

      const currentFollowers = this.getFollowers(animals);

      if (currentFollowers.length >= GameConfig.animals.maxGroupSize) {
        return pickedAnimals;
      }

      animal.startFollowing(currentFollowers.length);
      pickedAnimals.push(animal);
    }

    return pickedAnimals;
  }

  public updateFollowers(
    animals: Animal[],
    hero: Hero,
    deltaTime: number,
  ): void {
    const followers = this.getFollowers(animals);
    const heroPosition = hero.getPosition();

    followers.forEach((animal, index) => {
      animal.setFollowIndex(index);

      const targetX =
        heroPosition.x - (index + 1) * GameConfig.animals.followSpacing;
      const targetY = heroPosition.y;

      const step = animal.getSpeed() * deltaTime;
      animal.moveTowards(targetX, targetY, step);
    });
  }

  private getFollowers(animals: Animal[]): Animal[] {
    return animals
      .filter((animal) => animal.isActiveFollower())
      .sort(
        (left, right) => left.getFollowIndex() - right.getFollowIndex(),
      );
  }
}