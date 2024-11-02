import { mock } from 'ts-jest-mocker';
import { TransactionManager } from '../../../../Shared/App/Port';
import { Game } from '../../../Domain/Game/Game';
import { GameRepository } from '../../../Domain/Game/GameRepository';
import { GameTypeEnum } from '../../../Domain/Game/GameTypeEnum';
import { AddGameToLibraryCommand } from './AddGameToLibrary.command';
import { AddGameToLibrary } from './AddGameToLibrary.usecase';

describe('Add game to library', () => {
  it('should throw an error if the game is already in the library', async () => {
    const transactionManager: TransactionManager = mock<TransactionManager>();
    const gameRepository = mock<GameRepository>();
    gameRepository.findByEAN.mockResolvedValue(
      new Game({
        ean: '0123456789012',
        name: {
          label: 'My game',
          language: 'en',
        },
        type: GameTypeEnum.BOARD_GAME,
        isCoop: true,
      })
    );
    const useCase = new AddGameToLibrary(transactionManager, gameRepository);
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
