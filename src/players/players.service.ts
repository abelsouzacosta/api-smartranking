import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.schema';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private async findByEmail(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email });

    return player;
  }

  async create({ name, email, phone_number }: CreatePlayerDto): Promise<void> {
    const emailAlreadyTaken = this.findByEmail(email);

    if (emailAlreadyTaken)
      throw new HttpException('Email already taken', HttpStatus.CONFLICT);

    await this.playerModel.create({ name, email, phone_number });
  }

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  findOneByEmail(email: string) {
    return;
  }

  update(id: number, { name, email, phone_number }: UpdatePlayerDto) {
    return;
  }

  remove(id: number) {
    return;
  }
}
