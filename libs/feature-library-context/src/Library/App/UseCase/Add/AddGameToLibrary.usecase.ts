import { CommandHandler } from '../../../../Shared/App/Command';
import { Logger } from '../../../../Shared/App/Utils';
import { TransactionManager } from '../../../../Shared/Domain';
import { GameRepository } from '../../../Domain/Game';
import { Game } from '../../../Domain/Game/Game';
import { GameTypeEnum } from '../../../Domain/Game/GameTypeEnum';
import { AddGameToLibraryCommand } from './AddGameToLibrary.command';
import { GameCreationException } from './GameCreation.exception';

export class AddGameToLibrary extends CommandHandler<
  AddGameToLibraryCommand,
  void
> {
  constructor(
    transactionManager: TransactionManager,
    logger: Logger,
    private readonly _gameRepository: GameRepository
  ) {
    super(transactionManager, logger);
  }
  async handle(command: AddGameToLibraryCommand): Promise<void> {
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
      await this._gameRepository.save(gameToCreate);
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
