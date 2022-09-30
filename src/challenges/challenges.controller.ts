import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './domain/dto/create-challenge.dto';
import { UpdateChallengeDto } from './domain/dto/update-challenge.dto';
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
  findAll() {
    return this.challengesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return this.challengesService.update(+id, updateChallengeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengesService.remove(+id);
  }
}
