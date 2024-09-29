import { Game } from './game';
describe('Game', () => {
  it('should be able to create a game', () => {
    // Arrange
    const props = {
      name: 'Game 1',
      type: 'Deck building',
      minPlayers: 2,
      maxPlayers: 4,
    };
    // Act
    const game = Game.create(props);
    // Assert
    expect(game).toBeDefined();
    expect(game).toBeInstanceOf(Game);
    expect(game.name).toBe('Game 1');
    expect(game.type).toBe('Deck building');
    expect(game.minPlayers).toBe(2);
    expect(game.maxPlayers).toBe(4);
    expect(game.createdAt).toBeDefined();
  });
});
