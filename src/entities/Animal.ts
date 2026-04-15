export class Animal {
  private isFollowing = false;
  private isDelivered = false;
  private followIndex = -1;

  private x: number;
  private y: number;
  private readonly radius: number;
  private readonly speed: number;

  private patrolTargetX: number | null = null;
  private patrolTargetY: number | null = null;
  private patrolWaitTime = 0;

  constructor(x: number, y: number, radius: number, speed: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
  }

  public startFollowing(index: number): void {
    this.isFollowing = true;
    this.followIndex = index;
    this.patrolTargetX = null;
    this.patrolTargetY = null;
    this.patrolWaitTime = 0;
  }

  public stopFollowing(): void {
    this.isFollowing = false;
    this.followIndex = -1;
  }

  public markDelivered(): void {
    this.isDelivered = true;
    this.stopFollowing();
  }

  public reset(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.isDelivered = false;
    this.isFollowing = false;
    this.followIndex = -1;
    this.patrolTargetX = null;
    this.patrolTargetY = null;
    this.patrolWaitTime = 0;
  }

  public canBeDelivered(): boolean {
    return this.isFollowing && !this.isDelivered;
  }

  public isActiveFollower(): boolean {
    return this.isFollowing && !this.isDelivered;
  }

  public isAvailableForPickup(): boolean {
    return !this.isDelivered && !this.isFollowing;
  }

  public isPatrollingAvailable(): boolean {
    return !this.isDelivered && !this.isFollowing;
  }

  public isDeliveredState(): boolean {
    return this.isDelivered;
  }

  public getFollowIndex(): number {
    return this.followIndex;
  }

  public setFollowIndex(index: number): void {
    this.followIndex = index;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public getRadius(): number {
    return this.radius;
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

  public moveTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public distanceTo(x: number, y: number): number {
    return Math.hypot(x - this.x, y - this.y);
  }

  public moveTowards(targetX: number, targetY: number, step: number): void {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) {
      return;
    }

    if (distance <= step) {
      this.moveTo(targetX, targetY);
      return;
    }

    this.x += (dx / distance) * step;
    this.y += (dy / distance) * step;
  }

  public setPatrolTarget(x: number, y: number): void {
    this.patrolTargetX = x;
    this.patrolTargetY = y;
  }

  public clearPatrolTarget(): void {
    this.patrolTargetX = null;
    this.patrolTargetY = null;
  }

  public hasPatrolTarget(): boolean {
    return this.patrolTargetX !== null && this.patrolTargetY !== null;
  }

  public getPatrolTarget(): { x: number; y: number } | null {
    if (!this.hasPatrolTarget()) {
      return null;
    }

    return {
      x: this.patrolTargetX!,
      y: this.patrolTargetY!,
    };
  }

  public shouldWaitForPatrol(): boolean {
    return this.patrolWaitTime > 0;
  }

  public decreasePatrolWaitTime(deltaTime: number): void {
    this.patrolWaitTime -= deltaTime;
  }

  public setPatrolWaitTime(seconds: number): void {
    this.patrolWaitTime = seconds;
  }
}