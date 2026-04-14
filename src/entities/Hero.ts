export class Hero {
  public targetX: number;
  public targetY: number;

  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public speed: number,
  ) {
    this.targetX = x;
    this.targetY = y;
  }

  public setTarget(x: number, y: number): void {
    this.targetX = x;
    this.targetY = y;
  }
}