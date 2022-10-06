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

  async getMatchesByDef(def: string): Promise<Array<Match>> {
    const matchesOfDef = await this.model.find({
      def,
    });

    if (!matchesOfDef)
      throw new HttpException(
        `Any match was found for this player`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    return matchesOfDef;
  }

  async getMatchesOfPlayer(player_id: string): Promise<Array<Match>> {
    const matchesWithPlayer = await this.model
      .find({
        $or: [{ def: player_id }, { players: player_id }],
      })
      .populate('category', 'category')
      .populate('players', 'name')
      .populate('def', 'name');

    if (!matchesWithPlayer)
      throw new HttpException(
        `Player ${player_id} there hasn't been any game yet`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    return matchesWithPlayer;
  }
}
