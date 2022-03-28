import { Injectable } from '@nestjs/common';
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

    Object.assign(player, {
      name,
      email,
      phone_number,
    });

    this.players.push(player);
  }

  findAll() {
    return `This action return all players`;
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
