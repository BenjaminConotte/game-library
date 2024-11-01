import { EAN } from './EAN';
import { GameName } from './GameName';
import { GameType } from './GameType';
import { GameTypeEnum } from './GameTypeEnum';

export type GameProps = {
  id: EAN;
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
export type CreateGameProps = {
  ean: string;
  name: {
    label: string;
    language: string;
  };
  type: {
    label: GameTypeEnum;
    isCooperative: boolean;
  };
};
