import { CommandHandler } from 'libs/library-context/src/Shared/App/Command';
import { AddGameToLibraryCommand } from './AddGameToLibrary.command';

export class AddGameToLibrary extends CommandHandler<
  AddGameToLibraryCommand,
  void
> {
  async handle(command: AddGameToLibraryCommand): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
