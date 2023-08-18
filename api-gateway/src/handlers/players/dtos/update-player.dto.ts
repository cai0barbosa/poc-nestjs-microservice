import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly mail: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly name: string;
}
