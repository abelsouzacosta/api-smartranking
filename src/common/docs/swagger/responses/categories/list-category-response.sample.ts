import { ApiResponseProperty } from '@nestjs/swagger';
import { MongoInstanceSample } from '../mongo-instance.sample';

export class ListCategoryResponseDto extends MongoInstanceSample {
  @ApiResponseProperty({
    example: 'B',
  })
  category: string;

  @ApiResponseProperty({
    example: 'This are the second best category that an player can achieve',
  })
  description: string;

  @ApiResponseProperty({
    example: [
      {
        name: 'Test Event 1',
        operation: 'baba',
        value: 20,
        _id: '6331ecc8176f53e39e605188',
      },
      {
        name: 'Test Event 2',
        operation: '+',
        value: 40,
        _id: '6331ecc8176f53e39e605189',
      },
      {
        name: 'Test event 3',
        operation: '+',
        value: 90,
        _id: '6331ecc8176f53e39e60518a',
      },
    ],
  })
  events: any[];

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
  players: any[];
}
