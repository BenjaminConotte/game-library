import { GameId } from './GameId';
import { GameName } from './GameName';
import { GameType } from './GameType';

export type GameProps = {
  id: GameId;
  name: GameName;
  type: GameType;
};
export type GamePrimitivesProps = {
  id: string;
  name: {
    label: string;
    language: string;
  };
  type: {
    label: string;
    isCooperative: boolean;
  };
};
