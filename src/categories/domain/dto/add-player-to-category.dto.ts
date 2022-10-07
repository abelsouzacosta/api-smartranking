import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddPlayerToCategoryDto {
  @ApiProperty({
    example: '63313b2da0fcbb9829f53841',
  })
  @IsString({
    message: 'player_id should be a string',
  })
  @IsNotEmpty({
    message: 'player_id should not be null',
  })
  player_id: string;
}
