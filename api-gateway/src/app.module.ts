import { Module } from '@nestjs/common';
import { HandlersModule } from './handlers/handlers.module';

@Module({
  imports: [HandlersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
