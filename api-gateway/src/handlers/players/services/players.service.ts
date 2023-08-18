import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayersService {
  private client: ClientProxy;
  
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
        queue: 'players',
      },
    });
  }

  async create(createPlayerDto: CreatePlayerDto) {
    return this.client.emit('create-player', createPlayerDto);
  }

  async list() {
    return this.client.send('list-player', '');
  }
}
