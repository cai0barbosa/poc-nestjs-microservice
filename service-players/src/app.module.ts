import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    PlayersModule,
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
