import { GameProps } from './Game.props';

export class Game {
  private _name: string;

  protected constructor(props: GameProps) {
    this.name = props.name;
  }
  protected set name(name: string) {
    this._name = name;
  }
}
