import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateResult } from 'mongodb';
import { Player } from 'src/players/entities/player.entity';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';

export class PlayersRepository {
  constructor(
    @InjectModel(Player.name)
    private readonly model: Model<Player>,
  ) {}

  async list(): Promise<Array<Player>> {
    return this.model.find({});
  }

  async findByEmail(email: string): Promise<Player> {
    return this.model.findOne({
      email,
    });
  }

  async findById(id: string): Promise<Player> {
    return this.model.findById(id);
  }

  async create(data: CreatePlayerDto): Promise<Player> {
    return this.model.create({
      ...data,
    });
  }

  async update(id: string, data: UpdatePlayerDto): Promise<UpdateResult> {
    return this.model.updateOne({ _id: id }, { ...data });
  }
}
