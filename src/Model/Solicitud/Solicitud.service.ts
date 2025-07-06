// src/Solicitud/Solicitud.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Necesario si usas TypeORM
import { Repository } from 'typeorm'; // Necesario si usas TypeORM
import { Solicitud } from './Solicitud.entity'; // Importa tu entidad Solicitud

@Injectable()
export class SolicitudService {
  constructor(
  @InjectRepository(Solicitud)
    private SolicitudRepository: Repository<Solicitud>,
  ) {}
 
  // Ejemplo de métodos CRUD básicos:

  async findAll(): Promise<Solicitud[]> {
    // Lógica para obtener todas las Solicitudes (ej. desde la base de datos)
   console.log('Obteniendo todas las Solicitudes desde el servicio...');
    return this.SolicitudRepository.find();
  }

  async findOne(id: string): Promise<Solicitud | null> { 
    // Lógica para obtener una Solicitud por ID
   console.log(`Obteniendo Solicitud con ID: ${id} desde el servicio...`);
    return this.SolicitudRepository.findOne({ where: { id: parseInt(id) } }); // Agregado 'where' y parseo de ID si es numérico
  }

  async create(Solicitud: Solicitud): Promise<Solicitud> {
    // Lógica para crear una nueva Solicitud
    const newSolicitud = this.SolicitudRepository.create(Solicitud);
    return this.SolicitudRepository.save(newSolicitud);
  }

  async update(id: string, Solicitud: Solicitud): Promise<Solicitud | null> {
    // Lógica para actualizar una Solicitud existente
    await this.SolicitudRepository.update(id, Solicitud);
   console.log(`Actualizando Solicitud con ID: ${id} y datos: ${JSON.stringify(Solicitud)} desde el servicio...`);
    return this.SolicitudRepository.findOne({ where: { id: parseInt(id) }} );
  }

  async remove(id: string): Promise<void> {
    // Lógica para eliminar una Solicitud
    await this.SolicitudRepository.delete(id);
   console.log(`Eliminando Solicitud con ID: ${id} desde el servicio...`);
  }
}