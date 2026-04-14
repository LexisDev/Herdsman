import { Container, Graphics } from 'pixi.js';

export class LightningView extends Container {
  private readonly bolts: Graphics[] = [];
  private elapsedTime = 0;
  private nextFlashTime = 0;

  private centerX = 0;
  private topY = 0;
  private lightningWidth = 320;
  private lightningHeight = 90;

  constructor(private readonly boltsCount: number = 3) {
    super();

    for (let index = 0; index < this.boltsCount; index += 1) {
      const bolt = new Graphics();
      bolt.alpha = 0;
      this.bolts.push(bolt);
      this.addChild(bolt);
    }
  }

  public setLayout(centerX: number, topY: number): void {
    this.centerX = centerX;
    this.topY = topY;
  }

  public update(deltaTime: number): void {
    this.elapsedTime += deltaTime;

    if (this.elapsedTime >= this.nextFlashTime) {
      this.redrawBolts();
      this.nextFlashTime = this.elapsedTime + this.randomRange(0.06, 0.18);
    }

    for (const bolt of this.bolts) {
      bolt.alpha *= 0.88;

      if (bolt.alpha < 0.02) {
        bolt.alpha = 0;
      }
    }
  }

  private redrawBolts(): void {
    for (const bolt of this.bolts) {
      bolt.clear();

      const startX = this.centerX - this.lightningWidth / 2 + this.randomRange(0, this.lightningWidth);
      const startY = this.topY + this.randomRange(0, this.lightningHeight * 0.35);

      const endX = this.centerX - this.lightningWidth / 2 + this.randomRange(0, this.lightningWidth);
      const endY = this.topY + this.randomRange(this.lightningHeight * 0.45, this.lightningHeight);

      const points = this.buildBoltPoints(startX, startY, endX, endY, 6);

      bolt.moveTo(points[0].x, points[0].y);

      for (let index = 1; index < points.length; index += 1) {
        bolt.lineTo(points[index].x, points[index].y);
      }

      bolt.stroke({
        color: 0xd8f3ff,
        width: this.randomRange(1.5, 3.5),
        alpha: 1,
      });

      bolt.alpha = this.randomRange(0.65, 1);
    }
  }

  private buildBoltPoints(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    segments: number,
  ): Array<{ x: number; y: number }> {
    const points: Array<{ x: number; y: number }> = [{ x: startX, y: startY }];

    for (let index = 1; index < segments; index += 1) {
      const t = index / segments;

      const baseX = startX + (endX - startX) * t;
      const baseY = startY + (endY - startY) * t;

      const offsetX = this.randomRange(-24, 24);
      const offsetY = this.randomRange(-8, 8);

      points.push({
        x: baseX + offsetX,
        y: baseY + offsetY,
      });
    }

    points.push({ x: endX, y: endY });

    return points;
  }

  private randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}