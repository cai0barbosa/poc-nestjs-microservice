import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from '../interfaces/player.interface';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = new this.playerModel(createPlayerDto);
    player.save();

    return player;
  }

  async findAll() {
    return await this.playerModel.find().exec();
  }

  async findOne(id: string): Promise<Player> {
    return await this.playerModel.findById(id).exec();
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return await this.playerModel.findByIdAndUpdate(id, updatePlayerDto);
  }

  async remove(id: string) {
    return await this.playerModel.findByIdAndDelete(id);
  }
}
