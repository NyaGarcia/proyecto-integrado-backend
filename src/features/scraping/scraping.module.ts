import { HttpService } from './services/http.service';
import { Module } from '@nestjs/common';
import { ScrapingService } from './services/scraping.service';

@Module({
  imports: [],
  controllers: [],
  providers: [HttpService, ScrapingService],
  exports: [ScrapingService],
})
export class ScrapingModule {}
