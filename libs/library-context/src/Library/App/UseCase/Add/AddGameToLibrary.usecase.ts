import { CommandHandler } from 'libs/library-context/src/Shared/App/Command';
import { TransactionManager } from '../../../../Shared/App/Port';
import { GameRepository } from '../../../Domain/Game';
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
    throw new RangeError('Method not implemented.');
  }
}
