import { GameName } from '@game-library/library-context/Library/Domain/Game';
import { GamePrimitivesProps } from '@game-library/library-context/Library/Domain/Game/GameProps';
import { EntitySchema } from 'typeorm';

const GameNameSchema = new EntitySchema<GameName>({
  name: 'name',
  columns: {
    value: {
      type: String,
      nullable: false,
    },
    language: { type: String, nullable: false },
  },
});
const GameTypeSchema = new EntitySchema({
  name: 'type',
  columns: {
    label: { type: String, nullable: false },
    isCooperative: { type: Boolean, nullable: false },
  },
});
export const GameSchema = new EntitySchema<GamePrimitivesProps>({
  name: 'tbl_game',
  columns: {
    id: {
      type: String,
      primary: true,
    },
  },
  embeddeds: {
    name: {
      schema: GameNameSchema,
      prefix: 'name_',
    },
    type: {
      schema: GameTypeSchema,
      prefix: 'type_',
    },
  },
});
