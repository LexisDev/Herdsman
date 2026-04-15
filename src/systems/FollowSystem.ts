import type { Updatable } from '../core/GameLoop';
import { EventBus } from '../events/EventBus';
import { GameEvents } from '../events/GameEvents';
import { GameWorld } from '../world/GameWorld';
import { FollowService } from './services/FollowService';

export class FollowSystem implements Updatable {
  constructor(
    private readonly world: GameWorld,
    private readonly eventBus: EventBus,
    private readonly followService: FollowService,
  ) {}

  public update(deltaTime: number): void {
    const pickedAnimals = this.followService.tryPickAnimals(
      this.world.animals,
      this.world.hero,
    );

    for (const animal of pickedAnimals) {
      this.eventBus.emit(GameEvents.AnimalPicked, { animal });
    }

    this.followService.updateFollowers(
      this.world.animals,
      this.world.hero,
      deltaTime,
    );
  }
}