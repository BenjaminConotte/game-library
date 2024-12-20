import { Logger } from '@game-library/shared/Shared/App/Utils';
import { mock, Mock } from 'ts-jest-mocker';
import { Game, GameRepository, GameTypeEnum } from '../../../Domain/Game';
import { SearchGameQuery } from './SearchGame.query';
import { SearchGame } from './SearchGame.usecase';
describe('Search game', () => {
  let gameRepository: Mock<GameRepository>;
  let logger: Mock<Logger>;
  let useCase: SearchGame;
  beforeEach(() => {
    gameRepository = mock<GameRepository>();
    logger = mock<Logger>();
    useCase = new SearchGame(gameRepository, logger);
  });
  it('should be able to search games without any filters', async () => {
    const query = new SearchGameQuery();
    gameRepository.list.mockResolvedValue([
      Game.create({
        ean: '1234567890123',
        name: 'Game 1',
        language: 'en',
        type: { label: GameTypeEnum.BOARD_GAME, isCooperative: true },
      }),
      Game.create({
        ean: '2345678901234',
        name: 'Game 2',
        language: 'en',
        type: { label: GameTypeEnum.CARD_GAME, isCooperative: true },
      }),
      Game.create({
        ean: '3456789012345',
        name: 'Game 3',
        language: 'en',
        type: { label: GameTypeEnum.DECK_BUILDING, isCooperative: true },
      }),
    ]);
    const result = await useCase.query(query);
    expect(result.data.length).toEqual(3);
    expect(result.data[0].ean).toEqual('1234567890123');
    expect(result.data[1].ean).toEqual('2345678901234');
    expect(result.data[1].name).toEqual('Game 2');
    expect(result.data[2].ean).toEqual('3456789012345');
  });
  it('should be able to search games with part of Name', async () => {
    const query = new SearchGameQuery(null, 'kyj');
    gameRepository.list.mockResolvedValue([
      Game.create({
        ean: '1234567890123',
        name: 'Skyjo',
        language: 'en',
        type: { label: GameTypeEnum.BOARD_GAME, isCooperative: true },
      }),
      Game.create({
        ean: '2345678901234',
        name: 'Kijeal',
        language: 'fr',
        type: { label: GameTypeEnum.CARD_GAME, isCooperative: true },
      }),
    ]);
    const result = await useCase.query(query);
    expect(gameRepository.list).toHaveBeenCalledWith(
      expect.objectContaining({ partOfName: 'kyj' })
    );
    expect(result.data.length).toEqual(2);
    expect(result.data[0].ean).toEqual('1234567890123');
    expect(result.data[0].name).toEqual('Skyjo');
    expect(result.data[1].ean).toEqual('2345678901234');
    expect(result.data[1].name).toEqual('Kijeal');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
