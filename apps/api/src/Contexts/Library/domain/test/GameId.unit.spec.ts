import { GameId } from '../GameId';
import { GameTypeEnum } from '../GameTypeEnum';
describe('GameId', () => {
  it('should be generated from a type, a name and a unique string', () => {
    const gameType = GameTypeEnum.BOARD_GAME.toString();
    const gameName = 'Harry Potter';
    const uniqueString = 'd2b6b8b0-4b7b-4b7b-8b0b-4b7b8b0b7b4b';
    const gameId = new GameId(gameType, gameName, uniqueString);
    expect(gameId).toBeInstanceOf(GameId);
    expect(gameId.value).toBe(`board-game-harry-potter-d2b6b8b0`);
  });
  it('should be generated from a name and a string', () => {
    const gameType = GameTypeEnum.BOARD_GAME.toString();
    const gameName = 'Harry Potter';
    const uniqueString = 'd2b6b8b0-4b7b-4b7b-8b0b-4b7b8b0b7b4b';
    const gameId = new GameId(gameType, gameName, uniqueString);
    expect(gameId.value).toBe(`board-game-harry-potter-d2b6b8b0`);
  });
  it('should handle game name with accent', () => {
    const gameType = GameTypeEnum.BOARD_GAME.toString();
    const gameName = 'Hárry Póttér';
    const uniqueString = 'd2b6b8b0-4b7b-4b7b-8b0b-4b7b8b0b7b4b';
    const gameId = new GameId(gameType, gameName, uniqueString);
    expect(gameId.value).toBe(`board-game-harry-potter-d2b6b8b0`);
  });
  it('should replace all space by a dash.', () => {
    const gameType = GameTypeEnum.BOARD_GAME.toString();
    const name = 'Harry Potter - Bataille à Poudlard';
    const uniqueString = 'd2b6b8b0-4b7b-4b7b-8b0b-4b7b8b0b7b4b';
    const gameId = new GameId(gameType, name, uniqueString);
    expect(gameId.value).toBe(
      `board-game-harry-potter-bataille-a-poudlard-d2b6b8b0`
    );
  });
});
