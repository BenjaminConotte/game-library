import { Entity } from '../../Shared/Domain';
import { GameId } from './GameId';
import { GameName } from './GameName';
import { GamePrimitivesProps, GameProps } from './GameProps';
import { GameType } from './GameType';

export class Game extends Entity<GameId, GamePrimitivesProps> {
  private _name: GameName;
  private _type: GameType;

  static create(
    uniqueIdentity: string,
    name: string,
    nameLanguage: string,
    gameType: string,
    isCooperative = false
  ) {
    return new Game({
      id: new GameId(gameType, name, uniqueIdentity),
      name: new GameName(name, nameLanguage),
      type: new GameType(gameType, isCooperative),
    });
  }
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
