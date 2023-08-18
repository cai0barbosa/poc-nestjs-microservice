import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly mail: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
