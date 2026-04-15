import { Container } from 'pixi.js';

export interface IScene {
  readonly root: Container;
  resize(width: number, height: number): void;
  update(deltaTime: number): void;
}