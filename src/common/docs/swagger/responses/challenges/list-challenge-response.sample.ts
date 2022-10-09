import { ApiResponseProperty } from '@nestjs/swagger';
import { MongoInstanceSample } from '../mongo-instance.sample';

export class ListChallengeResponseSample extends MongoInstanceSample {
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
    example: {
      _id: '63313b2da0fcbb9829f53841',
      name: 'Abel SOuza Costa Junior',
    },
  })
  requester: string;

  @ApiResponseProperty({
    example: {
      _id: '6331ecc8176f53e39e605187',
      category: 'B',
    },
  })
  category: string;

  @ApiResponseProperty({
    example: [
      {
        _id: '63313b2da0fcbb9829f53841',
        name: 'Abel Souza Costa Junior',
      },
      {
        _id: '63314005404e91aa8d896f25',
        name: 'Camila Souza Miranda',
      },
    ],
  })
  players: string[];
}
