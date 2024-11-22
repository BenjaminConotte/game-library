import {
  CommandHandler,
  Result,
} from '@game-library/shared/Shared/App/Command';
import { Logger } from '@game-library/shared/Shared/App/Utils';
import { TransactionManager } from '@game-library/shared/Shared/Domain';
import { GameRepository } from '../../../Domain/Game';
import { Game } from '../../../Domain/Game/Game';
import { GameTypeEnum } from '../../../Domain/Game/GameTypeEnum';
import { AddGameToLibraryCommand } from './AddGameToLibrary.command';
import { GameCreationException } from './GameCreation.exception';

export class AddGameToLibrary extends CommandHandler<AddGameToLibraryCommand> {
  constructor(
    transactionManager: TransactionManager,
    logger: Logger,
    private readonly _gameRepository: GameRepository
  ) {
    super(transactionManager, logger);
  }
  public async handle(command: AddGameToLibraryCommand): Promise<Result> {
    if (await this._gameRepository.findByEAN(command.body.ean)) {
      throw new RangeError('Game is already in the library');
    }
    try {
      const gameToCreate = Game.create({
        ean: command.body.ean,
        name: command.body.name,
        language: command.body.nameLanguage,
        type: {
          label: command.body.type as GameTypeEnum,
          isCooperative: command.body.isCoop,
        },
      });
      this._logger.log(
        `Game with ean ${gameToCreate.id.value} added to the library.`
      );
      return this._gameRepository
        .save(gameToCreate)
        .then(() => ({ success: true, message: 'Game added to the library' }));
    } catch (error) {
      this._logger.error(error.message);
      throw new GameCreationException(error.message);
    }
  }
  async setupTransaction(): Promise<void> {
    return this._transactionManager.startTransaction().then(() => {
      this._gameRepository.defineTransaction(this._transactionManager);
    });
  }
}
