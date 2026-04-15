import { Animal } from '../entities/Animal';
import { Hero } from '../entities/Hero';

export interface IFollowService {
  tryPickAnimals(animals: Animal[], hero: Hero): Animal[];
  updateFollowers(animals: Animal[], hero: Hero, deltaTime: number): void;
}