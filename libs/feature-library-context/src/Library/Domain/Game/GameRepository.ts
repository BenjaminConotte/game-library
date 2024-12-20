import { BaseRepository } from '@game-library/shared/Shared/Domain';
import { Game } from './Game';

export const IGameRepository = Symbol('IGameRepository');

export interface GameRepository extends BaseRepository {
  list(filters: { partOfEAN?: string; partOfName?: string }): Promise<Game[]>;
  findByEAN(ean: string): Promise<Game | null>;
  save(game: Game): Promise<Game>;
}
