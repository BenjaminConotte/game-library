type CreateGameProps = Omit<GameProps, 'id' | 'createdAt'>;
type GameProps = {
  id: string;
  name: string;
  type: string;
  minPlayers: number;
  maxPlayers: number;
  createdAt: Date;
};
export class Game {
  static create(props: CreateGameProps): Game {
    return new Game({ ...props, id: '1', createdAt: new Date() });
  }
  private constructor(private readonly props: GameProps) {}

  get name(): string {
    return this.props.name;
  }
  get type(): string {
    return this.props.type;
  }
  get minPlayers(): number {
    return this.props.minPlayers;
  }
  get maxPlayers(): number {
    return this.props.maxPlayers;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
}
