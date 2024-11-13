import { Mock, mock } from 'ts-jest-mocker';
import { Logger } from '../../../../Shared/App/Utils';
import { TransactionManager } from '../../../../Shared/Domain';
import { Game } from '../../../Domain/Game/Game';
import { GameRepository } from '../../../Domain/Game/GameRepository';
import { GameTypeEnum } from '../../../Domain/Game/GameTypeEnum';
import { AddGameToLibraryCommand } from './AddGameToLibrary.command';
import { AddGameToLibrary } from './AddGameToLibrary.usecase';

describe('Add game to library', () => {
  const transactionManager: TransactionManager = mock<TransactionManager>();
  let gameRepository: Mock<GameRepository>;
  let useCase: AddGameToLibrary;
  let logger: Mock<Logger>;
  beforeEach(() => {
    gameRepository = mock<GameRepository>();
    logger = mock<Logger>();
    useCase = new AddGameToLibrary(transactionManager, logger, gameRepository);
  });
  it('should throw an error if the game is already in the library', async () => {
    gameRepository.findByEAN.mockResolvedValue(
      Game.create({
        ean: '0123456789012',
        name: {
          label: 'My game',
          language: 'en',
        },
        type: {
          label: GameTypeEnum.BOARD_GAME,
          isCooperative: true,
        },
      })
    );
    try {
      const command = new AddGameToLibraryCommand({
        ean: '0123456789012',
        name: 'My game',
        nameLanguage: 'en',
        type: GameTypeEnum.BOARD_GAME.toString(),
        isCoop: true,
      });
      await useCase.handle(command);
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError);
      expect(error.message).toBe('Game is already in the library');
    }
  });
  it('should add a game to the library', async () => {
    gameRepository.findByEAN.mockResolvedValue(null);
    gameRepository.save.mockResolvedValue(
      Game.create({
        ean: '0123456789012',
        name: {
          label: 'My game',
          language: 'en',
        },
        type: {
          label: GameTypeEnum.BOARD_GAME,
          isCooperative: true,
        },
      })
    );
    const command = new AddGameToLibraryCommand({
      ean: '0123456789012',
      name: 'My game',
      nameLanguage: 'en',
      type: GameTypeEnum.BOARD_GAME.toString(),
      isCoop: true,
    });
    await useCase.handle(command);
    expect(gameRepository.save).toHaveBeenCalledWith(expect.any(Game));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
