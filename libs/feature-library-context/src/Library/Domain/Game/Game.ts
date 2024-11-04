import { Aggregate } from '../../../Shared/Domain/Aggregate';
import { EAN } from './EAN';
import { GameName } from './GameName';
import { CreateGameProps, GamePrimitivesProps, GameProps } from './GameProps';
import { GameType } from './GameType';

export class Game extends Aggregate<EAN, GamePrimitivesProps> {
  private _name: GameName;
  private _type: GameType;

  constructor(props: GameProps) {
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

  static create(props: CreateGameProps) {
    return new Game({
      id: new EAN(props.ean),
      name: new GameName(props.name.label, props.name.language),
      type: new GameType(props.type.label, props.type.isCooperative),
    });
  }
  static instanciate(props: GamePrimitivesProps): Game {
    return new Game({
      id: new EAN(props.id),
      name: new GameName(props.name.label, props.name.language),
      type: new GameType(props.type.label, props.type.isCooperative),
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
