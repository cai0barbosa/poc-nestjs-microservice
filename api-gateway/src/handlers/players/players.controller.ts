import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './services/players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  async list() {
    return this.playerService.list();
  }
}
