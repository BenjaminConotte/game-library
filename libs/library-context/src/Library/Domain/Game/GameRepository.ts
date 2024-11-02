import { Game } from './Game';

export interface GameRepository {
  list(): Promise<Game[]>;
  findByEAN(ean: string): Promise<Game | null>;
}
