import { Entity } from '../../Shared/Domain';
import { GamePrimitivesProps, GameProps } from './Game.props';
import { GameId } from './GameId';
import { GameName } from './GameName';

export class Game extends Entity<GameId, GamePrimitivesProps> {
  private _name: GameName;

  static create(
    uniqueIdentity: string,
    name: string,
    nameLanguage: string,
    gameType: string
  ) {
    return new Game({
      id: new GameId(name, uniqueIdentity),
      name: new GameName(name, nameLanguage),
    });
  }
  protected constructor(props: GameProps) {
    super();
    this.id = props.id;
    this.name = props.name;
  }
  private set name(name: GameName) {
    this._name = name;
  }
  toPrimitives(): GamePrimitivesProps {
    return {
      id: this.id.value,
      name: {
        label: this._name.value,
        language: this._name.language,
      },
    };
  }
}
