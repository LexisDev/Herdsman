import type { Updatable } from '../core/GameLoop';
import { GameWorld } from '../world/GameWorld';
import { IPatrolService } from '../contracts/IPatrolService';

export class PatrolSystem implements Updatable {
  constructor(
    private readonly world: GameWorld,
    private readonly patrolService: IPatrolService,
  ) {}

  public update(deltaTime: number): void {
    this.patrolService.updateAnimals(this.world.animals, deltaTime);
  }
}