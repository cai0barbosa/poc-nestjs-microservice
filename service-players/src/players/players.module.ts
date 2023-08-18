import { Module } from '@nestjs/common';
import { PlayersService } from './service/players.service';
import { PlayersController } from './players.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './schema/player.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
