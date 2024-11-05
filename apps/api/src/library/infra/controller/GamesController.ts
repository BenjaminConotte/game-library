import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('games')
@ApiTags('Games')
export class GamesController {
  constructor() {}

  @Post('add')
  async addGameToLibrary() {}
}
