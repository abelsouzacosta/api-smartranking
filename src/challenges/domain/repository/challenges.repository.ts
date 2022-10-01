import { Challenge } from 'src/challenges/entities/challenge.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { ChallengeStatusEnum } from '../enums/challenge-status.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateResult } from 'mongodb';

export class ChallengesRepository {
  constructor(
    @InjectModel(Challenge.name)
    private readonly model: Model<Challenge>,
  ) {}

  async create(data: CreateChallengeDto): Promise<Challenge> {
    return this.model.create({
      ...data,
      status: ChallengeStatusEnum.PENDING,
    });
  }

  async list({ limit, skip }: PaginationDto): Promise<Array<Challenge>> {
    return this.model
      .find()
      .populate('requester', 'name')
      .populate('category', 'category')
      .populate('players', 'name')
      .limit(limit)
      .skip(skip);
  }

  async acceptChallenge(id: string): Promise<UpdateResult> {
    return this.model.updateOne(
      { _id: id },
      {
        $set: { status: ChallengeStatusEnum.ACCEPTED },
      },
    );
  }
}
