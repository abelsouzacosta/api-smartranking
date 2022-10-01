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

  async findByRequester(id: string): Promise<Array<Challenge>> {
    return this.model.find({
      requester: id,
    });
  }

  async findByPlayer(id: string): Promise<Array<Challenge>> {
    return this.model.find({
      $or: [{ requester: id }, { players: id }],
    });
  }

  async acceptChallenge(id: string): Promise<UpdateResult> {
    return this.model.updateOne(
      { _id: id },
      {
        $set: { status: ChallengeStatusEnum.ACCEPTED },
      },
    );
  }

  async cancelChallenge(id: string): Promise<UpdateResult> {
    return this.model.updateOne(
      {
        _id: id,
      },
      {
        $set: { status: ChallengeStatusEnum.CANCELED },
      },
    );
  }

  async completeChallenge(id: string): Promise<UpdateResult> {
    return this.model.updateOne(
      { _id: id },
      { $set: { status: ChallengeStatusEnum.DONE } },
    );
  }
}
