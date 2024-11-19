import { GameProps } from '@game-library/library-context/Library/Domain/Game/GameProps';
import { EntitySchema } from 'typeorm';

const GameTypeSchema = new EntitySchema({
  name: 'type',
  columns: {
    label: { name: 'label', type: String, nullable: false },
    isCooperative: { name: 'isCooperative', type: Boolean, nullable: false },
  },
});
export const GameSchema = new EntitySchema<GameProps>({
  name: 'tbl_game',
  columns: {
    ean: {
      type: String,
      primary: true,
    },
    name: {
      type: String,
      nullable: false,
    },
    language: {
      type: String,
      nullable: false,
    },
  },
  embeddeds: {
    type: {
      schema: GameTypeSchema,
      prefix: 'type_',
    },
  },
});
