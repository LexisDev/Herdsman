import { Animal } from '../../entities/Animal';
import { Yard } from '../../entities/Yard';
import { Score } from '../../entities/Score';
import { IDeliveryService } from '../../contracts/IDeliveryService';

export class DeliveryService implements IDeliveryService {
  public deliver(animals: Animal[], yard: Yard, score: Score): Animal[] {
    const deliveredAnimals: Animal[] = [];

    for (const animal of animals) {
      if (!animal.canBeDelivered()) {
        continue;
      }

      const position = animal.getPosition();

      if (!yard.contains(position.x, position.y)) {
        continue;
      }

      animal.markDelivered();
      score.increment();
      deliveredAnimals.push(animal);
    }

    this.rebuildFollowerIndexes(animals);

    return deliveredAnimals;
  }

  private rebuildFollowerIndexes(animals: Animal[]): void {
    const followers = animals
      .filter((animal) => animal.isActiveFollower())
      .sort((left, right) => left.getFollowIndex() - right.getFollowIndex());

    followers.forEach((animal, index) => {
      animal.setFollowIndex(index);
    });
  }
}