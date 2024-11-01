import { GameName } from '../GameName';
describe('GameName', () => {
  it('should be created from a name and a language.', () => {
    const name = 'Harry Potter - Bataille à Poudlard';
    const language = 'fr';
    const gameName = new GameName(name, language);
    expect(gameName.value).toBe('Harry Potter - Bataille à Poudlard');
    expect(gameName.language).toBe('fr');
  });
});
