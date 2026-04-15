import type { Updatable } from '../core/GameLoop';
import { EventBus } from '../events/EventBus';
import { GameEvents } from '../events/GameEvents';
import { GameWorld } from '../world/GameWorld';
import { IDeliveryService } from '../contracts/IDeliveryService';

export class DeliverySystem implements Updatable {
  constructor(
    private readonly world: GameWorld,
    private readonly eventBus: EventBus,
    private readonly deliveryService: IDeliveryService,
    
  ) {}

  public update(_deltaTime: number): void {
    const deliveredAnimals = this.deliveryService.deliver(
      this.world.animals,
      this.world.yard,
      this.world.score,
    );

    for (const animal of deliveredAnimals) {
      this.eventBus.emit(GameEvents.AnimalDelivered, { animal });
    }
  }
}