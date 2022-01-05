import { Module } from '@nestjs/common';
import { Desafio45Controller } from './desafio45.controller';
import { Desafio45Service } from './desafio45.service';

@Module({
  controllers: [Desafio45Controller],
  providers: [Desafio45Service]
})
export class Desafio45Module {}
