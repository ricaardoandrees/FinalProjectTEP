import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './Log.entity';
import { Usuario } from '../Usuario/Usuario.entity';

@Injectable()
export class LogService {
    constructor(
        @InjectRepository(Log)
        private logRepository: Repository<Log>,
    ) {}

    async createLog(accion: string, usuario: Usuario | null, ruta: string, metodo: string) {
        const log = this.logRepository.create({
            accion,
            usuario: usuario || undefined,
            ruta,
            metodo,
        });
        await this.logRepository.save(log);
    }
} 