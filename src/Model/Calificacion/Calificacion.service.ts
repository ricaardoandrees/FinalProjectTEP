// src/Calificacion/Calificacion.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Necesario si usas TypeORM
import { Repository } from 'typeorm'; // Necesario si usas TypeORM
import { Calificacion } from './Calificacion.entity'; // Importa tu entidad Calificacion
import { Sesion } from '../Sesion/Sesion.entity'; // Importa la entidad Sesion si es necesario

@Injectable()
export class CalificacionService {
  constructor(
  @InjectRepository(Calificacion)
    private CalificacionRepository: Repository<Calificacion>,
  @InjectRepository(Sesion)
    private SesionRepository: Repository<Sesion>,
  ) {}
 
  // Ejemplo de métodos CRUD básicos:

  async findAll(): Promise<Calificacion[]> {
    // Lógica para obtener todas las Calificaciones (ej. desde la base de datos)
    console.log('Obteniendo todas las Calificaciones desde el servicio...');
    return this.CalificacionRepository.find();
  }

  async findOne(id: string): Promise<Calificacion | null> { 
    // Lógica para obtener una Calificacion por ID
    console.log(`Obteniendo Calificacion con ID: ${id} desde el servicio...`);
    return this.CalificacionRepository.findOne({ where: { id: parseInt(id) } }); // Agregado 'where' y parseo de ID si es numérico
  }

  async create(Calificacion: Calificacion): Promise<Calificacion> {
    // Lógica para crear una nueva Calificacion
    const newCalificacion = this.CalificacionRepository.create(Calificacion);
    return this.CalificacionRepository.save(newCalificacion);
  }

  async update(id: string, Calificacion: Calificacion): Promise<Calificacion | null> {
    // Lógica para actualizar una Calificacion existente
    await this.CalificacionRepository.update(id, Calificacion);
    console.log(`Actualizando Calificacion con ID: ${id} y datos: ${JSON.stringify(Calificacion)} desde el servicio...`);
    return this.CalificacionRepository.findOne({ where: { id: parseInt(id) }} );
  }

  async remove(id: string): Promise<void> {
    // Lógica para eliminar una Calificacion
    await this.CalificacionRepository.delete(id);
    console.log(`Eliminando Calificacion con ID: ${id} desde el servicio...`);
  }

  async calificarSesion(Calificacion: Calificacion): Promise<Calificacion | null> {
    console.log(`Calificando la sesion con ID: ${Calificacion.sesion_id} con calificacion: ${Calificacion.calificacion} y comentario: ${Calificacion.comentario}...`);
    const sesionOriginal = await this.SesionRepository.findOne({where: { id: Calificacion.sesion_id.id } });
    if (sesionOriginal?.completada===false ) {
      throw new Error(`La sesion no esta terminada: ${Calificacion.sesion_id.id}`);
    }
    if (sesionOriginal?.completada===undefined || sesionOriginal===null)
    {
      throw new NotFoundException (`La sesion no existe: ${Calificacion.sesion_id.id}`);
    }
    const newCalificacion = this.CalificacionRepository.create(Calificacion);
    return this.CalificacionRepository.save(newCalificacion);
  }
}
