import { GameTypeEnum } from '../../../Domain/Game/GameTypeEnum';
import { AddGameToLibraryCommand } from './AddGameToLibrary.command';
import { AddGameToLibrary } from './AddGameToLibrary.usecase';

describe('Add game to library', () => {
  it('should throw an error if the game is already in the library', async () => {
    const useCase = new AddGameToLibrary();
    try {
      const command = new AddGameToLibraryCommand({
        ean: '0123456789012',
        name: 'My game',
        nameLanguage: 'en',
        type: GameTypeEnum.BOARD_GAME.toString(),
        isCoop: 'true',
      });
      await useCase.handle(command);
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError);
      expect(error.message).toBe('Game is already in the library');
    }
  });
});
