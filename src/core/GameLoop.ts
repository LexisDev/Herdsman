export interface Updatable {
  update(deltaTime: number): void;
}

export class GameLoop {
  private readonly updatables: Updatable[] = [];

  public register(updatable: Updatable): void {
    this.updatables.push(updatable);
  }

  public update(deltaTime: number): void {
    for (const updatable of this.updatables) {
      updatable.update(deltaTime);
    }
  }
}