import { CommandHandler } from '../../../../Shared/App/Command';
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
    private readonly _gameRepository: GameRepository
  ) {
    super(transactionManager);
  }
  async handle(command: AddGameToLibraryCommand): Promise<void> {
    if (await this._gameRepository.findByEAN(command.body.ean)) {
      throw new RangeError('Game is already in the library');
    }
    this._gameRepository.save(
      Game.create({
        ean: command.body.ean,
        name: {
          label: command.body.name,
          language: command.body.nameLanguage,
        },
        type: {
          label: command.body.type as GameTypeEnum,
          isCooperative: command.body.isCoop,
        },
      })
    );
  }
  async setupTransaction(): Promise<void> {
    return this._transactionManager.startTransaction().then(() => {
      this._gameRepository.defineTransaction(this._transactionManager);
    });
  }
}
