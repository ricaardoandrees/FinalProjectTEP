// src/Calificacion/Calificacion.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Necesario si usas TypeORM
import { Repository } from 'typeorm'; // Necesario si usas TypeORM
import { Calificacion } from './Calificacion.entity'; // Importa tu entidad Calificacion

@Injectable()
export class CalificacionService {
  constructor(
  @InjectRepository(Calificacion)
    private CalificacionRepository: Repository<Calificacion>,
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
}
