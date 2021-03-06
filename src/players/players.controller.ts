import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('/api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() { name, email, phone_number }: CreatePlayerDto) {
    return this.playersService.create({ name, email, phone_number });
  }

  @Get()
  findAll(@Query('email') email: string) {
    if (email) return this.playersService.findOneByEmail(email);

    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
