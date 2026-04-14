import { Hero } from '../entities/Hero';

export class InputSystem {
  constructor(private readonly hero: Hero) {}

  public moveHeroTo(x: number, y: number): void {
    this.hero.setTarget(x, y);
  }
}