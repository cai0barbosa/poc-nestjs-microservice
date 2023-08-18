import { Module } from '@nestjs/common';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/services/players.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class HandlersModule {}
