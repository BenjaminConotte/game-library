import { Game } from '../Game';
import { GameTypeEnum } from '../GameTypeEnum';
describe('Game', () => {
  it('should be created from a name, a language and a type.', () => {
    const ean = '0123456789123';
    const gameName = 'Harry Potter - Battle of Hogwarts';
    const gameLanguage = 'en';
    const gameType = GameTypeEnum.BOARD_GAME;
    const game = Game.create({
      ean: ean,
      name: gameName,
      language: gameLanguage,
      type: {
        label: gameType,
        isCooperative: false,
      },
    });
    expect(game).toBeInstanceOf(Game);
    expect(game.id.value).toEqual(ean);
    expect(game.toPrimitives()).toEqual({
      ean: ean,
      name: 'Harry Potter - Battle of Hogwarts',
      language: 'en',
      type: {
        label: 'board game',
        isCooperative: false,
      },
    });
  });
  it('should throw an error if the ean if not a valid value and the name is not provided.', () => {
    expect(() =>
      Game.create({
        ean: '123',
        name: null,
        language: 'en',
        type: { label: GameTypeEnum.BOARD_GAME, isCooperative: false },
      })
    ).toThrow('EAN must be 13 characters;Name is required;');
  });
});
