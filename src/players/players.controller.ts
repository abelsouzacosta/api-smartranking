import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './domain/dto/create-player.dto';
import { UpdatePlayerDto } from './domain/dto/update-player.dto';
import { FormattedNamePipePipe } from './pipes/formatted-name-pipe.pipe';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlayerCreatedResponseSample } from 'src/common/docs/swagger/responses/players/player-created-response.sample';
import { ConflictErrorSample } from 'src/common/docs/swagger/responses/errors/conflict-error.sample';
import { ListPlayersResponseSample } from 'src/common/docs/swagger/responses/players/list-players-response.sample';
import { UpdatedInstanceSample } from 'src/common/docs/swagger/responses/updated-instance.sample';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @ApiOperation({ summary: 'Creates a new player instance' })
  @ApiCreatedResponse({
    description: 'A player was sucessfully created in the database',
    status: HttpStatus.CREATED,
    type: PlayerCreatedResponseSample,
  })
  @ApiConflictResponse({
    description: 'Email is already taken',
    status: HttpStatus.CONFLICT,
    type: ConflictErrorSample,
  })
  @Post()
  @UsePipes(new ValidationPipe(), new FormattedNamePipePipe())
  create(@Body() data: CreatePlayerDto) {
    return this.playersService.create(data);
  }

  @ApiOperation({ summary: 'List all players in the database' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns a list of all players in the database',
    type: ListPlayersResponseSample,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @ApiOperation({ summary: 'Gets an specific instance of player' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns a specific instance of player with the id given',
    type: ListPlayersResponseSample,
    isArray: false,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @ApiOperation({ summary: 'Updates an instance of player' })
  @ApiConflictResponse({
    description: 'Email is already taken',
    status: HttpStatus.CONFLICT,
    type: ConflictErrorSample,
  })
  @ApiResponse({
    description: 'Player was updated succesfully',
    status: HttpStatus.OK,
    type: UpdatedInstanceSample,
  })
  @Patch(':id')
  @UsePipes(new ValidationPipe(), new FormattedNamePipePipe())
  update(@Param('id') id: string, @Body() data: UpdatePlayerDto) {
    return this.playersService.update(id, data);
  }
}
