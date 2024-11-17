import {
  AddGameToLibraryCommand,
  AddGameToLibraryCommandBody,
} from '@game-library/library-context/Library/App/UseCase/Add';
import { ApiProperty } from '@nestjs/swagger';

export class AddGameToLibraryDto extends AddGameToLibraryCommand {
  @ApiProperty({ description: 'EAN of the game', example: '4260470080018' })
  ean: string;

  @ApiProperty({ description: 'Name of the game', example: 'Skyjo' })
  name: string;

  @ApiProperty({ description: 'Language of the game name', example: 'fr' })
  nameLanguage: string;

  @ApiProperty({ description: 'Type of the game', example: 'card' })
  type: string;

  @ApiProperty({ description: 'Is the game cooperative?', example: 'false', type: Boolean })
  isCoop: boolean;
  constructor(props: AddGameToLibraryCommandBody) {
    super(props);
  }
}
