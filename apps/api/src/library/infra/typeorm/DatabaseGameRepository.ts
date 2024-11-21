import {
  Game,
  GameRepository,
} from '@game-library/library-context/Library/Domain/Game';
import { GameProps } from '@game-library/library-context/Library/Domain/Game/GameProps';
import { TransactionManager } from '@game-library/library-context/Shared/Domain';
import { DataSource, QueryRunner } from 'typeorm';
import { GameSchema } from './schema/GameSchema';
import { TypeORMTransactionManager } from './TypeORMTransactionManager';

export class DatabaseGameRepository implements GameRepository {
  private _queryBuilder: QueryRunner = undefined;

  constructor(private readonly _dataSource: DataSource) {}
  async list(): Promise<Game[]> {
    return this._dataSource
      .getRepository<GameProps>(GameSchema)
      .find()
      .then((games) => games.map(this.convertToAggregate));
  }

  private convertToAggregate(props: GameProps): Game {
    return Game.instanciate(props);
  }
  async findByEAN(ean: string): Promise<Game | null> {
    return this._dataSource
      .getRepository<GameProps>(GameSchema)
      .findOneBy({ ean: ean })
      .then((props) => {
        return props ? this.convertToAggregate(props) : null;
      });
  }
  async save(game: Game): Promise<Game> {
    if (this._queryBuilder) {
      return await this._queryBuilder.manager
        .save(GameSchema, game.toPrimitives())
        .then(() => game);
    } else {
      return await this._dataSource
        .getRepository<GameProps>(GameSchema)
        .save(game.toPrimitives())
        .then(() => game);
    }
  }
  async defineTransaction(
    transactionManager: TransactionManager
  ): Promise<void> {
    if (!this._queryBuilder) {
      this._queryBuilder = (
        transactionManager as TypeORMTransactionManager
      ).queryRunner;
    }
  }
}
