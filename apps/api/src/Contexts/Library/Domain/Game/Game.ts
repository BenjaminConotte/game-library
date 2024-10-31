import { Aggregate } from '../../../Shared/Domain/Aggregate';
import { EAN } from './EAN';
import { GameName } from './GameName';
import { GamePrimitivesProps, GameProps } from './GameProps';
import { GameType } from './GameType';

export class Game extends Aggregate<EAN, GamePrimitivesProps> {
  private _name: GameName;
  private _type: GameType;

  protected constructor(props: GameProps) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.type = props.type;
  }
  private set name(name: GameName) {
    this._name = name;
  }
  private set type(type: GameType) {
    this._type = type;
  }

  static create(
    ean: string,
    name: string,
    nameLanguage: string,
    gameType: string,
    isCooperative = false
  ) {
    return new Game({
      id: new EAN(ean),
      name: new GameName(name, nameLanguage),
      type: new GameType(gameType, isCooperative),
    });
  }
  toPrimitives(): GamePrimitivesProps {
    return {
      id: this.id.value,
      name: {
        label: this._name.value,
        language: this._name.language,
      },
      type: {
        label: this._type.value,
        isCooperative: this._type.isCooperative,
      },
    };
  }
}
