import { IsNotEmpty, IsString } from 'class-validator';

export class AddPlayerToCategoryDto {
  @IsString({
    message: 'player_id should be a string',
  })
  @IsNotEmpty({
    message: 'player_id should not be null',
  })
  player_id: string;
}
