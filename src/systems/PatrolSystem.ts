import type { Updatable } from '../core/GameLoop';
import { GameWorld } from '../world/GameWorld';
import { PatrolService } from './services/PatrolService';

export class PatrolSystem implements Updatable {
  constructor(
    private readonly world: GameWorld,
    private readonly patrolService: PatrolService,
  ) {}

  public update(deltaTime: number): void {
    this.patrolService.updateAnimals(this.world.animals, deltaTime);
  }
}