import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './domain/dto/create-match.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatedMatchResponseSample } from 'src/common/docs/swagger/responses/matches/created-match-response.sample';
import { ListMatchesResponseSample } from 'src/common/docs/swagger/responses/matches/list-matches-response.sample';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @ApiOperation({ summary: 'Creates a new match' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Creates a new match instance in the database',
    type: CreatedMatchResponseSample,
  })
  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }

  @ApiOperation({ summary: 'List all matches in the database' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List all matches in the database',
    type: ListMatchesResponseSample,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.matchesService.findAll();
  }

  @ApiOperation({ summary: 'Gets all matches of a defensor' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List all matches in the database',
    type: ListMatchesResponseSample,
    isArray: true,
  })
  @Get('def/:id')
  getMatchesByDef(@Param('id') id: string) {
    return this.matchesService.getByDef(id);
  }

  @ApiOperation({ summary: 'Gets all matches of a player' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List all matches in the database',
    type: ListMatchesResponseSample,
    isArray: true,
  })
  @Get('player/:id')
  getMatchesOfPlayer(@Param('id') id: string) {
    return this.matchesService.getMatchesByPlayer(id);
  }
}
