export class Animal {
  public isFollowing = false;
  public isDelivered = false;
  public followIndex = -1;

  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public speed: number,
  ) {}

  public startFollowing(index: number): void {
    this.isFollowing = true;
    this.followIndex = index;
  }

  public stopFollowing(): void {
    this.isFollowing = false;
    this.followIndex = -1;
  }

  public markDelivered(): void {
    this.isDelivered = true;
    this.stopFollowing();
  }
}