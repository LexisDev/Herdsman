import { Text, TextStyle } from 'pixi.js';

export class FpsView extends Text {
  private currentValue = Number.NaN;

  constructor(style: Partial<TextStyle>) {
    super({
      text: 'FPS: 0',
      style,
    });

    this.anchor.set(1, 0);
  }

  public syncValue(value: number): void {
    if (this.currentValue === value) {
      return;
    }

    this.currentValue = value;
    this.text = `FPS: ${value}`;
  }

  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}