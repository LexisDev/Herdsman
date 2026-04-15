import { GameWorld } from '../world/GameWorld';

export class InputSystem {
  constructor(private readonly world: GameWorld) {}

  public moveHeroTo(x: number, y: number): void {
    this.world.hero.setTarget(x, y);
  }
}