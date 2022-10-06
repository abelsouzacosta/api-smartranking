import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match } from 'src/matches/entities/match.entity';
import { CreateMatchDto } from '../dto/create-match.dto';

export class MatchesRepository {
  constructor(
    @InjectModel(Match.name)
    private readonly model: Model<Match>,
  ) {}

  async create(data: CreateMatchDto): Promise<Match> {
    const match = await this.model.create({
      ...data,
    });

    if (!match)
      throw new HttpException(
        `There's was an error trying to create a match`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return match;
  }

  async list(): Promise<Array<Match>> {
    const matches = await this.model
      .find()
      .populate('players', 'name')
      .populate('def', 'name')
      .populate('category', 'category');

    if (matches.length === 0) return [];

    return matches;
  }
}
