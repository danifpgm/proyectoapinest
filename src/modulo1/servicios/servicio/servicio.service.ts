import { Injectable, NotFoundException } from '@nestjs/common';
import { Cosa } from 'src/modulo1/interfaces/cosa.interface';

@Injectable()
export class ServicioService {
    private cosas:Cosa[] = [
        {
            id: 1,
            nombre: 'cosa1'
        },
        {
            id: 2,
            nombre: 'cosa2'
        },
        {
            id: 3,
            nombre: 'cosa3'
        }
    ]

    listarPorId(id: number) {
        const cosa = this.cosas
        .find(cosa => cosa.id === id);
        if (!cosa) {
            throw new NotFoundException(`Cosa con id '${ id }' no se encuentra`);
        }
        return cosa;
    }
}
