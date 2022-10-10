import { ApiResponseProperty } from '@nestjs/swagger';
import { MongoInstanceSample } from '../mongo-instance.sample';

export class CreatedMatchResponseSample extends MongoInstanceSample {
  @ApiResponseProperty({
    example: '6331ecc8176f53e39e605187',
  })
  category: string;

  @ApiResponseProperty({
    example: ['6331ecc8176f53e39e605187', '6331ecc8176f53e39e605187'],
  })
  players: string[];

  @ApiResponseProperty({
    example: '6331ecc8176f53e39e605187',
  })
  def: string;

  @ApiResponseProperty({
    example: [
      {
        set: '5-6',
      },
      {
        set: '5-6',
      },
    ],
  })
  result: object;
}
