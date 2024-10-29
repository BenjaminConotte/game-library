import { Module } from '@nestjs/common';
import { LibraryModule } from './Library/library.module';

@Module({
  imports: [LibraryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
