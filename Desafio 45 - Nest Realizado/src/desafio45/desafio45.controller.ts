import { Body, Controller, Get, Post } from '@nestjs/common';
import { Desafio45Service } from './desafio45.service';
import { Desafio45 } from 'src/interfaces/desafio45.interface';
import { CreateDesafio45Dto } from 'src/dto/create-desafio45.dto';
import { create } from 'domain';

@Controller('desafio45')
export class Desafio45Controller {
    constructor(private readonly desafio45Service: Desafio45Service ){}
        @Post()
        async create(@Body() createDesafio45Dto: CreateDesafio45Dto){
            this.desafio45Service.create(createDesafio45Dto);
        }

        @Get()
        async findAll(): Promise<Desafio45[]> {
            return this.desafio45Service.findAll();
        }
    }


