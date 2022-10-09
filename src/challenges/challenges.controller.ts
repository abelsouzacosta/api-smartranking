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
  HttpStatus,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './domain/dto/create-challenge.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { DateHourTransformPipe } from './pipes/date-hour-transform.pipe';
import { DateValidatorPipe } from './pipes/date-validator.pipe';
import { SetSolicitationInfoPipe } from './pipes/set-solicitation-info.pipe';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatedChallengeResponse } from 'src/common/docs/swagger/responses/challenges/created-challenge-response.sample';
import { BadRequestErrorSample } from 'src/common/docs/swagger/responses/errors/bad-request-error.sample';
import { ListChallengeResponseSample } from 'src/common/docs/swagger/responses/challenges/list-challenge-response.sample';
import { UpdatedInstanceSample } from 'src/common/docs/swagger/responses/updated-instance.sample';

@ApiTags('challenges')
@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @ApiOperation({ summary: 'Creates a new Challenge' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'creates a new instance of challenge in the database',
    type: CreatedChallengeResponse,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'An bad request error will be shown if a player doesnt belong to the category',
    type: BadRequestErrorSample,
  })
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

  @ApiOperation({ summary: 'Returns all challenges in the database' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns a list of challenges',
    type: ListChallengeResponseSample,
    isArray: true,
  })
  @Get()
  findAll(@Query(new ValidationPipe()) query: PaginationDto) {
    return this.challengesService.findAll(query);
  }

  @ApiOperation({ summary: 'Returns a specific instance of challenge' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns a list of challenges',
    type: ListChallengeResponseSample,
    isArray: false,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengesService.findById(id);
  }

  @ApiOperation({ summary: 'Returns all challenges of a requester' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns a list of challenges',
    type: ListChallengeResponseSample,
    isArray: true,
  })
  @Get('requester/:id')
  findByRequester(@Param('id') id: string) {
    return this.challengesService.findByRequester(id);
  }

  @ApiOperation({ summary: 'Returns all challenges of a player' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns a list of challenges',
    type: ListChallengeResponseSample,
    isArray: true,
  })
  @Get('player/:id')
  findByPlayer(@Param('id') id: string) {
    return this.challengesService.findByPlayer(id);
  }

  @ApiOperation({ summary: 'Accepts a challenge identified by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'set a challenge as accepted',
    type: UpdatedInstanceSample,
  })
  @Patch('accept/:id')
  acceptChallenge(@Param('id') id: string) {
    return this.challengesService.acceptChallenge(id);
  }

  @ApiOperation({ summary: 'Cancels a challenge identified by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'set a challenge as canceled',
    type: UpdatedInstanceSample,
  })
  @Patch('cancel/:id')
  cancelChallenge(@Param('id') id: string) {
    return this.challengesService.cancelChallenge(id);
  }

  @ApiOperation({ summary: 'Denies a challenge identified by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'set a challenge as denied',
    type: UpdatedInstanceSample,
  })
  @Patch('deny/:id')
  denyChallenge(@Param('id') id: string) {
    return this.challengesService.denyChallenge(id);
  }

  @ApiOperation({ summary: 'Completes a challenge identified by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'set a challenge as done',
    type: UpdatedInstanceSample,
  })
  @Patch('complete/:id')
  completeChallenge(@Param('id') id: string) {
    return this.challengesService.completeChallenge(id);
  }
}
