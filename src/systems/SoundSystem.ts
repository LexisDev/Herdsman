import { EventBus } from '../events/EventBus';
import { GameEvents } from '../events/GameEvents';

export class SoundSystem {
  private readonly pickupSound: HTMLAudioElement;
  private readonly deliverySound: HTMLAudioElement;

  constructor(private readonly eventBus: EventBus) {
    this.pickupSound = new Audio('/assets/sounds/pickup.mp3');
    this.pickupSound.preload = 'auto';
    this.pickupSound.volume = 0.5;

    this.deliverySound = new Audio('/assets/sounds/accept.mp3');
    this.deliverySound.preload = 'auto';
    this.deliverySound.volume = 0.55;
  }

  public register(): void {
    this.eventBus.on(GameEvents.AnimalPicked, () => {
      this.playPickup();
    });

    this.eventBus.on(GameEvents.AnimalDelivered, () => {
      this.playDelivery();
    });
  }

  private playPickup(): void {
    this.play(this.pickupSound);
  }

  private playDelivery(): void {
    this.play(this.deliverySound);
  }

  private play(source: HTMLAudioElement): void {
    const soundInstance = source.cloneNode() as HTMLAudioElement;
    soundInstance.volume = source.volume;

    void soundInstance.play().catch(() => {});
  }
}