import { ApiResponseProperty } from '@nestjs/swagger';
import { MongoInstanceSample } from '../mongo-instance.sample';

export class ListMatchesResponseSample extends MongoInstanceSample {
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
        name: 'Abel SOuza Costa Junior',
      },
      {
        _id: '63314005404e91aa8d896f25',
        name: 'Camila Souza Miranda',
      },
    ],
  })
  players: string[];

  @ApiResponseProperty({
    example: {
      _id: '63314005404e91aa8d896f25',
      name: 'Camila Souza Miranda',
    },
  })
  def: string;

  @ApiResponseProperty({
    example: [
      {
        set: '5-6',
        _id: '633eea456e4d88e268e58eee',
      },
      {
        set: '5-6',
        _id: '633eea456e4d88e268e58eef',
      },
    ],
  })
  result: object;
}
