import { GameProps } from './Game.props';
import { GameName } from './GameName';

export class Game {
  private _name: GameName;

  protected constructor(props: GameProps) {
    this.name = props.name;
  }
  protected set name(name: string) {
    this._name = new GameName(name);
  }
}
