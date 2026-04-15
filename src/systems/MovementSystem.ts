import type { Updatable } from '../core/GameLoop';
import { GameWorld } from '../world/GameWorld';

export class MovementSystem implements Updatable {
  constructor(private readonly world: GameWorld) {}

  public update(deltaTime: number): void {
    const hero = this.world.hero;

    const dx = hero.targetX - hero.x;
    const dy = hero.targetY - hero.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) {
      return;
    }

    const step = hero.speed * deltaTime;

    if (distance <= step) {
      hero.x = hero.targetX;
      hero.y = hero.targetY;
      return;
    }

    hero.x += (dx / distance) * step;
    hero.y += (dy / distance) * step;
  }
}