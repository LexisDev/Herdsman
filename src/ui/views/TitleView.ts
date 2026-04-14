import { Text, TextStyle } from 'pixi.js';

export class TitleView extends Text {
  constructor(text: string, style: Partial<TextStyle>) {
    super({
      text,
      style,
    });

    this.anchor.set(0.5, 0);
  }

  public centerHorizontally(screenWidth: number, y: number): void {
    this.x = screenWidth / 2;
    this.y = y;
  }
}