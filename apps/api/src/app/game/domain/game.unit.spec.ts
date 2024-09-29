import { Game } from './game';
describe('Game', () => {
  it('should be able to create a game', () => {
    // Arrange
    const props = {
      name: 'Game 1',
      type: 'Deck building',
    };
    // Act
    const game = Game.create(props);
    // Assert
    expect(game).toBeDefined();
    expect(game.name).toBe('Game 1');
    expect(game.type).toBe('Deck building');
  });
});
