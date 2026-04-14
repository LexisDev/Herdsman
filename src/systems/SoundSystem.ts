export class SoundSystem {
  private readonly pickupSound: HTMLAudioElement;
  private readonly deliverySound: HTMLAudioElement;

  constructor() {
    this.pickupSound = new Audio('/assets/sounds/pickup.mp3');
    this.pickupSound.preload = 'auto';
    this.pickupSound.volume = 0.5;

    this.deliverySound = new Audio('/assets/sounds/accept.mp3');
    this.deliverySound.preload = 'auto';
    this.deliverySound.volume = 0.55;
  }

  public playPickup(): void {
    this.play(this.pickupSound);
  }

  public playDelivery(): void {
    this.play(this.deliverySound);
  }

  private play(source: HTMLAudioElement): void {
    const soundInstance = source.cloneNode() as HTMLAudioElement;
    soundInstance.volume = source.volume;

    void soundInstance.play().catch(() => {});
  }
}