export class GameName {
  private _value: string;
  constructor(name: string) {
    if (name === null) throw new Error('Name is required');
    if (name.length < 3)
      throw new Error('Game name must be at least 3 characters');
    if (name.length > 100)
      throw new Error('Game name must be less than 50 characters');
    this.value = name;
  }
  private set value(name: string) {
    this._value = name;
  }
  get value(): string {
    return this._value;
  }
}
