import { GameId } from './GameId';
import { GameName } from './GameName';

export type GameProps = {
  id: GameId;
  name: GameName;
};
export type GamePrimitivesProps = {
  id: string;
  name: {
    label: string;
    language: string;
  };
};
