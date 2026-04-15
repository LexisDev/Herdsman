import { MainScene } from '../scene/MainScene';
import { GameWorld } from '../world/GameWorld';
import { SoundSystem } from '../systems/SoundSystem';
import type { Updatable } from '../core/GameLoop';

export class GameRuntime {
  constructor(
    public readonly world: GameWorld,
    public readonly scene: MainScene,
    public readonly soundSystem: SoundSystem,
    public readonly systems: Updatable[],
  ) {}
}