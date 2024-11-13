import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './Config';
import { GameSchema } from './library/infra/typeorm/schema';
import { LibraryModule } from './library/library.module';
//
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, string | number>) => {
        const validatedConfig: Config = {
          env: config.APP_ENV as string,
          database: {
            type:
              config.DATABASE_TYPE in ['postgres', 'mysql', 'mssql']
                ? (config.DATABASE_TYPE as 'postgres' | 'mysql' | 'mssql')
                : 'postgres',
            host: config.DATABASE_HOST as string,
            port: parseInt(config.DATABASE_PORT as string) || 5432,
            username: config.DATABASE_USERNAME as string,
            password: config.DATABASE_PASSWORD as string,
            database: config.DATABASE_NAME as string,
          },
        };
        return validatedConfig;
      },
    }),
    LibraryModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => {
        const databaseConfig =
          configService.get<Config['database']>('database');
        return {
          type: databaseConfig.type,
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
          entities: [GameSchema],
          synchronize: configService.get<string>('env') === 'local',
        };
      },
    }),
  ],
})
export class AppModule {}
