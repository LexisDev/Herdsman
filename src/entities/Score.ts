export class Score {
  constructor(public value: number = 0) {}

  public increment(amount: number = 1): void {
    this.value += amount;
  }
}