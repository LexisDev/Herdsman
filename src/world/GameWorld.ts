import { Hero } from '../entities/Hero';
import { Animal } from '../entities/Animal';
import { Yard } from '../entities/Yard';
import { Score } from '../entities/Score';

export class GameWorld {
  constructor(
    public readonly hero: Hero,
    public readonly animals: Animal[],
    public readonly yard: Yard,
    public readonly score: Score,
  ) {}
}