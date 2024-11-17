import { CommandHandler } from '../../../../Shared/App/Command';
import { Logger } from '../../../../Shared/App/Utils';
import { TransactionManager } from '../../../../Shared/Domain';
import { GameRepository } from '../../../Domain/Game';
import { Game } from '../../../Domain/Game/Game';
import { GameTypeEnum } from '../../../Domain/Game/GameTypeEnum';
import { AddGameToLibraryCommand } from './AddGameToLibrary.command';

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
    const gameToCreate = Game.create({
      ean: command.body.ean,
      name: command.body.name,
      language: command.body.nameLanguage,
      type: {
        label: command.body.type as GameTypeEnum,
        isCooperative: command.body.isCoop,
      },
    });
    await this._gameRepository.save(gameToCreate);
  }
  async setupTransaction(): Promise<void> {
    return this._transactionManager.startTransaction().then(() => {
      this._gameRepository.defineTransaction(this._transactionManager);
    });
  }
}
