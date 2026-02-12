import { Controller, Get, UseGuards } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('rankings')
@UseGuards(JwtAuthGuard)
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) { }

  @Get('daily')
  getDaily() {
    return this.rankingsService.getDaily();
  }

  @Get('yearly')
  getYearly() {
    return this.rankingsService.getYearly();
  }
}
