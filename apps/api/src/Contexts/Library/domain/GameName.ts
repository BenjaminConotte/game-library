import { LanguageEnum } from '../../Shared/Domain';

export class GameName {
  private _value: string;
  private _language: LanguageEnum;
  constructor(name: string, language: string) {
    if (name === null) throw new Error('Game name is required');
    if (name.length < 3)
      throw new Error('Game name must be at least 3 characters');
    if (name.length > 100)
      throw new Error('Game name must be less than 50 characters');
    if (language === null) throw new Error('Language is required');
    if (!Object.values(LanguageEnum).includes(language as LanguageEnum))
      throw new RangeError(`${language} is not a valid language`);
    this.value = name;
    this.language = language;
  }
  private set value(name: string) {
    this._value = name;
  }
  get value(): string {
    return this._value;
  }
  private set language(language: string) {
    this._language = language as LanguageEnum;
  }
  get language(): string {
    return this._language.toString();
  }
}
