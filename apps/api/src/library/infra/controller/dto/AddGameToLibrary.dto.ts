import {
  AddGameToLibraryCommand,
  AddGameToLibraryCommandBody,
} from '@game-library/library-context/Library/App/UseCase/Add';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class AddGameToLibraryDto extends AddGameToLibraryCommand {
  @ApiProperty({ description: 'EAN of the game' })
  @IsString()
  ean: string;

  @ApiProperty({ description: 'Name of the game' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Language of the game name' })
  @IsString()
  nameLanguage: string;

  @ApiProperty({ description: 'Type of the game' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Is the game cooperative?' })
  @IsBoolean()
  isCoop: boolean;
  constructor(props: AddGameToLibraryCommandBody) {
    super(props);
  }
}
