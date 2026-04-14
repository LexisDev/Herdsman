import { Graphics } from 'pixi.js';

export class HeroView extends Graphics {
  constructor(radius: number, color: number) {
    super();

    this.circle(0, 0, radius);
    this.fill(color);
  }

  public syncPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}