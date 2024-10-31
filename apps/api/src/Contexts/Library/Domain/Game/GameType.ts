export class GameType {
  private _value: string;
  private _isCooperative: boolean;

  constructor(value: string, isCooperative = false) {
    this.value = value;
    this.isCooperative = isCooperative;
  }
  get value() {
    return this._value;
  }
  protected set value(value) {
    this._value = value;
  }
  get isCooperative() {
    return this._isCooperative;
  }
  protected set isCooperative(isCooperative: boolean) {
    this._isCooperative = isCooperative;
  }
}
