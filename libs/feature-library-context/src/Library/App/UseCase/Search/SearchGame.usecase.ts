import { QueryHandler } from '../../../../Shared/App/Query';
import { Logger } from '../../../../Shared/App/Utils';
import { GameRepository } from '../../../Domain/Game';
import { SearchGameQuery } from './SearchGame.query';

export type GameResult = {
  ean: string;
  name: string;
  language: string;
  type: string;
  isCooperative: boolean;
};
export class SearchGame extends QueryHandler<
  SearchGameQuery,
  { data: GameResult[] }
> {
  constructor(
    private readonly _gameRepository: GameRepository,
    private readonly _logger: Logger
  ) {
    super();
  }
  public query(query: SearchGameQuery): Promise<{ data: GameResult[] }> {
    const initialResult = { data: [] };
    return this._gameRepository.list({ ...query.target }).then((games) =>
      games.reduce((acc, game) => {
        acc.data.push({
          ...game.toPrimitives(),
        });
        return acc;
      }, initialResult)
    );
  }
}
