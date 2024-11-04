import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSchema } from './library/infra/typeorm/schema';
import { LibraryModule } from './library/library.module';

@Module({
  imports: [
    LibraryModule,
    TypeOrmModule.forRoot({
      entities: [GameSchema],
    }),
  ],
})
export class AppModule {}
