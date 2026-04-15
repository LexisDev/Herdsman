import { Animal } from '../entities/Animal';
import { Yard } from '../entities/Yard';
import { Score } from '../entities/Score';

export interface IDeliveryService {
  deliver(animals: Animal[], yard: Yard, score: Score): Animal[];
}