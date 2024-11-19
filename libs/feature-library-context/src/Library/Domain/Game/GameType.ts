import { GameTypeEnum } from './GameTypeEnum';

export class GameType {
  private _value!: string;
  private _isCooperative!: boolean;

  constructor(value: string, isCooperative = false) {
    this.value = value;
    this.isCooperative = isCooperative;
  }
  get value() {
    return this._value;
  }
  private set value(aGameType: string) {
    if (!(Object.values(GameTypeEnum) as string[]).includes(aGameType))
      throw new RangeError(`${aGameType} is not a valid game type`);
    this._value = aGameType;
  }
  get isCooperative() {
    return this._isCooperative;
  }
  private set isCooperative(isCooperative: boolean) {
    this._isCooperative = isCooperative;
  }
}
