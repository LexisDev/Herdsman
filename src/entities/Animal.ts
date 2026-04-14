export class Animal {
  public isFollowing = false;
  public isDelivered = false;
  public followIndex = -1;

  public patrolTargetX: number | null = null;
  public patrolTargetY: number | null = null;
  public patrolWaitTime = 0;

  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public speed: number,
  ) {}

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

  public setPatrolTarget(x: number, y: number): void {
    this.patrolTargetX = x;
    this.patrolTargetY = y;
  }

  public clearPatrolTarget(): void {
    this.patrolTargetX = null;
    this.patrolTargetY = null;
  }
}