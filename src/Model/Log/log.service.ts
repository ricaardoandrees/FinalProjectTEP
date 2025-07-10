// src/Log/Log.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Necesario si usas TypeORM
import { Repository } from 'typeorm'; // Necesario si usas TypeORM
import { Log } from './Log.entity'; // Importa tu entidad Log

@Injectable()
export class LogService {
  constructor(
  @InjectRepository(Log)
    private LogRepository: Repository<Log>,
  ) {}
 
  // Ejemplo de métodos CRUD básicos:

  async findAll(): Promise<Log[]> {
    // Lógica para obtener todas las Loges (ej. desde la base de datos)
    const logs = await this.LogRepository.find();
    console.log('Obteniendo todas las Loges desde el servicio...' );
    console.log(logs); // Imprime los logs obtenidos
    return this.LogRepository.find();
  }

  async findOne(id: string): Promise<Log | null> { 
    // Lógica para obtener una Log por ID
    console.log(`Obteniendo Log con ID: ${id} desde el servicio...`);
    return this.LogRepository.findOne({ where: { id: parseInt(id) } }); // Agregado 'where' y parseo de ID si es numérico
  }

  async create(Log: Log): Promise<Log> {
    // Lógica para crear una nueva Log
    const newLog = this.LogRepository.create(Log);
    return this.LogRepository.save(newLog);
  }

  async update(id: string, Log: Log): Promise<Log | null> {
    // Lógica para actualizar una Log existente
    await this.LogRepository.update(id, Log);
    console.log(`Actualizando Log con ID: ${id} y datos: ${JSON.stringify(Log)} desde el servicio...`);
    return this.LogRepository.findOne({ where: { id: parseInt(id) }} );
  }

  async remove(id: string): Promise<void> {
    // Lógica para eliminar una Log
    await this.LogRepository.delete(id);
    console.log(`Eliminando Log con ID: ${id} desde el servicio...`);
  }

  async createLog(accion: string, usuario: any, ruta: string, metodo: string) {
        const log = this.LogRepository.create({
        accion,
        usuario_id: usuario || undefined,
        ruta,
        metodo,
        });
        await this.LogRepository.save(log);
    }
}