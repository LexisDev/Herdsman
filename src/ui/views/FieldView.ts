import { Graphics } from 'pixi.js';

export class FieldView extends Graphics {
  constructor() {
    super();
  }

  public draw(width: number, height: number, color: number): void {
    this.clear();
    this.rect(0, 0, width, height);
    this.fill(color);
  }
}