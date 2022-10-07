import { ApiResponseProperty } from '@nestjs/swagger';

export class MongoInstanceSample {
  @ApiResponseProperty({
    example: '633bbf34d365a6a579507450',
  })
  _id: string;

  @ApiResponseProperty({
    example: '2022-10-04T05:05:56.989Z',
  })
  createdAt: string;

  @ApiResponseProperty({
    example: '2022-10-04T05:05:56.989Z',
  })
  updatedAt: string;

  @ApiResponseProperty({
    example: 0,
  })
  __v: number;
}
