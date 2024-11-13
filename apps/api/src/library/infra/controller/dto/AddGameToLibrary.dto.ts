import {
  AddGameToLibraryCommand,
  AddGameToLibraryCommandBody,
} from '@game-library/library-context/Library/App/UseCase/Add';
import { ApiProperty } from '@nestjs/swagger';

export class AddGameToLibraryDto extends AddGameToLibraryCommand {
  @ApiProperty({ description: 'EAN of the game' })
  ean: string;

  @ApiProperty({ description: 'Name of the game' })
  name: string;

  @ApiProperty({ description: 'Language of the game name' })
  nameLanguage: string;

  @ApiProperty({ description: 'Type of the game' })
  type: string;

  @ApiProperty({ description: 'Is the game cooperative?' })
  isCoop: boolean;
  constructor(props: AddGameToLibraryCommandBody) {
    super(props);
  }
}
