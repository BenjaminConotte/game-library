import { GameType } from '../GameType';
describe('GameType', () => {
  it('should be created from a deck building type .', () => {
    const type = 'deck-building';
    const gameType = new GameType(type);
    expect(gameType.value).toBe('deck-building');
  });
  it('should be created from a coop deck building.', () => {
    const type = 'deck-building';
    const gameType = new GameType(type, true);
    expect(gameType.value).toBe('deck-building');
    expect(gameType.isCooperative).toBe(true);
  });
  it('should catch an RangeError for a type not declared into the system.', () => {
    expect(() => new GameType('Molki')).toThrow(
      'Molki is not a valid game type'
    );
  });
});
