import { GameTypeEnum } from './GameTypeEnum';

export class GameId {
  private _value: string;
  constructor(type: string, gameName: string, uniqueString: string) {
    if (!Object.values(GameTypeEnum).includes(type as GameTypeEnum))
      throw new RangeError('Game type is invalid');
    if (gameName === null) throw new Error('Game name is required');
    if (uniqueString === null) throw new Error('Unique string is required');
    if (gameName.length < 3)
      throw new RangeError('Game name must be at least 3 characters');
    if (uniqueString.length < 5)
      throw new RangeError('Unique string must be at least 4 characters');
    const formattedType = type.trim().toLocaleLowerCase().replace(/ /g, '-');
    const formattedName = gameName
      .split('-')
      .map((parOfName) => parOfName.trim().replace(/ /g, '-'))
      .join('-')
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const formattedUniqueString = uniqueString
      .trim()
      .toLocaleLowerCase()
      .split('-')[0];
    this.value = `${formattedType}-${formattedName}-${formattedUniqueString}`;
  }
  private set value(name: string) {
    this._value = name;
  }
  get value(): string {
    return this._value;
  }
}
