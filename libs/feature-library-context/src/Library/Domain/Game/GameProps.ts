import { GameTypeEnum } from './GameTypeEnum';

export type GameProps = {
  ean: string;
  name: string;
  language: string;
  type: {
    label: GameTypeEnum;
    isCooperative: boolean;
  };
};
