export class Hero {
  private x: number;
  private y: number;
  private readonly radius: number;
  private readonly speed: number;
  private targetX: number;
  private targetY: number;

  constructor(x: number, y: number, radius: number, speed: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.targetX = x;
    this.targetY = y;
  }

  public setTarget(x: number, y: number): void {
    this.targetX = x;
    this.targetY = y;
  }

  public getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getRadius(): number {
    return this.radius;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public getTarget(): { x: number; y: number } {
    return { x: this.targetX, y: this.targetY };
  }

  public moveTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public distanceToTarget(): number {
    return Math.hypot(this.targetX - this.x, this.targetY - this.y);
  }

  public moveTowardsTarget(step: number): void {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) {
      return;
    }

    if (distance <= step) {
      this.moveTo(this.targetX, this.targetY);
      return;
    }

    this.x += (dx / distance) * step;
    this.y += (dy / distance) * step;
  }
}