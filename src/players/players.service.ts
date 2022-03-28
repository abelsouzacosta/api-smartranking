import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  private players: Player[];

  constructor() {
    this.players = [];
  }

  create({ name, email, phone_number }: CreatePlayerDto) {
    const player = new Player();

    const foundPlayerByEmail = this.players.find(
      (player) => player.email === email,
    );

    const foundPlayerByPhoneNumber = this.players.find(
      (player) => player.phone_number === phone_number,
    );

    if (foundPlayerByEmail)
      throw new HttpException('Email already taken', HttpStatus.CONFLICT);

    if (foundPlayerByPhoneNumber)
      throw new HttpException(
        'Phone number already taken',
        HttpStatus.CONFLICT,
      );

    Object.assign(player, {
      name,
      email,
      phone_number,
    });

    this.players.push(player);
  }

  findAll() {
    return this.players;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, { name, email, phone_number }: UpdatePlayerDto) {
    return `This action updates a player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
