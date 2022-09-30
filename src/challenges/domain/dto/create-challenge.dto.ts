import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateChallengeDto {
  @IsString({
    message: 'date should be a string',
  })
  @IsNotEmpty({
    message: 'date should not be empty',
  })
  date: string;

  @IsString({
    message: 'requester should be a string',
  })
  @IsNotEmpty({
    message: 'requester should not be empty',
  })
  requester: string;

  @IsString({
    message: 'category should be a string',
  })
  @IsNotEmpty({
    message: 'category sohuld not be empty',
  })
  category: string;

  @IsArray({
    message: 'players should be an array',
  })
  @IsString({
    each: true,
    message: 'players should be an array of strings',
  })
  @ArrayMinSize(2, {
    message: 'players should have at least 2 players',
  })
  players: string[];

  hour?: string;

  solicitation_date?: string;

  solicitation_hour?: string;
}
