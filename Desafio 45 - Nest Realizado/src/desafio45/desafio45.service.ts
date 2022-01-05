import { Injectable } from '@nestjs/common';

import {Desafio45} from '../interfaces/desafio45.interface'

@Injectable()
export class Desafio45Service {
    private readonly desafio45: Desafio45[] = [];
        create(desafio45: Desafio45){
            this.desafio45.push(desafio45)
        }

        findAll(): Desafio45[]{
            return this.desafio45
        }
}
