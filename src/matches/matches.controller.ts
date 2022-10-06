import { Controller, Get, Post, Body } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './domain/dto/create-match.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }

  @Get()
  findAll() {
    return this.matchesService.findAll();
  }
}
