import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Desafio45Module } from './desafio45/desafio45.module';

@Module({
  imports: [Desafio45Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
