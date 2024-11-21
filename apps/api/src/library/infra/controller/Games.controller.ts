import {
  AddGameToLibrary,
  AddGameToLibraryCommand,
  AddGameToLibraryCommandBody,
  GameCreationException,
} from '@game-library/library-context/Library/App/UseCase/Add';
import {
  SearchGame,
  SearchGameQuery,
} from '@game-library/library-context/Library/App/UseCase/Search';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AddGameToLibraryDto } from './dto';

@Controller('games')
@ApiTags('Games')
export class GamesController {
  private readonly _logger = new Logger(GamesController.name);
  constructor(
    private readonly _addGameToLibrary: AddGameToLibrary,
    private readonly _searchGame: SearchGame
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Search games into the library',
  })
  @ApiQuery({
    name: 'ean',
    description: 'Part of the EAN of the look up game',
    required: false,
  })
  @ApiQuery({
    name: 'name',
    description: 'Part of the name of the look up game',
    required: false,
  })
  async searchGames(
    @Query('ean') ean: string = null,
    @Query('name') name: string = null
  ) {
    return await this._searchGame.query(new SearchGameQuery(ean, name));
  }

  @Post('add')
  @ApiOperation({
    summary: 'Add a game to the library',
    description: 'Add a new game into the system to be able to use it.',
  })
  @ApiBody({ type: AddGameToLibraryDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Game added to the library',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request with the given paramters',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'A game is already registered with the given EAN',
  })
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
        this._logger.error(error.message);
        if (error instanceof RangeError)
          res.status(HttpStatus.CONFLICT).send({
            error: 'A game with the given EAN is already registered.',
          });
        else if (error instanceof GameCreationException)
          res.status(HttpStatus.BAD_REQUEST).send({
            error: error.message,
          });
        else
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: 'An error occurred while adding the game.' });
      });
  }
}
