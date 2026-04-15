export class Fps {
  constructor(public value: number = 0) {}

  public setValue(value: number): void {
    this.value = value;
  }
}