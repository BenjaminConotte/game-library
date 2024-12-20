import { AddGameToLibrary } from '@game-library/library-context/Library/App/UseCase/Add';
import { SearchGame } from '@game-library/library-context/Library/App/UseCase/Search';
import { IGameRepository } from '@game-library/library-context/Library/Domain/Game';
import { ITransactionManager } from '@game-library/library-context/Shared/Domain';
import { Logger, Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './infra/controller/Games.controller';
import {
  DatabaseGameRepository,
  TypeORMTransactionManager,
} from './infra/typeorm';
import { GameSchema } from './infra/typeorm/schema';
@Module({
  imports: [TypeOrmModule.forFeature([GameSchema])],
  providers: [
    {
      provide: ITransactionManager,
      useFactory: (dataSource) => new TypeORMTransactionManager(dataSource),
      inject: [getDataSourceToken()],
    },
    {
      provide: IGameRepository,
      useFactory: (ds) => new DatabaseGameRepository(ds),
      inject: [getDataSourceToken()],
    },
    {
      provide: AddGameToLibrary,
      useFactory: (tm, gameRepos) =>
        new AddGameToLibrary(tm, new Logger(AddGameToLibrary.name), gameRepos),
      inject: [ITransactionManager, IGameRepository],
    },
    {
      provide: SearchGame,
      useFactory: (gameRepos) =>
        new SearchGame(gameRepos, new Logger(SearchGame.name)),
      inject: [IGameRepository],
    },
  ],
  controllers: [GamesController],
  exports: [TypeOrmModule],
})
export class LibraryModule {}
