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

  private findByPhoneNumber(phone_number: string) {
    const player = this.players.find(
      (player) => player.phone_number === phone_number,
    );

    return player;
  }

  private findByEmail(email: string) {
    const player = this.players.find((player) => player.email === email);

    return player;
  }

  private findOrThrowsNotFoundException(id: number): Player {
    const player = this.players.find((player) => player._id === id);

    if (!player)
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);

    return player;
  }

  private compareFoundPlayerByEmailWithPlayerIdGiven(
    id: number,
    email: string,
  ): void {
    const player = this.findOrThrowsNotFoundException(id);

    const foundPlayerByEmail = this.findByEmail(email);

    if (foundPlayerByEmail._id !== player._id)
      throw new HttpException(
        'The email on the request body is already taken by another user',
        HttpStatus.CONFLICT,
      );
  }

  private compareFoundPlayerByPhoneNumberWithPlayerIdGiven(
    id: number,
    phone_number: string,
  ) {
    const player = this.findOrThrowsNotFoundException(id);

    const foundPlayerByPhoneNumber = this.findByPhoneNumber(phone_number);

    if (player._id !== foundPlayerByPhoneNumber._id)
      throw new HttpException(
        'Phone already taken by another user',
        HttpStatus.CONFLICT,
      );
  }

  create({ name, email, phone_number }: CreatePlayerDto) {
    const player = new Player();

    const foundPlayerByEmail = this.findByEmail(email);

    const foundPlayerByPhoneNumber = this.findByPhoneNumber(phone_number);

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
      ranking: 'A',
      position: 1,
      photo_url: 'www.google.com/images/random',
    });

    this.players.push(player);
  }

  findAll() {
    return this.players;
  }

  findOne(id: number) {
    const player = this.findOrThrowsNotFoundException(id);

    return player;
  }

  findOneByEmail(email: string) {
    const player = this.findByEmail(email);

    return player;
  }

  update(id: number, { name, email, phone_number }: UpdatePlayerDto) {
    const player = this.findOrThrowsNotFoundException(id);

    this.compareFoundPlayerByEmailWithPlayerIdGiven(id, email);

    this.compareFoundPlayerByPhoneNumberWithPlayerIdGiven(id, phone_number);

    player.name = name || player.name;
    player.email = email || player.email;
    player.phone_number = phone_number || player.phone_number;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}