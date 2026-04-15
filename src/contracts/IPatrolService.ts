import { Animal } from '../entities/Animal';

export interface IPatrolService {
  updateAnimals(animals: Animal[], deltaTime: number): void;
}