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
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AddGameToLibraryDto } from './dto';

@Controller('games')
@ApiTags('Games')
export class GamesController {
  private readonly _logger = new Logger(GamesController.name);
  constructor(private readonly _addGameToLibrary: AddGameToLibrary) {}

  @Post('add')
  @ApiOperation({
    summary: 'Add a game to the library',
    description: 'Add a new game into the system to be able to use it.',
  })
  @ApiBody({ type: AddGameToLibraryDto })
  @ApiResponse({ status: 201, description: 'Game added to the library' })
  async addGameToLibrary(
    @Body() body: AddGameToLibraryCommandBody,
    @Res() res: Response
  ) {
    const addGameToLibraryDto = new AddGameToLibraryCommand(body);
    this._logger.log(
      'Receive a new command of type: ' + addGameToLibraryDto.constructor.name
    );
    return await this._addGameToLibrary
      .execute(addGameToLibraryDto)
      .then(() => res.status(HttpStatus.CREATED).send())
      .catch((error) => {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }
}
