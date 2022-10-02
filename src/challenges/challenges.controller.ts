import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './domain/dto/create-challenge.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { DateHourTransformPipe } from './pipes/date-hour-transform.pipe';
import { DateValidatorPipe } from './pipes/date-validator.pipe';
import { SetSolicitationInfoPipe } from './pipes/set-solicitation-info.pipe';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(
    new ValidationPipe(),
    new DateValidatorPipe(),
    new SetSolicitationInfoPipe(),
    new DateHourTransformPipe(),
  )
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengesService.create(createChallengeDto);
  }

  @Get()
  findAll(@Query(new ValidationPipe()) query: PaginationDto) {
    return this.challengesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengesService.findById(id);
  }

  @Get('requester/:id')
  findByRequester(@Param('id') id: string) {
    return this.challengesService.findByRequester(id);
  }

  @Get('player/:id')
  findByPlayer(@Param('id') id: string) {
    return this.challengesService.findByPlayer(id);
  }

  @Patch('accept/:id')
  acceptChallenge(@Param('id') id: string) {
    return this.challengesService.acceptChallenge(id);
  }

  @Patch('cancel/:id')
  cancelChallenge(@Param('id') id: string) {
    return this.challengesService.cancelChallenge(id);
  }

  @Patch('deny/:id')
  denyChallenge(@Param('id') id: string) {
    return this.challengesService.denyChallenge(id);
  }

  @Patch('complete/:id')
  completeChallenge(@Param('id') id: string) {
    return this.challengesService.completeChallenge(id);
  }
}
