import { Graphics } from 'pixi.js';

export class YardView extends Graphics {
  private initialized = false;

  public drawOnce(
    x: number,
    y: number,
    width: number,
    height: number,
    color: number,
  ): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    this.rect(0, 0, width, height);
    this.fill(color);

    this.x = x;
    this.y = y;
  }
}