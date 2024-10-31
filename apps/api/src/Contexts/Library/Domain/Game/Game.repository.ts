import { Game } from './Game';

export interface GameRepository {
  list(): Promise<Game[]>;
}
