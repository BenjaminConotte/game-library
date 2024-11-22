export class ComposedDomainValidationException extends Error {
  constructor(private readonly _errors: string[]) {
    super();
  }
  get message(): string {
    return this._errors.join(';') + ';';
  }
}
