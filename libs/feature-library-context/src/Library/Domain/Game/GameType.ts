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
  private set value(value) {
    this._value = value;
  }
  get isCooperative() {
    return this._isCooperative;
  }
  private set isCooperative(isCooperative: boolean) {
    this._isCooperative = isCooperative;
  }
}
