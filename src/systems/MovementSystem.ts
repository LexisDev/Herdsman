import type { Updatable } from '../core/GameLoop';
import { Hero } from '../entities/Hero';

export class MovementSystem implements Updatable {
  constructor(private readonly hero: Hero) {}

  public update(deltaTime: number): void {
    const dx = this.hero.targetX - this.hero.x;
    const dy = this.hero.targetY - this.hero.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) {
      return;
    }

    const step = this.hero.speed * deltaTime;

    if (distance <= step) {
      this.hero.x = this.hero.targetX;
      this.hero.y = this.hero.targetY;
      return;
    }

    this.hero.x += (dx / distance) * step;
    this.hero.y += (dy / distance) * step;
  }
}