import type { Updatable } from '../core/GameLoop';
import { MainScene } from '../scene/MainScene';

export class RenderSystem implements Updatable {
  constructor(
    private readonly scene: MainScene,
    private readonly getWidth: () => number,
    private readonly getHeight: () => number,
  ) {}

  public update(_deltaTime: number): void {
    this.scene.resize(
      this.getWidth(),
      this.getHeight(),
    );
  }
}