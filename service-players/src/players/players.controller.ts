import { Controller, Logger } from '@nestjs/common';
import { PlayersService } from './service/players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  private logger = new Logger(PlayersController.name);

  @EventPattern('create-player')
  async create(
    @Payload() createPlayerDto: CreatePlayerDto,
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(
      `createPlayerDto: ${JSON.stringify(createPlayerDto, null, 2)}`,
    );
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      await this.playersService.create(createPlayerDto);
      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message, null, 2)}`);
      await channel.nack(originalMessage);
    }
  }

  @MessagePattern('list-player')
  async list(@Ctx() context: RmqContext) {
    this.logger.log(`listPlayersDto: list players`);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      const result = await this.playersService.findAll();
      await channel.ack(originalMessage);
      return result;
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message, null, 2)}`);
      await channel.nack(originalMessage);
    }
  }
}
