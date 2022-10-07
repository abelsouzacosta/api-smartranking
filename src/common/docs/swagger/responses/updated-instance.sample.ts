import { ApiResponseProperty } from '@nestjs/swagger';

export class UpdatedInstanceSample {
  @ApiResponseProperty({
    example: true,
  })
  acknowledged: boolean;

  @ApiResponseProperty({
    example: 1,
  })
  modifiedCount: number;

  @ApiResponseProperty({
    example: null,
  })
  upsertedId: number | null;

  @ApiResponseProperty({
    example: 0,
  })
  upsertedCount: number;

  @ApiResponseProperty({
    example: 1,
  })
  matchedCount: number;
}
