import {
  AddGameToLibrary,
  AddGameToLibraryCommand,
} from '@game-library/library-context/Library/App/UseCase/Add';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('games')
@ApiTags('Games')
export class GamesController {
  constructor(private readonly _addGameToLibrary: AddGameToLibrary) {}

  @Post('add')
  async addGameToLibrary(@Body() cmd: AddGameToLibraryCommand) {
    return this._addGameToLibrary.execute(cmd);
  }
}
