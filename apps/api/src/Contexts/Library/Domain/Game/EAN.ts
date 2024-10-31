export class EAN {
  private _value: string;
  constructor(ean: string) {
    if (ean === null) throw new Error('EAN is required');
    if (ean.length !== 13) throw new RangeError('EAN must be 13 characters');
    this.value = ean;
  }
  private set value(name: string) {
    this._value = name;
  }
  get value(): string {
    return this._value;
  }
}
