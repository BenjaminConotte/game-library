import { GameId } from '../GameId';
describe('GameId', () => {
  it('should be generated from a name and a string', () => {
    const gameName = 'Harry Potter';
    const uniqueString = 'd2b6b8b0-4b7b-4b7b-8b0b-4b7b8b0b7b4b';
    const gameId = new GameId(gameName, uniqueString);
    expect(gameId.value).toBe(`harry-potter-d2b6b8b0`);
  });
  it('should handle game name with accent', () => {
    const gameName = 'Hárry Póttér';
    const uniqueString = 'd2b6b8b0-4b7b-4b7b-8b0b-4b7b8b0b7b4b';
    const gameId = new GameId(gameName, uniqueString);
    expect(gameId.value).toBe(`harry-potter-d2b6b8b0`);
  });
});
