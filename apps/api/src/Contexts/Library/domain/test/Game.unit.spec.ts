import { Game } from '../Game';
describe('Game', () => {
  it('should be created from a name, a language and a type.', () => {
    const gameName = 'Harry Potter - Battle of Hogwarts';
    const gameLanguage = 'en';
    const gameType = 'board';
    const game = Game.create('8f07ea7c', gameName, gameLanguage, gameType);
    expect(game).toBeInstanceOf(Game);
    expect(game.id.value).toEqual('harry-potter-battle-of-hogwarts-8f07ea7c');
    expect(game.toPrimitives()).toEqual({
      id: 'harry-potter-battle-of-hogwarts-8f07ea7c',
      name: {
        label: 'Harry Potter - Battle of Hogwarts',
        language: 'en',
      },
    });
  });
});
