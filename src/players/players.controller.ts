import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './domain/dto/create-player.dto';
import { UpdatePlayerDto } from './domain/dto/update-player.dto';
import { FormattedNamePipePipe } from './pipes/formatted-name-pipe.pipe';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(new ValidationPipe(), new FormattedNamePipePipe())
  create(@Body() data: CreatePlayerDto) {
    return this.playersService.create(data);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() data: UpdatePlayerDto) {
    return this.playersService.update(id, data);
  }
}
