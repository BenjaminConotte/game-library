import { Entity } from '../../Shared/Domain';
import { GameProps } from './Game.props';
import { GameName } from './GameName';

export class Game extends Entity<string, GameProps> {
  private _name: GameName;

  protected constructor(props: GameProps) {
    super();
    this.name = props.name;
  }
  protected set name(name: string) {
    this._name = new GameName(name);
  }

  get id(): string {
    throw new Error('Method not implemented.');
  }
  toPrimitives(): GameProps {
    throw new Error('Method not implemented.');
  }
}
