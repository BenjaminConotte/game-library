import { GameName } from '../GameName';
describe('GameName', () => {
  it('should be created from a name and a language.', () => {
    const name = 'Harry Potter - Bataille à Poudlard';
    const gameName = new GameName(name);
    expect(gameName.value).toBe('Harry Potter - Bataille à Poudlard');
  });
  it('should throw an error if the name is not provided.', () => {
    expect(() => new GameName(null)).toThrow('Name is required');
  });
});
