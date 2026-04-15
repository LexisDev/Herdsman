import type { Updatable } from '../core/GameLoop';
import { GameConfig } from '../core/GameConfig';
import { GameWorld } from '../world/GameWorld';

export class RespawnSystem implements Updatable {
  constructor(
    private readonly world: GameWorld,
    private readonly randomInt: (min: number, max: number) => number,
  ) {}

  public update(_deltaTime: number): void {
    if (this.world.animals.length === 0) {
      return;
    }

    const allDelivered = this.world.animals.every((animal) => animal.isDelivered);

    if (!allDelivered) {
      return;
    }

    this.respawnAnimals();
  }

  private respawnAnimals(): void {
    for (const animal of this.world.animals) {
      animal.reset(
        this.randomInt(GameConfig.animals.minX, GameConfig.animals.maxX),
        this.randomInt(GameConfig.animals.minY, GameConfig.animals.maxY),
      );
    }
  }
}