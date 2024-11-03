import { Module } from '@nestjs/common';
import { LibraryModule } from './library/library.module';

@Module({
  imports: [LibraryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
