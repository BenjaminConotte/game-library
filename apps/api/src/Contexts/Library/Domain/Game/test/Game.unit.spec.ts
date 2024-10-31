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
      name: {
        label: gameName,
        language: gameLanguage,
      },
      type: {
        label: gameType,
        isCooperative: false,
      },
    });
    expect(game).toBeInstanceOf(Game);
    expect(game.id.value).toEqual(ean);
    expect(game.toPrimitives()).toEqual({
      id: ean,
      name: {
        label: 'Harry Potter - Battle of Hogwarts',
        language: 'en',
      },
      type: {
        label: 'board game',
        isCooperative: false,
      },
    });
  });
});
