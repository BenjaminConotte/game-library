import { BaseRepository } from '../../../Shared/Domain';
import { Game } from './Game';

export const IGameRepository = Symbol('IGameRepository');

export interface GameRepository extends BaseRepository {
  list(): Promise<Game[]>;
  findByEAN(ean: string): Promise<Game | null>;
  save(game: Game): Promise<Game>;
}
