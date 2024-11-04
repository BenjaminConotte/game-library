import {
  AddGameToLibrary,
  AddGameToLibraryCommand,
} from '@game-library/library-context/Library/App/UseCase/Add';
import { IGameRepository } from '@game-library/library-context/Library/Domain/Game';
import { ITransactionManager } from '@game-library/library-context/Shared/Domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';
import { DatabaseGameRepository } from '../infra/typeorm';
import { GameSchema } from '../infra/typeorm/schema';
import { TypeORMTransactionManager } from '../infra/typeorm/TypeORMTransactionManager';
describe('AddGameToLibrary', () => {
  let testPostgresContainer: StartedPostgreSqlContainer;
  let testingModule: TestingModule;
  let useCase: AddGameToLibrary;
  let dataSource: DataSource;
  beforeAll(async () => {
    try {
      testPostgresContainer = await new PostgreSqlContainer().start();
      testingModule = await Test.createTestingModule({
        imports: [
          TypeOrmModule.forRoot({
            type: 'postgres',
            host: testPostgresContainer.getHost(),
            port: testPostgresContainer.getPort(),
            database: testPostgresContainer.getDatabase(),
            username: testPostgresContainer.getUsername(),
            password: testPostgresContainer.getPassword(),
            entities: [GameSchema],
            synchronize: true,
          }),
        ],
        providers: [
          {
            provide: ITransactionManager,
            useFactory: (dataSource) =>
              new TypeORMTransactionManager(dataSource),
            inject: [getDataSourceToken()],
          },
          {
            provide: IGameRepository,
            useFactory: (ds) => new DatabaseGameRepository(ds),
            inject: [getDataSourceToken()],
          },
          {
            provide: AddGameToLibrary,
            useFactory: (tm, gameRepos) => new AddGameToLibrary(tm, gameRepos),
            inject: [ITransactionManager, IGameRepository],
          },
        ],
      }).compile();
      useCase = await testingModule.get(AddGameToLibrary);
      dataSource = await testingModule.get(getDataSourceToken());
    } catch (error) {
      console.error(error);
    }
  }, 20000);
  it('should add a game to the library', async () => {
    const cmd = new AddGameToLibraryCommand({
      ean: '1234567890123',
      name: 'Test Game',
      nameLanguage: 'en',
      type: 'board',
      isCoop: false,
    });
    await useCase.handle(cmd);
    const game = await dataSource.query('SELECT * FROM tbl_game');
    expect(game).toHaveLength(1);
    console.log(game[0]);
    expect(game[0].id).toBe(cmd.body.ean);
  });
  it('should throw an error if the game is already in the library', async () => {
    const cmd = new AddGameToLibraryCommand({
      ean: '1234567890124',
      name: 'Test Game',
      nameLanguage: 'en',
      type: 'board',
      isCoop: false,
    });
    await dataSource.query(
      'INSERT INTO tbl_game (id, "name_Label", "name_Language", "type_Label", "type_Iscooperative") VALUES ($1, $2, $3, $4, $5)',
      [
        cmd.body.ean,
        cmd.body.name,
        cmd.body.nameLanguage,
        cmd.body.type,
        cmd.body.isCoop,
      ]
    );
    try {
      await useCase.handle(cmd);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe('Game is already in the library');
    }
  });
  afterAll(async () => {
    await testPostgresContainer.stop();
  });
});
