import {
  AddGameToLibrary,
  AddGameToLibraryCommand,
  AddGameToLibraryCommandBody,
} from '@game-library/library-context/Library/App/UseCase/Add';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AddGameToLibraryDto } from './dto';

@Controller('games')
@ApiTags('Games')
export class GamesController {
  constructor(private readonly _addGameToLibrary: AddGameToLibrary) {}

  @Post('add')
  @ApiBody({ type: AddGameToLibraryDto })
  async addGameToLibrary(@Body() body: AddGameToLibraryCommandBody) {
    const addGameToLibraryDto = new AddGameToLibraryCommand(body);
    console.log(addGameToLibraryDto.body);
    return await this._addGameToLibrary
      .execute(addGameToLibraryDto)
      .catch((error) => {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }
}
