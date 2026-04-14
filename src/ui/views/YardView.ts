import { Graphics } from 'pixi.js';

export class YardView extends Graphics {
  constructor() {
    super();
  }

  public draw(
    x: number,
    y: number,
    width: number,
    height: number,
    color: number,
  ): void {
    this.clear();
    this.rect(x, y, width, height);
    this.fill(color);
  }
}