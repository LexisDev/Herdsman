import { Text, TextStyle } from 'pixi.js';

export class ScoreView extends Text {
  constructor(style: Partial<TextStyle>) {
    super({
      text: 'Score: 0',
      style,
    });

    this.anchor.set(0, 0);
  }

  public setScore(score: number): void {
    this.text = `Score: ${score}`;
  }

  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}