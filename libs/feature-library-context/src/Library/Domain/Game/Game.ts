import {
  ComposedDomainValidationException,
  LanguageEnum,
} from '@game-library/shared/Shared/Domain';
import { Aggregate } from '@game-library/shared/Shared/Domain/Aggregate';
import { EAN } from './EAN';
import { GameName } from './GameName';
import { GameProps } from './GameProps';
import { GameType } from './GameType';
import { GameTypeEnum } from './GameTypeEnum';

export class Game extends Aggregate<EAN, GameProps> {
  private _name: GameName;
  private _type: GameType;
  private _language: LanguageEnum;

  constructor(props: GameProps) {
    const errors = [];
    super();
    try {
      this.id = new EAN(props.ean);
    } catch (error) {
      errors.push(error.message);
    }
    try {
      this.name = new GameName(props.name);
    } catch (error) {
      errors.push(error.message);
    }
    this._language = props.language as LanguageEnum;
    try {
      this.type = new GameType(props.type.label, props.type.isCooperative);
    } catch (error) {
      errors.push(error.message);
    }
    if (errors.length > 0) {
      throw new ComposedDomainValidationException(errors);
    }
  }
  private set name(name: GameName) {
    this._name = name;
  }
  private set type(type: GameType) {
    this._type = type;
  }
  static create(props: GameProps): Game {
    return new Game(props);
  }
  static instanciate(props: GameProps): Game {
    return new Game(props);
  }
  toPrimitives(): GameProps {
    return {
      ean: this.id.value,
      name: this._name.value,
      language: this._language,
      type: {
        label: this._type.value as GameTypeEnum,
        isCooperative: this._type.isCooperative,
      },
    };
  }
}
