import { Graphics } from 'pixi.js';

export class FieldView extends Graphics {
  private lastWidth = -1;
  private lastHeight = -1;
  private lastColor = -1;

  public resize(width: number, height: number, color: number): void {
    if (
      this.lastWidth === width &&
      this.lastHeight === height &&
      this.lastColor === color
    ) {
      return;
    }

    this.lastWidth = width;
    this.lastHeight = height;
    this.lastColor = color;

    this.clear();
    this.rect(0, 0, width, height);
    this.fill(color);
  }
}