import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './domain/dto/create-player.dto';
import { UpdatePlayerDto } from './domain/dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() data: CreatePlayerDto) {
    return this.playersService.create(data);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdatePlayerDto) {
    return this.playersService.update(id, data);
  }
}
