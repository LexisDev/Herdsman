import type { Updatable } from '../core/GameLoop';
import { GameWorld } from '../world/GameWorld';

export class MovementSystem implements Updatable {
  constructor(private readonly world: GameWorld) {}

  public update(deltaTime: number): void {
    const hero = this.world.hero;
    const step = hero.getSpeed() * deltaTime;

    hero.moveTowardsTarget(step);
  }
}