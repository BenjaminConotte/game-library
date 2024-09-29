type CreateGameProps = Omit<GameProps, 'id' | 'createdAt'>;
type GameProps = {
  id: string;
  name: string;
  type: string;
  createdAt: Date;
};
export class Game {
  private constructor(private readonly props: GameProps) {}

  static create(props: CreateGameProps): Game {
    return new Game({ ...props, id: '1', createdAt: new Date() });
  }
  get name(): string {
    return this.props.name;
  }
  get type(): string {
    return this.props.type;
  }
}
