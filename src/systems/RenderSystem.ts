import type { Updatable } from '../core/GameLoop';
import { MainScene } from '../scene/MainScene';

export class RenderSystem implements Updatable {
  constructor(private readonly scene: MainScene) {}

  public update(_deltaTime: number): void {
    this.scene.render();
  }
}