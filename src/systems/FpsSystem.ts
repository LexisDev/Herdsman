import type { Updatable } from '../core/GameLoop';
import { GameWorld } from '../world/GameWorld';

export class FpsSystem implements Updatable {
  private elapsedTime = 0;
  private frameCount = 0;

  constructor(private readonly world: GameWorld) {}

  public update(deltaTime: number): void {
    this.elapsedTime += deltaTime;
    this.frameCount += 1;

    if (this.elapsedTime < 0.25) {
      return;
    }

    const fps = Math.round(this.frameCount / this.elapsedTime);

    this.world.fps.setValue(fps);

    this.elapsedTime = 0;
    this.frameCount = 0;
  }
}