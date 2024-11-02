import { Game } from './Game';

export interface GameRepository {
  findByEAN(ean: string): Promise<Game | null>;
  save(game: Game): Promise<Game>;
}
