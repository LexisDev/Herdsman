import { Graphics } from 'pixi.js';

export class AnimalView extends Graphics {
  constructor() {
    super();
  }

  public draw(x: number, y: number, radius: number, color: number): void {
    this.clear();
    this.circle(x, y, radius);
    this.fill(color);
  }
}