import { ApiResponseProperty } from '@nestjs/swagger';
import { MongoInstanceSample } from '../mongo-instance.sample';

export class CreatedChallengeResponse extends MongoInstanceSample {
  @ApiResponseProperty({
    example: '2023-07-17',
  })
  date: string;

  @ApiResponseProperty({
    example: '03:24:00',
  })
  hour: string;

  @ApiResponseProperty({
    example: 'pending',
  })
  status: string;

  @ApiResponseProperty({
    example: '2022-09-30',
  })
  solicitation_date: string;

  @ApiResponseProperty({
    example: '15:22:13',
  })
  solicitation_hour: string;

  @ApiResponseProperty({
    example: '63313b2da0fcbb9829f53841',
  })
  requester: string;

  @ApiResponseProperty({
    example: '63313b2da0fcbb9829f53841',
  })
  category: string;

  @ApiResponseProperty({
    example: ['63313b2da0fcbb9829f53841', '63313b2da0fcbb9829f53841'],
  })
  players: string[];
}
