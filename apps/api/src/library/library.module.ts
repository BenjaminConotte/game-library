import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSchema } from './infra/typeorm/schema';

@Module({
  imports: [TypeOrmModule.forFeature([GameSchema])],
  exports: [TypeOrmModule],
})
export class LibraryModule {}
