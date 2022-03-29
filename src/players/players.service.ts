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

  private async findByPhoneNumber(phone_number: string): Promise<Player> {
    const player = await this.playerModel.findOne({ phone_number });

    return player;
  }

  async create({ name, email, phone_number }: CreatePlayerDto): Promise<void> {
    const emailAlreadyTaken = await this.findByEmail(email);
    const phoneNumberAlreadyTaken = await this.findByPhoneNumber(phone_number);

    if (emailAlreadyTaken)
      throw new HttpException('Email already taken', HttpStatus.CONFLICT);

    if (phoneNumberAlreadyTaken)
      throw new HttpException(
        'Phone number already taken',
        HttpStatus.CONFLICT,
      );

    await this.playerModel.create({ name, email, phone_number });
  }

  async findAll(): Promise<Player[]> {
    const players = await this.playerModel.find();

    return players;
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playerModel.findById(id);

    return player;
  }

  async findOneByEmail(email: string): Promise<Player> {
    const player = await this.findByEmail(email);

    return player;
  }

  update(id: number, { name, email, phone_number }: UpdatePlayerDto) {
    return;
  }

  remove(id: number) {
    return;
  }
}
