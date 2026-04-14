import { Text, TextStyle } from 'pixi.js';

export class ScoreView extends Text {
  private currentScore = Number.NaN;

  constructor(style: Partial<TextStyle>) {
    super({
      text: 'Score: 0',
      style,
    });

    this.anchor.set(0, 0);
  }

  public syncScore(score: number): void {
    if (this.currentScore === score) {
      return;
    }

    this.currentScore = score;
    this.text = `Score: ${score}`;
  }

  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}