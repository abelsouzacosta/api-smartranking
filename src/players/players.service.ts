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

  private async findByEmail(email: string) {
    const player = await this.playerModel.findOne({ email });

    return player;
  }

  private async findByPhoneNumber(phone_number: string) {
    const player = await this.playerModel.findOne({ phone_number });

    return player;
  }

  private async findOneByIdOrThrowsAnException(id: string) {
    const player = await this.playerModel.findById(id);

    if (!player)
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);

    return player;
  }

  private async checkIfEmailAlreadyTaken(
    id: string,
    email: string,
  ): Promise<void> {
    const player = await this.playerModel.findById(id);
    const foundPlayerByEmail = await this.findByEmail(email);

    if (foundPlayerByEmail && foundPlayerByEmail._id !== player._id)
      throw new HttpException(
        'Email already taekn by another player',
        HttpStatus.CONFLICT,
      );
  }

  private async checkIfPhoneNumberAlreadyTaken(
    id: string,
    phone_number: string,
  ): Promise<void> {
    const player = await this.findOne(id);
    const foundPlayerByPhoneNumber = await this.findByPhoneNumber(phone_number);

    if (foundPlayerByPhoneNumber && player._id !== foundPlayerByPhoneNumber._id)
      throw new HttpException(
        'Phone Number already taken',
        HttpStatus.CONFLICT,
      );
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

  async findOne(id: string) {
    const player = await this.playerModel.findById(id);

    return player;
  }

  async findOneByEmail(email: string): Promise<Player> {
    const player = await this.findByEmail(email);

    return player;
  }

  async update(id: string, { name, email, phone_number }: UpdatePlayerDto) {
    await this.findOneByIdOrThrowsAnException(id);

    await this.checkIfEmailAlreadyTaken(id, email);
    await this.checkIfPhoneNumberAlreadyTaken(id, phone_number);

    await this.playerModel.updateOne(
      { _id: id },
      { $set: { name, email, phone_number } },
    );
  }

  async remove(id: string) {
    await this.findOneByIdOrThrowsAnException(id);

    await this.playerModel.deleteMany({ _id: id });
  }
}
